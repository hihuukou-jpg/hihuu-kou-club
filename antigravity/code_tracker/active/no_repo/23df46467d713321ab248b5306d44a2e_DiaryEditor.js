©."use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import { Bold, Italic, List, ImageIcon, Heading1, Heading2, Heading3 } from 'lucide-react';
import { useEffect, useState } from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });

                    if (res.ok) {
                        const data = await res.json();
                        editor.chain().focus().setImage({ src: data.url }).run();
                    } else {
                        alert('ÁîªÂÉè„ÅÆ„Ç¢„ÉÉ„Éó„É≠„Éº„Éâ„Å´Â§±Êïó„Åó„Åæ„Åó„Åü');
                    }
                } catch (err) {
                    console.error(err);
                    alert('„Ç®„É©„Éº„ÅåÁô∫Áîü„Åó„Åæ„Åó„Åü');
                }
            }
        };
        input.click();
    };

    return (
        <div style={{ borderBottom: '1px solid #ddd', padding: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                style={{ fontWeight: editor.isActive('bold') ? 'bold' : 'normal', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                style={{ color: editor.isActive('heading', { level: 1 }) ? 'var(--hakurei-red)' : 'inherit', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                style={{ color: editor.isActive('heading', { level: 2 }) ? 'var(--hakurei-red)' : 'inherit', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                style={{ color: editor.isActive('heading', { level: 3 }) ? 'var(--hakurei-red)' : 'inherit', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <Heading3 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                style={{ color: editor.isActive('bulletList') ? 'var(--hakurei-red)' : 'inherit', padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={addImage}
                style={{ padding: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
            >
                <ImageIcon size={18} />
            </button>
        </div>
    );
};

export default function DiaryEditor({ content, onChange }) {
    const [mounted, setMounted] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3] }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                style: 'min-height: 300px; outline: none;'
            }
        },
        immediatelyRender: false // Important for SSR
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Update content if changed externally (e.g. loading a new entry)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!mounted) {
        return <div style={{ minHeight: '300px', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}>Loading editor...</div>;
    }

    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '4px', background: '#fff', padding: '0.5rem' }}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} style={{ minHeight: '300px' }} />
        </div>
    );
}
  *cascade08 ‘*cascade08‘«# *cascade08«#˝#*cascade08˝#ı' *cascade08ı'≠(*cascade08≠(¥( *cascade08¥(ı(*cascade08ı(Ë* *cascade08Ë*ï,*cascade08ï,©. *cascade082Gfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/DiaryEditor.js