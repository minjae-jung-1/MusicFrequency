import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = ctx => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here
    draw(context)
  }, [draw])
  
  return <canvas ref={canvasRef} {...props}></canvas>
}

export default Canvas



// import React from "react";
// import Sketch from "react-p5";

// 	let x = 50;
// 	let y = 50;
// export default (props) => {
//   const setup = (p5, canvasParentRef) => {
//     // (without that p5 will render the canvas outside of your component)
//     p5.createCanvas(500, 500).parent(canvasParentRef);
//   };

//   const draw = (p5) => {
//     p5.background(0);
//       p5.ellipse(x, y, 70, 70);
//     x++;
//   };

//   // return <Sketch setup={setup} draw={draw} />;
// };
