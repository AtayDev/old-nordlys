"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { gsap } from "gsap"

interface SceneControllerProps {
  modelPath?: string
  className?: string
  interactive?: boolean
  autoRotate?: boolean
  zoom?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  onLoad?: () => void
  onProgress?: (progress: number) => void
}

export default function SceneController({
  modelPath = "/models/molecule.glb",
  className = "",
  interactive = true,
  autoRotate = true,
  zoom = 2,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad,
  onProgress,
}: SceneControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const frameIdRef = useRef<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = zoom
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 10)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    // Controls
    if (interactive) {
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enableZoom = true
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 1
      controlsRef.current = controls
    }

    // Model loading
    const loadModel = async () => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")

      const gltfLoader = new GLTFLoader()
      gltfLoader.setDRACOLoader(dracoLoader)

      try {
        const gltf = await new Promise<THREE.GLTF>((resolve, reject) => {
          gltfLoader.load(
            modelPath,
            (gltf) => resolve(gltf),
            (progress) => {
              if (onProgress && progress.total > 0) {
                onProgress(progress.loaded / progress.total)
              }
            },
            (error) => reject(error),
          )
        })

        const model = gltf.scene
        model.position.set(position[0], position[1], position[2])
        model.rotation.set(rotation[0], rotation[1], rotation[2])
        scene.add(model)
        modelRef.current = model

        // Animation
        gsap.from(model.rotation, {
          y: model.rotation.y - Math.PI * 2,
          duration: 2,
          ease: "power2.out",
        })

        gsap.from(model.position, {
          y: model.position.y - 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        })

        setIsLoaded(true)
        if (onLoad) onLoad()
      } catch (error) {
        console.error("Error loading model:", error)
      }
    }

    loadModel()

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameIdRef.current)

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [modelPath, interactive, autoRotate, zoom, position, rotation, onLoad, onProgress])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

