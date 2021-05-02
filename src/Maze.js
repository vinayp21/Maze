import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const Maze = ({ rows, columns }) => {
  const [sprites, setSprites] = useState([]);
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);
  const leftRef = useRef(left);
  const topRef = useRef(top);
  const updateSprite = useRef([]);
  useEffect(() => {
    const size = rows * columns;
    const midTop = (Math.ceil(columns / 2) - 1) * 40 + top;
    const midLeft = (Math.ceil(rows / 2) - 1) * 40 + left;
    leftRef.current = leftRef.current + midLeft - left;
    topRef.current = topRef.current + midTop - top;
    setLeft(midLeft);
    setTop(midTop);
    const centerNumber =
      (Math.ceil(columns / 2) - 1) * rows + Math.ceil(rows / 2);
    const randomData = [];
    while (randomData.length < 10) {
      var random = Math.floor(Math.random() * size) + 1;
      if (
        randomData.indexOf(random) === -1 &&
        random !== parseInt(centerNumber)
      ) {
        let gtop = (Math.ceil(random / rows) - 1) * 40 + top;
        let gleft =
          Math.floor(random % rows) === 0
            ? (rows - 1) * 40 + left
            : (Math.floor(random % rows) - 1) * 40 + left;
        randomData.push(random);
        sprites.push({
          top: gtop,
          left: gleft,
          position: "absolute"
        });
      }
    }
    setSprites(sprites);
    updateSprite.current = sprites;
    document.addEventListener("keyup", onKeyUp);
    // eslint-disable-next-line
  }, []);

  let pcount = 0;
  const onKeyUp = ({ key }) => {
    switch (key) {
      case "ArrowRight":
        if (leftRef.current < 40 * (rows - 1)) {
          leftRef.current = leftRef.current + 40;
          setLeft(leftRef.current);
        }
        break;
      case "ArrowDown":
        if (topRef.current < 40 * (columns - 1)) {
          topRef.current = topRef.current + 40;
          setTop(topRef.current);
        }
        break;
      case "ArrowLeft":
        if (leftRef.current > 40) {
          leftRef.current = leftRef.current - 40;
          setLeft(leftRef.current);
        }
        break;
      case "ArrowUp":
        if (topRef.current > 40) {
          topRef.current = topRef.current - 40;
          setTop(topRef.current);
        }
        break;
      default:
        break;
    }
    const newSprite = updateSprite.current.filter(data => {
      return !(data.top === topRef.current && data.left === leftRef.current);
    });
    updateSprite.current = newSprite;
    setSprites(updateSprite.current);
    if (
      updateSprite.current.length > 0 &&
      (key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight")
    ) {
      pcount++;
    }
    if (updateSprite.current.length === 0) {
      setTimeout(() => {
        alert(`Game over, total counts to hit all green sprites is, ${pcount}`);
      }, 300);
    }
  };

  const style = { top: top, left: left };
  return (
    <div>
      <div className="player" style={style}></div>
      {sprites.map(style => (
        <div
          key={`${style.top}-${style.left}`}
          className="sprite"
          style={style}
        ></div>
      ))}
      {[...Array(columns)].map((data1, i) => (
        <div key={i} className="roww">
          {[...Array(rows)].map((data2, j) => {
            return (
              <div key={j}>
                <div className="box"></div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Maze;
