
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { ToastContainer, toast } from 'react-toastify';
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam';
import draw from './utilities';
const obj={
  x:0,
  y:0,
  score:0
}

function FaceDetect() {
    const [result,setResult]=useState([])
    let canvasRef=useRef(null)
    const [canvas, setCanvas] = useState(null);
    const [video, setVideo] = useState(null);
    const [title, changeTitle] = useState('text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white')
    useEffect(()=>{
        const video = document.getElementById('video')
        setVideo(document.getElementById("video"));
       Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(startVideo)
      function startVideo() {
        navigator.getUserMedia(
          { video: {} },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
      }
      
      video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        
        canvas.id="canvas"
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        //   console.log(detections);
          if(detections!=[] && detections.length>0){
            detections.forEach(value=>{

              setResult(value)
              
            })
          }
        }, 100)
      })
    },[])
    obj.x=result.detection?._box?._x
    obj.y=result.detection?._box?._y
    obj.score=result.detection?._score
    console.log(result.detection);
    console.log(obj);
    
  return (
        <div style={{ textAlign: "center" }}>
            <div>
                <h1 className={title}>
                    Please Adjust your face properly in the camera to recognize
                </h1>
            </div>
           
            <Webcam id="video"  width={720} height={560} autoPlay={true} playsInline muted style={{marginTop:"10px"}}/>
               
                {/* <button onClick={detectFace}>detect</button> */}
            </div>
    );
}

export default FaceDetect;
export {obj}

// import React, { useEffect, useState, useRef } from "react";
// import * as faceapi from "face-api.js";
// import WebCam from "react-webcam";

// const FaceDetect = () => {
//   const [video, setVideo] = useState(null);
//   const [canvas, setCanvas] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const height = 560;
//   const width = 720;
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const finalResult=null
//   useEffect(() => {
//     Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//         faceapi.nets.faceExpressionNet.loadFromUri('/models')
//     ]).then(() => {
//         console.log(navigator.mediaDevices.getUserMedia())
//   if (navigator.mediaDevices.getUserMedia) {
//     setVideo(document.getElementById("video"));
//     navigator.mediaDevices
//       .getUserMedia({ audio: false, video: true })
//       .then(function (stream) {
//         //Display the video stream in the video object
//         video.srcObject = stream;
//         //Play the video stream
//         video.play();
//         setIsLoaded(true);
//         console.log("Video : " + video);
//         console.log(video.srcObject);
//         addEvent();
//       })
//       .catch(function (e) {
//         console.log(e.name + ": " + e.message);
//       });
//   }

//   function addEvent() {
//     video.addEventListener("play", () => {
//       console.log("addEvent");
//       const canvas = faceapi.createCanvasFromMedia(video.srcObject);
//       video.append(canvas);
//       canvas.id = "canvas";
//       document.querySelector("#video").append(canvas);
//       document.body.append(canvas);
//       const displaySize = { width: video.width, height: video.height };
//       faceapi.matchDimensions(canvas, displaySize);
//       setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );

//         canvas
//           .getContext("2d")
//           .clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }, 100);
//       console.log("Event added");
//     });
//   }

//       console.log("models loaded");
//     });
//   }, []);

// //   console.log("Ready!");
//   return (
//     <div className="video-container">
//       {/*<video
//         id="video"
//         //src={video}
//         ref={videoRef}
//         autoPlay={true}
//         playsInline
//         muted
//         style={{ width: "720px", height: "560px" }}
//       />*/}
//       <WebCam
//         id="video"
//         //src={video}
//         ref={videoRef}
//         autoPlay={true}
// width={width}
// height={height}

//         playsInline
//         muted
//         style={{ width: "720", height: "560" }}
//       />
//   <canvas
//     id="canvas"
//     ref={canvasRef}
//     style={{ width: "720", height: "560",position: "absolute",zIndex:10 }}
//   />
//     </div>
//   );
//   //}
// };

// export default FaceDetect;


// import React, { useEffect, useRef, useState } from 'react'
// import '@tensorflow/tfjs';
// import WebCam from "react-webcam";


// // implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
// import * as canvas from 'canvas';
// import './FaceDetect.css'

// import * as faceapi from 'face-api.js';


// function FaceDetect() {
//     let canvas = useRef(null);

//     // const [video, setVideo] = useState(null);
//     // const [canvas, setCanvas] = useState(null);
//     // const [isPlaying, setIsPlaying] = useState(false);
//     // const [isLoaded, setIsLoaded] = useState(false);
//     // const height = 560;
//     // const width = 720;
//     // const videoRef = useRef(null);
//     // const finalResult=null

//     useEffect(() => {


//         const video = document.getElementById('video')
//         Promise.all([
//             faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//             faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//             faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//             faceapi.nets.faceExpressionNet.loadFromUri('/models')
//         ]).then(startVideo())

//         function startVideo() {

//             navigator.getUserMedia(
//                 { video: {} },
//                 stream => video.srcObject = stream,
//                 err => console.log(err)
//             )



//             video.addEventListener('play', () => {
//                 canvas = faceapi.createCanvasFromMedia(video)
//                 document.body.append(canvas)
//                 const displaySize = { width: video.width, height: video.height }
//                 faceapi.matchDimensions(canvas, displaySize)
//                 console.log(video.srcObject.id);
//                 setInterval(async () => {
//                     if (video.srcObject) {

//                         // const detections = await faceapi.detectSingleFace(video)
//                         //   const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//                         // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//                         //   const resizedDetections = faceapi.resizeResults(detections, displaySize)
//                         // faceapi.draw.drawDetections(canvas, resizedDetections)
//                         // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//                         // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//                     }

//                 }, 100)
//             })
//         }

//     }, [])


//     // const videoRef = useRef(null);
//     // useEffect(() => {
//     //   const getUserMedia = async () => {
//     //     try {
//     //       const stream = await navigator.mediaDevices.getUserMedia({video: true});
//     //       videoRef.current.srcObject = stream;
//     //     } catch (err) {
//     //       console.log(err);
//     //     }
//     //   };
//     //   getUserMedia();
//     // }, []);


//     return (

//         <div>
//             {/*ref={videoRef}*/}

//             <video id='video' width={720} height={560} autoPlay muted></video>
//             <canvas
//                 id="canvas"
//                 ref={canvas}
//                 style={{ width: "720", height: "560", position: "absolute", zIndex: 10 }}
//             />
//         </div>
//     )

// }

// export default FaceDetect


