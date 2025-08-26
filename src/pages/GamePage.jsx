import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/GamePage.css';

const GamePage = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => setStep(prev => prev + 1);

    // --- שלב 1: גרור עיגול ---
    const Step1 = () => {
        const [dropped, setDropped] = useState(false);
        const handleDrop = (e) => {
            e.preventDefault();
            setDropped(true);
        };
        return (
            <div className="task-container">
                <h3>משימה 1: גרור את העיגול</h3>
                <p>גרור את העיגול הצהוב אל העיגול הגדול 🎯</p>
                <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    {dropped && <div className="circle success"></div>}
                </div>
                {!dropped && <div className="circle draggable" draggable></div>}

                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        ➡️ קודם
                    </button>
                    {dropped && <button className="nav-btn" onClick={handleNext}>הבא⬅️</button>}
                </div>
            </div>
        );
    };

    // --- שלב 2: לחץ 5 פעמים עם אנימציה וספירה ---
    const Step2 = () => {
        const [count, setCount] = useState(0);
        const [celebrate, setCelebrate] = useState(false);

        const handleClick = () => {
            const newCount = count + 1;
            setCount(newCount);
            if (newCount === 5) setCelebrate(true);
        };

        return (
            <div className="task-container">
                <h3>משימה 2: לחץ 5 פעמים</h3>
                <p>לחץ על הכפתור 5 פעמים!</p>
                <button
                    className={`task-btn-circle ${celebrate ? 'celebrate-btn' : ''}`}
                    onClick={handleClick}
                />
                <div className="click-counter">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`dot ${i < count ? 'active' : ''}`}></span>
                    ))}
                </div>
                {celebrate && (
                    <div className="celebration-animation">
                        🎉 כל הכבוד! סיימת את המשימה! 🎉
                    </div>
                )}
                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        ➡️ קודם
                    </button>
                    {celebrate && <button className="nav-btn" onClick={handleNext}>הבא⬅️</button>}
                </div>
            </div>
        );
    };

    // --- שלב 3: בחר צבע ---
    const Step3 = () => {
        const correctColor = 'green';
        const [selected, setSelected] = useState(null);

        return (
            <div className="task-container">
                <h3>משימה 3: בחר צבע</h3>
                <p>בחר את הצבע הירוק ✅</p>
                <div className="color-options">
                    {['red', 'blue', 'green', 'yellow'].map(color => (
                        <div
                            key={color}
                            className={`color-circle ${color} ${selected === color ? 'selected' : ''}`}
                            onClick={() => setSelected(color)}
                        />
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        ➡️ קודם
                    </button>
                    {selected === correctColor && <button className="nav-btn" onClick={handleNext}>הבא⬅️</button>}
                </div>
            </div>
        );
    };

    // --- שלב 4: גרור פירות למקום הנכון עם צבעים ---
    const Step4 = () => {
        const items = [
            { emoji: '🍎', color: '#e74c3c' },
            { emoji: '🍌', color: '#f1c40f' },
            { emoji: '🍇', color: '#8e44ad' }
        ];
        const [placed, setPlaced] = useState([false, false, false]);
        const [dragging, setDragging] = useState(null);

        const handleDragStart = (index) => setDragging(index);
        const handleDrop = (i) => {
            if (dragging === i) {
                const newPlaced = [...placed];
                newPlaced[i] = true;
                setPlaced(newPlaced);
            }
            setDragging(null);
        };

        return (
            <div className="task-container">
                <h3>משימה 4: גרור פירות למקום הנכון</h3>
                <p>גרור את הפירות אל העיגול בצבע המתאים 🍎🍌🍇</p>
                <div className="drop-row">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="drop-zone small"
                            style={{ borderColor: item.color }}
                            onDrop={() => handleDrop(i)}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {placed[i] ? item.emoji : null}
                        </div>
                    ))}
                </div>
                <div className="drag-row">
                    {items.map((item, i) => !placed[i] && (
                        <div
                            key={i}
                            className="draggable-item"
                            draggable
                            onDragStart={() => handleDragStart(i)}
                            style={{ backgroundColor: item.color }}
                        >
                            {item.emoji}
                        </div>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        ➡️ קודם
                    </button>
                    {placed.every(Boolean) && <button className="nav-btn" onClick={handleNext}>הבא⬅️</button>}
                </div>
            </div>
        );
    };

    // --- שלב 5: תופסת את הכדור עם אנימציה מתוחכמת ---
    const Step5 = () => {
        const [caught, setCaught] = useState(false);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        const handleClick = () => {
            setPosition({ x: Math.random() * 200 - 100, y: Math.random() * 100 - 50 });
            setCaught(true);
        };

        return (
            <div className="task-container">
                <h3>משימה 5: תפוס את הכדור</h3>
                <p>לחץ על הכדור ותפס אותו! ⚽ הכדור יזוז לכל מקום! 🎯</p>
                <div
                    className="moving-ball"
                    style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                    onClick={handleClick}
                ></div>
                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        ➡️ קודם
                    </button>
                    {caught && <button className="nav-btn" onClick={handleNext}>הבא⬅️</button>}
                </div>
            </div>
        );
    };

    // --- שלב 6: סיום ---
    const Step6 = () => (
        <div className="task-container">
            <h3>משימה 6: סיום</h3>
            <p>🎉 כל הכבוד! סיימת את המשחק! 🎉</p>
            <div className="navigation-buttons">
                <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
                    ➡️ קודם
                </button>
                <button className="home-btn" onClick={() => navigate('/')}>
                    חזור לבית
                </button>
            </div>
        </div>
    );

    const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />, <Step6 />];

    return (
        <div className="page game-page">
            <h2>משחק שלבים אינטראקטיבי</h2>
            <div className="game-container">{steps[step]}</div>
        </div>
    );
};

export default GamePage;
