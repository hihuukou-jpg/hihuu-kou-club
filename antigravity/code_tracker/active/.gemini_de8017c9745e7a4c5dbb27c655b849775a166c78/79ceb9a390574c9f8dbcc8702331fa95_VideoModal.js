£"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export default function VideoModal({ videoId, onClose }) {
    if (!videoId) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 200,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem"
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "2rem",
                        right: "2rem",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 201
                    }}
                >
                    <X size={40} />
                </button>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing
                    style={{
                        width: "100%",
                        maxWidth: "1000px",
                        aspectRatio: "16/9",
                        background: "#000",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)"
                    }}
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
¥ *cascade08¥∂*cascade08∂÷ *cascade08÷ÿ*cascade08ÿ‚ *cascade08‚„*cascade08„Á *cascade08ÁÍ*cascade08Íñ *cascade08ñõ*cascade08õ• *cascade08•¶*cascade08¶¿ *cascade08¿∆*cascade08∆Í *cascade08ÍÎ*cascade08Îı *cascade08ı˙*cascade08˙ë *cascade08ëì*cascade08ìù *cascade08ù°*cascade08°æ *cascade08æƒ*cascade08ƒŒ *cascade08Œ‘*cascade08‘‡ *cascade08‡‚*cascade08‚Ç *cascade08Çä*cascade08äì *cascade08ìò*cascade08ò§ *cascade08§ß*cascade08ß± *cascade08±π*cascade08π’ *cascade08’⁄*cascade08⁄Ê *cascade08ÊÈ*cascade08ÈÜ *cascade08Ü∞*cascade08∞” *cascade08”’*cascade08’· *cascade08·Á*cascade08Á˝ *cascade08˝˛*cascade08˛´ *cascade08´Ø*cascade08Øª *cascade08ªø*cascade08ø÷ *cascade08÷ﬁ*cascade08ﬁÖ *cascade08Öâ*cascade08âï *cascade08ïô*cascade08ô™ *cascade08™≠*cascade08≠∑ *cascade08∑∫*cascade08∫æ *cascade08æ¬*cascade08¬◊ *cascade08◊›*cascade08›˝ *cascade08˝É*cascade08Éå *cascade08åê*cascade08êú *cascade08ú†*cascade08†ø *cascade08ø«*cascade08«— *cascade08—‘*cascade08‘‚ *cascade08‚È*cascade08ÈÄ	 *cascade08Ä	â	*cascade08â	ó	 *cascade08ó	ò	*cascade08ò	¶	 *cascade08¶	∞	*cascade08∞	Œ	 *cascade08Œ	”	*cascade08”	·	 *cascade08·	Ê	*cascade08Ê	£
 *cascade08£
¶
*cascade08¶
√
 *cascade08√
≈
*cascade08≈
∆
 *cascade08∆
»
*cascade08»
À
 *cascade08À
Ã
*cascade08Ã
Õ
 *cascade08Õ
œ
*cascade08œ
ü *cascade08ü†*cascade08†Ã *cascade08ÃÕ*cascade08ÕÌ *cascade08ÌÓ*cascade08ÓÙ *cascade08Ùı*cascade08ıˇ *cascade08ˇÑ*cascade08Ñ∫ *cascade08∫¬*cascade08¬÷ *cascade08÷◊*cascade08◊Ë *cascade08ËÌ*cascade08Ì˘ *cascade08˘¸*cascade08¸† *cascade08†•*cascade08•± *cascade08±¥*cascade08¥≈ *cascade08≈∆*cascade08∆◊ *cascade08◊±*cascade08±ç *cascade08çï*cascade08ïü *cascade08ü¢*cascade08¢∞ *cascade08∞∑*cascade08∑« *cascade08«À*cascade08ÀŸ *cascade08Ÿﬂ*cascade08ﬂÙ *cascade08Ù¨*cascade08¨« *cascade08«À*cascade08Àœ *cascade08œ–*cascade08–ﬁ *cascade08ﬁÁ*cascade08Áˆ *cascade08ˆ˜*cascade08˜˝ *cascade08˝Ç*cascade08Çê *cascade08êï*cascade08ï™ *cascade08™¥*cascade08¥Ì *cascade08ÌÓ*cascade08Ó¸ *cascade08¸Ö*cascade08Ö» *cascade08»Œ*cascade08ŒÍ *cascade08ÍÓ*cascade08ÓÔ *cascade08Ô*cascade08Ò *cascade08ÒÚ*cascade08ÚÛ *cascade08Ûˆ*cascade08ˆÜ *cascade08Üè*cascade08èê *cascade08êë*cascade08ëî *cascade08îñ*cascade08ñó *cascade08óö*cascade08öú *cascade08ú•*cascade08•∂ *cascade08∂∏*cascade08∏π *cascade08π√*cascade08√≈ *cascade08≈Õ*cascade08Õñ *cascade08ñú*cascade08ú† *cascade08†£*cascade08£≥ *cascade08≥∏*cascade08∏Ê *cascade08ÊÓ*cascade08Óˇ *cascade08ˇá*cascade08áâ *cascade08âë*cascade08ëΩ *cascade08Ωæ*cascade08æø *cascade08ø¿*cascade08¿· *cascade08·Â*cascade08Âò *cascade08òö*cascade08ö£ *cascade08"(de8017c9745e7a4c5dbb27c655b849775a166c782Ffile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/VideoModal.js:file:///C:/Users/kouki/.gemini