import React, { useRef, useEffect, useState } from 'react';

const AudioVisualizer = ({ music }) => {
  // reference to the canvas
  const canvasRef = useRef();
  let audioElement;
  
  //will draw new thing everytime we change "music"
  useEffect(() => {
    const canvas = canvasRef.current;
    const audioContext = new AudioContext();
    audioElement = new Audio(music)
    const audioSource = audioContext.createMediaElementSource(audioElement);
    const analyser = (audioContext.createAnalyser());
    const context = canvas.getContext('2d');

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    //width height of canvas can be adjust at canvas element
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const barWidth = (WIDTH / bufferLength) * 1.5;
    let barHeight;
    let x =0;


    const renderFrame = () => {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fillRect(0, 0, WIDTH, HEIGHT);

      dataArray.forEach((item) => {
        barHeight = item*2;

        const r = barHeight + (25 * (x/bufferLength));
        const g = 250 * (x/bufferLength);
        const b = 50;

        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      });
    };

    renderFrame();

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };

  }, [music]);

  const playSound = () => {
    audioElement.play();
  }
 
  // pause audio sound
  const pauseSound = () => {
    audioElement.pause();
  }
 
  // stop audio sound
  const stopSound = () => {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
  
  return (
    <div>
      <canvas ref={canvasRef} width={window.innerWidth*.8} height={window.innerHeight*.7}/>
      <div>
        <input display="block" type="button" value="Play" onClick={playSound}></input>
        <input type="button" value="Pause" onClick={pauseSound}></input>
        <input type="button" value="Stop" onClick={stopSound}></input>
      </div>
    </div>
  );
};

export default AudioVisualizer;