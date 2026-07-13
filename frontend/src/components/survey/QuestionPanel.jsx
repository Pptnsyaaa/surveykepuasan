import { useState } from 'react'
import {
  Smile,
  SmilePlus,
  Meh,
  Frown,
  Angry
} from 'lucide-react'

const EMOTION_EMOJI = {
  happy: <Smile className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto" />,
  surprised: <SmilePlus className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto" />,
  neutral: <Meh className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 mx-auto" />,
  sad: <Frown className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mx-auto" />,
  angry: <Angry className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto" />,
  disgusted: <Angry className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto" />,
  fearful: <Frown className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mx-auto" />
}

const EMOTION_LABELS = {
  happy: 'Sangat Puas',
  surprised: 'Puas',
  neutral: 'Netral',
  sad: 'Tidak Puas',
  angry: 'Sangat Tidak Puas',
  disgusted: 'Sangat Tidak Puas',
  fearful: 'Tidak Puas'
}

const RATING_COLORS = {
  1:{bg:'bg-red-50',border:'border-red-400',text:'text-red-600'},
  2:{bg:'bg-orange-50',border:'border-orange-400',text:'text-orange-600'},
  3:{bg:'bg-yellow-50',border:'border-yellow-400',text:'text-yellow-600'},
  4:{bg:'bg-blue-50',border:'border-blue-400',text:'text-blue-600'},
  5:{bg:'bg-green-50',border:'border-green-400',text:'text-green-600'}
}

const MANUAL_RATINGS = [
{rating:1,icon:<Angry className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 mx-auto" />,label:'Sangat Tidak Puas'},
{rating:2,icon:<Frown className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 mx-auto" />,label:'Tidak Puas'},
{rating:3,icon:<Meh className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mx-auto" />,label:'Netral'},
{rating:4,icon:<SmilePlus className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 mx-auto" />,label:'Puas'},
{rating:5,icon:<Smile className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500 mx-auto" />,label:'Sangat Puas'}
]

export default function QuestionPanel({
services,
currentQuestion,
currentEmotion,
currentRating,
hasDetectedFace,
isManualMode,
onManualRating,
onToggleManual,
onNext,
isLast
}){

const [comment,setComment]=useState('')
const [showManual,setShowManual]=useState(false)
const [showError,setShowError]=useState(false)

const service = services?.[currentQuestion] || services?.[0] || { id: 'default', name: 'Pertanyaan Survei', question: 'Daftar pertanyaan sedang dimuat...' }

const progress = services && services.length > 0 ? ((currentQuestion + 1) / services.length) * 100 : 100

const colors=
RATING_COLORS[currentRating] ||
RATING_COLORS[3]

const emotionMap={
1:'angry',
2:'sad',
3:'neutral',
4:'surprised',
5:'happy'
}

const handleNext=()=>{

if(
(currentRating===1||
currentRating===2)
&&
comment.trim()===''
){

setShowError(true)

setTimeout(()=>{

setShowError(false)

},3000)

return

}

onNext(comment)

setComment('')
setShowManual(false)

}

const handleToggleManual=()=>{

setShowManual(
prev=>!prev
)

onToggleManual()

}

return(

<div className="
relative
overflow-hidden
bg-white/85 dark:bg-slate-900/80
dark:border-slate-700/70
backdrop-blur-xl
rounded-[24px] sm:rounded-[28px]
lg:rounded-[32px]
border
border-white/60
shadow-2xl
p-3.5 sm:p-4 md:p-5
w-full h-full flex flex-col justify-between
">

<div className="
absolute
-top-20
-right-20
w-64
h-64
rounded-full
bg-orange-100/50
blur-3xl
"/>

<div className="
absolute
-bottom-20
-left-20
w-56
h-56
rounded-full
bg-indigo-100/50
blur-3xl
"/>

<div className="relative z-10 flex flex-col justify-between h-full">

<div className="mb-2 sm:mb-3">

<div className="
w-full
h-1.5 sm:h-2 md:h-2.5
bg-slate-100 dark:bg-slate-800
rounded-full
overflow-hidden
shadow-inner
">

<div
className="
h-full
bg-gradient-to-r
from-orange-500
via-amber-400
to-orange-300
rounded-full
transition-all
duration-700
"
style={{
width:`${progress}%`
}}
/>

</div>

<div className="
inline-flex
items-center
gap-1.5
bg-slate-100 dark:bg-slate-800
px-2.5 sm:px-3
py-1 sm:py-1.5
rounded-full
text-[11px] sm:text-xs
text-slate-600 dark:text-slate-300
border border-transparent dark:border-slate-700
my-2 sm:my-2.5
">

<div className="
w-2 h-2
rounded-full
bg-orange-500
"/>

Pertanyaan {currentQuestion+1}
dari {services?.length || 1}

</div>

<h3 className="
text-orange-500 dark:text-orange-400
font-black
text-base sm:text-lg
md:text-xl lg:text-2xl
mb-1 sm:mb-1.5
">

{service?.name || 'Pertanyaan'}

</h3>

<p className="
text-slate-800 dark:text-slate-100
leading-snug
mb-2 sm:mb-3
text-sm sm:text-base md:text-lg
font-semibold
tracking-tight
">

{service?.question || 'Daftar pertanyaan sedang dimuat...'}

</p>

</div>

<div className={`
flex
flex-col
items-center
justify-center
gap-1 sm:gap-1.5

p-3 sm:p-4

rounded-xl sm:rounded-2xl
border-2
mb-2 sm:mb-3
flex-1

min-h-[110px] sm:min-h-[130px] max-h-[160px] sm:max-h-[180px]

shadow-md
transition-all
duration-300

${colors.bg}
${colors.border}
`}>

{

!hasDetectedFace ? (

<>

<div className="
text-3xl sm:text-4xl
animate-pulse
">
📷
</div>

<h3 className="
text-sm sm:text-base
md:text-lg
font-bold
text-center
text-slate-800 dark:text-slate-100
">
Menunggu Deteksi Wajah...
</h3>

<p className="
text-[11px] sm:text-xs
text-slate-500 dark:text-slate-400
text-center
">
Arahkan wajah ke kamera
</p>

</>

)

:

currentEmotion ? (

<>

<div className="flex items-center justify-center my-1">
  {EMOTION_EMOJI[currentEmotion]}
</div>

<span className={`
font-bold
text-base sm:text-lg lg:text-xl
${colors.text}
`}>

{
EMOTION_LABELS[currentEmotion]
}

</span>

<p className="
text-[11px] sm:text-xs
text-slate-500 dark:text-slate-400
">

Respon berhasil dibaca

</p>

</>

)

:

(

<>

<div className="
text-4xl
sm:text-5xl
lg:text-6xl
animate-pulse
">
</div>

<p className="
text-sm
sm:text-base
text-slate-500 dark:text-slate-400
">
Memproses deteksi...
</p>

</>

)

}

</div>

<div>

<div className="
text-center
mb-1.5 sm:mb-2
">

<button
onClick={handleToggleManual}
className="
text-xs
sm:text-sm
text-slate-500 dark:text-slate-300
hover:text-indigo-600 dark:hover:text-indigo-400
transition
"
>

{
showManual
?
'✖ Tutup rating manual'
:
'⚙️ Pilih rating manual'
}

</button>

</div>

{
showManual&&(

<div className="
grid
grid-cols-5
gap-1.5
sm:gap-2
mb-2 sm:mb-3
">

{
MANUAL_RATINGS.map(({
rating,
icon,
label
})=>(

<button
key={rating}
onClick={()=>
onManualRating(
rating,
emotionMap[rating]
)
}
className="
p-1.5 sm:p-2
rounded-xl
border
border-slate-200 dark:border-slate-700
bg-white/90 dark:bg-slate-800/80
text-slate-700 dark:text-slate-100
hover:scale-105
transition-all
shadow-sm
"
>

<div className="flex items-center justify-center my-1">
{icon}
</div>

<div className="
text-[9px] sm:text-[10px]
font-medium
mt-0.5
leading-tight
">
{label}
</div>

</button>

))
}

</div>

)
}

{
(currentRating===1||
currentRating===2)

&&(

<div className="
mb-4
sm:mb-5
">

<label className="
block
text-xs
sm:text-sm
font-medium
text-slate-700 dark:text-slate-200
mb-2
">

Berikan masukan

</label>

<textarea
value={comment}
onChange={(e)=>
setComment(
e.target.value
)
}
placeholder="
Tuliskan kendala atau saran...
"
className="
w-full
p-2.5 sm:p-3
rounded-xl
border
border-slate-200 dark:border-slate-700
bg-white/90 dark:bg-slate-800/80
dark:text-slate-100
focus:border-orange-400 dark:focus:border-orange-400
outline-none
resize-none
h-16
sm:h-20
text-xs sm:text-sm
"
/>

<p className="
text-xs
text-slate-500 dark:text-slate-400
mt-1
sm:mt-2
">
Komentar diperlukan untuk rating rendah
</p>

</div>

)

}

{

showError&&(

<div className="
mb-3
sm:mb-4
bg-red-50 dark:bg-red-950/30
border
border-red-200 dark:border-red-800/60
rounded-xl
sm:rounded-2xl
p-3
sm:p-4
flex
gap-2
sm:gap-3
">

<div className="text-xl sm:text-2xl flex-shrink-0">
⚠️
</div>

<div>

<p className="
font-semibold
text-red-600 dark:text-red-400
text-sm
sm:text-base
">
Komentar diperlukan
</p>

<p className="
text-xs
sm:text-sm
text-slate-600 dark:text-slate-300
">
Mohon isi masukan terlebih dahulu
untuk rating rendah
</p>

</div>

</div>

)

}

<button
onClick={handleNext}
className="
w-full
bg-gradient-to-r
from-indigo-600
to-purple-600
text-white
font-bold
py-2 sm:py-2.5
rounded-xl
sm:rounded-2xl
transition-all
duration-300
shadow-lg
text-sm sm:text-base
hover:shadow-xl
active:scale-95
">

{
isLast
?
'Selesai ✓'
:
'Lanjut →'
}

</button>

<p className="
text-center
text-[11px] sm:text-xs
text-slate-500 dark:text-slate-400
mt-2
">
Masukan Anda membantu meningkatkan kualitas layanan kampus
</p>

</div>

</div>

</div>

)

}