"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiaryEditor from "../../components/DiaryEditor";

// Styled Components / Reusable Styles via Objects
const styles = {
    container: {
        padding: "2rem",
        paddingTop: "120px",
        minHeight: "100vh",
        position: "relative",
        zIndex: 10,
        // Using CSS variables for dynamic theme support
        backgroundColor: "var(--hakurei-white)",
        color: "var(--text-main)",
        fontFamily: "var(--font-serif)",
    },
    card: {
        background: "rgba(255, 255, 255, 0.05)", // Glass-like effect mostly transparent to show theme but legible
        backdropFilter: "blur(10px)",
        padding: "2rem",
        marginBottom: "3rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid var(--text-dim)",
        borderRadius: "8px"
    },
    input: {
        width: "100%",
        padding: "0.8rem",
        background: "rgba(0,0,0,0.05)",
        border: "1px solid var(--text-dim)",
        color: "var(--text-main)",
        borderRadius: "4px",
    },
    buttonPrimary: {
        padding: "0.8rem 2rem",
        background: "var(--hakurei-red)",
        border: "none",
        color: "white",
        cursor: "pointer",
        borderRadius: "4px",
        fontWeight: "bold"
    },
    buttonSecondary: {
        padding: "0.8rem 2rem",
        background: "transparent",
        border: "1px solid var(--text-dim)",
        color: "var(--text-main)",
        cursor: "pointer",
        marginLeft: "1rem",
        borderRadius: "4px"
    },
    tabButton: (isActive) => ({
        padding: "1rem",
        background: "transparent",
        border: "none",
        color: isActive ? "var(--hakurei-red)" : "var(--text-dim)",
        borderBottom: isActive ? "2px solid var(--hakurei-red)" : "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        marginRight: "1rem",
        fontWeight: isActive ? "bold" : "normal"
    }),
    statsBox: {
        padding: "0.5rem 1rem",
        background: "rgba(30, 58, 138, 0.1)", // Light blue tint
        color: "var(--text-main)",
        borderRadius: "4px",
        border: "1px solid var(--winter-navy)",
        fontSize: "0.9rem",
        fontWeight: "bold"
    }
};

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
    const [newsId, setNewsId] = useState(null);
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
        try {
            const [n, c, d, v, i] = await Promise.all([
                fetch("/api/news").then(res => res.json()),
                fetch("/api/characters").then(res => res.json()),
                fetch("/api/diary").then(res => res.json()),
                fetch("/api/videos").then(res => res.json()),
                fetch("/api/illustrations").then(res => res.json())
            ]);

            setNews(n || []);
            setChars(c || []);
            setDiary(d || []);
            setVideos(v || []);
            if (Array.isArray(i)) setIllustrations(i);

            // Stats
            const s = await fetch("/api/stats").then(res => res.json().catch(() => ({ views: 0, storage: 0 })));
            setStats(s);
        } catch (e) {
            console.error("Fetch error:", e);
        }
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!session) return;
        try {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: newsId,
                    title: newsTitle,
                    content: newsContent,
                    theme: newsTheme
                })
            });
            if (!res.ok) throw new Error("Failed");

            setNewsId(null);
            setNewsTitle("");
            setNewsContent("");
            setNewsTheme("both");
            fetchData();
        } catch (e) {
            alert("投稿に失敗しました");
        }
    };

    const handleEditNews = (item) => {
        setNewsId(item.id);
        setNewsTitle(item.title);
        setNewsContent(item.content);
        setNewsTheme(item.theme || "both");
        window.scrollTo(0, 0);
    };

    const handleDeleteNews = async (id) => {
        if (!session) return;
        if (!confirm("本当に削除しますか？")) return;
        await fetch(`/api/news?id=${id}`, { method: "DELETE" });
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
        if (!session) return;
        if (!confirm("本当に削除しますか？")) return;
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
        <div style={styles.container}>
            {/* 
               Remove global override that disabled animation, allowing standard theming.
               We keep specific overrides only if necessary for legibility.
            */}
            <style jsx global>{`
                /* Ensure admin content is readable on dark backgrounds */
                [data-theme='ura'] .admin-content textarea,
                [data-theme='ura'] .admin-content input[type="text"] {
                    background: rgba(0,0,0,0.5);
                    color: white;
                }
            `}</style>

            <div className="admin-content" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "2rem", color: "var(--hakurei-red)" }}>管理ダッシュボード {session ? "(編集モード)" : "(閲覧モード)"}</h1>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        {session ? (
                            <>
                                <div style={styles.statsBox}>
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
                                <button onClick={() => signOut()} style={{ ...styles.buttonSecondary, background: "var(--hakurei-white)" }}>ログアウト</button>
                            </>
                        ) : (
                            <button onClick={() => signIn()} style={styles.buttonPrimary}>管理者ログイン</button>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: "2rem", borderBottom: "1px solid var(--text-dim)" }}>
                    {["news", "chars", "diary", "videos", "illustrations"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={styles.tabButton(activeTab === tab)}
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
                            <form onSubmit={handleAddNews} style={styles.card}>
                                <h3 style={{ marginBottom: "1rem" }}>お知らせ投稿</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="タイトル"
                                        value={newsTitle}
                                        onChange={e => setNewsTitle(e.target.value)}
                                        style={styles.input}
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
                                        style={{ ...styles.input, height: "100px" }}
                                        required
                                    />
                                </div>
                                <button type="submit" style={styles.buttonPrimary}>
                                    {newsId ? "更新する" : "投稿する"}
                                </button>
                                {newsId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewsId(null);
                                            setNewsTitle("");
                                            setNewsContent("");
                                            setNewsTheme("both");
                                        }}
                                        style={styles.buttonSecondary}>
                                        キャンセル
                                    </button>
                                )}
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "rgba(0,0,0,0.05)", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。投稿するにはログインしてください。
                            </div>
                        )}

                        <h3>最近のお知らせ</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {news.map(n => (
                                <li key={n.id} style={{ borderBottom: "1px solid var(--text-dim)", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                    <div>
                                        <div style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>{n.date} <span style={{ marginLeft: "0.5rem", border: "1px solid currentColor", padding: "0 4px", fontSize: "0.7rem" }}>{n.theme}</span></div>
                                        <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{n.title}</div>
                                        <div style={{ fontSize: "0.9rem", marginTop: "0.5rem", whiteSpace: "pre-wrap", opacity: 0.9 }}>{n.content}</div>
                                    </div>
                                    {session && (
                                        <div style={{ display: "flex", gap: "0.5rem", minWidth: "120px", justifyContent: "flex-end" }}>
                                            <button onClick={() => handleEditNews(n)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "var(--sakura-pink)", border: "none", color: "var(--winter-navy)" }}>編集</button>
                                            <button onClick={() => handleDeleteNews(n.id)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "rgba(255,0,0,0.1)", border: "1px solid red", color: "red" }}>削除</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* CHARACTERS */}
                {activeTab === "chars" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {session && (
                            <form onSubmit={handleSaveChar} style={styles.card}>
                                <h3 style={{ marginBottom: "1rem" }}>キャラクター追加・編集</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                                    <input type="text" placeholder="ID (例: renko)" value={charId} onChange={e => setCharId(e.target.value)} style={styles.input} required />
                                    <input type="text" placeholder="名前" value={charName} onChange={e => setCharName(e.target.value)} style={styles.input} required />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input type="text" placeholder="役割・肩書き" value={charRole} onChange={e => setCharRole(e.target.value)} style={styles.input} />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <textarea placeholder="説明文" value={charDesc} onChange={e => setCharDesc(e.target.value)} style={{ ...styles.input, height: "100px" }} />
                                </div>

                                <div style={{ marginBottom: "1rem", border: "1px solid var(--text-dim)", padding: "1rem", borderRadius: "4px" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>立ち絵画像</label>
                                    <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem", opacity: 0.7 }}>
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
                                        style={{ color: "var(--text-main)" }}
                                    />
                                </div>

                                <div style={{ marginBottom: "1rem" }}>
                                    <label>テーマカラー: </label>
                                    <input type="color" value={charColor} onChange={e => setCharColor(e.target.value)} />
                                </div>
                                <button type="submit" style={styles.buttonPrimary}>
                                    保存する
                                </button>
                            </form>
                        )}

                        <h3>登録済みキャラクター</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                            {chars.map(c => (
                                <div key={c.id} style={{ border: "1px solid var(--text-dim)", padding: "1rem", position: "relative", background: "var(--hakurei-white)", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                        <div style={{ width: "30px", height: "30px", background: c.color, borderRadius: "50%", overflow: "hidden", border: "1px solid #ddd" }}>
                                            {c.image_url && <img src={c.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                        </div>
                                        <strong>{c.name}</strong>
                                    </div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>{c.role}</div>
                                    {session && (
                                        <>
                                            <button
                                                onClick={() => handleEditChar(c)}
                                                style={{ marginTop: "1rem", width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.05)", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "var(--text-main)" }}
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
                            <form onSubmit={handleSaveDiary} style={styles.card}>
                                <h3 style={{ marginBottom: "1rem" }}>日誌の投稿・編集</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>日付 (YYYY.MM.DD)</label>
                                    <input
                                        type="text"
                                        placeholder="2026.01.01"
                                        value={diaryDate}
                                        onChange={e => setDiaryDate(e.target.value)}
                                        style={styles.input}
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
                                        style={styles.input}
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
                                    <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
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

                                <button type="submit" style={styles.buttonPrimary}>
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
                                        style={styles.buttonSecondary}>
                                        キャンセル
                                    </button>
                                )}
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "rgba(0,0,0,0.05)", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。
                            </div>
                        )}

                        <h3>過去の日誌</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {diary.map(d => (
                                <div key={d.id} style={{ borderBottom: "1px solid var(--text-dim)", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                    <div>
                                        <div style={{ color: "var(--hakurei-red)", fontSize: "0.9rem", fontWeight: "bold" }}>{d.date}</div>
                                        <h4 style={{ margin: "0.5rem 0" }}>{d.title}</h4>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>進捗: {d.progress}%</div>
                                    </div>
                                    {session && (
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button onClick={() => handleEditDiary(d)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "var(--sakura-pink)", border: "none" }}>編集</button>
                                            <button onClick={() => handleDeleteDiary(d.id)} style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", background: "rgba(255,0,0,0.1)", border: "1px solid red", color: "red" }}>削除</button>
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
                            <form onSubmit={handleAddVideo} style={styles.card}>
                                <h3 style={{ marginBottom: "1rem" }}>動画の追加</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem" }}>動画タイトル</label>
                                    <input
                                        type="text"
                                        placeholder="例: 新作PV"
                                        value={videoTitle}
                                        onChange={e => setVideoTitle(e.target.value)}
                                        style={styles.input}
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
                                        style={styles.input}
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
                                <button type="submit" style={styles.buttonPrimary}>
                                    追加する
                                </button>
                            </form>
                        ) : null}

                        <h3>登録済み動画</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
                            {videos.map(v => (
                                <div key={v.id} style={{ border: "1px solid var(--text-dim)", padding: "1rem", background: "rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{v.title}</div>
                                    <div style={{ fontSize: "0.8rem", opacity: 0.7, wordBreak: "break-all", marginBottom: "1rem" }}>{v.url}</div>
                                    {session && (
                                        <button onClick={() => handleDeleteVideo(v.id)} style={{ width: "100%", padding: "0.5rem", background: "rgba(255,0,0,0.1)", border: "1px solid red", color: "red", cursor: "pointer" }}>削除</button>
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
                            <form onSubmit={handleSaveIllustration} style={styles.card}>
                                <h3 style={{ marginBottom: "1rem" }}>イラスト投稿</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <input
                                        type="text"
                                        placeholder="タイトル"
                                        value={illTitle}
                                        onChange={e => setIllTitle(e.target.value)}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <textarea
                                        placeholder="説明文"
                                        value={illDesc}
                                        onChange={e => setIllDesc(e.target.value)}
                                        style={{ ...styles.input, height: "80px" }}
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
                                <div style={{ marginBottom: "1rem", border: "1px solid var(--text-dim)", padding: "1rem", borderRadius: "4px" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>画像ファイル</label>
                                    <input
                                        id="illFileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            if (e.target.files?.[0]) setIllFile(e.target.files[0]);
                                        }}
                                        style={{ color: "var(--text-main)" }}
                                    />
                                </div>
                                <button type="submit" disabled={uploadingIll} style={{ ...styles.buttonPrimary, opacity: uploadingIll ? 0.7 : 1 }}>
                                    {uploadingIll ? "アップロード中..." : "投稿する"}
                                </button>
                            </form>
                        ) : (
                            <div style={{ padding: "1rem", background: "rgba(0,0,0,0.05)", marginBottom: "2rem", borderRadius: "4px" }}>
                                現在、ゲストモード（閲覧のみ）です。
                            </div>
                        )}

                        {/* We could list illustrations here if needed */}
                        <h3>登録済みイラスト</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                            {illustrations.map(ill => (
                                <div key={ill.id} style={{ border: "1px solid var(--text-dim)", padding: "1rem", background: "rgba(255,255,255,0.05)" }}>
                                    <div style={{ height: "150px", overflow: "hidden", marginBottom: "0.5rem", background: "#000" }}>
                                        {ill.image_url && <img src={ill.image_url} alt={ill.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                    </div>
                                    <div style={{ fontWeight: "bold" }}>{ill.title}</div>
                                    <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>Theme: {ill.theme}</div>
                                    {session && (
                                        <button onClick={() => handleDeleteIllustration(ill.id)} style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem", background: "rgba(255,0,0,0.1)", border: "1px solid red", color: "red", cursor: "pointer" }}>削除</button>
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
