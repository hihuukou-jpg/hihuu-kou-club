ñÔ"use client";

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
        // ALWAYS fetch data so guests can see it
        fetchData();
    }, []);

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
¨ *cascade08¨á*cascade08áÈ *cascade08Èõ*cascade08õ¤*cascade08¤“ *cascade08“’*cascade08’½ *cascade08½«	*cascade08«	­	 *cascade08­	Ø*cascade08Ø÷ *cascade08÷‚ *cascade08‚††‡ *cascade08‡ŒŒ *cascade08‘‘“ *cascade08“””• *cascade08•˜˜š *cascade08š  ü *cascade08üÂ*cascade08ÂÊ *cascade08Ê‘*cascade08‘³ *cascade08³Æ *cascade08Æİ*cascade08İà *cascade08à² *cascade08²áá“ *cascade08“£ *cascade08£Û *cascade08ÛúúÕ *cascade08Õôô© *cascade08©â *cascade08âı *cascade08ıœ œ À! *cascade08À!ˆ" *cascade08ˆ"§"§"ø)*cascade08ø)È, *cascade08È,ê,*cascade08ê,‰- *cascade08‰-‹-*cascade08‹-¸- *cascade08¸-Á-*cascade08Á-Ò- *cascade08Ò-Û-*cascade08Û-ì- *cascade08ì-õ-*cascade08õ-†. *cascade08†..*cascade08.². *cascade08².Ş/*cascade08Ş/¤0 *cascade08¤0Ã0Ã0Ù0 *cascade08Ù0÷0*cascade08÷0ğ1 *cascade08ğ1ò1*cascade08ò1ó1 *cascade08ó1ô1*cascade08ô1õ1 *cascade08õ1÷1*cascade08÷1ú1 *cascade08ú1ü1*cascade08ü1ı1 *cascade08ı1ş1*cascade08ş1€2 *cascade08€22*cascade082‚2 *cascade08‚2…2*cascade08…2‹2 *cascade08‹2Œ2*cascade08Œ22 *cascade082‘2*cascade08‘2“2 *cascade08“2”2*cascade08”2–2 *cascade08–2—2*cascade08—2˜2 *cascade08˜2™2*cascade08™2›2 *cascade08›2œ2*cascade08œ22 *cascade082Ÿ2*cascade08Ÿ2 2 *cascade08 2£2*cascade08£2¥2 *cascade08¥2«2*cascade08«2¬2 *cascade08¬2­2*cascade08­2®2 *cascade08®2°2*cascade08°2±2 *cascade08±2²2*cascade08²2³2 *cascade08³2´2*cascade08´2µ2 *cascade08µ2·2*cascade08·2Á2 *cascade08Á2Ö2*cascade08Ö2Ş2 *cascade08Ş2à2*cascade08à2á2 *cascade08á2ï2*cascade08ï2ğ2 *cascade08ğ2õ2*cascade08õ2ÿ2 *cascade08ÿ2˜3*cascade08˜3 3 *cascade08 3£3*cascade08£3¤3 *cascade08¤3ª3*cascade08ª3¬3 *cascade08¬3³3*cascade08³3´3 *cascade08´3¶3*cascade08¶3·3 *cascade08·3»3*cascade08»3½3 *cascade08½3¾3*cascade08¾3Ê3 *cascade08Ê3Í3*cascade08Í3Ï3 *cascade08Ï3Ğ3*cascade08Ğ3Ñ3 *cascade08Ñ3Ò3*cascade08Ò3Õ3 *cascade08Õ3Ö3*cascade08Ö3Ù3 *cascade08Ù3Ú3*cascade08Ú3ß3 *cascade08ß3á3*cascade08á3ë3 *cascade08ë3‚4*cascade08‚4†4*cascade08†4‡4 *cascade08‡4‰4*cascade08‰4Š4 *cascade08Š44*cascade084˜4 *cascade08˜4¬4*cascade08¬4¶4 *cascade08¶4»4*cascade08»4¼4 *cascade08¼4Å4*cascade08Å4Æ4 *cascade08Æ4Ç4*cascade08Ç4È4 *cascade08È4Ë4*cascade08Ë4Ì4 *cascade08Ì4Ï4*cascade08Ï4Ğ4 *cascade08Ğ4Ó4*cascade08Ó4Ô4 *cascade08Ô4æ4*cascade08æ4ç4 *cascade08ç4í4*cascade08í4÷4 *cascade08÷4ù4*cascade08ù4ú4 *cascade08ú4…5*cascade08…5†5 *cascade08†5‡5*cascade08‡5ˆ5 *cascade08ˆ55*cascade085‘5 *cascade08‘5•5*cascade08•5–5 *cascade08–5—5*cascade08—5˜5 *cascade08˜5š5*cascade08š5¢5 *cascade08¢5£5*cascade08£5Õ5 *cascade08Õ5Ö5*cascade08Ö5Ù5 *cascade08Ù5Û5*cascade08Û5Ü5 *cascade08Ü5ñ5ñ5õ5*cascade08õ5ö5 *cascade08ö5€6*cascade08€66 *cascade086„6*cascade08„6…6 *cascade08…6‰6*cascade08‰6Œ6 *cascade08Œ6 6*cascade08 6¡6 *cascade08¡6©6*cascade08©6«6 *cascade08«6·6*cascade08·6¸6 *cascade08¸6¹6*cascade08¹6¿6 *cascade08¿6Á6*cascade08Á6Ä6 *cascade08Ä6É6*cascade08É6Ê6 *cascade08Ê6Ë6*cascade08Ë6Ì6 *cascade08Ì6Î6*cascade08Î6Ñ6 *cascade08Ñ6Ò6*cascade08Ò6Ó6 *cascade08Ó6Ú6*cascade08Ú6Û6 *cascade08Û6â6*cascade08â6Ú7 *cascade08Ú7Û7*cascade08Û7ø7 *cascade08ø7²8*cascade08²8³8 *cascade08³8¹8 *cascade08¹8Î8*cascade08Î8„9„9Å9 *cascade08Å9Û9*cascade08Û9õ9 *cascade08õ9»:»:Á: *cascade08Á:Æ:Æ:È: *cascade08È:Ğ: *cascade08Ğ:Õ: *cascade08Õ:Ú: *cascade08Ú:ä: *cascade08ä:ì:ì:«; *cascade08«;¬;*cascade08¬;­; *cascade08­;®;*cascade08®;¯; *cascade08¯;²;*cascade08²;µ; *cascade08µ;¸;*cascade08¸;¹; *cascade08¹;½;*cascade08½;¿; *cascade08¿;À;*cascade08À;×; *cascade08×;Ú;*cascade08Ú;İ; *cascade08İ;ß;*cascade08ß;à; *cascade08à;ã;*cascade08ã;ä; *cascade08ä;ç;*cascade08ç;‡< *cascade08‡<–<*cascade08–<Ì< *cascade08Ì<Î<Î<Ò< *cascade08Ò<Ó<Ó<Ô< *cascade08Ô<Õ<Õ<Ö< *cascade08Ö<×<×<ñ< *cascade08ñ<ø<ø<Š= *cascade08Š=‹=‹=Œ= *cascade08Œ===¥= *cascade08¥=¨=¨=¬= *cascade08¬=­=­=¯= *cascade08¯=°=°=Ã= *cascade08Ã=Å=Å=Æ= *cascade08Æ=É=É=Ê= *cascade08Ê=Í=Í=å= *cascade08å=è=è=ğ= *cascade08ğ=ñ=ñ=ˆ> *cascade08ˆ>‰>‰>Š> *cascade08Š>Œ>Œ>> *cascade08>”>”>—> *cascade08—>š>š>Ÿ> *cascade08Ÿ>¥> *cascade08¥>´>´>ç> *cascade08ç>í>í>û> *cascade08û>ı>ı>ÿ> *cascade08ÿ>??ƒ? *cascade08ƒ?…?…?‘? *cascade08‘?’?’?“? *cascade08“?•?•?—? *cascade08—?š?š?›? *cascade08›???Ÿ? *cascade08Ÿ?¡?¡?¢? *cascade08¢?¤?¤?¥? *cascade08¥?¦?¦?§? *cascade08§?©?©?ª? *cascade08ª?«?«?®? *cascade08®?¯?¯?±? *cascade08±?²?²?Ä? *cascade08Ä?Å?Å?Î? *cascade08Î?Ò?Ò?Ô? *cascade08Ô?×?×?é? *cascade08é?ò?ò?ó? *cascade08ó?ô?ô?õ? *cascade08õ?÷?÷?ù? *cascade08ù?û?û?ı? *cascade08ı?ş?ş?ÿ? *cascade08ÿ?€@€@@ *cascade08@‚@‚@…@ *cascade08…@‡@‡@ˆ@ *cascade08ˆ@‰@‰@Š@ *cascade08Š@Œ@Œ@@ *cascade08@@@@ *cascade08@@@³@ *cascade08³@º@º@Ë@ *cascade08Ë@Ô@ *cascade08Ô@Û@Û@Ü@ *cascade08Ü@İ@İ@ß@ *cascade08ß@“A *cascade08“A”A”A•A *cascade08•A–A–AšA *cascade08šAAA±A *cascade08±A²A²A¼A *cascade08¼AÀAÀAêA *cascade08êAîAîAºB *cascade08ºB¾B¾BÏB *cascade08ÏBÓBÓB€C *cascade08€CCC‚C *cascade08‚CƒCƒC¾C *cascade08¾CÂCÂCŞC *cascade08ŞCßCßCàC *cascade08àCáCáC¦D *cascade08¦DªDªDÖD *cascade08ÖDÚDÚDìD *cascade08ìDíDíD‹E *cascade08‹EŒEŒEE *cascade08EEEE *cascade08E’E’E”E *cascade08”E–E–E¸E *cascade08¸EºEºEĞE *cascade08ĞEÑEÑEëE *cascade08ëEìEìEõE *cascade08õEöEöE÷E *cascade08÷EøEøEşE *cascade08şE•F•F–F *cascade08–FFF¡F *cascade08¡F¢F¢F¤F *cascade08¤F¥F¥F§F *cascade08§F¿F¿FĞF *cascade08ĞFÑFÑFÓF *cascade08ÓFÔFÔFÖF *cascade08ÖFèFèFíF *cascade08íFùFùFúF *cascade08úFûFûF‘G *cascade08‘G—G—G™G *cascade08™GšGšG¬G *cascade08¬G®G®G½G *cascade08½GÂGÂGÅG *cascade08ÅGÇGÇGÓG *cascade08ÓGÖGÖG×G *cascade08×GÚGÚGÛG *cascade08ÛGâGâGãG *cascade08ãGèGèGöG *cascade08öG÷G÷GøG *cascade08øGùGùGúG *cascade08úGşGşGÿG *cascade08ÿG€H€HH *cascade08H‚H‚HI *cascade08I¶I¶IëI *cascade08ëIïI*cascade08ïI—J *cascade08—JÁJ*cascade08ÁJÇJ *cascade08ÇJËJËJæJ *cascade08æJ‡K*cascade08‡KˆK *cascade08ˆKšK*cascade08šK¹K *cascade08¹K½K½KL *cascade08L…L…LL *cascade08LLL®L *cascade08®L±L±L¾L *cascade08¾LÂLÂLïL *cascade08ïLûL*cascade08ûLşL *cascade08şL€M€M M *cascade08 M¢M¢MµM *cascade08µM¹M¹M‡N *cascade08‡N‹N‹NäN *cascade08äNêN*cascade08êNöN *cascade08öNûN*cascade08ûNüN *cascade08üN„O*cascade08„OO *cascade08O“O*cascade08“O¹O *cascade08¹O½O½OÇO *cascade08ÇOËOËOƒP *cascade08ƒP‡P‡PP *cascade08P“P“PïP *cascade08ïPóPóPşP *cascade08şP‚Q‚Q¯Q *cascade08¯QµQ*cascade08µQ¸Q *cascade08¸QºQºQÚQ *cascade08ÚQÜQÜQñQ *cascade08ñQõQõQÅR *cascade08ÅRÉRÉR³S *cascade08³S¹S*cascade08¹SÅS *cascade08ÅSÊS*cascade08ÊSËS *cascade08ËSÓS*cascade08ÓSŞS *cascade08ŞSâS*cascade08âSˆT *cascade08ˆTŒTŒT–T *cascade08–TšTšTÒT *cascade08ÒTÖTÖTŞT *cascade08ŞTâTâT¦V *cascade08¦VªVªV¶V*cascade08¶V¸V *cascade08¸V¼V¼VóV *cascade08óV÷V÷VşV *cascade08şVÒYÒYîY *cascade08îYƒZ*cascade08ƒZœ[ *cascade08œ[Ÿ[*cascade08Ÿ[ı] *cascade08ı]^^ª_ *cascade08ª_Ñ_Ñ_‡` *cascade08‡`‹`*cascade08‹`³` *cascade08³`İ`*cascade08İ`ã` *cascade08ã`æ`æ`ş` *cascade08ş`ÿ`ÿ`‚a *cascade08‚a£a*cascade08£a¤a *cascade08¤aÅa*cascade08ÅaÌa *cascade08ÌaĞaĞaÎb *cascade08ÎbÏbÏbëb *cascade08ëbîbîb’c *cascade08’c–c*cascade08–c‚d *cascade08‚dˆd*cascade08ˆd”d *cascade08”d™d*cascade08™dšd *cascade08šd¢d*cascade08¢d­d *cascade08­d±d*cascade08±dÃd *cascade08ÃdÇdÇdƒe *cascade08ƒe‰e*cascade08‰eòe *cascade08òeøe*cascade08øe„f *cascade08„f‰f*cascade08‰fŠf *cascade08Šf’f*cascade08’ff *cascade08f¡f*cascade08¡fËf *cascade08ËfÏfÏf×f *cascade08×fØfØfğf *cascade08ğfófóf›g *cascade08›gŸgŸgÛg *cascade08Ûgíg*cascade08ígåh *cascade08åhëh*cascade08ëh÷h *cascade08÷hüh*cascade08ühıh *cascade08ıh…i*cascade08…ii *cascade08i”i*cascade08”iµi *cascade08µi¹i¹iÁi *cascade08ÁiÂiÂiÚi *cascade08Úiİiİi…j *cascade08…j‰j‰j¼j *cascade08¼jÅj*cascade08ÅjÎk *cascade08Îkúk*cascade08úkşk *cascade08şkl *cascade08l¢l¢l¬l *cascade08¬l­l­lÅl *cascade08ÅlÈlÈlêl *cascade08êlõl *cascade08õl‹m*cascade08‹mŒm *cascade08Œm˜m*cascade08˜m™m *cascade08™mÌm *cascade08ÌmĞmĞm÷m *cascade08÷møm *cascade08øm…n*cascade08…n†n *cascade08†n¹n *cascade08¹n½n½no *cascade08o›o *cascade08›oÆo *cascade08ÆoÊoÊo©p *cascade08©p­p­pÑp *cascade08ÑpÕpÕpİp *cascade08İpápáp‘q *cascade08‘q•q•qâq *cascade08âqæqæqøq *cascade08øqüqüqŸr *cascade08Ÿr r *cascade08 r®r *cascade08®r²r²rÖr *cascade08Ör×r *cascade08×rÜr*cascade08Ürİr *cascade08İràr*cascade08àrár *cascade08áršs *cascade08šssst *cascade08t’t *cascade08’tt *cascade08tŸt *cascade08Ÿt´t *cascade08´t¶t¶tÕt *cascade08ÕtÖt *cascade08ÖtÙt*cascade08ÙtÜt *cascade08ÜtŞtŞtôt *cascade08ôt¾u *cascade08¾uÂuÂuÉu *cascade08ÉuÛu*cascade08Ûuçu *cascade08çuèuèu„v *cascade08„v‡v‡vöv *cascade08övúvúv‚w *cascade08‚w†w†wèw *cascade08èwìw*cascade08ìwíw *cascade08íwîw*cascade08îwğw *cascade08ğwów*cascade08ówx *cascade08x”x*cascade08”x®x *cascade08®x¯x¯xËx *cascade08ËxÎxÎxÚx*cascade08ÚxÜx *cascade08Üxàxàx—y *cascade08—y›y›y¢y *cascade08¢yºyºyÖy *cascade08Öyôy*cascade08ôyñ{ *cascade08ñ{ô{*cascade08ô{œ| *cascade08œ|Ù|*cascade08Ù|} *cascade08}‘~*cascade08‘~™~ *cascade08™~š~*cascade08š~©~ *cascade08©~ª~*cascade08ª~Ú~ *cascade08Ú~¸*cascade08¸º *cascade08º¼ *cascade08¼À*cascade08ÀÊ *cascade08ÊË *cascade08ËÓ*cascade08ÓÔ *cascade08ÔÕ *cascade08ÕÙ*cascade08Ùì *cascade08ìí *cascade08íî*cascade08îï *cascade08ïÿ*cascade08ÿƒ€ *cascade08ƒ€„€*cascade08„€…€ *cascade08…€€*cascade08€€ *cascade08€›€*cascade08›€¢€ *cascade08¢€£€*cascade08£€Å€ *cascade08Å€õ€*cascade08õ€± *cascade08±Ù*cascade08Ù»‚ *cascade08
»‚šƒšƒ£ƒ *cascade08
£ƒ«ƒ«ƒäƒ *cascade08äƒòƒ *cascade08
òƒúƒúƒÍ… *cascade08
Í…Õ…Õ…Ø… *cascade08
Ø…à…à…Œ† *cascade08
Œ†††¯† *cascade08
¯†´†´†ß† *cascade08
ß†ç†ç†ğ† *cascade08
ğ†ò†ò†–‡ *cascade08
–‡œ‡œ‡±‡ *cascade08±‡Ä‡ *cascade08
Ä‡Ì‡Ì‡•ˆ *cascade08•ˆ˜ˆ*cascade08˜ˆ¦ˆ *cascade08¦ˆ©ˆ*cascade08©ˆ¼ˆ *cascade08¼ˆÃˆ*cascade08ÃˆÅˆ *cascade08ÅˆÇˆ*cascade08Çˆâˆ *cascade08âˆæˆ*cascade08æˆ‡‰ *cascade08‡‰ˆ‰*cascade08ˆ‰‰‰ *cascade08‰‰Š‰*cascade08Š‰“‰ *cascade08
“‰—‰—‰·‰ *cascade08
·‰»‰»‰¾‰ *cascade08
¾‰Æ‰Æ‰ê‰ *cascade08ê‰ì‰*cascade08ì‰Š *cascade08
Š–Š–ŠŸŠ *cascade08
ŸŠìŠìŠø‹ *cascade08ø‹ü‹ *cascade08
ü‹—Œ—Œ¤ *cascade08
¤ÊÊõ *cascade08
õùùÕ *cascade08
ÕÙÙ *cascade08
……–‘ *cascade08
–‘š‘š‘¢‘ *cascade08
¢‘¦‘¦‘ó‘ *cascade08
ó‘÷‘÷‘‘’ *cascade08
‘’•’•’è’ *cascade08
è’ì’ì’š“ *cascade08
š“““Ì” *cascade08
Ì”Ğ”Ğ”ö” *cascade08
ö”ú”ú”ş” *cascade08
ş”ÿ”ÿ”—• *cascade08
—•š•š•¢• *cascade08
¢•¦•¦•æ• *cascade08
æ•ê•ê•ô– *cascade08
ô–ø–ø–€— *cascade08
€———¡— *cascade08
¡—¤—¤—±— *cascade08
±—µ—µ—ñ— *cascade08
ñ—ó—ó—“˜ *cascade08
“˜•˜•˜©˜ *cascade08
©˜­˜­˜ü˜ *cascade08
ü˜ş˜ş˜™ *cascade08
™ ™ ™®š *cascade08
®š²š²š¼š *cascade08
¼šÀšÀšøš *cascade08
øšüšüš„› *cascade08
„›†›†›› *cascade08
› › ›È› *cascade08
È›Ì›Ì›Ğœ *cascade08
ĞœÔœÔœÕœ *cascade08Õœ×œ*cascade08×œÙœ *cascade08ÙœŞœ*cascade08Şœâœ *cascade08
âœæœæœ† *cascade08
†ŠŠ‹ *cascade08‹*cascade08 *cascade08
¡¡Á *cascade08
ÁÂÂú *cascade08
úşş‚ *cascade08
‚…… *cascade08
¦ *cascade08
¦ªªê *cascade08
êíí‰Ÿ *cascade08
‰ŸŠŸŠŸˆ  *cascade08
ˆ Œ Œ ”  *cascade08
” ˜ ˜ æ  *cascade08
æ ê ê ó  *cascade08
ó ÷ ÷ Â¡ *cascade08
Â¡Æ¡Æ¡İ¡ *cascade08
İ¡á¡á¡Ó¢ *cascade08
Ó¢×¢×¢ò¢ *cascade08
ò¢ö¢ö¢®£ *cascade08
®£²£²£¼£ *cascade08
¼£À£À£„¥ *cascade08
„¥ˆ¥ˆ¥Í¥ *cascade08
Í¥Ñ¥Ñ¥Ü¥ *cascade08
Ü¥İ¥İ¥õ¥ *cascade08
õ¥ø¥ø¥£¦ *cascade08
£¦§¦§¦°¦ *cascade08
°¦±¦±¦Ñ¦ *cascade08
Ñ¦Ô¦Ô¦ã¦ *cascade08
ã¦ç¦ç¦™§ *cascade08
™§š§š§¾§ *cascade08
¾§Á§Á§Ô§ *cascade08
Ô§Ø§Ø§¨ *cascade08
¨‘¨‘¨µ¨ *cascade08
µ¨·¨·¨Ë¨ *cascade08
Ë¨Ï¨Ï¨‰© *cascade08
‰©‹©‹©¯© *cascade08
¯©±©±©ç© *cascade08
ç©ë©ë©ï© *cascade08
ï©ó©ó©²« *cascade08
²«¶«¶«Ç« *cascade08
Ç«É«É«å« *cascade08
å«ç«ç«ò« *cascade08
ò«ö«ö«¦¬ *cascade08
¦¬ª¬ª¬±¬ *cascade08
±¬Ò®Ò®Ï´ *cascade08Ï´Ï´*cascade08Ï´—µ *cascade08
—µÊµÊµüµ *cascade08
üµ€¶€¶¬· *cascade08
¬·°·°·³¹ *cascade08
³¹·¹·¹¼¹ *cascade08¼¹½¹ *cascade08
½¹á¹á¹ñº *cascade08
ñº»»›¼ *cascade08
›¼Á¼Á¼ë½ *cascade08
ë½ï½ï½ª¾ *cascade08
ª¾­¾­¾Å¾ *cascade08
Å¾Æ¾Æ¾î¾ *cascade08
î¾ò¾ò¾‚À *cascade08
‚À†À†ÀÀ *cascade08
ÀÀÀ°À *cascade08
°À²À²À¿À *cascade08
¿ÀÃÀÃÀ Á *cascade08
 Á¤Á¤Á¸Á *cascade08
¸Á¹Á¹ÁÙÁ *cascade08
ÙÁÜÁÜÁ‹Â *cascade08
‹ÂÂÂ½Ã *cascade08
½ÃÁÃÁÃËÃ *cascade08
ËÃÏÃÏÃ‡Ä *cascade08
‡Ä‹Ä‹Ä“Ä *cascade08
“Ä–Ä–Ä®Ä *cascade08
®Ä¯Ä¯Ä×Ä *cascade08
×ÄÛÄÛÄäÅ *cascade08
äÅèÅèÅğÅ *cascade08
ğÅòÅòÅ’Æ *cascade08
’Æ”Æ”Æ¡Æ *cascade08
¡Æ¥Æ¥Æ˜Ç *cascade08
˜ÇœÇœÇ®Ç *cascade08
®Ç¯Ç¯ÇÏÇ *cascade08
ÏÇÒÇÒÇÿÇ *cascade08
ÿÇƒÈƒÈ±É *cascade08
±ÉµÉµÉ¿É *cascade08
¿ÉÃÉÃÉûÉ *cascade08
ûÉÿÉÿÉ‡Ê *cascade08
‡ÊŠÊŠÊ¢Ê *cascade08
¢Ê£Ê£ÊÏË *cascade08
ÏËÓËÓËáË *cascade08
áËåËåËœÌ *cascade08
œÌ Ì Ì§Ì *cascade08
§ÌÆÌÆÌ¾Ñ *cascade08
¾ÑñÑñÑ¡Ó *cascade08¡Ó¢Ó *cascade08
¢ÓÆÓÆÓÔÔ *cascade08ÔÔñÔ *cascade082?file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/admin/page.js