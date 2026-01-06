"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'omote',
    toggleTheme: () => { }
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('omote');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionType, setTransitionType] = useState('shark'); // 'shark' or 'fusuma'

    useEffect(() => {
        const savedTheme = localStorage.getItem('hifuu_theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (isTransitioning) return;

        const nextTheme = theme === 'omote' ? 'ura' : 'omote';
        const type = theme === 'omote' ? 'shark' : 'fusuma'; // Omote->Ura: Shark, Ura->Omote: Fusuma

        setTransitionType(type);
        setIsTransitioning(true);

        // Timing adjustments based on transition type
        // Shark: Fast splice
        // Fusuma: Slow elegant slide
        const switchDelay = type === 'shark' ? 800 : 1500;
        const endDelay = type === 'shark' ? 1600 : 3500;

        setTimeout(() => {
            setTheme(nextTheme);
            localStorage.setItem('hifuu_theme', nextTheme);
            document.documentElement.setAttribute('data-theme', nextTheme);
        }, switchDelay);

        setTimeout(() => {
            setIsTransitioning(false);
        }, endDelay);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, transitionType }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
