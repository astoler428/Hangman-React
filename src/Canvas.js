import { useRef } from "react";
import useCreateHang from "./useCreateHang";

export default function Canvas({ incorrectGuesses }) {
  let canvasRef = useRef(null);
  let contextRef = useRef(null);
  //coordinates for start and end of each body part
  let bodyParts = [
    [150, 125, 50],
    [150, 175, 150, 250],
    [150, 250, 100, 300],
    [150, 250, 200, 300],
    [150, 225, 100, 200],
    [150, 225, 200, 200],
  ];

  useCreateHang(canvasRef, contextRef); //custom hook

  for (let guess = 0; guess < Math.min(incorrectGuesses, 6); guess++) {
    if (guess == 0) drawHead(...bodyParts[guess]);
    else drawBodyPart(...bodyParts[guess]);
  }

  function drawBodyPart(startX, startY, endX, endY) {
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(endX, endY);
    contextRef.current.stroke();
  }

  function drawHead(centerX, centerY, radius) {
    contextRef.current.beginPath();
    contextRef.current.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    contextRef.current.stroke();
  }

  return <canvas className="canvas" ref={canvasRef}></canvas>;
}
