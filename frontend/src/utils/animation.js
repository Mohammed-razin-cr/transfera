const FRAME_DURATION = 1000 / 60

export function createVisibilityLoop(element, onFrame, { rootMargin = '160px 0px' } = {}) {
  let frameId = null
  let lastTime = null
  let isRunning = false
  let isIntersecting = false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tick = (time) => {
    if (!isRunning) return

    const deltaMs = lastTime === null
      ? FRAME_DURATION
      : Math.min(time - lastTime, FRAME_DURATION * 2.5)

    lastTime = time
    onFrame(time, deltaMs, deltaMs / FRAME_DURATION)

    if (reducedMotion) {
      isRunning = false
      frameId = null
      return
    }

    frameId = requestAnimationFrame(tick)
  }

  const sync = () => {
    const shouldRun = isIntersecting && !document.hidden

    if (shouldRun && !isRunning) {
      isRunning = true
      lastTime = null
      frameId = requestAnimationFrame(tick)
    } else if (!shouldRun && isRunning) {
      isRunning = false
      lastTime = null
      cancelAnimationFrame(frameId)
      frameId = null
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    isIntersecting = entry.isIntersecting
    sync()
  }, { rootMargin })

  const handleVisibility = () => sync()

  observer.observe(element)
  document.addEventListener('visibilitychange', handleVisibility)

  return {
    requestRender() {
      if (!reducedMotion || !isIntersecting || document.hidden || isRunning) return
      isRunning = true
      lastTime = null
      frameId = requestAnimationFrame(tick)
    },
    stop() {
      isRunning = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      if (frameId !== null) cancelAnimationFrame(frameId)
    },
  }
}
