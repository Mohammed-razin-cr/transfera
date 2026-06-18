import { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

const defaultColors = ['#b41e1e', '#7a1212', '#9a3030']

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const int = parseInt(hex, 16)
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ]
}

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.16 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.74;
      gl_FragColor = vec4(vColor + 0.16 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`

function Particles({
  particleCount = 520,
  particleSpread = 12,
  speed = 0.08,
  particleColors = defaultColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.65,
  alphaParticles = true,
  particleBaseSize = 115,
  sizeRandomness = 0.85,
  cameraDistance = 22,
  disableRotation = false,
  pixelRatio = 1,
  className = '',
}) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      dpr: pixelRatio,
      depth: false,
      alpha: true,
    })
    const gl = renderer.gl
    container.appendChild(gl.canvas)
    gl.clearColor(0, 0, 0, 0)

    const camera = new Camera(gl, { fov: 15 })
    camera.position.set(0, 0, cameraDistance)

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }
    window.addEventListener('resize', resize, false)
    resize()

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      }
    }

    if (moveParticlesOnHover) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount * 4)
    const colors = new Float32Array(particleCount * 3)
    const palette = particleColors.length > 0 ? particleColors : defaultColors

    for (let i = 0; i < particleCount; i++) {
      let x
      let y
      let z
      let len
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
        len = x * x + y * y + z * z
      } while (len > 1 || len === 0)

      const radius = Math.cbrt(Math.random())
      positions.set([x * radius, y * radius, z * radius], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3)
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    })

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })
    let animationFrameId
    let lastTime = performance.now()
    let elapsed = 0

    const update = (time) => {
      animationFrameId = requestAnimationFrame(update)
      const delta = time - lastTime
      lastTime = time
      elapsed += delta * speed
      program.uniforms.uTime.value = elapsed * 0.001

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor
        particles.position.y = -mouseRef.current.y * particleHoverFactor
      } else {
        particles.position.x = 0
        particles.position.y = 0
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15
        particles.rotation.z += 0.01 * speed
      }

      renderer.render({ scene: particles, camera })
    }

    animationFrameId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('resize', resize)
      if (moveParticlesOnHover) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      cancelAnimationFrame(animationFrameId)
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas)
      }
    }
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    sizeRandomness,
    speed,
  ])

  return <div ref={containerRef} className={`relative h-full w-full ${className}`} />
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_8%,rgba(143,167,160,0.12),transparent_34%),linear-gradient(180deg,#11100d_0%,#0d0c0a_52%,#15120e_100%)]" />
      <Particles
        className="absolute inset-0 opacity-80"
        particleColors={defaultColors}
        particleCount={620}
        particleSpread={14}
        speed={0.07}
        particleBaseSize={120}
        sizeRandomness={0.72}
        cameraDistance={23}
        moveParticlesOnHover
        particleHoverFactor={0.55}
        alphaParticles
        pixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,12,10,0.52),rgba(13,12,10,0.12)_42%,rgba(13,12,10,0.48))]" />
    </div>
  )
}
