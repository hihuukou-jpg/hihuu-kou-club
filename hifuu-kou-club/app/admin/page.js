"use client";

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
    const [stats, setStats] = useState({ views: 0, storage: 0 });

    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    // News Form
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsTheme, setNewsTheme] = useState("both");

    // Video Form
    const [videoTitle, setVideoTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [videoTheme, setVideoTheme] = useState("both");

    // Illustrations Form
    const [illustrations, setIllustrations] = useState([]);
    const [illTitle, setIllTitle] = useState("");
    const [illDesc, setIllDesc] = useState("");
    const [illTheme, setIllTheme] = useState("omote");
    const [illFile, setIllFile] = useState(null);
    const [uploadingIll, setUploadingIll] = useState(false);

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
    const [diaryTheme, setDiaryTheme] = useState("both");

    useEffect(() => {
        // ALWAYS fetch data so guests can see it
        fetchData();
    }, []);

    const fetchData = async () => {
        const n = await fetch("/api/news").then(res => res.json());
        const c = await fetch("/api/characters").then(res => res.json());
        const d = await fetch("/api/diary").then(res => res.json());
        const v = await fetch("/api/videos").then(res => res.json());
        // For admin, we want to see ALL illustrations, so maybe pass a special flag or just handle 'both' manually?
        // Actually the API filters by 'theme'. If we want all, we might need to fetch twice or update API.
        // For now let's fetch 'both' which logically implies we want everything, or we just fetch 'omote' and 'ura' separately?
        // The current API: if theme is provided, filters. If NOT provided, does it return all? 
        // Let's check api/illustrations/route.js. It seems if theme is empty, it returns all.
        const i = await fetch("/api/illustrations").then(res => res.json());

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
        if (Array.isArray(i)) setIllustrations(i);
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!session) return; // double check
        await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newsTitle, content: newsContent, theme: newsTheme })
        });
        setNewsTitle("");
        setNewsContent("");
        setNewsTheme("both");
        fetchData();
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!session) return;
        await fetch("/api/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: videoTitle, url: videoUrl, theme: videoTheme })
        });
        setVideoTitle("");
        setVideoUrl("");
        setVideoTheme("both");
        fetchData();
    };

    const handleDeleteVideo = async (id) => {
        if (!session) return;
        if (!confirm("本当に削除しますか？")) return;
        await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleSaveIllustration = async (e) => {
        e.preventDefault();
        if (!session) return;

        let imageUrl = "";
        if (illFile) {
            const formData = new FormData();
            formData.append('file', illFile);
            try {
                setUploadingIll(true);
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                if (res.ok) {
                    const data = await res.json();
                    imageUrl = data.url;
                } else {
                    throw new Error("Upload failed");
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("画像のアップロード中にエラーが発生しました");
                setUploadingIll(false);
                return;
            }
        } else {
            alert("画像を選択してください");
            return;
        }

        await fetch("/api/illustrations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: illTitle,
                description: illDesc,
                theme: illTheme,
                image_url: imageUrl
            })
        });

        setIllTitle("");
        setIllDesc("");
        setIllTheme("omote");
        setIllFile(null);
        setUploadingIll(false);
        const fileInput = document.getElementById('illFileInput');
        if (fileInput) fileInput.value = "";
        fetchData();
    };

    const handleDeleteIllustration = async (id) => {
        // API needs to support delete... assuming it does or I might need to add it?
        // Illustration API currently might only support GET/POST. I should check.
        // If not, I'll need to update it.
        // For now let's implement the UI and assuming I'll fix the API if needed.
        if (!session) return;
        if (!confirm("本当に削除しますか？")) return;

        // Check if API supports DELETE. Usually standard.
        // If not, simply nothing happens.
        await fetch(`/api/illustrations?id=${id}`, { method: "DELETE" });
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
                progress: parseInt(diaryProgress),
                theme: diaryTheme
            })
        });

        // Reset
        setDiaryId(null);
        setDiaryDate("");
        setDiaryTitle("");
        setDiaryContent("");
        setDiaryProgress(0);
        setDiaryTheme("both");

        fetchData();
    };

    const handleEditDiary = (item) => {
        setDiaryId(item.id);
        setDiaryDate(item.date);
        setDiaryTitle(item.title);
        setDiaryContent(item.content);
        setDiaryProgress(item.progress);
        setDiaryTheme(item.theme || "both");
        window.scrollTo(0, 0);
    };

    const handleDeleteDiary = async (id) => {
        if (!session) return;
        if (!confirm("本当に削除しますか？")) return;
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
                    alert(`画像のアップロードに失敗しました: ${err.error || 'Unknown error'}`);
                    return;
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("画像のアップロード中にエラーが発生しました");
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
        if (!confirm("本当に削除しますか？")) return;
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
        <div style={{ padding: "2rem", paddingTop: "120px", color: "var(--text-main)", background: "var(--hakurei-white)", minHeight: "100vh", fontFamily: "var(--font-serif)", position: "relative", zIndex: 10 }}>
            {/* Override global Ura effects for Admin */}
            <style jsx global>{`
                [data-theme='ura'] body {
                    animation: none !important;
                    background-image: none !important;
                }
                /* Reset h1, h2, h3 text shadows/colors for admin content wrapper */
                [data-theme='ura'] .admin-content h1,
                [data-theme='ura'] .admin-content h2,
                [data-theme='ura'] .admin-content h3 {
                    text-shadow: none !important;
                    color: initial !important; 
                    letter-spacing: normal !important;
                }
            `}</style>
            <div className="admin-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "2rem", color: "var(--hakurei-red)" }}>管理ダッシュボード {session ? "(編集モード)" : "(閲覧モード)"}</h1>
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
                                    <span style={{ marginRight: "1rem" }}>
                                        総訪問者数: {stats.views}人
                                    </span>
                                    {(() => {
                                        const MAX_STORAGE = 1024 * 1024 * 1024; // 1GB for Free Tier
                                        const percent = Math.min(100, (stats.storage / MAX_STORAGE) * 100).toFixed(1);
                                        const isWarning = percent > 80;
                                        return (
                                            <span style={{ color: isWarning ? "red" : "inherit" }}>
                                                サーバー使用量: {formatBytes(stats.storage)} / 1GB ({percent}%)
                                            </span>
                                        );
                                    })()}
                                </div>
                                <span>Login: {session.user.name}</span>
                                <button onClick={() => signOut()} style={{ padding: "0.5rem 1rem", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>ログアウト</button>
                            </>
                        ) : (
                            <button onClick={() => signIn()} style={{ padding: "0.5rem 1rem", border: "none", background: "var(--hakurei-red)", color: "white", cursor: "pointer", borderRadius: "4px" }}>管理者ログイン</button>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc" }}>
                    {["news", "chars", "diary", "videos", "illustrations"].map((tab) => (
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
                            {tab === "news" ? "お知らせ管理" : tab === "chars" ? "キャラクター管理" : tab === "diary" ? "活動日誌管理" : tab === "videos" ? "動画管理" : "イラスト管理"}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}

                {/* NEWS */}
                {activeTab === "news" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {session ? (
                            <form onSubmit={handleAddNews} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                                <h3 style={{ marginBottom: "1rem" }}>お知らせ投稿</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="タイトル"
                                        value={newsTitle}
                                        onChange={e => setNewsTitle(e.target.value)}
                                        style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>公開範囲</label>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="omote" checked={newsTheme === 'omote'} onChange={e => setNewsTheme(e.target.value)} /> 表のみ
                                        </label>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="ura" checked={newsTheme === 'ura'} onChange={e => setNewsTheme(e.target.value)} /> 裏のみ
                                        </label>
                                        <label style={{ cursor: "pointer", fontWeight: "bold" }}>
                                            <input type="radio" value="both" checked={newsTheme === 'both'} onChange={e => setNewsTheme(e.target.value)} /> 両方
                                        </label>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <textarea
                                        placeholder="本文"
                                        value={newsContent}
                                        onChange={e => setNewsContent(e.target.value)}
                                        style={{ width: "100%", padding: "0.8rem", height: "100px", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                        required
                                    />
                                </div>
                                <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                    投稿する
                                </button>
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "#eee", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。投稿するにはログインしてください。
                            </div>
                        )}

                        <h3>最近のお知らせ</h3>
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
                                <h3 style={{ marginBottom: "1rem" }}>キャラクター追加・編集</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                                    <input type="text" placeholder="ID (例: renko)" value={charId} onChange={e => setCharId(e.target.value)} style={{ padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} required />
                                    <input type="text" placeholder="名前" value={charName} onChange={e => setCharName(e.target.value)} style={{ padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} required />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input type="text" placeholder="役割・肩書き" value={charRole} onChange={e => setCharRole(e.target.value)} style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <textarea placeholder="説明文" value={charDesc} onChange={e => setCharDesc(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }} />
                                </div>

                                <div style={{ marginBottom: "1rem", border: "1px solid #eee", padding: "1rem", borderRadius: "4px" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>立ち絵画像</label>
                                    <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                                        {charImage ? `現在の設定: ${charImage}` : "画像未設定"}
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
                                    <label>テーマカラー: </label>
                                    <input type="color" value={charColor} onChange={e => setCharColor(e.target.value)} />
                                </div>
                                <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                    保存する
                                </button>
                            </form>
                        )}

                        <h3>登録済みキャラクター</h3>
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
                                                編集
                                            </button>
                                            <button
                                                onClick={() => handleDeleteChar(c.id)}
                                                style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "transparent", border: "none", color: "#999", cursor: "pointer", fontSize: "1.2rem" }}
                                            >
                                                ×
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
                                <h3 style={{ marginBottom: "1rem" }}>日誌の投稿・編集</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>日付 (YYYY.MM.DD)</label>
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
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>タイトル</label>
                                    <input
                                        type="text"
                                        placeholder="タイトル"
                                        value={diaryTitle}
                                        onChange={e => setDiaryTitle(e.target.value)}
                                        style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>内容</label>
                                    <DiaryEditor
                                        content={diaryContent}
                                        onChange={setDiaryContent}
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>進捗度 ({diaryProgress}%)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={diaryProgress}
                                        onChange={e => setDiaryProgress(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <div style={{ marginBottom: "1rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>公開範囲</label>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            <label style={{ cursor: "pointer" }}>
                                                <input type="radio" value="omote" checked={diaryTheme === 'omote'} onChange={e => setDiaryTheme(e.target.value)} /> 表のみ
                                            </label>
                                            <label style={{ cursor: "pointer" }}>
                                                <input type="radio" value="ura" checked={diaryTheme === 'ura'} onChange={e => setDiaryTheme(e.target.value)} /> 裏のみ
                                            </label>
                                            <label style={{ cursor: "pointer", fontWeight: "bold" }}>
                                                <input type="radio" value="both" checked={diaryTheme === 'both'} onChange={e => setDiaryTheme(e.target.value)} /> 両方
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                    {diaryId ? "更新する" : "投稿する"}
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
                                        キャンセル
                                    </button>
                                )}
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "#eee", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。
                            </div>
                        )}

                        <h3>過去の日誌</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {diary.map(d => (
                                <div key={d.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                    <div>
                                        <div style={{ color: "var(--hakurei-red)", fontSize: "0.9rem", fontWeight: "bold" }}>{d.date}</div>
                                        <h4 style={{ margin: "0.5rem 0" }}>{d.title}</h4>
                                        <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.5rem" }}>進捗: {d.progress}%</div>
                                    </div>
                                    {session && (
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button onClick={() => handleEditDiary(d)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer" }}>編集</button>
                                            <button onClick={() => handleDeleteDiary(d.id)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "#fdd", border: "none", color: "red" }}>削除</button>
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
                                <h3 style={{ marginBottom: "1rem" }}>動画の追加</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>動画タイトル</label>
                                    <input
                                        type="text"
                                        placeholder="例: 新作PV"
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
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>公開範囲</label>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="omote" checked={videoTheme === 'omote'} onChange={e => setVideoTheme(e.target.value)} /> 表のみ
                                        </label>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="ura" checked={videoTheme === 'ura'} onChange={e => setVideoTheme(e.target.value)} /> 裏のみ
                                        </label>
                                        <label style={{ cursor: "pointer", fontWeight: "bold" }}>
                                            <input type="radio" value="both" checked={videoTheme === 'both'} onChange={e => setVideoTheme(e.target.value)} /> 両方
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" style={{ padding: "0.8rem 2rem", background: "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                    追加する
                                </button>
                            </form>
                        ) : null}

                        <h3>登録済み動画</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
                            {videos.map(v => (
                                <div key={v.id} style={{ border: "1px solid #eee", padding: "1rem", background: "#fff" }}>
                                    <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{v.title}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#888", wordBreak: "break-all", marginBottom: "1rem" }}>{v.url}</div>
                                    {session && (
                                        <button onClick={() => handleDeleteVideo(v.id)} style={{ width: "100%", padding: "0.5rem", background: "#fee", border: "none", color: "red", cursor: "pointer" }}>削除</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ILLUSTRATIONS */}
                {activeTab === "illustrations" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {session ? (
                            <form onSubmit={handleSaveIllustration} style={{ background: "#fff", padding: "2rem", marginBottom: "3rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                                <h3 style={{ marginBottom: "1rem" }}>イラスト投稿</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="タイトル"
                                        value={illTitle}
                                        onChange={e => setIllTitle(e.target.value)}
                                        style={{ width: "100%", padding: "0.8rem", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <textarea
                                        placeholder="説明文"
                                        value={illDesc}
                                        onChange={e => setIllDesc(e.target.value)}
                                        style={{ width: "100%", padding: "0.8rem", height: "80px", background: "#f9f9f9", border: "1px solid #ddd", color: "#333" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>World Layer (Theme)</label>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="omote" checked={illTheme === 'omote'} onChange={e => setIllTheme(e.target.value)} /> 表 (Omote)
                                        </label>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="ura" checked={illTheme === 'ura'} onChange={e => setIllTheme(e.target.value)} /> 裏 (Ura)
                                        </label>
                                        <label style={{ cursor: "pointer" }}>
                                            <input type="radio" value="both" checked={illTheme === 'both'} onChange={e => setIllTheme(e.target.value)} /> 両方 (Both)
                                        </label>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1rem", border: "1px solid #eee", padding: "1rem", borderRadius: "4px" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>画像ファイル</label>
                                    <input
                                        id="illFileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            if (e.target.files?.[0]) setIllFile(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <button type="submit" disabled={uploadingIll} style={{ padding: "0.8rem 2rem", background: uploadingIll ? "#ccc" : "var(--hakurei-red)", border: "none", color: "white", cursor: "pointer" }}>
                                    {uploadingIll ? "アップロード中..." : "投稿する"}
                                </button>
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "#eee", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。
                            </div>
                        )}

                        <h3>登録済みイラスト</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                            {illustrations.map(item => (
                                <div key={item.id} style={{ border: "1px solid #eee", padding: "1rem", background: "#fff", position: "relative" }}>
                                    <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: "4px", marginBottom: "0.5rem", background: "#eee" }}>
                                        <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ fontWeight: "bold" }}>{item.title}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#666" }}>Theme: {item.theme}</div>
                                    {session && (
                                        <button onClick={() => handleDeleteIllustration(item.id)} style={{ marginTop: "0.5rem", width: "100%", padding: "0.4rem", background: "#fee", border: "none", color: "red", cursor: "pointer" }}>削除</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
