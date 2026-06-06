import { useState } from 'react'

const EMOTION_EMOJI = {
  happy: '😄',
  surprised: '🙂',
  neutral: '😐',
  sad: '😕',
  angry: '😠',
  disgusted: '😠',
  fearful: '😕'
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
{rating:1,emoji:'😠',label:'Sangat Tidak Puas'},
{rating:2,emoji:'😕',label:'Tidak Puas'},
{rating:3,emoji:'😐',label:'Netral'},
{rating:4,emoji:'🙂',label:'Puas'},
{rating:5,emoji:'😄',label:'Sangat Puas'}
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

const service=services[currentQuestion]

const progress=
((currentQuestion+1)/services.length)*100

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
bg-white/85
backdrop-blur-xl
rounded-xl sm:rounded-2xl
lg:rounded-3xl
border
border-white/60
shadow-[0_15px_40px_rgba(0,0,0,0.08)]
p-4 sm:p-5 md:p-6 lg:p-7
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

<div className="relative z-10">

<div className="mb-4 sm:mb-5 md:mb-6">

<div className="
w-full
h-2 sm:h-2.5 md:h-3 lg:h-4
bg-slate-100
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

</div>

<div className="
inline-flex
items-center
gap-2
bg-slate-100
px-3 sm:px-4
py-2 sm:py-2.5
rounded-full
text-xs sm:text-sm
text-slate-600
mb-4 sm:mb-5 md:mb-6
">

<div className="
w-2 h-2
rounded-full
bg-orange-500
"/>

Pertanyaan {currentQuestion+1}
dari {services.length}

</div>

<h3 className="
text-orange-500
font-black
text-lg sm:text-2xl
md:text-3xl lg:text-4xl
mb-3 sm:mb-4 md:mb-5
">

{service.name}

</h3>

<p className="
text-slate-600
leading-relaxed
mb-4 sm:mb-5 md:mb-6
text-xs sm:text-sm md:text-base
">

{service.question}

</p>

<div className={`
flex
flex-col
items-center
justify-center
gap-2

p-4 sm:p-5 md:p-6 lg:p-7

rounded-xl sm:rounded-2xl md:rounded-3xl
border-2
mb-4 sm:mb-5 md:mb-6

min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[240px]

shadow-lg
transition-all
duration-300

${colors.bg}
${colors.border}
`}>

{

!hasDetectedFace ? (

<>

<div className="
text-4xl sm:text-5xl
md:text-6xl lg:text-7xl
animate-pulse
">
📷
</div>

<h3 className="
text-base sm:text-lg
md:text-xl lg:text-2xl
font-bold
text-center
">
Menunggu Deteksi Wajah...
</h3>

<p className="
text-xs sm:text-xs md:text-sm
text-slate-500
text-center
">
Arahkan wajah ke kamera
</p>

</>

)

:

currentEmotion ? (

<>

<span className="
text-5xl
sm:text-6xl
lg:text-7xl
">

{
EMOTION_EMOJI[currentEmotion]
}

</span>

<span className={`
font-bold
text-lg
sm:text-xl
lg:text-2xl
${colors.text}
`}>

{
EMOTION_LABELS[currentEmotion]
}

</span>

<p className="
text-xs
sm:text-sm
text-slate-400
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
text-slate-500
">
Memproses deteksi...
</p>

</>

)

}

</div>

<div className="
text-center
mb-3
sm:mb-4
">

<button
onClick={handleToggleManual}
className="
text-xs
sm:text-sm
text-slate-400
hover:text-indigo-600
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
grid-cols-2
xs:grid-cols-3
sm:grid-cols-5
gap-2
sm:gap-3
mb-4
sm:mb-5
">

{
MANUAL_RATINGS.map(({
rating,
emoji,
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
p-2
sm:p-3
rounded-xl
sm:rounded-2xl
border
bg-white
hover:scale-105
transition-all
shadow-sm
"
>

<div className="text-3xl sm:text-4xl">
{emoji}
</div>

<div className="
text-[10px] sm:text-xs
font-medium
mt-1
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
text-slate-600
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
p-3
sm:p-4
rounded-xl
sm:rounded-2xl
border
border-slate-200
bg-white
focus:border-orange-400
outline-none
resize-none
h-24
sm:h-28
lg:h-32
text-sm
"
/>

<p className="
text-xs
text-slate-400
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
bg-red-50
border
border-red-200
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
text-red-600
text-sm
sm:text-base
">
Komentar diperlukan
</p>

<p className="
text-xs
sm:text-sm
text-slate-500
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
py-2
sm:py-3
lg:py-4
rounded-xl
sm:rounded-2xl
transition-all
duration-300
shadow-xl
text-sm
sm:text-base
hover:shadow-2xl
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
text-xs
text-slate-400
mt-3
sm:mt-4
">
Masukan Anda membantu meningkatkan kualitas layanan kampus
</p>

</div>

</div>

)

}