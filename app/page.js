import HeroAnimation from '@/components/HeroAnimation'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            {/* Hero Animation Section */}
            <HeroAnimation />
        </main>
    )
}
