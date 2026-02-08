import './globals.css'

export const metadata = {
    title: 'Hero',
    description: 'Cinematic scroll-driven frame-by-frame animation experience',
    viewport: 'width=device-width, initial-scale=1',
    icons: {
        icon: '/images/logo.jpeg',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    )
}
