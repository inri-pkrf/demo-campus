import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page home">
      <h1>ברוכים הבאים!</h1>
      <div className="buttons-home">
        <button className="button-home quiz" onClick={() => navigate('/quiz')}>לשאלון</button>
        <button className="button-home text" onClick={() => navigate('/text')}>לקרוא טקסט</button>
        <button className="button-home game" onClick={() => navigate('/game')}>לשחק משחק קטן</button>
      </div>
    </div>
  );
};

export default Home;
