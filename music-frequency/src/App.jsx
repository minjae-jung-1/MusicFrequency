import { useState, useEffect } from 'react'
import './App.css'
import Canvas from "./components/Canvas"

function App() {
  const [count, setCount] = useState(0)
  const [music, setMusic] = useState(null);

  const audioTune = new Audio();
  audioTune.src=music
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  console.log('audio',audioCtx)
  let audioSource = null;
  let analyser = null;
  audioSource = audioCtx.createMediaElementSource(audioTune);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  console.log(audioTune)
 
  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(false);
 
  // load audio file on component load
  // useEffect(() => {
  //   audioTune.load();
  // }, [])
 
  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])
 
  // play audio sound
  const playSound = () => {
    audioTune.play();
  }
 
  // pause audio sound
  const pauseSound = () => {
    audioTune.pause();
  }
 
  // stop audio sound
  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
  }
  // let canvas 
  // let ctx = canvas.getContext('2d')
  
  // ctx.fillStyle = "green";
  // ctx.fillRect(10, 10, 150, 100);

  return (
    <div className="App">
      <Canvas />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <img src={music}></img> */}
      <div>
        <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
        <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
        <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>
        <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
      </div>
      <input type="file" onChange={(e)=>{setMusic(URL.createObjectURL(e.target.files[0]));}}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
