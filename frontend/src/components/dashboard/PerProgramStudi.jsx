import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)


const getRatingClass = (r) => {

  if (r >= 4.5)
    return 'bg-green-100 text-green-700'

  if (r >= 3.5)
    return 'bg-blue-100 text-blue-700'

  if (r >= 2.5)
    return 'bg-yellow-100 text-yellow-700'

  return 'bg-red-100 text-red-700'
}

export default function PerProgramStudi({

  data,
  darkMode

}) {

  const chartRef = useRef(null)

  const chartInstance =
    useRef(null)

  // ======================
  // FORMAT DATA
  // ======================

  const facultyData = {}

  const allJurusan = [
"TI",
"TM",
"TO",
"TEI"
]

allJurusan.forEach(j => {

facultyData[j] = {

ratings: [],
count: 0

}

})

  data.forEach(d => {

    const f =
      (
      d.fakultas ||
      d.student?.fakultas ||
      d.jurusan ||
      ''
      )
      .trim()
      .toUpperCase()

    if (!f) return

    // hanya izinkan jurusan resmi
      if (!allJurusan.includes(f)) {
        return
      }

    facultyData[f].count++

    facultyData[f].ratings.push(
      parseFloat(
      d.average_rating ||
      d.averageRating ||
      0
      )
      )

  })

  const labels =
Object.keys(
facultyData
)

  // ======================
  // CHART
  // ======================

  useEffect(() => {

    const avgData =
      labels.map(f => {

        const r =
          facultyData[f].ratings

        return r.length>0

    ?

    (
    r.reduce((a,b)=>a+b,0)
    /r.length
    ).toFixed(2)

    :0

      })

    if (chartInstance.current)
      chartInstance.current.destroy()

    if (chartRef.current) {

      chartInstance.current =
        new Chart(chartRef.current, {

          type: 'bar',

          data: {

            labels,

            datasets: [

              {

                label:
                  'Rating Rata-rata',

                data: avgData,

                backgroundColor: [

                  '#4f46e5',
                  '#7c3aed',
                  '#2563eb',
                  '#0891b2'

                ],

                borderRadius: 12,

                borderSkipped: false

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

    return () =>
      chartInstance.current?.destroy()

  }, [data, darkMode])

  // ======================
  // UI
  // ======================

  return (

    <div className="space-y-6 sm:space-y-8">
{/* SUMMARY CARD */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">

<div className="
bg-white
rounded-xl sm:rounded-3xl
shadow-lg
p-4 sm:p-5 md:p-6
border
cursor-pointer
hover:-translate-y-1
hover:shadow-xl
transition-all
duration-300
">

<p className="text-slate-500 text-xs sm:text-sm">
📚 Jumlah Program Studi
</p>

<h2 className="
text-2xl sm:text-3xl
font-black
text-indigo-600
mt-2
">

{labels.length}

</h2>

<p className="text-xs text-slate-400 mt-1">
Program Studi aktif
</p>

</div>



<div className="
bg-white
rounded-xl sm:rounded-3xl
shadow-lg
p-4 sm:p-5 md:p-6
border
border-slate-100
cursor-pointer
hover:-translate-y-1
hover:shadow-xl
transition-all
duration-300
">

<p className="text-slate-500 text-xs sm:text-sm">
⭐ Rating Tertinggi
</p>

<h2 className="
text-2xl
font-black
text-yellow-500
mt-2
">

{

labels.length>0 ?

labels.reduce((a,b)=>{

const avgA=

facultyData[a].ratings.reduce(
(x,y)=>x+y,0
)/facultyData[a].ratings.length

const avgB=

facultyData[b].ratings.reduce(
(x,y)=>x+y,0
)/facultyData[b].ratings.length

return avgA>avgB?a:b

})

:

'-'

}

</h2>

<p className="text-xs text-slate-400 mt-1">
Rating tertinggi
</p>

</div>



<div className="
bg-white
rounded-xl sm:rounded-3xl
shadow-lg
p-4 sm:p-5 md:p-6
border
border-slate-100
cursor-pointer
hover:-translate-y-1
hover:shadow-xl
transition-all
duration-300
">

<p className="text-slate-500 text-xs sm:text-sm">
🚀 Program Studi Teraktif
</p>

<h2 className="
text-2xl sm:text-3xl
font-black
text-purple-600
mt-2
">

{

labels.length>0 ?

labels.reduce((a,b)=>

facultyData[a].count>

facultyData[b].count

?a:b

)

:

'-'

}

</h2>

<p className="text-xs text-slate-400 mt-1">
Responden terbanyak
</p>

</div>

</div>

      {/* CARD CHART */}

      <div className={`

        rounded-xl sm:rounded-2xl md:rounded-3xl

        p-4 sm:p-5 md:p-6 lg:p-8

        shadow-2xl

        border

        transition-all

        ${

          darkMode

            ? `
              bg-white/10
              backdrop-blur-2xl
              border-white/10
            `

            : `
              bg-white
              border-slate-200
            `

        }

      `}>

        <div className="
          flex
          items-center
          justify-between
          mb-4 sm:mb-6
          flex-col sm:flex-row
          gap-4
        ">

          <div>

            <h2 className={`

              text-2xl sm:text-3xl
              font-black
              mb-2

              ${

                darkMode
                  ? 'text-white'
                  : 'text-slate-800'

              }

            `}>

              Statistik Jurusan

            </h2>

            <p className={`

              ${

                darkMode
                  ? 'text-slate-300'
                  : 'text-slate-500'

              }

            `}>

              Perbandingan tingkat kepuasan
              mahasiswa berdasarkan Program Studi.

            </p>

          </div>

        </div>

        <div className="h-[300px]">
        <canvas ref={chartRef}/>
      </div>

      </div>

      {/* TABLE */}

      <div className={`

        rounded-3xl

        overflow-hidden

        shadow-2xl

        border

        ${

          darkMode

            ? `
              bg-white/10
              backdrop-blur-2xl
              border-white/10
            `

            : `
              bg-white
              border-slate-200
            `

        }

      `}>

        {/* HEADER */}

        <div className={`

          px-8
          py-6

          border-b

          ${

            darkMode
              ? 'border-white/10'
              : 'border-slate-100'

          }

        `}>

          <h2 className={`

            text-2xl
            font-black

            ${

              darkMode
                ? 'text-white'
                : 'text-slate-800'

            }

          `}>

            Detail Statistik Program Studi

          </h2>

        </div>

        {/* TABLE */}

        <div className="
          overflow-x-auto
        ">

          <table className="
            w-full
          ">

            <thead className={`

              ${

                darkMode
                  ? 'bg-white/5'
                  : 'bg-slate-50'

              }

            `}>

              <tr>

                {

                  [

                    'Program Studi',
                    'Total Responden',
                    'Rata-rata Rating',
                    'Kepuasan'

                  ].map(h => (

                    <th

                      key={h}

                      className={`

                        text-left

                        px-6
                        py-4

                        text-sm
                        font-bold

                        ${

                          darkMode
                            ? 'text-slate-200'
                            : 'text-slate-700'

                        }

                      `}
                    >

                      {h}

                    </th>

                  ))

                }

              </tr>

            </thead>

            <tbody>

              {

                labels.map(f => {

                  const d =
                    facultyData[f]

                  const avg = d.ratings.length > 0

? (

                d.ratings.reduce(
                (a,b)=>a+b,
                0
                )

                /

                d.ratings.length

                ).toFixed(2)

                : 0

                  const rate =
                    d.ratings.length > 0

                    ?

                    Math.round(

                    d.ratings.filter(
                    r=>r>=4
                    ).length

                    /

                    d.ratings.length

                    *100

                    )

                    :0

                  return (

                    <tr

                      key={f}

                      className={`

                        border-t

                        transition-all

                        hover:scale-[1.01]

                        ${

                          darkMode

                            ? `
                              border-white/5
                              hover:bg-white/5
                            `

                            : `
                              border-slate-100
                              hover:bg-slate-50
                            `

                        }

                      `}
                    >

                      <td className={`

                        px-6
                        py-5

                        font-semibold

                        ${

                          darkMode
                            ? 'text-white'
                            : 'text-slate-800'

                        }

                      `}>

                        {f}

                      </td>

                      <td className={`

                        px-6
                        py-5

                        ${

                          darkMode
                            ? 'text-slate-300'
                            : 'text-slate-600'

                        }

                      `}>

                        {d.count}

                      </td>

                      <td className="
                        px-6
                        py-5
                      ">

                        <span className={`

                          px-5
                          py-2

                          rounded-full

                          font-bold
                          text-sm

                          inline-flex
                          items-center
                          gap-2

                          ${getRatingClass(avg)}

                        `}>

                          ⭐ {avg}

                        </span>

                      </td>

                      <td className="
                        px-6
                        py-5
                      ">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <div className="
                            flex-1
                            h-3
                            rounded-full
                            bg-slate-200
                            overflow-hidden
                          ">

                            <div

                              className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-indigo-500
                                to-purple-500
                              "

                              style={{
                                width: `${rate}%`
                              }}

                            />

                          </div>

                          <span className={`

                            font-bold

                            ${

                              darkMode
                                ? 'text-white'
                                : 'text-slate-700'

                            }

                          `}>

                            {rate}%

                          </span>

                        </div>

                      </td>

                    </tr>

                  )

                })

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}