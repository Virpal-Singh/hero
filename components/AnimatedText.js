'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AnimatedText.module.css'

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function AnimatedText({ currentFrame, totalFrames }) {
    const containerRef = useRef(null)
    const textRefs = useRef([])

    // Sequential text lines - each appears and disappears before next one
    const quotes = [
        { text: "Excellence", start: 20, end: 50, font: 'Cinzel' },
        { text: "does not happen", start: 55, end: 85, font: 'Montserrat' },
        { text: "by accident", start: 90, end: 120, font: 'Raleway' },
        { text: "it is built through", start: 125, end: 155, font: 'Inter' },
        { text: "a process", start: 160, end: 180, font: 'Cinzel' },
    ]

    useEffect(() => {
        textRefs.current.forEach((textEl, index) => {
            if (!textEl) return

            const quote = quotes[index]

            if (currentFrame >= quote.start && currentFrame <= quote.end) {
                // Calculate progress within this line's timeframe
                const progress = (currentFrame - quote.start) / (quote.end - quote.start)

                // Fade in quickly at start (first 20% of duration)
                if (progress < 0.2) {
                    const fadeIn = progress / 0.2
                    gsap.to(textEl, {
                        opacity: fadeIn,
                        scale: 0.9 + (fadeIn * 0.1),
                        y: 20 * (1 - fadeIn),
                        duration: 0.2,
                        ease: 'power2.out'
                    })
                }
                // Stay visible in middle (20% to 80%)
                else if (progress < 0.8) {
                    gsap.to(textEl, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.2,
                        ease: 'none'
                    })
                }
                // Fade out quickly at end (last 20% of duration)
                else {
                    const fadeOut = (progress - 0.8) / 0.2
                    gsap.to(textEl, {
                        opacity: 1 - fadeOut,
                        scale: 1 + (fadeOut * 0.1),
                        y: -20 * fadeOut,
                        duration: 0.2,
                        ease: 'power2.in'
                    })
                }
            } else {
                // Hide when not in range
                gsap.set(textEl, {
                    opacity: 0,
                    scale: 0.9,
                    y: 20
                })
            }
        })
    }, [currentFrame])

    // Show creator credit from frame 180 onwards
    const showCredit = currentFrame >= 180

    return (
        <div ref={containerRef} className={styles.container}>
            {/* Sequential text lines */}
            {quotes.map((quote, index) => (
                <div
                    key={index}
                    ref={el => textRefs.current[index] = el}
                    className={styles.text}
                    style={{ fontFamily: quote.font }}
                >
                    {quote.text}
                </div>
            ))}

            {/* Creator credit - from frame 180 onwards */}
            <div
                className={`${styles.credit} ${showCredit ? styles.creditVisible : ''}`}
                style={{ fontFamily: 'Cinzel' }}
            >
                <div className={styles.creditLine}></div>
                <div className={styles.creditText}>VIRPAL SINH</div>
                <div className={styles.creditSubtext}>Creator</div>
            </div>
        </div>
    )
}
