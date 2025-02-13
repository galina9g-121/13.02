import React, { useState, useEffect } from "react";
import "./App.css";

const getRandomPosition = () => {
  return {
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
  };
};

const Shape = ({ id, x, y, onClick }) => {
  return (
    <div
      className="shape"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(id, x, y)}
    ></div>
  );
};

const App = () => {
  const [shapes, setShapes] = useState(
    Array.from({ length: 5 }, (_, i) => ({ id: i, ...getRandomPosition() }))
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({ ...shape, ...getRandomPosition() }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShapeClick = (id, x, y) => {
    setShapes((prevShapes) => [
      ...prevShapes.filter((shape) => shape.id !== id),
      { id: Math.random(), x: x - 2, y: y - 2 },
      { id: Math.random(), x: x + 2, y: y + 2 },
    ]);
    setScore(score + 1);
  };

  return (
    <div className="game-container">
      <h1>Фигурный ниндзя | Очки: {score}</h1>
      <div className="game-field">
        {shapes.map(({ id, x, y }) => (
          <Shape key={id} id={id} x={x} y={y} onClick={handleShapeClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
