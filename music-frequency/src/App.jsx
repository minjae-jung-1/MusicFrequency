import { useState } from 'react'
import './App.css'
import AudioVisualizer from './components/AudioVisualizer';

function App() {
  const [music, setMusic] = useState(null);
  // variable to play audio in loop
  // set the loop of audio tune
  
  const handleChange = async(e) => {
    const file = e.target.files[0];
    console.log(file)
    setMusic(URL.createObjectURL(e.target.files[0]))
    }


  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-lime-500">
        Welcome 
      </h1>
      {music && <AudioVisualizer music={music} />}
      <p>
        Please Input an audioFile
      </p>
      <input className="button hover:bg-sky-700" type="file" accept="audio/*" onChange={(e)=>{handleChange(e)}}/>
    </div>
  )
}

export default App
