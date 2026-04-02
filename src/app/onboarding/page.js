'use client'
import { setRole } from '../actions'
import { authClient } from '../../auth-client'
import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
export default function Onboarding() {
    const [user, setUser] = useState('')
    useEffect(() => {
        async function setUserId() {
            const session = await authClient.getSession();
            const userId = session.data.user.id;
            setUser(userId)
        }
        setUserId();
    }, [])
    const handleClick = async (role, userId) => {
        await setRole(role, userId);
        redirect('/dashboard');
    }
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #f0f4ff 0%, #f9f8f6 50%, #f9f8f6 100%)", position: "relative", overflow: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@400;600;700;800&display=swap');
                .ob-btn-outline { background: #fff; color: #1a1a1a; border: 1.5px solid #d0d0d0; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s, color 0.2s; }
                .ob-btn-outline:hover { border-color: #2563eb; color: #2563eb; }
                .ob-btn-primary { background: #1a1a1a; color: #fff; border: none; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
                .ob-btn-primary:hover { background: #2563eb; }
            `}</style>
            <div style={{ position: "absolute", top: "10%", left: "5%", width: 280, height: 280, background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 200, height: 200, background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "48px 32px" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", marginBottom: 40 }}>
                    Nab<span style={{ color: "#2563eb" }}>it</span>
                </div>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", marginBottom: 10 }}>Welcome to Nabit!</h1>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", marginBottom: 40 }}>Please select your role</h1>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="ob-btn-outline" onClick={() => handleClick('requester', user)}>Requester</button>
                    <button className="ob-btn-primary" onClick={() => handleClick('deliverer', user)}>Deliverer</button>
                </div>
                <p style={{ marginTop: 20, fontSize: 12, color: "#999", fontWeight: 300 }}>Only verified students. No faculty. No strangers.</p>
            </div>
        </div>
    );
}
