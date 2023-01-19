import { useEffect } from "react";

export default function useCreateHang(canvasRef, contextRef) {
  useEffect(() => {
    canvasRef.current.width = 400;
    canvasRef.current.height = 400;
    let context = canvasRef.current.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 1;
    contextRef.current = context;
    drawHang();
  }, []);

  function drawHang() {
    drawPath(50, 350, 350, 350);
    drawPath(275, 350, 275, 50);
    drawPath(275, 50, 150, 50);
    drawPath(150, 50, 150, 75);

    function drawPath(startX, startY, endX, endY) {
      contextRef.current.moveTo(startX, startY);
      contextRef.current.lineTo(endX, endY);
      contextRef.current.stroke();
    }
  }
}
