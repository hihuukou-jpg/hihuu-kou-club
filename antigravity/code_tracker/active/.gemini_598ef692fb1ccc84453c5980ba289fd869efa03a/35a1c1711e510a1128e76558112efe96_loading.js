Êexport default function Loading() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0F172A', // HSR Dark Blue
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            {/* Spinning Rings */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div className="spinner-ring" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: '2px solid transparent',
                    borderTop: '2px solid var(--hsr-cyan)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <div className="spinner-ring-inner" style={{
                    position: 'absolute',
                    top: '15%',
                    left: '15%',
                    width: '70%',
                    height: '70%',
                    border: '2px solid transparent',
                    borderBottom: '2px solid var(--hsr-gold)',
                    borderRadius: '50%',
                    animation: 'spin-reverse 1.5s linear infinite'
                }}></div>
            </div>

            <p style={{
                marginTop: '1.5rem',
                color: 'var(--hsr-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                animation: 'pulse 2s infinite'
            }}>
                SYSTEM INITIALIZING...
            </p>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(-360deg); }
                }
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
}
Ê*cascade08"(598ef692fb1ccc84453c5980ba289fd869efa03a2<file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/loading.js:file:///c:/Users/kouki/.gemini