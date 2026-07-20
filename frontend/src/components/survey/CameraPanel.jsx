import { useEffect, useRef, useState } from 'react'


export default function CameraPanel({

  onEmotionDetected,
  manualMode

}) {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const detectionInterval =
    useRef(null)

  const [cameraReady,setCameraReady] =
    useState(false)

  const [cameraError,setCameraError] =
    useState(false)

  // STABILIZER

  const [lastEmotion,setLastEmotion] =
    useState(null)

  const [emotionCounter,setEmotionCounter] =
    useState(0)

  // =================

 useEffect(()=>{

    return()=>{

      stopCamera()

    }

},[])

  // =================

  useEffect(()=>{

    if(manualMode){

      stopCamera()

    }else{

  setTimeout(() => {

    if(!cameraReady){

      startCamera()

    }

  }, 500)

}

  },[manualMode])


  // =================

  const startCamera = async () => {

  try {

    setCameraError(false)

   // =========================
// FIX SUPPORT MOBILE
// =========================

if (!navigator.mediaDevices) {

  navigator.mediaDevices = {}

}

if (!navigator.mediaDevices.getUserMedia) {

  navigator.mediaDevices.getUserMedia =
    function (constraints) {

      const getUserMedia =

        navigator.webkitGetUserMedia ||

        navigator.mozGetUserMedia ||

        navigator.msGetUserMedia

      if (!getUserMedia) {

        throw new Error(
          "Camera tidak didukung browser"
        )

      }

      return new Promise(
        (resolve, reject) => {

          getUserMedia.call(

            navigator,

            constraints,

            resolve,

            reject

          )

        }
      )

    }

}

// =========================
// AKHIR FIX
// =========================

    const stream =
    await navigator.mediaDevices.getUserMedia({

      video: {
        facingMode: "user"
      },

      audio: false

    })

    if (videoRef.current) {
      videoRef.current.srcObject = stream
      // Event onLoadedMetadata akan ditangani langsung oleh elemen <video> di JSX
    }

  } catch (err) {

    console.log(
      "ERROR CAMERA:",
      err
    )

    alert(

      "Camera Error:\n" +

      err.name +

      "\n\n" +

      err.message

    )

    setCameraError(true)

  }

}

  // =================

  const stopCamera=()=>{

    if(
      detectionInterval.current
    ){

      clearInterval(
        detectionInterval.current
      )

    }

    if(

      videoRef.current &&

      videoRef.current.srcObject

    ){

      const tracks=

      videoRef.current
      .srcObject
      .getTracks()

      tracks.forEach(track => {

          track.stop()

        })

      videoRef.current.srcObject=
      null

    }

    setCameraReady(false)

  }

  const predictEmotion = async () => {

  if (
    !videoRef.current ||
    !cameraReady
  ) return

  const canvas =
  document.createElement("canvas")

  canvas.width =
  videoRef.current.videoWidth

  canvas.height =
  videoRef.current.videoHeight

  if (
    canvas.width === 0 ||
    canvas.height === 0
  ) {
    return
  }

  const ctx =
  canvas.getContext("2d")

  ctx.drawImage(
    videoRef.current,
    0,
    0,
    canvas.width,
    canvas.height
  )

  console.log("📸 Foto berhasil diambil")

  const imageBase64 =
  canvas.toDataURL("image/jpeg")

  try {

    console.log(
      "📡 Mengirim ke API..."
    )

    const response =
    await fetch(
      "https://fitrohtunnisha-emotion-realtime-api.hf.space/analyze",
      {
        method: "POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({

          image:imageBase64

        })

      }
    )

    const result =
    await response.json()

    console.log(
      "✅ HASIL API:",
      result
    )

    if(result.raw_ai_emotion){

      const emotionToRating = {

        angry:1,
        fearful:2,
        sad:2,
        neutral:3,
        surprised:4,
        happy:5

      }

      onEmotionDetected(

        result.raw_ai_emotion,

        emotionToRating[
          result.raw_ai_emotion
        ] || 3

      )

    }

  } catch(error){

    console.log(
      "❌ ERROR API:",
      error
    )

  }

}


useEffect(() => {

  if(cameraReady && !manualMode){

    detectionInterval.current =
    setInterval(() => {

      predictEmotion()

    }, 3000)

  }

  return () => {

    if(detectionInterval.current){

      clearInterval(
        detectionInterval.current
      )

    }

  }

}, [cameraReady, manualMode])


  // =================


  return(

<div className="
w-full h-full flex flex-col justify-between
bg-white/85 dark:bg-slate-900/80
backdrop-blur-xl

rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]

p-3.5 sm:p-4 md:p-5

shadow-2xl

border
border-slate-100 dark:border-slate-700/70
">

<div className="
flex
justify-between
items-center
mb-2 sm:mb-3
">

<h2 className="
text-lg sm:text-xl
lg:text-2xl
font-black
text-orange-500
">

📷 Kamera

</h2>

</div>

<div className="
relative
overflow-hidden

rounded-xl sm:rounded-2xl

bg-black

w-full
flex-1
max-w-2xl
mx-auto
aspect-video
max-h-[280px] sm:max-h-[320px] lg:max-h-[360px]
flex items-center justify-center
">

{

!cameraReady &&
!cameraError &&
!manualMode && (

<div className="
absolute
inset-0

flex
flex-col
items-center
justify-center

text-white

z-20
">

<div className="
w-12 sm:w-14
h-12 sm:h-14

border-4
border-white/30
border-t-white

rounded-full

animate-spin

mb-4 sm:mb-5
"/>

<p className="
text-sm sm:text-base
">

Menyalakan kamera...

</p>

</div>

)

}

{

manualMode && (

<div className="
absolute
inset-0

flex
flex-col
items-center
justify-center

text-white

z-20
">

<div className="
text-5xl sm:text-6xl
mb-3
">


</div>

<p className="
font-semibold
text-sm sm:text-base
">

Mode manual aktif
Kamera di nonaktifkan

</p>

</div>

)

}

{

cameraError && (

<div className="
absolute
inset-0

flex
items-center
justify-center

text-white
text-center
px-4

z-20
">

⚠️ Kamera
tidak dapat diakses

</div>

)

}

{

!manualMode && (

<>

<video
ref={videoRef}
autoPlay
muted
playsInline
onLoadedMetadata={() => {
  if (videoRef.current) {
    videoRef.current.play().catch(e => console.error("Video play error:", e));
    setCameraReady(true);
  }
}}
className="
w-full
h-full
object-cover
"
/>

<canvas

ref={canvasRef}

className="
absolute
top-0
left-0

w-full
h-full
"

/>

</>

)

}

</div>

{/* PETUNJUK */}

<div className="
mt-2 sm:mt-3

bg-white dark:bg-slate-800/80

rounded-xl sm:rounded-2xl

border
border-slate-100 dark:border-slate-700

shadow-sm

px-3.5 sm:px-4
py-2 sm:py-2.5

flex
items-center
gap-2.5
">

<div className="
text-lg sm:text-xl
">
💡
</div>

<p className="
text-xs sm:text-[13px]
text-slate-600 dark:text-slate-300
leading-snug
">

Posisikan wajah dengan jelas
agar sistem dapat membaca
ekspresi dengan baik

</p>

</div>

</div>

)

}