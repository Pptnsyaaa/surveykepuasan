import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Smile,
  SmilePlus,
  Meh,
  Frown,
  Angry,
  CheckCircle2,
  Star
} from 'lucide-react'

export default function ResultPanel({
  responses,
  averageRating,
  onReset
}) {

  const [countdown,setCountdown]=
  useState(10)

  useEffect(()=>{

    const interval=
    setInterval(()=>{

      setCountdown(prev=>{

        if(prev<=1){

          clearInterval(interval)

          onReset()

          return 0

        }

        return prev-1

      })

    },1000)

    return()=>clearInterval(
      interval
    )

  },[])

  const getEmoji=(rating)=>{
    if(rating===5) return <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 inline" />
    if(rating===4) return <SmilePlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 inline" />
    if(rating===3) return <Meh className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 inline" />
    if(rating===2) return <Frown className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 inline" />
    return <Angry className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 inline" />
  }

  const getLabel=(rating)=>{

    if(rating===5)
    return 'Sangat Puas'

    if(rating===4)
    return 'Puas'

    if(rating===3)
    return 'Netral'

    if(rating===2)
    return 'Tidak Puas'

    return 'Sangat Tidak Puas'

  }

return(

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.4
}}

className="

max-w-2xl sm:max-w-3xl lg:max-w-4xl
mx-auto

bg-white/95 dark:bg-slate-900/85
dark:border dark:border-slate-700/70
backdrop-blur-xl

rounded-2xl sm:rounded-3xl lg:rounded-[32px]

shadow-xl

p-4 sm:p-6 md:p-8 lg:p-10

"

>

{/* HEADER */}

<div className="
text-center
mb-6 sm:mb-8
">

<div className="
w-14 sm:w-16
h-14 sm:h-16

rounded-full

bg-orange-50 dark:bg-orange-950/30

flex
items-center
justify-center

mx-auto
mb-4 sm:mb-5
">

<span className="flex items-center justify-center">
<CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
</span>

</div>

<h2 className="
text-2xl sm:text-3xl lg:text-4xl
font-black
text-slate-800 dark:text-white
mb-2 sm:mb-3
">

Terima kasih

</h2>

<p className="
text-xs sm:text-sm
text-slate-500 dark:text-slate-300
leading-relaxed
max-w-xl
mx-auto
">

Masukan Anda membantu
meningkatkan kualitas
layanan kampus

</p>

</div>

{/* SCORE */}

<div className="

bg-orange-50 dark:bg-slate-800/80 dark:border dark:border-slate-700/60

rounded-2xl sm:rounded-3xl

p-4 sm:p-6 md:p-8

mb-6 sm:mb-8

text-center

">

<p className="
text-slate-600 dark:text-slate-300
text-xs sm:text-sm
mb-2
">

Rata-rata Kepuasan

</p>

<h3 className="
text-4xl sm:text-5xl lg:text-6xl
font-black
text-orange-500
mb-2 sm:mb-3
">

{averageRating}

</h3>

<div className="
flex
justify-center
gap-1
">

{[1,2,3,4,5].map(i=>(

<span

key={i}

className={`
text-lg sm:text-2xl

${
i<=Math.round(
averageRating
)

?

'text-amber-400'

:

'text-slate-300'

}

`}
>
<Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
</span>

))}

</div>

</div>

{/* RESPONSES */}

<div className="
space-y-2 sm:space-y-3
mb-6 sm:mb-8
">

<h3 className="
text-base sm:text-lg
font-bold
text-slate-800 dark:text-slate-100
mb-3 sm:mb-4
">

Ringkasan Penilaian

</h3>

{

responses.map((response,index)=>(

<div

key={index}

className="
border
border-slate-200 dark:border-slate-700/70
rounded-lg sm:rounded-2xl
p-3 sm:p-4
bg-white/70 dark:bg-slate-800/70
"

>

<div className="
flex
justify-between
items-center
mb-3
">

<div>

<h4 className="
font-semibold
text-sm sm:text-base
text-slate-800 dark:text-slate-100
">

{response.serviceName}

</h4>

<p className="
text-xs
text-slate-500 dark:text-slate-400
">

{getLabel(
response.rating
)}

</p>

</div>

<span className="
text-2xl sm:text-3xl
">

{
getEmoji(
response.rating
)
}

</span>

</div>

<div className="
flex
gap-1
mb-3
">

{

[1,2,3,4,5]
.map(i=>(

<span

key={i}

className={`
text-base sm:text-lg

${
i<=response.rating

?

'text-amber-400'

:

'text-slate-300'

}

`}

>
<Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
</span>

))

}

</div>

{

response.comment &&(

<div className="
bg-slate-50 dark:bg-slate-700/60
rounded-lg sm:rounded-xl
p-2 sm:p-3
text-xs sm:text-sm
text-slate-700 dark:text-slate-200
">

💬 {response.comment}

</div>

)

}

</div>

))

}

</div>

{/* COUNTDOWN */}

<div className="
text-center

bg-slate-50 dark:bg-slate-800/70

rounded-lg sm:rounded-2xl

p-3 sm:p-4
">

<p className="
text-xs sm:text-sm
text-slate-600 dark:text-slate-300
mb-1 sm:mb-2
">

Mengalihkan ke halaman awal dalam

</p>

<h2 className="
text-2xl sm:text-3xl lg:text-4xl
font-black
text-orange-500 dark:text-orange-400
">

{countdown}

</h2>

</div>

</motion.div>

)

}