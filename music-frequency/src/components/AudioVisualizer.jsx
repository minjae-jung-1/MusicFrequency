import React, { useRef, useEffect } from 'react';

const AudioVisualizer = ({ audioData, width, height }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const draw = () => {
      requestAnimationFrame(draw);

      // Clear canvas
      context.clearRect(0, 0, width, height);

      // Draw audio data
      context.beginPath();
      context.moveTo(0, height / 2);

      for (let i = 0; i < audioData.length; i++) {
        const x = (i / audioData.length) * width;
        const y = ((audioData[i] + 1) / 2) * height;
        context.lineTo(x, y);
      }

      context.strokeStyle = '#ffffff';
      context.stroke();
    };

    draw();
  }, [audioData, height, width]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default AudioVisualizer;