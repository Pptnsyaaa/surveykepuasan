import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function TrenWaktu({

  data,
  darkMode

}) {

  const trendRef =
    useRef(null)

  const volumeRef =
    useRef(null)

  const trendChart =
    useRef(null)

  const volumeChart =
    useRef(null)

  // ======================
  // CHART
  // ======================

  useEffect(() => {

    const dailyData = {}

    data.forEach(d => {

      const date =
        new Date(
          d.submittedAt
        )
          .toISOString()
          .split('T')[0]

      if (!dailyData[date]) {

        dailyData[date] = {

          ratings: [],
          count: 0

        }

      }

      dailyData[date].count++

      dailyData[date].ratings.push(
        parseFloat(
          d.averageRating
        )
      )

    })

    const dates =
      Object.keys(
        dailyData
      ).sort()

    const avgRatings =
      dates.map(d => (

        dailyData[d]
          .ratings
          .reduce(
            (a, b) => a + b,
            0
          )

        /

        dailyData[d]
          .ratings.length

      ).toFixed(2))

    const volumes =
      dates.map(
        d => dailyData[d].count
      )

    const labels =
      dates.map(d =>

        new Date(d)
          .toLocaleDateString(
            'id-ID',
            {

              day: 'numeric',
              month: 'short'

            }
          )

      )

    // ======================
    // TREND CHART
    // ======================

    if (trendChart.current)
      trendChart.current.destroy()

    if (trendRef.current) {

      trendChart.current =
        new Chart(trendRef.current, {

          type: 'line',

          data: {

            labels,

            datasets: [

              {

                label:
                  'Rating Rata-rata',

                data: avgRatings,

                borderColor:
                  '#6366f1',

                backgroundColor:
                  'rgba(99,102,241,0.15)',

                fill: true,

                tension: 0.4,

                pointRadius: 5,

                pointBackgroundColor:
                  '#8b5cf6'

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
                      : '#334155'

                }

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

    // ======================
    // VOLUME CHART
    // ======================

    if (volumeChart.current)
      volumeChart.current.destroy()

    if (volumeRef.current) {

      volumeChart.current =
        new Chart(volumeRef.current, {

          type: 'bar',

          data: {

            labels,

            datasets: [

              {

                label:
                  'Jumlah Responden',

                data: volumes,

                backgroundColor: [

                  '#22c55e',
                  '#16a34a',
                  '#4ade80',
                  '#15803d'

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

                labels: {

                  color:
                    darkMode
                      ? '#fff'
                      : '#334155'

                }

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

    return () => {

      trendChart.current?.destroy()

      volumeChart.current?.destroy()

    }

  }, [data, darkMode])

  // ======================
  // UI
  // ======================

  return (

    <div className="
      space-y-6 sm:space-y-8
    ">

      {/* TREND */}

      <div className={`

        rounded-xl sm:rounded-2xl md:rounded-3xl

        p-4 sm:p-5 md:p-6 lg:p-8

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

        <div className="
          mb-4 sm:mb-6
        ">

          <h2 className={`

            text-xl sm:text-2xl md:text-3xl
            font-black
            mb-2

            ${

              darkMode
                ? 'text-white'
                : 'text-slate-800'

            }

          `}>

            📈 Tren Kepuasan

          </h2>

          <p className={`

            text-xs sm:text-sm

            ${

              darkMode
                ? 'text-slate-300'
                : 'text-slate-500'

            }

          `}>

            Perkembangan tingkat kepuasan
            mahasiswa dari waktu ke waktu.

          </p>

        </div>

        <canvas ref={trendRef} />

      </div>

      {/* VOLUME */}

      <div className={`

        rounded-xl sm:rounded-2xl md:rounded-3xl

        p-4 sm:p-5 md:p-6 lg:p-8

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

        <div className="
          mb-4 sm:mb-6
        ">

          <h2 className={`

            text-xl sm:text-2xl md:text-3xl
            font-black
            mb-2

            ${

              darkMode
                ? 'text-white'
                : 'text-slate-800'

            }

          `}>

            👥 Volume Responden

          </h2>

          <p className={`

            text-xs sm:text-sm

            ${

              darkMode
                ? 'text-slate-300'
                : 'text-slate-500'

            }

          `}>

            Jumlah mahasiswa yang
            mengisi survey setiap hari.

          </p>

        </div>

        <canvas ref={volumeRef} />

      </div>

    </div>

  )

}