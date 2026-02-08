'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HeroAnimation.module.css'
import AnimatedText from './AnimatedText'

const TOTAL_FRAMES = 240
const IMAGE_PATH = '/images/ezgif-frame-'

export default function HeroAnimation() {
    const canvasRef = useRef(null)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentFrame, setCurrentFrame] = useState(0)
    const imagesRef = useRef([])
    const currentFrameRef = useRef(0)
    const requestIdRef = useRef(null)

    // Preload all images
    useEffect(() => {
        const images = []
        let loadedCount = 0

        const updateProgress = () => {
            loadedCount++
            const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100)
            setLoadingProgress(progress)

            if (loadedCount === TOTAL_FRAMES) {
                setIsLoaded(true)
            }
        }

        // Load all 240 images
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image()
            const frameNumber = String(i).padStart(3, '0')
            img.src = `${IMAGE_PATH}${frameNumber}.jpg`

            img.onload = updateProgress
            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`)
                updateProgress() // Still count it to avoid blocking
            }

            images.push(img)
        }

        imagesRef.current = images

        // Cleanup
        return () => {
            images.forEach(img => {
                img.onload = null
                img.onerror = null
            })
        }
    }, [])

    // Render frame on canvas
    const renderFrame = (frameIndex) => {
        const canvas = canvasRef.current
        if (!canvas || !imagesRef.current[frameIndex]) return

        const ctx = canvas.getContext('2d')
        const img = imagesRef.current[frameIndex]

        if (!img.complete) return

        // Get canvas dimensions
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        // Calculate scale to cover the canvas while maintaining aspect ratio
        const imgAspect = img.width / img.height
        const canvasAspect = canvasWidth / canvasHeight

        let drawWidth, drawHeight, offsetX, offsetY

        if (imgAspect > canvasAspect) {
            // Image is wider than canvas
            drawHeight = canvasHeight
            drawWidth = drawHeight * imgAspect
            offsetX = (canvasWidth - drawWidth) / 2
            offsetY = 0
        } else {
            // Image is taller than canvas
            drawWidth = canvasWidth
            drawHeight = drawWidth / imgAspect
            offsetX = 0
            // Center vertically but shift up slightly to crop bottom 5% (hide white line at bottom)
            offsetY = ((canvasHeight - drawHeight) / 4) - (drawHeight * 0.00)
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        // Draw image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Handle scroll-based animation with enhanced smoothness
    useEffect(() => {
        if (!isLoaded) return

        const canvas = canvasRef.current
        if (!canvas) return

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            renderFrame(currentFrameRef.current)
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create a spacer element to extend scroll area for slower animation
        const spacer = document.createElement('div')
        spacer.id = 'animation-spacer'
        // Make scroll area 8x larger to slow down to 0.125x speed
        spacer.style.height = `${window.innerHeight * 8}px`
        spacer.style.pointerEvents = 'none'
        document.body.appendChild(spacer)

        // Smooth scroll handler with optimized performance
        const handleScroll = () => {
            // Cancel any pending animation frame
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current)
            }

            // Use requestAnimationFrame for smooth 60fps rendering
            requestIdRef.current = requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

                // Calculate scroll progress (0 to 1)
                const scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight))

                // Map to frame index (0 to 239)
                const frameIndex = Math.floor(scrollProgress * (TOTAL_FRAMES - 1))

                // Clamp to valid range
                const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex))

                // Only render if frame changed
                if (clampedFrame !== currentFrameRef.current) {
                    currentFrameRef.current = clampedFrame
                    setCurrentFrame(clampedFrame)
                    renderFrame(clampedFrame)
                }

                // Update scale effect based on scroll progress
                const scale = 1 + (scrollProgress * 0.1) // Scale from 1.0 to 1.1
                canvas.style.transform = `scale(${scale})`
            })
        }

        // Initial render
        renderFrame(0)

        // Add scroll listener with passive flag for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', resizeCanvas)
            // Remove spacer on cleanup
            const spacerElement = document.getElementById('animation-spacer')
            if (spacerElement) {
                spacerElement.remove()
            }
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current)
            }
        }
    }, [isLoaded])

    return (
        <div className={styles.container}>
            {!isLoaded && (
                <div className={styles.loading}>
                    <div className={styles.loadingContent}>
                        <div className={styles.spinner}></div>
                        <h2 className={styles.loadingText}>Loading Experience</h2>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <p className={styles.progressText}>{loadingProgress}%</p>
                    </div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className={`${styles.canvas} ${isLoaded ? styles.canvasLoaded : ''}`}
            />

            {isLoaded && (
                <>
                    <div className={styles.scrollIndicator}>
                        <div className={styles.scrollArrow}></div>
                        <p>Scroll to explore</p>
                    </div>

                    <AnimatedText currentFrame={currentFrame} totalFrames={TOTAL_FRAMES} />
                </>
            )}
        </div>
    )
}
