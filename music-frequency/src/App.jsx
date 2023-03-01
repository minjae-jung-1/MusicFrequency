import { useState, useEffect } from 'react'
import './App.css'
import Canvas from "./components/Canvas"

function App() {
  const [music, setMusic] = useState(null);
  const audioTune = new Audio(music);
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
      {music != null ? <Canvas props={music}/> : <div></div>}
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
        <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
        <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>
        <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
      </div>
      <input type="file" onChange={(e)=>setMusic(URL.createObjectURL(e.target.files[0]))}/>
    </div>
  )
}

export default App
