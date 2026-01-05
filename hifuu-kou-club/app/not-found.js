import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{
                fontSize: '8rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to bottom, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                marginBottom: '1rem',
                fontFamily: 'var(--font-mono)'
            }}>404</h1>

            <div style={{
                width: '60px',
                height: '4px',
                background: 'var(--hsr-cyan)',
                margin: '0 auto 2rem auto',
                boxShadow: '0 0 10px var(--hsr-cyan)'
            }}></div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--hsr-gold)' }}>
                SIGNAL LOST
            </h2>

            <p style={{ color: '#94a3b8', marginBottom: '3rem', maxWidth: '400px' }}>
                指定された座標（URL）にデータが見つかりません。
                境界の向こう側へ移動してしまった可能性があります。
            </p>

            <Link
                href="/"
                style={{
                    display: 'inline-block',
                    padding: '0.8rem 2.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--hsr-cyan)',
                    color: 'var(--hsr-cyan)',
                    textDecoration: 'none',
                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s'
                }}
            >
                RETURN TO HOME
            </Link>
        </div>
    );
}
