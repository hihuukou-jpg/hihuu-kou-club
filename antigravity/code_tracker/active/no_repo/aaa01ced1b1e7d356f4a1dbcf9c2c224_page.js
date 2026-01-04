Î"use client";

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
        if (session) {
            fetchData();
        }
    }, [session]);

    const fetchData = async () => {
        const n = await fetch("/api/news").then(res => res.json());
        const c = await fetch("/api/characters").then(res => res.json());
        const d = await fetch("/api/diary").then(res => res.json());
        const v = await fetch("/api/videos").then(res => res.json());
        setNews(n);
        setChars(c);
        setDiary(d);
        setVideos(v);
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
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
        if (!confirm("æœ¬å½“ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ")) return;
        await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleSaveDiary = async (e) => {
        e.preventDefault();
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
        if (!confirm("æœ¬å½“ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ")) return;
        await fetch(`/api/diary?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleSaveChar = async (e) => {
        e.preventDefault();

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
        setCharImage(char.image || "");
        setUploadFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = "";
    };

    return (
        <div style={{ padding: "2rem", color: "var(--text-main)", background: "var(--hakurei-white)", minHeight: "100vh", fontFamily: "var(--font-serif)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", color: "var(--hakurei-red)" }}>ç®¡ç†ãƒ€ãƒƒã‚·ãƒ¥ãƒœãƒ¼ãƒ‰</h1>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <span>ãƒ­ã‚°ã‚¤ãƒ³ä¸­: {session?.user?.name || "Admin"}</span>
                    <button onClick={() => signOut()} style={{ padding: "0.5rem 1rem", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ</button>
                </div>
            </div>

            <div style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc" }}>
                <button
                    onClick={() => setActiveTab("news")}
                    style={{
                        padding: "1rem",
                        background: "transparent",
                        border: "none",
                        color: activeTab === "news" ? "var(--hakurei-red)" : "#888",
                        borderBottom: activeTab === "news" ? "2px solid var(--hakurei-red)" : "none",
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}
                >
                    ãŠçŸ¥ã‚‰ã›ç®¡ç†
                </button>
                <button
                    onClick={() => setActiveTab("chars")}
                    style={{
                        padding: "1rem",
                        background: "transparent",
                        border: "none",
                        color: activeTab === "chars" ? "var(--hakurei-red)" : "#888",
                        borderBottom: activeTab === "chars" ? "2px solid var(--hakurei-red)" : "none",
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}
                >
                    ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ç®¡ç†
                </button>
                <button
                    onClick={() => setActiveTab("diary")}
                    style={{
                        padding: "1rem",
                        background: "transparent",
                        border: "none",
                        color: activeTab === "diary" ? "var(--hakurei-red)" : "#888",
                        borderBottom: activeTab === "diary" ? "2px solid var(--hakurei-red)" : "none",
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}
                >
                    æ´»å‹•æ—¥èªŒç®¡ç†
                </button>
                <button
                    onClick={() => setActiveTab("videos")}
                    style={{
                        padding: "1rem",
                        background: "transparent",
                        border: "none",
                        color: activeTab === "videos" ? "var(--hakurei-red)" : "#888",
                        borderBottom: activeTab === "videos" ? "2px solid var(--hakurei-red)" : "none",
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}
                >
                    å‹•ç”»ç®¡ç†
                </button>
            </div>

            {activeTab === "news" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

            {activeTab === "chars" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                            <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.5rem" }}>
                                â€»ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰ã™ã‚‹ã¨ã€ç¾åœ¨ã®è¨­å®šã¯ä¸Šæ›¸ãã•ã‚Œã¾ã™ã€‚
                            </div>
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                            <label>ãƒ†ãƒ¼ãƒã‚«ãƒ©ãƒ¼: </label>
                            <input type="color" value={charColor} onChange={e => setCharColor(e.target.value)} />
                        </div>
                        <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                            ä¿å­˜ã™ã‚‹
                        </button>
                    </form>

                    <h3>ç™»éŒ²æ¸ˆã¿ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                        {chars.map(c => (
                            <div key={c.id} style={{ border: "1px solid #eee", padding: "1rem", position: "relative", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "30px", height: "30px", background: c.color, borderRadius: "50%", overflow: "hidden", border: "1px solid #ddd" }}>
                                        {c.image && <img src={c.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                    </div>
                                    <strong>{c.name}</strong>
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#888" }}>{c.role}</div>
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
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === "diary" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

                    <h3>éå»ã®æ—¥èªŒ</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {diary.map(d => (
                            <div key={d.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                <div>
                                    <div style={{ color: "var(--hakurei-red)", fontSize: "0.9rem", fontWeight: "bold" }}>{d.date}</div>
                                    <h4 style={{ margin: "0.5rem 0" }}>{d.title}</h4>
                                    <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.5rem" }}>é€²æ—: {d.progress}%</div>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => handleEditDiary(d)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer" }}>ç·¨é›†</button>
                                    <button onClick={() => handleDeleteDiary(d.id)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "#fdd", border: "none", color: "red" }}>å‰Šé™¤</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === "videos" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

                    <h3>ç™»éŒ²æ¸ˆã¿å‹•ç”»</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
                        {videos.map(v => (
                            <div key={v.id} style={{ border: "1px solid #eee", padding: "1rem", background: "#fff" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{v.title}</div>
                                <div style={{ fontSize: "0.8rem", color: "#888", wordBreak: "break-all", marginBottom: "1rem" }}>{v.url}</div>
                                <button onClick={() => handleDeleteVideo(v.id)} style={{ width: "100%", padding: "0.5rem", background: "#fee", border: "none", color: "red", cursor: "pointer" }}>å‰Šé™¤</button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

        </div>
    );
}
¨ *cascade08¨á*cascade08áÈ *cascade08Èõ*cascade08õ¤*cascade08¤“ *cascade08“’*cascade08’½ *cascade08½«	*cascade08«	­	 *cascade08­	Ø*cascade08Ø÷ *cascade08÷½*cascade08½Å *cascade08ÅŒ*cascade08Œ® *cascade08®Á *cascade08ÁØ*cascade08ØÛ *cascade08Ûß *cascade08ßï *cascade08ï·*cascade08·  *cascade08 Ø  *cascade08Ø ©(*cascade08©(ù* *cascade08ù*›+*cascade08›+º+ *cascade08º+¼+*cascade08¼+é+ *cascade08é+ò+*cascade08ò+ƒ, *cascade08ƒ,Œ,*cascade08Œ,, *cascade08,¦,*cascade08¦,·, *cascade08·,À,*cascade08À,ã, *cascade08ã,.*cascade08.ë. *cascade08ë.‰/*cascade08‰/‚0 *cascade08‚0„0*cascade08„0…0 *cascade08…0†0*cascade08†0‡0 *cascade08‡0‰0*cascade08‰0Œ0 *cascade08Œ00*cascade0800 *cascade0800*cascade080’0 *cascade08’0“0*cascade08“0”0 *cascade08”0—0*cascade08—00 *cascade0800*cascade080 0 *cascade08 0£0*cascade08£0¥0 *cascade08¥0¦0*cascade08¦0¨0 *cascade08¨0©0*cascade08©0ª0 *cascade08ª0«0*cascade08«0­0 *cascade08­0®0*cascade08®0¯0 *cascade08¯0±0*cascade08±0²0 *cascade08²0µ0*cascade08µ0·0 *cascade08·0½0*cascade08½0¾0 *cascade08¾0¿0*cascade08¿0À0 *cascade08À0Â0*cascade08Â0Ã0 *cascade08Ã0Ä0*cascade08Ä0Å0 *cascade08Å0Æ0*cascade08Æ0Ç0 *cascade08Ç0É0*cascade08É0Ó0 *cascade08Ó0è0*cascade08è0ğ0 *cascade08ğ0ò0*cascade08ò0ó0 *cascade08ó01*cascade081‚1 *cascade08‚1‡1*cascade08‡1‘1 *cascade08‘1ª1*cascade08ª1²1 *cascade08²1µ1*cascade08µ1¶1 *cascade08¶1¼1*cascade08¼1¾1 *cascade08¾1Å1*cascade08Å1Æ1 *cascade08Æ1È1*cascade08È1É1 *cascade08É1Í1*cascade08Í1Ï1 *cascade08Ï1Ğ1*cascade08Ğ1Ü1 *cascade08Ü1ß1*cascade08ß1á1 *cascade08á1â1*cascade08â1ã1 *cascade08ã1ä1*cascade08ä1ç1 *cascade08ç1è1*cascade08è1ë1 *cascade08ë1ì1*cascade08ì1ñ1 *cascade08ñ1ó1*cascade08ó1ı1 *cascade08ı1”2*cascade08”2•2 *cascade08•2—2*cascade08—2˜2 *cascade08˜2œ2*cascade08œ2¦2 *cascade08¦2º2*cascade08º2Ä2 *cascade08Ä2É2*cascade08É2Ê2 *cascade08Ê2Ó2*cascade08Ó2Ô2 *cascade08Ô2Õ2*cascade08Õ2Ö2 *cascade08Ö2Ù2*cascade08Ù2Ú2 *cascade08Ú2İ2*cascade08İ2Ş2 *cascade08Ş2á2*cascade08á2â2 *cascade08â2ô2*cascade08ô2õ2 *cascade08õ2û2*cascade08û2…3 *cascade08…3‡3*cascade08‡3ˆ3 *cascade08ˆ3“3*cascade08“3”3 *cascade08”3•3*cascade08•3–3 *cascade08–33*cascade083Ÿ3 *cascade08Ÿ3£3*cascade08£3¤3 *cascade08¤3¥3*cascade08¥3¦3 *cascade08¦3¨3*cascade08¨3°3 *cascade08°3±3*cascade08±3ã3 *cascade08ã3ä3*cascade08ä3ç3 *cascade08ç3é3*cascade08é3ê3 *cascade08ê3î3*cascade08î3ï3 *cascade08ï3ù3*cascade08ù3ú3 *cascade08ú3ı3*cascade08ı3ş3 *cascade08ş3‚4*cascade08‚4…4 *cascade08…4™4*cascade08™4š4 *cascade08š4¢4*cascade08¢4¤4 *cascade08¤4°4*cascade08°4±4 *cascade08±4²4*cascade08²4¸4 *cascade08¸4º4*cascade08º4½4 *cascade08½4Â4*cascade08Â4Ã4 *cascade08Ã4Ä4*cascade08Ä4Å4 *cascade08Å4Ç4*cascade08Ç4Ê4 *cascade08Ê4Ë4*cascade08Ë4Ì4 *cascade08Ì4Ó4*cascade08Ó4Ô4 *cascade08Ô4Û4*cascade08Û4Ó5 *cascade08Ó5Ô5*cascade08Ô5ñ5 *cascade08ñ5«6*cascade08«6¬6 *cascade08¬6²6 *cascade08²6Ç6*cascade08Ç6ˆ7 *cascade08ˆ77*cascade087¾7 *cascade08¾7Ï7*cascade08Ï7×7 *cascade08×7Ø7*cascade08Ø7İ7 *cascade08İ7Ş7*cascade08Ş7ã7 *cascade08ã7î7*cascade08î7·8 *cascade08·8¸8*cascade08¸8¹8 *cascade08¹8º8*cascade08º8»8 *cascade08»8¾8*cascade08¾8Á8 *cascade08Á8Ä8*cascade08Ä8Å8 *cascade08Å8É8*cascade08É8Ë8 *cascade08Ë8Ì8*cascade08Ì8ã8 *cascade08ã8æ8*cascade08æ8é8 *cascade08é8ë8*cascade08ë8ì8 *cascade08ì8ï8*cascade08ï8ğ8 *cascade08ğ8ó8*cascade08ó8“9 *cascade08“9¢9*cascade08¢9¥: *cascade08¥:¨:*cascade08¨:û> *cascade08û>?*cascade08?ùC *cascade08ùC‘D*cascade08‘D®D *cascade08®D¬I*cascade08¬I¸I *cascade08¸I³N*cascade08³NşO *cascade08şO‚P*cascade08‚PªP *cascade08ªPÔP*cascade08ÔPõP *cascade08õP–Q*cascade08–Q—Q *cascade08—Q©Q*cascade08©QîR *cascade08îRúR*cascade08úR×T *cascade08×TİT*cascade08İTéT *cascade08éTîT*cascade08îTïT *cascade08ïT÷T*cascade08÷T‚U *cascade08‚U†U*cascade08†UŠW *cascade08ŠWW*cascade08W‚Y *cascade08‚YˆY*cascade08ˆY”Y *cascade08”Y™Y*cascade08™YšY *cascade08šY¢Y*cascade08¢Y­Y *cascade08­Y±Y*cascade08±Yå[ *cascade08å[ñ[*cascade08ñ[Í\ *cascade08Í\â\*cascade08â\û] *cascade08û]ş]*cascade08ş]Ÿb *cascade08Ÿb£b*cascade08£bËb *cascade08Ëbõb*cascade08õb–c *cascade08–c·c*cascade08·c¸c *cascade08¸cÙc*cascade08Ùce *cascade08e¢e*cascade08¢ef *cascade08f”f*cascade08”f f *cascade08 f¥f*cascade08¥f¦f *cascade08¦f®f*cascade08®f¹f *cascade08¹f½f*cascade08½f‹g *cascade08‹g‘g*cascade08‘gúg *cascade08úg€h*cascade08€hŒh *cascade08Œh‘h*cascade08‘h’h *cascade08’hšh*cascade08šh¥h *cascade08¥h©h*cascade08©h×i *cascade08×iéi*cascade08éiáj *cascade08ájçj*cascade08çjój *cascade08ójøj*cascade08øjùj *cascade08ùjk*cascade08kŒk *cascade08Œkk*cascade08k¬l *cascade08¬lµl*cascade08µl¾m *cascade08¾mêm*cascade08êmîm *cascade08îmÒn*cascade08Ònİn *cascade08İnón*cascade08ónôn *cascade08ôn€o*cascade08€oo *cascade08oÛo*cascade08ÛoÜo *cascade08Üoéo*cascade08éoêo *cascade08êoòp*cascade08òpıp *cascade08ıpçs*cascade08çsès *cascade08èsšt*cascade08št›t *cascade08›t t*cascade08 t¡t *cascade08¡t¤t*cascade08¤t¥t *cascade08¥tËv*cascade08ËvÏv *cascade08ÏvÜv*cascade08Üvİv *cascade08İvëw*cascade08ëwìw *cascade08ìwïw*cascade08ïwx *cascade08x’x*cascade08’x÷x *cascade08÷x‰y*cascade08‰yŠ{ *cascade08Š{{*cascade08{{ *cascade08{{*cascade08{’{ *cascade08’{•{*cascade08•{±{ *cascade08±{¶{*cascade08¶{ì{ *cascade08ì{ø{*cascade08ø{Ô| *cascade08Ô|ò|*cascade08ò|ï~ *cascade08ï~ò~*cascade08ò~š *cascade08š×*cascade08×‹€ *cascade08‹€*cascade08— *cascade08—˜*cascade08˜§ *cascade08§¨*cascade08¨Ø *cascade08Ø¶‚*cascade08¶‚¸‚ *cascade08¸‚Ä‚*cascade08Ä‚Å‚ *cascade08Å‚Í‚*cascade08Í‚Î‚ *cascade08Î‚â‚*cascade08â‚ã‚ *cascade08ã‚ä‚*cascade08ä‚å‚ *cascade08å‚õ‚*cascade08õ‚ù‚ *cascade08ù‚ú‚*cascade08ú‚û‚ *cascade08û‚ƒƒ*cascade08ƒƒ„ƒ *cascade08„ƒ‘ƒ*cascade08‘ƒ˜ƒ *cascade08˜ƒ™ƒ*cascade08™ƒ»ƒ *cascade08»ƒëƒ*cascade08ëƒ§„ *cascade08§„Ï„*cascade08Ï„ó… *cascade08ó…‰*cascade08‰ì‰ *cascade08ì‰ï‰*cascade08ï‰ı‰ *cascade08ı‰€Š*cascade08€Š“Š *cascade08“ŠšŠ*cascade08šŠœŠ *cascade08œŠŠ*cascade08Š¹Š *cascade08¹Š½Š*cascade08½ŠŞŠ *cascade08ŞŠßŠ*cascade08ßŠàŠ *cascade08àŠáŠ*cascade08áŠ±‹ *cascade08±‹³‹*cascade08³‹êŒ *cascade08êŒœ *cascade08œ œ*cascade08 œ¢œ *cascade08¢œ§œ*cascade08§œËœ *cascade08
ËœÏœÏœĞœ *cascade08ĞœÒœ*cascade08Òœó° *cascade08ó°ó°*cascade08ó°¡µ *cascade08¡µâÌ*cascade08âÌñÍ *cascade08ñÍÎ *cascade082?file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/admin/page.js