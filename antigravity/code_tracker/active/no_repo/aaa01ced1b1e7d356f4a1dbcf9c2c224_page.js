¿Ü"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiaryEditor from "../../components/DiaryEditor";

export default function AdminPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("news");
    const [news, setNews] = useState([]);
    const [chars, setChars] = useState([]);
    const [diary, setDiary] = useState([]);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({ views: 0 });

    // News Form
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");

    // Video Form
    const [videoTitle, setVideoTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    // Char Form
    const [charId, setCharId] = useState("");
    const [charName, setCharName] = useState("");
    const [charRole, setCharRole] = useState("");
    const [charDesc, setCharDesc] = useState("");
    const [charColor, setCharColor] = useState("#000000");
    const [charImage, setCharImage] = useState("");
    const [uploadFile, setUploadFile] = useState(null);

    // Diary Form
    const [diaryId, setDiaryId] = useState(null);
    const [diaryDate, setDiaryDate] = useState("");
    const [diaryTitle, setDiaryTitle] = useState("");
    const [diaryContent, setDiaryContent] = useState("");
    const [diaryProgress, setDiaryProgress] = useState(0);

    useEffect(() => {
        // ALWAYS fetch data so guests can see it
        fetchData();
    }, []);

    const fetchData = async () => {
        const n = await fetch("/api/news").then(res => res.json());
        const c = await fetch("/api/characters").then(res => res.json());
        const d = await fetch("/api/diary").then(res => res.json());
        const v = await fetch("/api/videos").then(res => res.json());

        // Only fetch stats if logged in (or just fetch and hide if not, but purely safe is conditional)
        // For simplicity, fetch always, hide in UI. 
        // Or catch error nicely.
        try {
            const s = await fetch("/api/stats").then(res => res.json());
            setStats(s);
        } catch (e) { console.error(e); }

        setNews(n);
        setChars(c);
        setDiary(d);
        setVideos(v);
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!session) return; // double check
        await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newsTitle, content: newsContent })
        });
        setNewsTitle("");
        setNewsContent("");
        fetchData();
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!session) return;
        await fetch("/api/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: videoTitle, url: videoUrl })
        });
        setVideoTitle("");
        setVideoUrl("");
        fetchData();
    };

    const handleDeleteVideo = async (id) => {
        if (!session) return;
        if (!confirm("æœ¬å½“ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ")) return;
        await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleSaveDiary = async (e) => {
        e.preventDefault();
        if (!session) return;
        await fetch("/api/diary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: diaryId,
                date: diaryDate,
                title: diaryTitle,
                content: diaryContent,
                progress: parseInt(diaryProgress)
            })
        });

        // Reset
        setDiaryId(null);
        setDiaryDate("");
        setDiaryTitle("");
        setDiaryContent("");
        setDiaryProgress(0);

        fetchData();
    };

    const handleEditDiary = (item) => {
        setDiaryId(item.id);
        setDiaryDate(item.date);
        setDiaryTitle(item.title);
        setDiaryContent(item.content);
        setDiaryProgress(item.progress);
        window.scrollTo(0, 0);
    };

    const handleDeleteDiary = async (id) => {
        if (!session) return;
        if (!confirm("æœ¬å½“ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ")) return;
        await fetch(`/api/diary?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleSaveChar = async (e) => {
        e.preventDefault();
        if (!session) return;

        let imageUrl = charImage;

        // If file selected, upload it first
        if (uploadFile) {
            const formData = new FormData();
            formData.append('file', uploadFile);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    imageUrl = data.url;
                } else {
                    const err = await res.json();
                    alert(`ç”»åƒã®ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰ã«å¤±æ•—ã—ã¾ã—ãŸ: ${err.error || 'Unknown error'}`);
                    return;
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("ç”»åƒã®ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰ä¸­ã«ã‚¨ãƒ©ãƒ¼ãŒç™ºç”Ÿã—ã¾ã—ãŸ");
                return;
            }
        }

        await fetch("/api/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: charId,
                name: charName,
                role: charRole,
                description: charDesc,
                color: charColor,
                image: imageUrl
            })
        });

        // Reset form
        setCharId("");
        setCharName("");
        setCharRole("");
        setCharDesc("");
        setCharColor("#000000");
        setCharImage("");
        setUploadFile(null);

        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = "";

        fetchData();
    };

    const handleDeleteChar = async (id) => {
        if (!session) return;
        if (!confirm("æœ¬å½“ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ")) return;
        await fetch(`/api/characters?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    // Helper to edit existing char
    const handleEditChar = (char) => {
        setCharId(char.id);
        setCharName(char.name);
        setCharRole(char.role);
        setCharDesc(char.description);
        setCharColor(char.color);
        setCharImage(char.image_url || "");
        setUploadFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = "";
    };

    return (
        <div style={{ padding: "2rem", paddingTop: "120px", color: "var(--text-main)", background: "var(--hakurei-white)", minHeight: "100vh", fontFamily: "var(--font-serif)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", color: "var(--hakurei-red)" }}>ç®¡ç†ãƒ€ãƒƒã‚·ãƒ¥ãƒœãƒ¼ãƒ‰ {session ? "(ç·¨é›†ãƒ¢ãƒ¼ãƒ‰)" : "(é–²è¦§ãƒ¢ãƒ¼ãƒ‰)"}</h1>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {session ? (
                        <>
                            <div style={{
                                padding: "0.5rem 1rem",
                                background: "#E0F2FE",
                                color: "#0F172A",
                                borderRadius: "4px",
                                border: "1px solid #BAE6FD",
                                fontSize: "0.9rem",
                                fontWeight: "bold"
                            }}>
                                è¨ªå•è€…æ•°: {stats.views}äºº
                            </div>
                            <span>Login: {session.user.name}</span>
                            <button onClick={() => signOut()} style={{ padding: "0.5rem 1rem", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ</button>
                        </>
                    ) : (
                        <button onClick={() => signIn()} style={{ padding: "0.5rem 1rem", border: "none", background: "var(--hakurei-red)", color: "white", cursor: "pointer", borderRadius: "4px" }}>ç®¡ç†è€…ãƒ­ã‚°ã‚¤ãƒ³</button>
                    )}
                </div>
            </div>

            <div style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc" }}>
                {["news", "chars", "diary", "videos"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "1rem",
                            background: "transparent",
                            border: "none",
                            color: activeTab === tab ? "var(--hakurei-red)" : "#888",
                            borderBottom: activeTab === tab ? "2px solid var(--hakurei-red)" : "none",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            marginRight: "1rem"
                        }}
                    >
                        {tab === "news" ? "ãŠçŸ¥ã‚‰ã›ç®¡ç†" : tab === "chars" ? "ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ç®¡ç†" : tab === "diary" ? "æ´»å‹•æ—¥èªŒç®¡ç†" : "å‹•ç”»ç®¡ç†"}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}

            {/* NEWS */}
            {activeTab === "news" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {session ? (
                        <form onSubmit={handleAddNews} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ marginBottom: "1rem" }}>ãŠçŸ¥ã‚‰ã›æŠ•ç¨¿</h3>
                            <div style={{ marginBottom: "1rem" }}>
                                <input
                                    type="text"
                                    placeholder="ã‚¿ã‚¤ãƒˆãƒ«"
                                    value={newsTitle}
                                    onChange={e => setNewsTitle(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <textarea
                                    placeholder="æœ¬æ–‡"
                                    value={newsContent}
                                    onChange={e => setNewsContent(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", height: "100px", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                æŠ•ç¨¿ã™ã‚‹
                            </button>
                        </form>
                    ) : (
                        <div style={{ padding: "1rem", background: "#eee", marginBottom: "2rem", borderRadius: "4px" }}>
                            ç¾åœ¨ã€ã‚²ã‚¹ãƒˆãƒ¢ãƒ¼ãƒ‰ï¼ˆé–²è¦§ã®ã¿ï¼‰ã§ã™ã€‚æŠ•ç¨¿ã™ã‚‹ã«ã¯ãƒ­ã‚°ã‚¤ãƒ³ã—ã¦ãã ã•ã„ã€‚
                        </div>
                    )}

                    <h3>æœ€è¿‘ã®ãŠçŸ¥ã‚‰ã›</h3>
                    <ul>
                        {news.map(n => (
                            <li key={n.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}>
                                <div style={{ color: "#888", fontSize: "0.8rem" }}>{n.date}</div>
                                <div style={{ fontWeight: "bold" }}>{n.title}</div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* CHARACTERS */}
            {activeTab === "chars" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {session && (
                        <form onSubmit={handleSaveChar} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ marginBottom: "1rem" }}>ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼è¿½åŠ ãƒ»ç·¨é›†</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                                <input type="text" placeholder="ID (ä¾‹: renko)" value={charId} onChange={e => setCharId(e.target.value)} style={{ padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} required />
                                <input type="text" placeholder="åå‰" value={charName} onChange={e => setCharName(e.target.value)} style={{ padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} required />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <input type="text" placeholder="å½¹å‰²ãƒ»è‚©æ›¸ã" value={charRole} onChange={e => setCharRole(e.target.value)} style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <textarea placeholder="èª¬æ˜æ–‡" value={charDesc} onChange={e => setCharDesc(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} />
                            </div>

                            <div style={{ marginBottom: "1rem", border: "1px solid #eee", padding: "1rem", borderRadius: "4px" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>ç«‹ã¡çµµç”»åƒ</label>
                                <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                                    {charImage ? `ç¾åœ¨ã®è¨­å®š: ${charImage}` : "ç”»åƒæœªè¨­å®š"}
                                </div>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setUploadFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "1rem" }}>
                                <label>ãƒ†ãƒ¼ãƒã‚«ãƒ©ãƒ¼: </label>
                                <input type="color" value={charColor} onChange={e => setCharColor(e.target.value)} />
                            </div>
                            <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                ä¿å­˜ã™ã‚‹
                            </button>
                        </form>
                    )}

                    <h3>ç™»éŒ²æ¸ˆã¿ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                        {chars.map(c => (
                            <div key={c.id} style={{ border: "1px solid #eee", padding: "1rem", position: "relative", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "30px", height: "30px", background: c.color, borderRadius: "50%", overflow: "hidden", border: "1px solid #ddd" }}>
                                        {c.image_url && <img src={c.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                    </div>
                                    <strong>{c.name}</strong>
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#888" }}>{c.role}</div>
                                {session && (
                                    <>
                                        <button
                                            onClick={() => handleEditChar(c)}
                                            style={{ marginTop: "1rem", width: "100%", padding: "0.4rem", background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
                                        >
                                            ç·¨é›†
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChar(c.id)}
                                            style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "transparent", border: "none", color: "#999", cursor: "pointer", fontSize: "1.2rem" }}
                                        >
                                            Ã—
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* DIARY */}
            {activeTab === "diary" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {session ? (
                        <form onSubmit={handleSaveDiary} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ marginBottom: "1rem" }}>æ—¥èªŒã®æŠ•ç¨¿ãƒ»ç·¨é›†</h3>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>æ—¥ä»˜ (YYYY.MM.DD)</label>
                                <input
                                    type="text"
                                    placeholder="2026.01.01"
                                    value={diaryDate}
                                    onChange={e => setDiaryDate(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>ã‚¿ã‚¤ãƒˆãƒ«</label>
                                <input
                                    type="text"
                                    placeholder="ã‚¿ã‚¤ãƒˆãƒ«"
                                    value={diaryTitle}
                                    onChange={e => setDiaryTitle(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>å†…å®¹</label>
                                <DiaryEditor
                                    content={diaryContent}
                                    onChange={setDiaryContent}
                                />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>é€²æ—åº¦ ({diaryProgress}%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={diaryProgress}
                                    onChange={e => setDiaryProgress(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </div>

                            <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                {diaryId ? "æ›´æ–°ã™ã‚‹" : "æŠ•ç¨¿ã™ã‚‹"}
                            </button>
                            {diaryId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDiaryId(null);
                                        setDiaryDate("");
                                        setDiaryTitle("");
                                        setDiaryContent("");
                                        setDiaryProgress(0);
                                    }}
                                    style={{ padding: "0.8rem 2rem", background: "#ccc", border: "none", color: "#333", cursor: "pointer", marginLeft: "1rem" }}>
                                    ã‚­ãƒ£ãƒ³ã‚»ãƒ«
                                </button>
                            )}
                        </form>
                    ) : (
                        <div style={{ padding: "1rem", background: "#eee", marginBottom: "2rem", borderRadius: "4px" }}>
                            ç¾åœ¨ã€ã‚²ã‚¹ãƒˆãƒ¢ãƒ¼ãƒ‰ï¼ˆé–²è¦§ã®ã¿ï¼‰ã§ã™ã€‚
                        </div>
                    )}

                    <h3>éå»ã®æ—¥èªŒ</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {diary.map(d => (
                            <div key={d.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                <div>
                                    <div style={{ color: "var(--hakurei-red)", fontSize: "0.9rem", fontWeight: "bold" }}>{d.date}</div>
                                    <h4 style={{ margin: "0.5rem 0" }}>{d.title}</h4>
                                    <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.5rem" }}>é€²æ—: {d.progress}%</div>
                                </div>
                                {session && (
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button onClick={() => handleEditDiary(d)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer" }}>ç·¨é›†</button>
                                        <button onClick={() => handleDeleteDiary(d.id)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "#fdd", border: "none", color: "red" }}>å‰Šé™¤</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* VIDEOS */}
            {activeTab === "videos" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {session ? (
                        <form onSubmit={handleAddVideo} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ marginBottom: "1rem" }}>å‹•ç”»ã®è¿½åŠ </h3>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>å‹•ç”»ã‚¿ã‚¤ãƒˆãƒ«</label>
                                <input
                                    type="text"
                                    placeholder="ä¾‹: æ–°ä½œPV"
                                    value={videoTitle}
                                    onChange={e => setVideoTitle(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem" }}>YouTube URL</label>
                                <input
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={videoUrl}
                                    onChange={e => setVideoUrl(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    required
                                />
                            </div>
                            <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                è¿½åŠ ã™ã‚‹
                            </button>
                        </form>
                    ) : null}

                    <h3>ç™»éŒ²æ¸ˆã¿å‹•ç”»</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
                        {videos.map(v => (
                            <div key={v.id} style={{ border: "1px solid #eee", padding: "1rem", background: "#fff" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{v.title}</div>
                                <div style={{ fontSize: "0.8rem", color: "#888", wordBreak: "break-all", marginBottom: "1rem" }}>{v.url}</div>
                                {session && (
                                    <button onClick={() => handleDeleteVideo(v.id)} style={{ width: "100%", padding: "0.5rem", background: "#fee", border: "none", color: "red", cursor: "pointer" }}>å‰Šé™¤</button>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

        </div>
    );
}
¨ *cascade08¨á*cascade08áÈ *cascade08Èõ*cascade08õ¤*cascade08¤Û*cascade08ÛÊ *cascade08ÊÉ*cascade08Éô *cascade08ôâ	*cascade08â	ä	 *cascade08ä	*cascade08® *cascade08®¸¸¹ *cascade08¹½½¾ *cascade08¾ÃÃÄ *cascade08ÄÈÈÊ *cascade08ÊËËÌ *cascade08ÌÏÏÑ *cascade08Ñ××³ *cascade08³ù*cascade08ù *cascade08¾ *cascade08¾¤*cascade08¤® *cascade08®Ğ *cascade08Ğã *cascade08ãú*cascade08úı *cascade08ıÏ *cascade08Ïşş° *cascade08°À *cascade08Àø *cascade08ø——ò *cascade08ò‘‘Æ *cascade08Æÿ *cascade08ÿš# *cascade08š#¹#¹#İ$ *cascade08İ$¥% *cascade08¥%Ä%Ä%•-*cascade08•-å/ *cascade08å/‡0*cascade08‡0¦0 *cascade08¦0¨0*cascade08¨0Õ0 *cascade08Õ0Ş0*cascade08Ş0ï0 *cascade08ï0ø0*cascade08ø0‰1 *cascade08‰1’1*cascade08’1£1 *cascade08£1¬1*cascade08¬1Ï1 *cascade08Ï1û2*cascade08û2Á3 *cascade08Á3à3à3ö3 *cascade08ö3”4*cascade08”45 *cascade0855*cascade0855 *cascade085‘5*cascade08‘5’5 *cascade08’5”5*cascade08”5—5 *cascade08—5™5*cascade08™5š5 *cascade08š5›5*cascade08›55 *cascade0855*cascade085Ÿ5 *cascade08Ÿ5¢5*cascade08¢5¨5 *cascade08¨5©5*cascade08©5«5 *cascade08«5®5*cascade08®5°5 *cascade08°5±5*cascade08±5³5 *cascade08³5´5*cascade08´5µ5 *cascade08µ5¶5*cascade08¶5¸5 *cascade08¸5¹5*cascade08¹5º5 *cascade08º5¼5*cascade08¼5½5 *cascade08½5À5*cascade08À5Â5 *cascade08Â5È5*cascade08È5É5 *cascade08É5Ê5*cascade08Ê5Ë5 *cascade08Ë5Í5*cascade08Í5Î5 *cascade08Î5Ï5*cascade08Ï5Ğ5 *cascade08Ğ5Ñ5*cascade08Ñ5Ò5 *cascade08Ò5Ô5*cascade08Ô5Ş5 *cascade08Ş5ó5*cascade08ó5û5 *cascade08û5ı5*cascade08ı5ş5 *cascade08ş5Œ6*cascade08Œ66 *cascade086’6*cascade08’6œ6 *cascade08œ6µ6*cascade08µ6½6 *cascade08½6À6*cascade08À6Á6 *cascade08Á6Ç6*cascade08Ç6É6 *cascade08É6Ğ6*cascade08Ğ6Ñ6 *cascade08Ñ6Ó6*cascade08Ó6Ô6 *cascade08Ô6Ø6*cascade08Ø6Ú6 *cascade08Ú6Û6*cascade08Û6ç6 *cascade08ç6ê6*cascade08ê6ì6 *cascade08ì6í6*cascade08í6î6 *cascade08î6ï6*cascade08ï6ò6 *cascade08ò6ó6*cascade08ó6ö6 *cascade08ö6÷6*cascade08÷6ü6 *cascade08ü6ş6*cascade08ş6ˆ7 *cascade08ˆ7Ÿ7*cascade08Ÿ7£7*cascade08£7¤7 *cascade08¤7¦7*cascade08¦7§7 *cascade08§7«7*cascade08«7µ7 *cascade08µ7É7*cascade08É7Ó7 *cascade08Ó7Ø7*cascade08Ø7Ù7 *cascade08Ù7â7*cascade08â7ã7 *cascade08ã7ä7*cascade08ä7å7 *cascade08å7è7*cascade08è7é7 *cascade08é7ì7*cascade08ì7í7 *cascade08í7ğ7*cascade08ğ7ñ7 *cascade08ñ7ƒ8*cascade08ƒ8„8 *cascade08„8Š8*cascade08Š8”8 *cascade08”8–8*cascade08–8—8 *cascade08—8¢8*cascade08¢8£8 *cascade08£8¤8*cascade08¤8¥8 *cascade08¥8­8*cascade08­8®8 *cascade08®8²8*cascade08²8³8 *cascade08³8´8*cascade08´8µ8 *cascade08µ8·8*cascade08·8¿8 *cascade08¿8À8*cascade08À8ò8 *cascade08ò8ó8*cascade08ó8ö8 *cascade08ö8ø8*cascade08ø8ù8 *cascade08ù899’9*cascade08’9“9 *cascade08“99*cascade0899 *cascade089¡9*cascade08¡9¢9 *cascade08¢9¦9*cascade08¦9©9 *cascade08©9½9*cascade08½9¾9 *cascade08¾9Æ9*cascade08Æ9È9 *cascade08È9Ô9*cascade08Ô9Õ9 *cascade08Õ9Ö9*cascade08Ö9Ü9 *cascade08Ü9Ş9*cascade08Ş9á9 *cascade08á9æ9*cascade08æ9ç9 *cascade08ç9è9*cascade08è9é9 *cascade08é9ë9*cascade08ë9î9 *cascade08î9ï9*cascade08ï9ğ9 *cascade08ğ9÷9*cascade08÷9ø9 *cascade08ø9ÿ9*cascade08ÿ9÷: *cascade08÷:ø:*cascade08ø:•; *cascade08•;Ï;*cascade08Ï;Ğ; *cascade08Ğ;Ö; *cascade08Ö;ë;*cascade08ë;¡<¡<â< *cascade08â<ø<*cascade08ø<’= *cascade08’=Ø=Ø=Ù= *cascade08Ù=ŠB*cascade08ŠBB *cascade08B”B”B–B *cascade08–BB *cascade08B£B *cascade08£B¨B *cascade08¨B²B *cascade08²BºBºBùB *cascade08ùBúB*cascade08úBûB *cascade08ûBüB*cascade08üBıB *cascade08ıB€C*cascade08€CƒC *cascade08ƒC†C*cascade08†C‡C *cascade08‡C‹C*cascade08‹CC *cascade08CC*cascade08C¥C *cascade08¥C¨C*cascade08¨C«C *cascade08«C­C*cascade08­C®C *cascade08®C±C*cascade08±C²C *cascade08²CµC*cascade08µCÕC *cascade08ÕCäC*cascade08äCšD *cascade08šDœDœD D *cascade08 D¡D¡D¢D *cascade08¢D£D£D¤D *cascade08¤D¥D¥D¿D *cascade08¿DÆDÆDØD *cascade08ØDÙDÙDÚD *cascade08ÚDİDİDóD *cascade08óDöDöDúD *cascade08úDûDûDıD *cascade08ıDşDşD‘E *cascade08‘E“E“E”E *cascade08”E—E—E˜E *cascade08˜E›E›E³E *cascade08³E¶E¶E¾E *cascade08¾E¿E¿EÖE *cascade08ÖE×E×EØE *cascade08ØEÚEÚEÛE *cascade08ÛEâEâEåE *cascade08åEèEèEíE *cascade08íEóE *cascade08óE‚F‚FµF *cascade08µF»F»FÉF *cascade08ÉFËFËFÍF *cascade08ÍFÏFÏFÑF *cascade08ÑFÓFÓFßF *cascade08ßFàFàFáF *cascade08áFãFãFåF *cascade08åFèFèFéF *cascade08éFìFìFíF *cascade08íFïFïFğF *cascade08ğFòFòFóF *cascade08óFôFôFõF *cascade08õF÷F÷FøF *cascade08øFùFùFüF *cascade08üFıFıFÿF *cascade08ÿF€G€G’G *cascade08’G“G“GœG *cascade08œG G G¢G *cascade08¢G¥G¥G·G *cascade08·GÀGÀGÁG *cascade08ÁGÂGÂGÃG *cascade08ÃGÅGÅGÇG *cascade08ÇGÉGÉGËG *cascade08ËGÌGÌGÍG *cascade08ÍGÎGÎGÏG *cascade08ÏGĞGĞGÓG *cascade08ÓGÕGÕGÖG *cascade08ÖG×G×GØG *cascade08ØGÚGÚGÛG *cascade08ÛGÜGÜGŞG *cascade08ŞGëGëGH *cascade08HˆHˆH™H *cascade08™H¢H *cascade08¢H©H©HªH *cascade08ªH«H«H­H *cascade08­HáH *cascade08áHâHâHãH *cascade08ãHäHäHèH *cascade08èHëHëHÿH *cascade08ÿH€I€IŠI *cascade08ŠIII¸I *cascade08¸I¼I¼IˆJ *cascade08ˆJŒJŒJJ *cascade08J¡J¡JÎJ *cascade08ÎJÏJÏJĞJ *cascade08ĞJÑJÑJŒK *cascade08ŒKKK¬K *cascade08¬K­K­K®K *cascade08®K¯K¯KôK *cascade08ôKøKøK¤L *cascade08¤L¨L¨LºL *cascade08ºL»L»LÙL *cascade08ÙLÚLÚLÛL *cascade08ÛLİLİLŞL *cascade08ŞLàLàLâL *cascade08âLäLäL†M *cascade08†MˆMˆMM *cascade08MŸMŸM¹M *cascade08¹MºMºMÃM *cascade08ÃMÄMÄMÅM *cascade08ÅMÆMÆMÌM *cascade08ÌMãMãMäM *cascade08äMìMìMïM *cascade08ïMğMğMòM *cascade08òMóMóMõM *cascade08õMNNN *cascade08NŸNŸN¡N *cascade08¡N¢N¢N¤N *cascade08¤N¶N¶N»N *cascade08»NÇNÇNÈN *cascade08ÈNÉNÉNßN *cascade08ßNåNåNçN *cascade08çNèNèNúN *cascade08úNüNüN‹O *cascade08‹OOO“O *cascade08“O•O•O¡O *cascade08¡O¤O¤O¥O *cascade08¥O¨O¨O©O *cascade08©O°O°O±O *cascade08±O¶O¶OÄO *cascade08ÄOÅOÅOÆO *cascade08ÆOÇOÇOÈO *cascade08ÈOÌOÌOÍO *cascade08ÍOÎOÎOÏO *cascade08ÏOĞOĞOŞP *cascade08ŞP„Q„Q¹Q *cascade08¹Q½Q*cascade08½QåQ *cascade08åQR*cascade08R•R *cascade08•R™R™R´R *cascade08´RÕR*cascade08ÕRÖR *cascade08ÖRèR*cascade08èR‡S *cascade08‡S‹S‹SÏS *cascade08ÏSÓSÓSÛS *cascade08ÛSÜSÜSüS *cascade08üSÿSÿSŒT *cascade08ŒTTT½T *cascade08½TÉT*cascade08ÉTÌT *cascade08ÌTÎTÎTîT *cascade08îTğTğTƒU *cascade08ƒU‡U‡UÕU *cascade08ÕUÙUÙU²V *cascade08²V¸V*cascade08¸VÄV *cascade08ÄVÉV*cascade08ÉVÊV *cascade08ÊVÒV*cascade08ÒVİV *cascade08İVáV*cascade08áV‡W *cascade08‡W‹W‹W•W *cascade08•W™W™WÑW *cascade08ÑWÕWÕWİW *cascade08İWáWáW½X *cascade08½XÁXÁXÌX *cascade08ÌXĞXĞXıX *cascade08ıXƒY*cascade08ƒY†Y *cascade08†YˆYˆY¨Y *cascade08¨YªYªY¿Y *cascade08¿YÃYÃY“Z *cascade08“Z—Z—Z[ *cascade08[‡[*cascade08‡[“[ *cascade08“[˜[*cascade08˜[™[ *cascade08™[¡[*cascade08¡[¬[ *cascade08¬[°[*cascade08°[Ö[ *cascade08Ö[Ú[Ú[ä[ *cascade08ä[è[è[ \ *cascade08 \¤\¤\¬\ *cascade08¬\°\°\ô] *cascade08ô]ø]ø]„^*cascade08„^†^ *cascade08†^Š^Š^Á^ *cascade08Á^Å^Å^Ì^ *cascade08Ì^ a a¼a *cascade08¼aÑa*cascade08Ñaêb *cascade08êbíb*cascade08íbËe *cascade08Ëeëeëeøf *cascade08øfŸgŸgÕg *cascade08ÕgÙg*cascade08Ùgh *cascade08h«h*cascade08«h±h *cascade08±h´h´hÌh *cascade08ÌhÍhÍhĞh *cascade08Ğhñh*cascade08ñhòh *cascade08òh“i*cascade08“iši *cascade08šiiiœj *cascade08œjjj¹j *cascade08¹j¼j¼jàj *cascade08àjäj*cascade08äjĞk *cascade08ĞkÖk*cascade08Ökâk *cascade08âkçk*cascade08çkèk *cascade08èkğk*cascade08ğkûk *cascade08ûkÿk*cascade08ÿk‘l *cascade08‘l•l•lÑl *cascade08Ñl×l*cascade08×lÀm *cascade08ÀmÆm*cascade08ÆmÒm *cascade08Òm×m*cascade08×mØm *cascade08Ømàm*cascade08àmëm *cascade08ëmïm*cascade08ïm™n *cascade08™nnn¥n *cascade08¥n¦n¦n¾n *cascade08¾nÁnÁnén *cascade08énínín©o *cascade08©o»o*cascade08»o³p *cascade08³p¹p*cascade08¹pÅp *cascade08ÅpÊp*cascade08ÊpËp *cascade08ËpÓp*cascade08ÓpŞp *cascade08Şpâp*cascade08âpƒq *cascade08ƒq‡q‡qq *cascade08qqq¨q *cascade08¨q«q«qÓq *cascade08Óq×q×qŠr *cascade08Šr“r*cascade08“rœs *cascade08œsÈs*cascade08ÈsÌs *cascade08Ìsìs *cascade08ìsğsğsús *cascade08úsûsûs“t *cascade08“t–t–t¸t *cascade08¸tÃt *cascade08ÃtÙt*cascade08ÙtÚt *cascade08Útæt*cascade08ætçt *cascade08çtšu *cascade08šuuuÅu *cascade08ÅuÆu *cascade08ÆuÓu*cascade08ÓuÔu *cascade08Ôu‡v *cascade08‡v‹v‹vŞv *cascade08Şvév *cascade08év”w *cascade08”w˜w˜w÷w *cascade08÷wûwûwŸx *cascade08Ÿx£x£x«x *cascade08«x¯x¯xßx *cascade08ßxãxãx°y *cascade08°y´y´yÆy *cascade08ÆyÊyÊyíy *cascade08íyîy *cascade08îyüy *cascade08üy€z€z¤z *cascade08¤z¥z *cascade08¥zªz*cascade08ªz«z *cascade08«z®z*cascade08®z¯z *cascade08¯zèz *cascade08èzìzìzŞ{ *cascade08Ş{à{ *cascade08à{ì{ *cascade08ì{í{ *cascade08í{‚| *cascade08‚|„|„|£| *cascade08£|¤| *cascade08¤|§|*cascade08§|ª| *cascade08ª|¬|¬|Â| *cascade08Â|Œ} *cascade08Œ}}}—} *cascade08—}©}*cascade08©}µ} *cascade08µ}¶}¶}Ò} *cascade08Ò}Õ}Õ}Ä~ *cascade08Ä~È~È~Ğ~ *cascade08Ğ~Ô~Ô~¶ *cascade08¶º*cascade08º» *cascade08»¼*cascade08¼¾ *cascade08¾Á*cascade08Áİ *cascade08İâ*cascade08âü *cascade08üıı™€ *cascade08
™€œ€œ€¨€*cascade08¨€ª€ *cascade08
ª€®€®€å€ *cascade08
å€é€é€ğ€ *cascade08
ğ€ˆˆ¤ *cascade08¤Â*cascade08Â¿ƒ *cascade08¿ƒÂƒ*cascade08Âƒêƒ *cascade08êƒ§„*cascade08§„Û„ *cascade08Û„ß…*cascade08ß…ç… *cascade08ç…è…*cascade08è…÷… *cascade08÷…ø…*cascade08ø…¨† *cascade08¨††‡*cascade08†‡ˆ‡ *cascade08ˆ‡Š‡ *cascade08Š‡‡*cascade08‡˜‡ *cascade08˜‡™‡ *cascade08™‡¡‡*cascade08¡‡¢‡ *cascade08¢‡£‡ *cascade08£‡§‡*cascade08§‡º‡ *cascade08º‡»‡ *cascade08»‡¼‡*cascade08¼‡½‡ *cascade08½‡Í‡*cascade08Í‡Ñ‡ *cascade08Ñ‡Ò‡*cascade08Ò‡Ó‡ *cascade08Ó‡Û‡*cascade08Û‡Ü‡ *cascade08Ü‡é‡*cascade08é‡ğ‡ *cascade08ğ‡ñ‡*cascade08ñ‡“ˆ *cascade08“ˆÃˆ*cascade08Ãˆÿˆ *cascade08ÿˆ§‰*cascade08§‰‰Š *cascade08
‰ŠèŠèŠñŠ *cascade08
ñŠùŠùŠ²‹ *cascade08²‹À‹ *cascade08
À‹È‹È‹› *cascade08
›££¦ *cascade08
¦®®Ú *cascade08
Úİİı *cascade08
ı‚‚­ *cascade08
­µµ¾ *cascade08
¾ÀÀä *cascade08
äêêÿ *cascade08ÿ’ *cascade08
’ššã *cascade08ãæ*cascade08æô *cascade08ô÷*cascade08÷Š *cascade08Š‘*cascade08‘“ *cascade08“•*cascade08•° *cascade08°´*cascade08´Õ *cascade08ÕÖ*cascade08Ö× *cascade08×Ø*cascade08Øá *cascade08
áåå…‘ *cascade08
…‘‰‘‰‘Œ‘ *cascade08
Œ‘”‘”‘¸‘ *cascade08¸‘º‘*cascade08º‘Ü‘ *cascade08
Ü‘ä‘ä‘í‘ *cascade08
í‘º’º’Æ“ *cascade08Æ“Ê“ *cascade08
Ê“å“å“ò” *cascade08
ò”˜•˜•Ã– *cascade08
Ã–Ç–Ç–£— *cascade08
£—§—§—Ï— *cascade08
Ï—Ó—Ó—ä˜ *cascade08
ä˜è˜è˜ğ˜ *cascade08
ğ˜ô˜ô˜Á™ *cascade08
Á™Å™Å™ß™ *cascade08
ß™ã™ã™¶š *cascade08
¶šºšºšèš *cascade08
èšìšìššœ *cascade08
šœœœÄœ *cascade08
ÄœÈœÈœÌœ *cascade08
ÌœÍœÍœåœ *cascade08
åœèœèœğœ *cascade08
ğœôœôœ´ *cascade08
´¸¸Â *cascade08
ÂÆÆÎ *cascade08
ÎÏÏï *cascade08
ïòòÿ *cascade08
ÿƒŸƒŸ¿Ÿ *cascade08
¿ŸÁŸÁŸáŸ *cascade08
áŸãŸãŸ÷Ÿ *cascade08
÷ŸûŸûŸÊ  *cascade08
Ê Ì Ì ì  *cascade08
ì î î ü¡ *cascade08
ü¡€¢€¢Š¢ *cascade08
Š¢¢¢Æ¢ *cascade08
Æ¢Ê¢Ê¢Ò¢ *cascade08
Ò¢Ô¢Ô¢ì¢ *cascade08
ì¢î¢î¢–£ *cascade08
–£š£š£¤ *cascade08
¤¢¤¢¤£¤ *cascade08£¤¥¤*cascade08¥¤§¤ *cascade08§¤¬¤*cascade08¬¤°¤ *cascade08
°¤´¤´¤Ô¤ *cascade08
Ô¤Ø¤Ø¤Ù¤ *cascade08Ù¤Û¤*cascade08Û¤ì¤ *cascade08
ì¤ï¤ï¤¥ *cascade08
¥¥¥È¥ *cascade08
È¥Ì¥Ì¥Ğ¥ *cascade08
Ğ¥Ó¥Ó¥ë¥ *cascade08
ë¥ì¥ì¥ô¥ *cascade08
ô¥ø¥ø¥¸¦ *cascade08
¸¦»¦»¦×¦ *cascade08
×¦Ø¦Ø¦Ö§ *cascade08
Ö§Ú§Ú§â§ *cascade08
â§æ§æ§´¨ *cascade08
´¨¸¨¸¨Á¨ *cascade08
Á¨Å¨Å¨© *cascade08
©”©”©«© *cascade08
«©¯©¯©¡ª *cascade08
¡ª¥ª¥ªÀª *cascade08
ÀªÄªÄªüª *cascade08
üª€«€«Š« *cascade08
Š«««Ò¬ *cascade08
Ò¬Ö¬Ö¬›­ *cascade08
›­Ÿ­Ÿ­ª­ *cascade08
ª­«­«­Ã­ *cascade08
Ã­Æ­Æ­ñ­ *cascade08
ñ­õ­õ­ş­ *cascade08
ş­ÿ­ÿ­Ÿ® *cascade08
Ÿ®¢®¢®±® *cascade08
±®µ®µ®ç® *cascade08
ç®è®è®Œ¯ *cascade08
Œ¯¯¯¢¯ *cascade08
¢¯¦¯¦¯İ¯ *cascade08
İ¯ß¯ß¯ƒ° *cascade08
ƒ°…°…°™° *cascade08
™°°°×° *cascade08
×°Ù°Ù°ı° *cascade08
ı°ÿ°ÿ°µ± *cascade08
µ±¹±¹±½± *cascade08
½±Á±Á±€³ *cascade08
€³„³„³•³ *cascade08
•³—³—³³³ *cascade08
³³µ³µ³À³ *cascade08
À³Ä³Ä³ô³ *cascade08
ô³ø³ø³ÿ³ *cascade08
ÿ³ ¶ ¶¼ *cascade08¼¼*cascade08¼å¼ *cascade08
å¼˜½˜½Ê½ *cascade08
Ê½Î½Î½ú¾ *cascade08
ú¾ş¾ş¾Á *cascade08
Á…Á…ÁŠÁ *cascade08ŠÁ‹Á *cascade08
‹Á¯Á¯Á¿Â *cascade08
¿ÂÛÂÛÂéÃ *cascade08
éÃÄÄ¹Å *cascade08
¹Å½Å½ÅøÅ *cascade08
øÅûÅûÅ“Æ *cascade08
“Æ”Æ”Æ¼Æ *cascade08
¼ÆÀÆÀÆĞÇ *cascade08
ĞÇÔÇÔÇÜÇ *cascade08
ÜÇŞÇŞÇşÇ *cascade08
şÇ€È€ÈÈ *cascade08
È‘È‘ÈîÈ *cascade08
îÈòÈòÈ†É *cascade08
†É‡É‡É§É *cascade08
§ÉªÉªÉÙÉ *cascade08
ÙÉİÉİÉ‹Ë *cascade08
‹ËËË™Ë *cascade08
™ËËËÕË *cascade08
ÕËÙËÙËáË *cascade08
áËäËäËüË *cascade08
üËıËıË¥Ì *cascade08
¥Ì©Ì©Ì²Í *cascade08
²Í¶Í¶Í¾Í *cascade08
¾ÍÀÍÀÍàÍ *cascade08
àÍâÍâÍïÍ *cascade08
ïÍóÍóÍæÎ *cascade08
æÎêÎêÎüÎ *cascade08
üÎıÎıÎÏ *cascade08
Ï Ï ÏÍÏ *cascade08
ÍÏÑÏÑÏÿĞ *cascade08
ÿĞƒÑƒÑÑ *cascade08
Ñ‘Ñ‘ÑÉÑ *cascade08
ÉÑÍÑÍÑÕÑ *cascade08
ÕÑØÑØÑğÑ *cascade08
ğÑñÑñÑÓ *cascade08
Ó¡Ó¡Ó¯Ó *cascade08
¯Ó³Ó³ÓêÓ *cascade08
êÓîÓîÓõÓ *cascade08
õÓ”Ô”ÔŒÙ *cascade08
ŒÙ¿Ù¿ÙïÚ *cascade08ïÚğÚ *cascade08
ğÚ”Û”Û¢Ü *cascade08¢Ü¿Ü *cascade082?file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/admin/page.js