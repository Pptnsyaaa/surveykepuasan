import { useEffect, useRef, useState } from 'react'
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

export default function PerLayanan({

  data,
  services,
  darkMode

}) {

  const chartRef =
    useRef(null)

  const chartInstance =
    useRef(null)

  // ======================
  // FORMAT DATA
  // ======================

  const serviceData = {}

  services.forEach(s => {

    serviceData[s.id] = {

      ratings: []

    }

  })

  data.forEach(d =>

    d.responses?.forEach(r => {

      if (
        serviceData[r.serviceId]
      ) {

        serviceData[
          r.serviceId
        ].ratings.push(
          r.rating
        )

      }

    })

  )

  // ======================
  // CHART
  // ======================

  useEffect(() => {

    const avgData =
      services.map(s => {

        const r =
          serviceData[s.id]
            .ratings

        return r.length > 0

          ? (
              r.reduce(
                (a, b) => a + b,
                0
              ) / r.length
            ).toFixed(2)

          : 0

      })

    if (chartInstance.current)
      chartInstance.current.destroy()

    if (chartRef.current) {

      chartInstance.current =
        new Chart(chartRef.current, {

          type: 'bar',

          data: {

            labels:
              services.map(
                s => s.name
              ),

            datasets: [

              {

                label:
                  'Rating Rata-rata',

                data: avgData,

                backgroundColor: [

                  '#4f46e5',
                  '#7c3aed',
                  '#2563eb',
                  '#0891b2',
                  '#6366f1'

                ],

                borderRadius: 12,

                borderSkipped: false

              }

            ]

          },

          options: {

            responsive: true,

            indexAxis: 'y',

            plugins: {

              legend: {

                display: false

              }

            },

            scales: {

              x: {

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

              y: {

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

    <div className="
      space-y-6 sm:space-y-8
    ">

      {/* CHART */}

      <div className={`

        rounded-xl sm:rounded-2xl
        p-4 sm:p-5 md:p-6 lg:p-8
        shadow-md
        hover:shadow-lg

        border
        transition-all duration-300 ease-out

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
          mb-4 sm:mb-6
        ">

          <h2 className={`

            text-xl sm:text-2xl
            font-bold
            tracking-tight
            mb-2

            ${

              darkMode
                ? 'text-white'
                : 'text-slate-800'

            }

          `}>

            🏢 Perbandingan Layanan

          </h2>

          <p className={`

            text-xs sm:text-sm

            ${

              darkMode
                ? 'text-slate-300'
                : 'text-slate-400'

            }

          `}>

            Analisis tingkat kepuasan
            mahasiswa terhadap layanan kampus.

          </p>
          

        </div>

        <canvas ref={chartRef} />

      </div>

      {/* CARDS */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        gap-5
        ">

        {

          services.map(s => {

            const d =
              serviceData[s.id]

            const avg =
              d.ratings.length > 0

                ? (
                    d.ratings.reduce(
                      (a, b) => a + b,
                      0
                    ) / d.ratings.length
                  ).toFixed(2)

                : 0

            const rate =
              d.ratings.length > 0

                ? Math.round(

                    d.ratings.filter(
                      r => r >= 4
                    ).length

                    / d.ratings.length

                    * 100

                  )

                : 0

            return (

              <div

                key={s.id}

                className={`

                  rounded-2xl
                  p-5
                  shadow-md
                  hover:-translate-y-1
                  hover:shadow-xl

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

                `}
              >

                {/* TITLE */}

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-5
                ">

                  <h3 className={`
                  font-semibold
                  text-base
                  tracking-tight

                    ${

                      darkMode
                        ? 'text-white'
                        : 'text-slate-800'

                    }

                  `}>

                    {s.name}

                  </h3>

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    text-sm
                  ">

                    

                  </div>

                </div>

                {/* CONTENT */}

                <div className="
                  space-y-4
                ">

                  {/* TOTAL */}

                  <div className="
                    flex
                    justify-between
                    items-center
                  ">

                    <span className={`

                      ${

                        darkMode
                          ? 'text-slate-300'
                          : 'text-slate-400'

                      }

                    `}>

                      Total Respons

                    </span>

                    <span className={`

                      font-semibold
                      text-base
                      ${

                        darkMode
                          ? 'text-white'
                          : 'text-slate-800'

                      }

                    `}>

                      {d.ratings.length}

                    </span>

                  </div>

                  {/* RATING */}

                  <div className="
                    flex
                    justify-between
                    items-center
                  ">

                    <span className={`

                      ${

                        darkMode
                          ? 'text-slate-300'
                          : 'text-slate-400'

                      }

                    `}>

                      Rating

                    </span>

                    <span className={`

                      px-3
                      py-1.5
                      rounded-xl
                      text-xs
                      font-semibold

                      ${getRatingClass(avg)}

                    `}>

                      ⭐ {avg}

                    </span>

                  </div>

                 {/* PROGRESS */}

<div>

  <div
    className="
    flex
    justify-between
    mb-2
  "
  >

    <span
      className={`
      text-sm
      ${
        darkMode
          ? 'text-slate-300'
          : 'text-slate-400'
      }
    `}
    >
      Kepuasan
    </span>

    <span
      className={`
      text-sm
      font-bold
      ${
        darkMode
          ? 'text-white'
          : 'text-slate-700'
      }
    `}
    >
      {rate}%
    </span>

  </div>

  <div
    className="
    h-2
    bg-slate-200
    rounded-full
    overflow-hidden
    "
  >

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

  <div
    className="
    mt-5
    pt-4
    border-t
    border-slate-100
    "
  >

    <div
className="
mt-4
pt-3
border-t
border-slate-100
text-center
text-sm
text-emerald-500
font-medium
"
>

Monitoring realtime aktif

</div>

  </div>

</div>
</div>

              </div>

            )

          })

        }

      </div>

    </div>

  )

}