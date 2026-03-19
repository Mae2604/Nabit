export default function Home() {
  return (
    import { useState, useEffect, useRef } from "react";
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

export default function HomePage() {
    const [faqOpen, setFaqOpen] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f9f8f6", color: "#1a1a1a", overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f9f8f6; }
        .nav-link { color: #444; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #2563eb; }
        .btn-primary { background: #1a1a1a; color: #fff; border: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.1s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
        .btn-outline { background: transparent; color: #1a1a1a; border: 1.5px solid #d0d0d0; padding: 11px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: border-color 0.2s, color 0.2s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { border-color: #2563eb; color: #2563eb; }
        .feature-card { background: #fff; border-radius: 14px; padding: 28px; border: 1px solid #ebebeb; transition: transform 0.2s, box-shadow 0.2s; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .testimonial-card { background: #fff; border-radius: 14px; padding: 28px; border: 1px solid #ebebeb; }
        .plan-card { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #ebebeb; transition: transform 0.2s; }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-card.highlight { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .faq-item { border-bottom: 1px solid #ebebeb; padding: 20px 0; }
        .faq-btn { background: none; border: none; width: 100%; text-align: left; font-size: 15px; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; color: #1a1a1a; }
        .badge { background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; display: inline-block; letter-spacing: 0.5px; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background: #e8f0fe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #e0e0e0; padding: 6px 14px; border-radius: 20px; font-size: 13px; color: #555; margin-bottom: 24px; }
        .grid-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .grid-testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .grid-plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 860px; margin: 0 auto; }
        .section { padding: 88px 24px; max-width: 1100px; margin: 0 auto; }
        .highlight-text { color: #2563eb; }
        .noise { position: absolute; inset: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-repeat: repeat; pointer-events: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-animate-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .hero-animate-2 { animation: fadeUp 0.7s ease 0.25s both; }
        .hero-animate-3 { animation: fadeUp 0.7s ease 0.4s both; }
        .hero-animate-4 { animation: fadeUp 0.7s ease 0.55s both; }
        @media (max-width: 600px) {
          .hero-title { font-size: 36px !important; }
          .grid-plans { grid-template-columns: 1fr; }
          .desktop-nav { display: none; }
        }
        @media (min-width: 601px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
  
            {/* NAV */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                background: scrolled ? "rgba(249,248,246,0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid #ebebeb" : "none",
                transition: "all 0.3s ease",
                padding: "0 24px",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
                        Nab<span style={{ color: "#2563eb" }}>it</span>
                    </div>
                    <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                        {NAV_LINKS.map(l => (
                            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
                        ))}
                        <button className="btn-outline" style={{ padding: "8px 20px" }}>Log in</button>
                        <button className="btn-primary" style={{ padding: "8px 20px" }}>Sign up free</button>
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#1a1a1a" }}>
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
                {menuOpen && (
                    <div style={{ background: "#fff", borderTop: "1px solid #ebebeb", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                        {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}>{l}</a>)}
                        <button className="btn-primary" style={{ width: "100%" }}>Sign up free</button>
                    </div>
                )}
            </nav>
         {/* HERO */}
            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", textAlign: "center", background: "linear-gradient(160deg, #f0f4ff 0%, #f9f8f6 50%, #f9f8f6 100%)", overflow: "hidden" }}>
                <div className="noise" />
                <div style={{ position: "absolute", top: "15%", left: "8%", width: 320, height: 320, background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 240, height: 240, background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

                <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
                    <div className="hero-animate-1">
                        <div className="hero-tag">
                            <span style={{ background: "#2563eb", width: 7, height: 7, borderRadius: "50%", display: "inline-block" }} />
                            Built for students, by students
                        </div>
                    </div>
                    <h1 className="hero-animate-2 hero-title" style={{ fontFamily: "'Sora', sans-serif", fontSize: 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 24 }}>
                        Too busy to pick up?<br />
                        <span className="highlight-text">Get it delivered by a fellow student.</span>
                    </h1>
                    <p className="hero-animate-3" style={{ fontSize: 18, color: "#555", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px", fontWeight: 300 }}>
                        Post your on-campus order, a student picks it up, you pay them directly. Fast, simple, student-only.
                    </p>
                    <div className="hero-animate-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>Post a delivery request</button>
                        <button className="btn-outline" style={{ padding: "14px 24px", fontSize: 15 }}>See how it works →</button>
                    </div>
                    <p className="hero-animate-4" style={{ marginTop: 20, fontSize: 13, color: "#999" }}>Only verified students. No faculty. No strangers.</p>
                </div>
            </section>
{/* CTA BANNER */}
            <section style={{ padding: "80px 24px" }}>
                <FadeIn>
                    <div style={{ maxWidth: 700, margin: "0 auto", background: "#1a1a1a", borderRadius: 20, padding: "56px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: 200, height: 200, background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)", borderRadius: "50%" }} />
                        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>
                            Your order is waiting. Someone can grab it.
                        </h2>
                        <p style={{ color: "#aaa", fontSize: 15, marginBottom: 32, fontWeight: 300 }}>
                            Join your campus community. Post a request or earn money delivering for fellow students.
                        </p>
                        <button className="btn-primary" style={{ background: "#2563eb", padding: "14px 36px", fontSize: 15 }}>
                            Create your free account
                        </button>
                        <p style={{ marginTop: 16, fontSize: 13, color: "#555" }}>MSU students only.</p>
                    </div>
                </FadeIn>
            </section>
  );
};
