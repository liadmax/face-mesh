// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas  DONE
// 4. Define references to those DONE
// 5. Load facemesh DONE
// 6. Detect function 
// 7. Drawing utilities from tensorflow 
// 8. Draw functions 

import react, {useRef} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/facemesh'
import Webcam from 'react-webcam';
import {drawMesh} from'./utillities'



function App() {

//setup reference
const webcamRef = useRef(null);
const canvasRef = useRef(null); 

//LOAD FACEMESH
const runFacemesh =async ()=>{
  const net = await facemesh.load({
    inputResolution:{width:640, height:480}, scale:0.8
  })
  setInterval(() => {
    detect(net);
  }, 10);
};

//Detect function
const detect = async(net) =>{
  if(typeof webcamRef.current !=='undefined' &&
   webcamRef.current !== null &&
    webcamRef.current.video.readyState===4)
    {
          // Get Video Properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
    
          // Set video width
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
    
          // Set canvas width
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
    
          // Make Detections
         const face = await net.estimateFaces(video);
         console.log(face);
    
          // Get canvas context
          const ctx = canvasRef.current.getContext("2d");
          requestAnimationFrame(()=>{drawMesh(face, ctx)});
         
  }
}


  



runFacemesh();
  return (
<div className='App'>
  <header className='App-header'>
<Webcam ref={webcamRef} style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }} />
          <canvas ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }} />
          </header>
          

</div>
  );
}

export default App;
