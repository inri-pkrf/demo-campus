import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Quiz.css';

const questions = [
    { question: "מה צבע השמיים?", options: ["כחול", "ירוק", "אדום", "צהוב"], correct: "כחול" },
    { question: "כמה ימים יש בשבוע?", options: ["5", "6", "7", "8"], correct: "7" },
    { question: "מהי בירת ישראל?", options: ["תל אביב", "ירושלים", "חיפה", "באר שבע"], correct: "ירושלים" },
    { question: "מה צבע הדגל של צרפת?", options: ["אדום לבן כחול", "ירוק לבן אדום", "כחול צהוב אדום", "שחור לבן אדום"], correct: "אדום לבן כחול" },
    { question: "כמה אצבעות יש ליד אחת?", options: ["4", "5", "6", "3"], correct: "5" },
    { question: "מה החיה המהירה בעולם?", options: ["נמר", "ציפור", "סוס", "צ'יטה"], correct: "צ'יטה" },
    { question: "איזה יסוד כימי הוא H?", options: ["חמצן", "מימן", "הליום", "פחמן"], correct: "מימן" },
    { question: "מהי השפה הרשמית בישראל?", options: ["עברית", "ערבית", "אנגלית", "צרפתית"], correct: "עברית" },
    { question: "כמה חודשי שנה?", options: ["10", "11", "12", "13"], correct: "12" },
    { question: "מהו הים הגדול ביותר?", options: ["ים סוף", "ים התיכון", "האוקיינוס השקט", "הים השחור"], correct: "האוקיינוס השקט" },
];

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const currentQuestion = questions[currentIndex];
    const selected = answers[currentIndex]?.selected;

    const handleSelect = (option) => {
        if (answers[currentIndex]?.locked) return; // אי אפשר לשנות לאחר שליחה
        const newAnswers = [...answers];
        newAnswers[currentIndex] = { ...newAnswers[currentIndex], selected: option };
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!selected) return;
        const newAnswers = [...answers];
        const isCorrect = selected === currentQuestion.correct;
        newAnswers[currentIndex] = { ...newAnswers[currentIndex], locked: true, correct: isCorrect };
        setAnswers(newAnswers);
        setShowFeedback(true);
        if (isCorrect) setScore(prev => prev + 1); // עדכון הציון רק לאחר שליחה
    };

    const handleNext = () => {
        setShowFeedback(false);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setShowFeedback(false);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleRestart = () => {
        setAnswers(Array(questions.length).fill(null));
        setCurrentIndex(0);
        setShowFeedback(false);
        setScore(0);
    };

    if (currentIndex >= questions.length) {
        return (
            <div className="page">
                <h2>סיום השאלון!</h2>
                <p>צברת {score} מתוך {questions.length} נקודות.</p>
                <div className="end-buttons">
                    <button className="restart-btn" onClick={handleRestart}>נסה שוב</button>
                    <button className="home-btn" onClick={() => navigate('/')}>חזור לבית</button>
                </div>
            </div>
        );
    }

    const feedback = selected
        ? answers[currentIndex]?.correct
            ? "נכון! ✅"
            : `טעות ❌ התשובה הנכונה היא: ${currentQuestion.correct}`
        : "";

    return (
        <div className="page">
            <h2>שאלון קצר</h2>
            <p className="score">ציון נוכחי: {score}</p>
            <p className="question">{currentQuestion.question}</p>

            {/* כפתורי תשובות */}
            <div className="answer-buttons">
                {currentQuestion.options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className={`answer-btn ${selected === opt ? 'selected' : ''}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* כפתור שליחה */}
            {!answers[currentIndex]?.locked && (
                <button className="submit-btn" onClick={handleSubmit} disabled={!selected}>
                    שלח תשובה
                </button>
            )}

            {/* פידבק */}
            {answers[currentIndex]?.locked && <p className="feedback-text">{feedback}</p>}

            {/* כפתורי ניווט */}
            <div className="navigation-buttons">
                <button className="nav-btn" onClick={handlePrev} disabled={currentIndex === 0}>
                    ➡️קודם
                </button>
                <button
                    className="nav-btn"
                    onClick={handleNext}
                    disabled={!answers[currentIndex]?.locked}
                >
                    {currentIndex + 1 === questions.length ? 'סיום' : 'הבא⬅️'}
                </button>

            </div>

            {/* כפתור חזרה לבית */}
            <button className="home-btn" onClick={() => navigate('/')}>
                חזור לבית
            </button>
        </div>

    );
};

export default Quiz;
