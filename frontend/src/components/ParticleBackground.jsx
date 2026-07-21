import { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'
import { createVisibilityLoop } from '../utils/animation'

const defaultColors = ['#f20a67', '#8c244b', '#5b243d', '#63cce8', '#f20a67']

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
  uniform vec2 uMouse;
  uniform float uHoverStrength;
  uniform float uHoverRadius;

  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vDepth;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 6.0;

    // Organic slow drift over time
    float t = uTime * 0.8;
    pos.x += sin(t * random.z + 6.28 * random.w) * mix(0.2, 1.8, random.x);
    pos.y += cos(t * random.y + 6.28 * random.x) * mix(0.2, 1.8, random.w);
    pos.z += sin(t * random.w + 6.28 * random.y) * mix(0.2, 1.8, random.z);

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    
    // Dynamic interactive mouse warping field
    vec2 toMouse = mPos.xy - uMouse;
    float dist = length(toMouse);
    if (dist < uHoverRadius) {
      float force = 1.0 - (dist / uHoverRadius);
      force = smoothstep(0.0, 1.0, force) * uHoverStrength;
      mPos.xy += normalize(toMouse) * force;
    }

    vec4 mvPos = viewMatrix * mPos;
    vDepth = -mvPos.z;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (0.8 + uSizeRandomness * random.x)) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uAccentColor;
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if (d > 0.5) {
      discard;
    }

    // Softer gaussian-like glowing bokeh drop-off
    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 2.8) * 0.85;

    // Pulse brightness slowly
    float pulse = sin(uTime * 1.5 + vRandom.z * 6.28) * 0.15 + 0.85;
    
    // Color shift dynamically from crimson/green to deep background glow accent
    vec3 finalColor = mix(vColor, uAccentColor, sin(uTime * 0.45 + vRandom.y * 6.28) * 0.35 + 0.35);
    
    // Closer particles get slightly highlighted
    float depthFactor = smoothstep(5.0, 25.0, vDepth);
    finalColor += vec3(0.06) * (1.0 - depthFactor);

    gl_FragColor = vec4(finalColor * pulse, alpha);
  }
`;

function Particles({
  particleCount = 650,
  particleSpread = 14,
  speed = 0.06,
  particleColors = defaultColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.45,
  alphaParticles = true,
  particleBaseSize = 135,
  sizeRandomness = 0.75,
  cameraDistance = 22,
  disableRotation = false,
  pixelRatio = 1,
  className = '',
  theme = 'obsidian',
}) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentMouseRef = useRef({ x: 0, y: 0 })

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

    let viewWidth = container.clientWidth
    let viewHeight = container.clientHeight
    let loop

    const resize = () => {
      viewWidth = container.clientWidth
      viewHeight = container.clientHeight
      renderer.setSize(viewWidth, viewHeight)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
      loop?.requestRender()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const handleMouseMove = (event) => {
      if (!viewWidth || !viewHeight) return
      mouseRef.current = {
        x: ((event.clientX / viewWidth) * 2 - 1) * (particleSpread * 0.5),
        y: -((event.clientY / viewHeight) * 2 - 1) * (particleSpread * 0.5 * (viewHeight / viewWidth)),
      }
    }

    if (moveParticlesOnHover) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true })
    }

    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount * 4)
    const colors = new Float32Array(particleCount * 3)
    const palette = particleColors.length > 0 ? particleColors : defaultColors

    for (let i = 0; i < particleCount; i++) {
      let x, y, z, len
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
        uMouse: { value: [0, 0] },
        uHoverStrength: { value: 2.5 },
        uHoverRadius: { value: 4.8 },
        uAccentColor: { value: [0.48, 0.06, 0.23] },
      },
      transparent: true,
      depthTest: false,
    })

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })
    let elapsed = 0

    const update = (_time, deltaMs) => {
      elapsed += deltaMs * speed
      program.uniforms.uTime.value = elapsed * 0.001

      if (moveParticlesOnHover) {
        // Delta-time weighted fluid exponential lerp for ultra-smooth tracking across all refresh rates
        const lerpFactor = 1 - Math.exp(-0.0075 * deltaMs)
        currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * lerpFactor
        currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * lerpFactor

        program.uniforms.uMouse.value[0] = currentMouseRef.current.x
        program.uniforms.uMouse.value[1] = currentMouseRef.current.y

        // Gently tilt the system smoothly
        particles.position.x = currentMouseRef.current.x * 0.04
        particles.position.y = currentMouseRef.current.y * 0.04
      } else {
        program.uniforms.uMouse.value[0] = 0
        program.uniforms.uMouse.value[1] = 0
        particles.position.x = 0
        particles.position.y = 0
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.00015) * 0.08
        particles.rotation.y = Math.cos(elapsed * 0.0003) * 0.12
        particles.rotation.z += (deltaMs * 0.0005) * speed
      }

      renderer.render({ scene: particles, camera })
    }

    loop = createVisibilityLoop(container, update, { rootMargin: '0px' })

    return () => {
      loop.stop()
      resizeObserver.disconnect()
      if (moveParticlesOnHover) {
        window.removeEventListener('pointermove', handleMouseMove)
      }
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
    theme,
  ])

  return <div ref={containerRef} className={`relative h-full w-full ${className}`} />
}

export default function ParticleBackground() {
  const colors = ['#f20a67', '#8c244b', '#5b243d', '#63cce8', '#f20a67']
  const compactViewport = window.matchMedia('(max-width: 768px)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches

  return (
    <div className="particle-background fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 28% 8%, rgba(242,10,103,0.055), transparent 40%), radial-gradient(circle at 82% 38%, rgba(99,204,232,0.025), transparent 34%), linear-gradient(180deg, #09080b 0%, #070609 52%, #09080b 100%)' }}
      />
      <Particles
        className="absolute inset-0 opacity-50"
        particleColors={colors}
        particleCount={compactViewport ? 220 : 380}
        particleSpread={15}
        speed={0.06}
        particleBaseSize={125}
        sizeRandomness={0.78}
        cameraDistance={22}
        moveParticlesOnHover={finePointer && !compactViewport}
        particleHoverFactor={0.45}
        alphaParticles
        pixelRatio={Math.min(window.devicePixelRatio || 1, compactViewport ? 1 : 1.25)}
        theme="luro"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(9,8,11,0.52), rgba(9,8,11,0.08) 42%, rgba(9,8,11,0.42))' }} />
    </div>
  )
}
