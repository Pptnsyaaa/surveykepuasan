// src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Overview from '../components/dashboard/Overview'
import PerLayanan from '../components/dashboard/PerLayanan'
import PerProgramStudi from '../components/dashboard/PerProgramStudi'
import TrenWaktu from '../components/dashboard/TrenWaktu'
import DataResponden from '../components/dashboard/DataResponden'

const SERVICES = [
  { id: 'akademik', name: 'Layanan Akademik' },
  { id: 'perpustakaan', name: 'Perpustakaan' },
  { id: 'keuangan', name: 'Layanan Keuangan' },
  { id: 'kemahasiswaan', name: 'Kemahasiswaan' },
  { id: 'fasilitas', name: 'Fasilitas Kampus' }
]

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📈' },
  { id: 'services', label: 'Per Layanan', icon: '🏢' },
  { id: 'faculty', label: 'Per Program Studi', icon: '🎓' },
  { id: 'trends', label: 'Tren Waktu', icon: '📅' },
  { id: 'responses', label: 'Data Responden', icon: '📋' }
]

export default function DashboardPage() {

  const [activeView, setActiveView] =
    useState('overview')

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [period, setPeriod] =
    useState('30')

  const [data, setData] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    loadData()

  }, [period])

  const loadData = async () => {

    setLoading(true)

    try {

      const res =
        await fetch(
          `/api/survey?period=${period}`
        )

      const result =
        await res.json()

      if (result.success) {

        setData(

          result.data.map(d => ({

            ...d,

            student: {
              fakultas:
                d.jurusan
            },

            averageRating:
              d.average_rating,

            submittedAt:
              d.submitted_at,

            responses:
              typeof d.responses
                === 'string'

                ? JSON.parse(
                    `[${d.responses}]`
                  )

                : (
                    d.responses
                    || []
                  )

          }))

        )

      }

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }

  }

  const titles = {

    overview:
      'Overview',

    services:
      'Analisis Per Layanan',

    faculty:
      'Analisis Per Program Studi',

    trends:
      'Tren Waktu',

    responses:
      'Data Responden'

  }

  return (

    <div className="

      flex

      min-h-screen

      bg-slate-100/80

      backdrop-blur-sm

    ">

      {/* MOBILE HAMBURGER */}

      <div className="
        fixed
        top-0
        left-0
        right-0
        z-50
        lg:hidden
        bg-white/80
        backdrop-blur-xl
        border-b
        border-slate-200
        p-4
        flex
        items-center
        justify-between
      ">

        <h1 className="
          font-bold
          text-slate-800
        ">

          Dashboard

        </h1>

        <button

          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }

          className="
            p-2
            rounded-lg
            hover:bg-slate-100
            transition-all
          "
        >

          {

            sidebarOpen

              ? '✕'

              : '☰'

          }

        </button>

      </div>

      {/* OVERLAY */}

      {

        sidebarOpen && (

          <div

            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              fixed
              inset-0
              bg-black/30
              z-30
              lg:hidden
            "
          />

        )

      }

      {/* SIDEBAR */}

      <aside className={`

        w-72

        bg-[#0f172a]

        text-white

        fixed
        inset-y-0
        left-0

        ${

          sidebarOpen

            ? 'translate-x-0'

            : '-translate-x-full'

        }

        lg:translate-x-0

        transition-transform

        z-40 lg:z-auto

        flex
        flex-col

        border-r
        border-white/10

        top-0
        lg:h-screen
        h-[calc(100vh-64px)]
        mt-16 lg:mt-0

      `}>

        {/* HEADER */}

        <div className="

          p-6

          border-b
          border-white/10

        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <img
              src="/logopbjt.png"
              alt="Logo"
              className="
                w-14
                h-14
                object-contain
              "
            />

            <div>

              <h2 className="
                text-lg
                font-bold
              ">

                Politeknik Baja Tegal

              </h2>

              <p className="
                text-slate-400
                text-sm
              ">

                Dashboard Kepuasan

              </p>

            </div>

          </div>

        </div>

        {/* MENU */}

        <nav className="
          flex-1
          p-4
        ">

          {

            NAV_ITEMS.map(item => (

              <button

                key={item.id}

                onClick={() =>
                  setActiveView(
                    item.id
                  )
                }

                className={`

                  w-full

                  flex
                  items-center
                  gap-4

                  px-5
                  py-4

                  rounded-2xl

                  mb-3

                  transition-all
                  duration-300

                  text-left

                  ${

                    activeView
                    === item.id

                      ? `
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600
                        text-white
                        shadow-lg
                      `

                      : `
                        text-slate-300
                        hover:bg-white/10
                      `

                  }

                `}
              >

                <span className="
                  text-xl
                ">

                  {item.icon}

                </span>

                <span className="
                  font-medium
                ">

                  {item.label}

                </span>

              </button>

            ))

          }

        </nav>

        {/* FOOTER */}

        <div className="

          p-4

          border-t
          border-white/10

        ">

          <Link

            to="/"

            className="

              block

              text-center

              py-3

              rounded-2xl

              bg-white/10

              hover:bg-white/20

              transition-all

            "
          >

            ← Kembali ke Survey

          </Link>

        </div>

      </aside>

      {/* CONTENT */}

     <main className="

        flex-1

        w-full

        lg:ml-72

        pt-20 lg:pt-0

        p-3 sm:p-4 md:p-6 lg:p-8

        ">

        {/* TOP */}

        <div className="

          bg-white/80

          backdrop-blur-xl

          rounded-2xl sm:rounded-3xl lg:rounded-[32px]

          p-4 sm:p-6 md:p-8

          shadow-lg

          border
          border-white/40

          mb-6 sm:mb-8

          max-w-[1600px]
          mx-auto

        ">

          <div className="

            flex
            justify-between
            items-center

            flex-col sm:flex-row

            gap-4

          ">

            <div>

              <h1 className="

                text-2xl sm:text-3xl lg:text-4xl

                font-black

                text-slate-800

                mb-2

              ">

                {titles[activeView]}

              </h1>

              <p className="
                text-xs sm:text-sm
                text-slate-500
              ">

                Monitoring kepuasan
                mahasiswa secara realtime

              </p>

            </div>

            <div className="
              flex
              gap-2 sm:gap-3
              flex-col sm:flex-row
              w-full sm:w-auto
            ">

              <select

                value={period}

                onChange={(e) =>
                  setPeriod(
                    e.target.value
                  )
                }

                className="

                  px-3 sm:px-5
                  py-2 sm:py-3

                  rounded-xl sm:rounded-2xl

                  border
                  border-slate-200

                  bg-white

                  text-xs sm:text-sm

                "
              >

                <option value="7">
                  7 Hari
                </option>

                <option value="30">
                  30 Hari
                </option>

                <option value="90">
                  3 Bulan
                </option>

                <option value="365">
                  1 Tahun
                </option>

                <option value="all">
                  Semua Data
                </option>

              </select>

              <button

                onClick={loadData}

                className="

                  px-4 sm:px-6
                  py-2 sm:py-3

                  rounded-xl sm:rounded-2xl

                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600

                  text-white

                  font-semibold

                  text-xs sm:text-sm

                  hover:scale-105

                  transition-all
                  w-full sm:w-auto

                "
              >

                🔄 Refresh

              </button>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        {

          loading

            ? (

              <div className="

                flex
                items-center
                justify-center

                h-[300px]

              ">

                <div className="

                  w-14
                  h-14

                  border-4

                  border-indigo-200
                  border-t-indigo-600

                  rounded-full

                  animate-spin

                " />

              </div>

            )

            : (

              <>

                {

                  activeView ===
                  'overview'

                  && (

                    <Overview
                      data={data}
                      services={SERVICES}
                    />

                  )

                }

                {

                  activeView ===
                  'services'

                  && (

                    <PerLayanan
                      data={data}
                      services={SERVICES}
                    />

                  )

                }

                {

                  activeView ===
                  'faculty'

                  && (

                    <PerProgramStudi
                      data={data}
                    />

                  )

                }

                {

                  activeView ===
                  'trends'

                  && (

                    <TrenWaktu
                      data={data}
                    />

                  )

                }

                {

                  activeView ===
                  'responses'

                  && (

                    <DataResponden
                      data={data}
                    />

                  )

                }

              </>

            )

        }

      </main>

    </div>

  )

}