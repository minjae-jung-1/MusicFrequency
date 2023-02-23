import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [music, setMusic] = useState(null);

  const audioTune = new Audio(music);

  console.log(audioTune)
 
  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(false);
 
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
 
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
//   const selectMusic = (e, file) => {
//     if(file.size < 10485760 && file.type.includes('audio/')){
//         const reader = new FileReader()

//         reader.readAsDataURL(file)

//         reader.onload = () => {
//             console.log(reader)
//         }
//     }
// }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
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
