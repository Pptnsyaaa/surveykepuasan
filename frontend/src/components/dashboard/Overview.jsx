import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function Overview({
data,
services,
darkMode,
notifications
})
{

console.log(
"DATA MASUK OVERVIEW:",
data
)

const [openNotif, setOpenNotif] = useState(false)

const [notifData, setNotifData] = useState([])

const lastId=useRef(null)
const totalData = data?.length || 0

// ======================
// LOAD NOTIFICATION
// ======================

useEffect(() => {

  // notif yang dihapus
  const deletedNotif =
    JSON.parse(
      localStorage.getItem(
        'deletedNotif'
      )
    ) || []

  // notif yang sudah dibaca
  const readNotif =
    JSON.parse(
      localStorage.getItem(
        'readNotif'
      )
    ) || []

  // filter notif
  const filteredNotif =
    (notifications || [])

      .filter(item =>
        !deletedNotif.includes(item.id)
      )

      .map(item => ({

        ...item,

        read:
          readNotif.includes(item.id)

      }))

  setNotifData(filteredNotif)

}, [notifications])

// ======================
// NOTIFICATION ACTION
// ======================

const unreadCount =
  notifData.filter(
    item => !item.read
  ).length

const toggleNotif = () => {

  const newState = !openNotif

  setOpenNotif(newState)

  // notif dibuka
  if (newState) {

    const updatedNotif =
      notifData.map(item => ({

        ...item,

        read: true

      }))

    setNotifData(updatedNotif)

    // simpan ID notif read
    localStorage.setItem(

      'readNotif',

      JSON.stringify(

        updatedNotif.map(
          item => item.id
        )

      )

    )

  }

}

const deleteNotif = (id) => {

  // ambil notif yang sudah dihapus
  const deletedNotif =
    JSON.parse(
      localStorage.getItem(
        'deletedNotif'
      )
    ) || []

  // simpan ID notif
  localStorage.setItem(

    'deletedNotif',

    JSON.stringify([
      ...deletedNotif,
      id
    ])

  )

  // update state
  setNotifData(prev =>

    prev.filter(
      item => item.id !== id
    )

  )

}

const deleteAllNotif = () => {

  const allIds =
    notifData.map(
      item => item.id
    )

  const deletedNotif =
    JSON.parse(
      localStorage.getItem(
        'deletedNotif'
      )
    ) || []

  localStorage.setItem(

    'deletedNotif',

    JSON.stringify([
      ...deletedNotif,
      ...allIds
    ])

  )

  setNotifData([])

}

// ======================
// SAVE READ STATUS
// ======================

useEffect(() => {

  localStorage.setItem(
    'notifReadStatus',
    JSON.stringify(notifData)
  )

}, [notifData])

useEffect(()=>{

if(!data?.length) return

const terbaru=data[0]

console.log(
"ID TERBARU:",
terbaru.id
)

console.log(
"ID LAMA:",
lastId.current
)


lastId.current=terbaru.id

},[data])

// ======================
// REFS
// ======================

  // ======================
  // REFS
  // ======================

  const barRef = useRef(null)
  const radarRef = useRef(null)
  const pieRef = useRef(null)

  const barChart = useRef(null)
  const radarChart = useRef(null)
  const pieChart = useRef(null)

  // ======================
  // STATS
  // ======================

  
  console.log("DATA PERTAMA:", data[0])
  console.log("RESPONSES:", data[0]?.responses)

  const avgRating =
      totalData > 0
      ? (
      data.reduce(
      (a,d)=>
      a+Number(d.average_rating || 0),
      0
      )
      /totalData
      ).toFixed(2)
      :0

  const satisfied =
      data.filter(
      d=>
      Number(d.average_rating)>=4
      ).length

  const satisfactionRate =
  totalData > 0
      ? Math.round(
          (satisfied / totalData) * 100
        )
      : 0

  // ======================
  // EMOTION
  // ======================

  const emotions = {

    sangatPuas: 0,
    puas: 0,
    netral: 0,
    tidakPuas: 0,
    sangatTidakPuas: 0

  }

  data.forEach(d => {

    d.responses?.forEach(r => {

      if (r.rating === 5)
        emotions.sangatPuas++

      else if (r.rating === 4)
        emotions.puas++

      else if (r.rating === 3)
        emotions.netral++

      else if (r.rating === 2)
        emotions.tidakPuas++

      else
        emotions.sangatTidakPuas++

    })

  })

  // ======================
  // SERVICE ANALYSIS
  // ======================

  const serviceRatings = {}

  services.forEach(s => {

    serviceRatings[s.name] = []

  })

  data.forEach(d =>

    d.responses?.forEach(r => {

      const service =
        services.find(
          s =>
            s.id === r.serviceId
        )

      if (service) {

        serviceRatings[
          service.name
        ].push(r.rating)

      }

    })

  )

  const averageServices =

    Object.entries(serviceRatings)
      .map(([name, ratings]) => ({

        name,

        avg:

          ratings.length > 0

            ? ratings.reduce(
                (a, b) => a + b,
                0
              ) / ratings.length

            : 0

      }))

  const bestService =
    [...averageServices]
      .sort(
        (a, b) => b.avg - a.avg
      )[0]

  const worstService =
    [...averageServices]
      .sort(
        (a, b) => a.avg - b.avg
      )[0]

  // ======================
  // CHART
  // ======================

  useEffect(() => {

    

    

    // ======================
    // BAR
    // ======================

    const distribution =
      [0, 0, 0, 0, 0]

    data.forEach(d =>

      d.responses?.forEach(r => {

        distribution[
          r.rating - 1
        ]++

      })

    )

    if (barChart.current)
      barChart.current.destroy()

    if (barRef.current) {

      barChart.current =
        new Chart(barRef.current, {

          type: 'bar',

          data: {

            labels: [

              '1 ⭐',
              '2 ⭐',
              '3 ⭐',
              '4 ⭐',
              '5 ⭐'

            ],

            datasets: [

              {

                data: distribution,

                backgroundColor: [

                  '#ef4444',
                  '#f97316',
                  '#eab308',
                  '#3b82f6',
                  '#22c55e'

                ],

                borderRadius: 12

              }

            ]

          },

          options: {

            responsive: true,

            plugins: {

              legend: {

                display: false

              }

            },

            scales: {

              y: {

                beginAtZero: true,

                ticks: {

                  color:
                    darkMode
                      ? '#cbd5e1'
                      : '#475569'

                },

                grid: {

                  color:
                    darkMode
                      ? 'rgba(255,255,255,0.08)'
                      : '#e2e8f0'

                }

              },

              x: {

                ticks: {

                  color:
                    darkMode
                      ? '#cbd5e1'
                      : '#475569'

                },

                grid: {

                  display: false

                }

              }

            }

          }

        })

    }

    // ======================
    // RADAR
    // ======================

    const radarServices = {}

    services.forEach(s => {

      radarServices[s.id] = {

        sum: 0,
        count: 0

      }

    })

    data.forEach(d =>

      d.responses?.forEach(r => {

        if (
          radarServices[
            r.serviceId
          ]
        ) {

          radarServices[
            r.serviceId
          ].sum += r.rating

          radarServices[
            r.serviceId
          ].count++

        }

      })

    )

    const radarData =
      services.map(s => {

        const sr =
          radarServices[s.id]

        return sr.count > 0

          ? (
              sr.sum / sr.count
            ).toFixed(2)

          : 0

      })

    if (radarChart.current)
      radarChart.current.destroy()

    if (radarRef.current) {

      radarChart.current =
        new Chart(radarRef.current, {

          type: 'radar',

          data: {

            labels:
              services.map(
                s => s.name
              ),

            datasets: [

              {

                label: 'Rating',

                data: radarData,

                backgroundColor:
                  'rgba(99,102,241,0.2)',

                borderColor:
                  '#6366f1',

                pointBackgroundColor:
                  '#8b5cf6'

              }

            ]

          },

          options: {

            responsive: true,

            scales: {

              r: {

                beginAtZero: true,

                max: 5,

                ticks: {

                  color:
                    darkMode
                      ? '#cbd5e1'
                      : '#475569'

                },

                grid: {

                  color:
                    darkMode
                      ? 'rgba(255,255,255,0.08)'
                      : '#e2e8f0'

                },

                pointLabels: {

                  color:
                    darkMode
                      ? '#fff'
                      : '#334155'

                }

              }

            }

          }

        })

    }

    // ======================
    // PIE
    // ======================

    if (pieChart.current)
      pieChart.current.destroy()

    if (pieRef.current) {

      pieChart.current =
        new Chart(pieRef.current, {

          type: 'pie',

          data: {

            labels: [

              'Sangat Puas',
              'Puas',
              'Netral',
              'Tidak Puas',
              'Sangat Tidak Puas'

            ],

            datasets: [

              {

                data: [

                  emotions.sangatPuas,
                  emotions.puas,
                  emotions.netral,
                  emotions.tidakPuas,
                  emotions.sangatTidakPuas

                ],

                backgroundColor: [

                  '#22c55e',
                  '#3b82f6',
                  '#eab308',
                  '#f97316',
                  '#ef4444'

                ],

                borderWidth: 0

              }

            ]

          },

          options: {

            responsive: true,

            plugins: {

              legend: {

                labels: {

                  color:
                    darkMode
                      ? '#fff'
                      : '#111',

                  font: {

                    size: 14,
                    weight: 'bold'

                  }

                }

              }

            }

          }

        })

    }
    
    return () => {

      barChart.current?.destroy()
      radarChart.current?.destroy()
      pieChart.current?.destroy()

    }

  }, [data, darkMode])

  // ======================
  // UI
  // ======================

  return (

<div className="w-full space-y-6 relative">


{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-6
relative
">

  {/* KIRI */}
  <div>

    <h1 className="text-4xl font-bold">
      Dashboard Admin
    </h1>

    <p className="text-slate-500 mt-2">
      Monitoring data survei secara realtime
    </p>

  </div>


  {/* KANAN */}
  <div className="
  flex
  items-center
  gap-3
  relative
  ">

    {/* NOTIF */}
    <button
      onClick={toggleNotif}

      className="
      relative
      w-12
      h-12
      bg-white
      rounded-2xl
      border
      border-slate-100
      shadow-sm
      flex
      justify-center
      items-center
      "
    >

      🔔

     {unreadCount > 0 && (

          <span
          className="
          absolute
          top-1
          right-1
          w-3
          h-3
          bg-red-500
          rounded-full
          border-2
          border-white
          animate-pulse
          "
          />

          )}

    </button>


    {/* STATUS */}
    <div className="
    bg-white
    rounded-2xl
    px-4
    py-3
    shadow-sm
    border
    border-slate-100
    ">

      <div className="
      flex
      items-center
      gap-2
      ">

        <div className="
        w-2
        h-2
        rounded-full
        bg-green-500
        animate-pulse
        "/>

        <p className="text-sm font-medium">
          Sistem aktif
        </p>

      </div>

      <p className="
      text-xs
      text-slate-400
      mt-1
      ">
        {new Date().toLocaleDateString('id-ID')}
      </p>

    </div>


    {/* POPUP */}

{openNotif && (

<div
className="
absolute
top-16
right-0
w-[360px]
max-h-[500px]
overflow-y-auto

bg-white
rounded-3xl
shadow-2xl
border
border-slate-200

z-50
animate-in
fade-in
slide-in-from-top-2

"
>

{/* HEADER */}

<div className="
flex
items-center
justify-between
px-5
py-4
border-b
border-slate-100
sticky
top-0
bg-white
rounded-t-3xl
z-10
">

<div>

<h3 className="
font-bold
text-lg
">
Notifikasi
</h3>

<p className="
text-xs
text-slate-400
">
{notifData.length} notifikasi
</p>

</div>

{notifData.length > 0 && (

<button
onClick={deleteAllNotif}
className="
text-xs
text-red-500
hover:text-red-700
font-semibold
"
>
Hapus Semua
</button>

)}

</div>

{/* LIST */}

<div className="p-4 space-y-3">

{notifData.length === 0 ? (

<div className="
py-10
text-center
text-slate-400
text-sm
">
Tidak ada notifikasi
</div>

) : (

notifData.map((item,index)=>(

<div
key={index}
className={`
group
relative

rounded-2xl
p-4

border
transition-all
duration-300

hover:shadow-md

${
item.read
? 'bg-slate-50 border-slate-100'
: 'bg-indigo-50 border-indigo-100'
}
`}
>

{/* DOT */}

{!item.read && (

<div className="
absolute
top-4
right-4

w-2
h-2

bg-red-500
rounded-full
animate-pulse
"/>

)}

{/* PESAN */}

<p className="
text-sm
font-semibold
text-slate-700
pr-5
">
{item.pesan}
</p>

{/* TANGGAL */}

<p className="
text-xs
text-slate-400
mt-2
">
{new Date(item.created_at)
.toLocaleString("id-ID")}
</p>

{/* ACTION */}

<div className="
flex
justify-end
mt-3
">

<button
onClick={() =>
deleteNotif(item.id)
}
className="
text-xs
px-3
py-1

rounded-lg

bg-red-50
text-red-500

hover:bg-red-100
transition
"
>
Hapus
</button>

</div>

</div>

))

)}

</div>

</div>

)}

  </div>

</div>

{/* CARD ATAS */}

<div className="
grid
grid-cols-2
gap-2 sm:gap-3 md:gap-4 lg:gap-5
">
{[
{
icon:'👥',
value:totalData,
label:'Total Responden',
color:'from-blue-500 to-cyan-500'
},

{
icon:'⭐',
value:`${avgRating}/5`,
label:'Rating Rata-rata',
color:'from-yellow-400 to-orange-500'
},

{
icon:'😄',
value:`${satisfactionRate}%`,
label:'Tingkat Kepuasan',
color:'from-pink-500 to-purple-500'
},

{
icon:'📡',
value:'Realtime',
label:'Monitoring',
color:'from-green-500 to-emerald-500'
}

].map((item,i)=>(

<div
className={`
relative
overflow-hidden

rounded-lg sm:rounded-2xl lg:rounded-3xl
p-3 sm:p-4 md:p-5 lg:p-6

border

shadow-sm
hover:shadow-2xl

hover:-translate-y-2
hover:scale-[1.02]

duration-300
transition-all

before:absolute
before:inset-0

before:bg-gradient-to-r
before:from-indigo-500/0
before:via-indigo-500/5
before:to-purple-500/0

before:opacity-0
hover:before:opacity-100

${
darkMode
? 'bg-slate-800 border-slate-700 text-white'
: 'bg-white border-slate-100'
}
`}
>

<div className="
flex
items-center
justify-between
gap-2 sm:gap-3 md:gap-4 lg:gap-6
">

<div>

<p className="
text-xs sm:text-sm
text-slate-400
mb-1 sm:mb-2
">
{item.label}
</p>

<h2 className="
text-xl sm:text-2xl md:text-3xl lg:text-4xl
font-bold
">

{
typeof item.value === "number"

? (

<CountUp
end={item.value}
duration={2}
/>

)

: item.value
}

</h2>

<div className="
flex
items-center
gap-1 sm:gap-2
mt-2 sm:mt-3
">

<div className="
w-1.5 sm:w-2
h-1.5 sm:h-2
bg-green-500
rounded-full
animate-pulse
"/>

<div className="
flex
items-center
gap-0.5 sm:gap-1
text-[10px] sm:text-[11px]
text-emerald-500
font-medium
">

<span>↑</span>

<span>
+12% minggu ini
</span>

</div>

</div>

</div>


<div className={`
w-10 sm:w-12 md:w-14 lg:w-16
h-10 sm:h-12 md:h-14 lg:h-16
rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl

ml-1 sm:ml-2 md:ml-3 lg:ml-4

bg-gradient-to-br
${item.color}

flex
items-center
justify-center

text-lg sm:text-2xl md:text-3xl lg:text-4xl
text-white
shadow-lg
`}>

{item.icon}

</div>

</div>

</div>

))
}

</div>


{/* STATUS + INSIGHT */}

<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-5
">

{/* STATUS */}

<div

className={`

rounded-2xl
p-5

shadow-sm
border

${
darkMode

?

'bg-slate-800 border-slate-700 text-white'

:

'bg-white border-slate-100'

}

`}

>

<h3 className="
font-bold
mb-4
">

Status Sistem

</h3>

<div className="
space-y-3
text-sm
">

<div className="
flex
justify-between
">

<span>Total Data</span>

<b>{totalData}</b>

</div>

<div className="
flex
justify-between
">

<span>Status</span>

<span className="
text-green-500
font-semibold
">

Aktif

</span>

</div>

<div className="
flex
justify-between
">

<span>Layanan Terbaik</span>

<b>

{bestService?.name || '-'}

</b>

</div>

<div className="
flex
justify-between
">

<span>Kepuasan</span>

<b>

{satisfactionRate}%

</b>

</div>

</div>

</div>


{/* INSIGHT */}

<div

className={`

rounded-2xl
p-5

shadow-sm
border

${
darkMode

?

'bg-slate-800 border-slate-700 text-white'

:

'bg-white border-slate-100'

}

`}

>

<h3 className="
font-bold
mb-4
">

Insight Cepat

</h3>

<div className="
space-y-3
text-sm
">

<div>

😄 Emosi:

<b className="ml-2">

{

Object.entries(
emotions || {}
)

.sort(
(a,b)=>
b[1]-a[1]
)

[0]?.[0]

||

'-'

}

</b>

</div>

<div>

🏆 Terbaik:

<b className="ml-2">

{bestService?.name || '-'}

</b>

</div>

<div>

⚠️ Evaluasi:

<b className="ml-2">

{worstService?.name || '-'}

</b>

</div>

</div>

</div>

</div>



{/* CHART */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-4 md:gap-5
items-start
">

<div

className={`

rounded-lg sm:rounded-2xl
p-3 sm:p-4
min-h-[300px] sm:min-h-[340px]

shadow-sm
border

${
darkMode

?

'bg-slate-800 border-slate-700'

:

'bg-white border-slate-100'

}

`}

>

<h3 className="
font-bold
text-sm sm:text-base
mb-4 sm:mb-5
">

Distribusi Rating

</h3>

<div className="h-[250px] sm:h-[300px] w-full flex items-center">
  <canvas
    ref={barRef}
    style={{
      maxHeight: "300px",
      width: "100%"
    }}
  />
</div>

</div>


<div

className={`

rounded-lg sm:rounded-2xl
p-3 sm:p-4
min-h-[300px] sm:min-h-[340px]

shadow-sm
border

${
darkMode

?

'bg-slate-800 border-slate-700'

:

'bg-white border-slate-100'

}

`}

>

<h3 className="
font-bold
text-sm sm:text-base
mb-4 sm:mb-5
">

Rating per Layanan

</h3>

<div className="h-[250px] sm:h-[300px] w-full flex items-center justify-center">
  <canvas
    ref={radarRef}
    style={{
      maxHeight: "280px",
      maxWidth: "320px",
      width: "100%"
    }}
  />
</div>

</div>

</div>

{/* PIE */}

<div
className={`
rounded-lg sm:rounded-2xl
p-3 sm:p-4
min-h-[300px] sm:min-h-[340px]

shadow-sm
border

${
darkMode
? 'bg-slate-800 border-slate-700'
: 'bg-white border-slate-100'
}
`}
>

<div className="
flex
items-center
justify-between
mb-3 sm:mb-4
flex-col sm:flex-row
gap-2
">

<h3 className="
font-bold
text-base sm:text-lg
">

Sebaran Kepuasan

</h3>

<span className="
text-xs
px-2 sm:px-3
py-1
rounded-full
bg-indigo-50
text-indigo-500
">

Realtime

</span>

</div>


<div className="
h-[250px] sm:h-[300px]
flex
items-center
justify-center
">

<div className="
w-[260px] sm:w-[300px]
max-w-full
">

<canvas
ref={pieRef}
style={{
width:'100%',
maxHeight:'280px'
}}
/>

</div>

</div>

</div>

</div>

)

}