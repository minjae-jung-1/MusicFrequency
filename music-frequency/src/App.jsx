import { useState, useEffect } from 'react'
import './App.css'
import AudioVisualizer from './components/AudioVisualizer';
import Canvas from "./components/Canvas"

function App() {
  const [music, setMusic] = useState(null);
  const [audioData, setAudioData] = useState([]);

  const audioTune = new Audio(music);
 
  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(false);

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

  const handleChange = (e) => {
    setMusic(URL.createObjectURL(e.target.files[0]))
    const file = e.target.files[0];
    const audioContext = new AudioContext();
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      console.log(fileReader)
      const arrayBuffer = fileReader.result;
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channelData = audioBuffer.getChannelData(0);
      setAudioData(channelData);
    }
    fileReader.readAsArrayBuffer(file);
  }

  return (
    <div className="App">
      {/* {music != null ? <Canvas props={ audioTune }/> : <div></div>} */}
      <AudioVisualizer audioData={audioData} width={400} height={400} />
      <h1 className="text-3xl font-bold underline text-lime-500">
        Hello world!
      </h1>
      <div className='flex flex-col'>
        <audio className='bg-green-300' src={music} controls></audio>
        <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
        <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
        <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>
        <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
      </div>
      <input type="file" onChange={(e)=>{handleChange(e)}}/>
    </div>
  )
}

export default App
