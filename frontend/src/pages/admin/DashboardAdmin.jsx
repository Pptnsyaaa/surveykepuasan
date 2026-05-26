// src/pages/admin/DashboardAdmin.jsx

// ======================
// IMPORT
// ======================

import { useEffect, useState, useRef } from 'react'


import * as XLSX from 'xlsx'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { API } from '../../api'

import Overview from '../../components/dashboard/Overview'
import PerProgramStudi from '../../components/dashboard/PerProgramStudi'
import PerLayanan from '../../components/dashboard/PerLayanan'
import TrenWaktu from '../../components/dashboard/TrenWaktu'
import DataResponden from '../../components/dashboard/DataResponden'

// ======================
// COMPONENT
// ======================

export default function DashboardAdmin() {

  // ======================
  // DARK MODE
  // ======================

  const darkMode =
    JSON.parse(
      localStorage.getItem('darkMode')
    ) || false

  // ======================
  // STATE
  // ======================

  const [notifications,setNotifications]=useState([])

  const [data, setData] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [activeMenu,
    setActiveMenu] =
      useState('overview')

  const [filterType,
    setFilterType] =
      useState('all')

  const [startDate,
    setStartDate] =
      useState('')

  const [endDate,
    setEndDate] =
      useState('')

  const [showExport,
    setShowExport] =
      useState(false)

      const [mobileMenu,
      setMobileMenu] =
      useState(false)

      const mainRef = useRef(null)
      const [showHandle, setShowHandle] = useState(false)

  // ======================
  // SERVICES
  // ======================

  const services = [

    {
      id: 'akademik',
      name: 'Pelayanan Akademik'
    },

    {
      id: 'perpustakaan',
      name: 'Perpustakaan'
    },

    {
      id: 'keuangan',
      name: 'Layanan Keuangan'
    },

    {
      id: 'kemahasiswaan',
      name: 'Kemahasiswaan'
    },

    {
      id: 'fasilitas',
      name: 'Fasilitas Kampus'
    }

  ]

  // ======================
// FETCH NOTIFICATIONS
// ======================

const fetchNotifications =
async()=>{

try{

const response=
await fetch(API.NOTIFICATIONS.GET_ALL)

const result=
await response.json()

setNotifications(result)

}

catch(error){

console.log(error)

}

}

const deleteNotification =
async(id)=>{
  try{
    const response = await fetch(API.NOTIFICATIONS.DELETE(id))

    if(response.ok){
      setNotifications(prev=>
        prev.filter(item=>item.id !== Number(id))
      )
    }
  }
  catch(error){
    console.log(error)
  }
}


// ======================
// FETCH SURVEY
// ======================

const fetchSurvey =
async()=>{

      try {

        const response =
  await fetch(API.SURVEY.GET_ALL)

if(!response.ok){
  throw new Error('API gagal')
}
          

        const result =
          await response.json()

        const formatted =
  result.data.map(item => ({

    ...item,

    averageRating:
      Number(
        item.average_rating
      ) || 0,

    submittedAt:
      item.submitted_at
      || new Date().toISOString(),

    responses:
      typeof item.responses === "string"

      ? JSON.parse(item.responses)

      : item.responses || []

}))

        setData(formatted)

        setLoading(false)

      } 
  catch (error) {

  console.log(error)

  setLoading(false)

}

    }

  // ======================
  // AUTO REFRESH
  // ======================

  useEffect(()=>{

fetchSurvey()

fetchNotifications()



const interval=

setInterval(()=>{

fetchSurvey()

fetchNotifications()

},3000)

return ()=>clearInterval(interval)

},[])


  // ======================
  // FILTER
  // ======================

  const filteredData =
    data.filter(item => {

      const itemDate =
        new Date(item.submittedAt)

      const now =
        new Date()

      if (filterType === 'all') {
        return true
      }

      if (filterType === 'today') {

        return (
          itemDate.toDateString()
          === now.toDateString()
        )

      }

      if (filterType === 'week') {

        const weekAgo =
          new Date()

        weekAgo.setDate(
          now.getDate() - 7
        )

        return itemDate >= weekAgo

      }

      if (filterType === 'month') {

        return (

          itemDate.getMonth()
          === now.getMonth()

          &&

          itemDate.getFullYear()
          === now.getFullYear()

        )

      }

      if (filterType === 'year') {

        return (

          itemDate.getFullYear()
          === now.getFullYear()

        )

      }

      if (
        filterType === 'custom'
        &&
        startDate
        &&
        endDate
      ) {

        const start =
          new Date(startDate)

        const end =
          new Date(endDate)

        end.setHours(
          23,59,59,999
        )

        return (
          itemDate >= start
          &&
          itemDate <= end
        )

      }

      return true

    })

  // ======================
  // EXPORT EXCEL
  // ======================

  const exportExcel = () => {

    const exportData =
      filteredData.map(item => ({

        Jurusan:
          item.fakultas
          || item.jurusan
          || item.student?.fakultas
          || item.student?.jurusan
          || '-',

        Rating:
          item.averageRating,

        Tanggal:
          new Date(
            item.submittedAt
          ).toLocaleString()

      }))

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      )

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Survey'
    )

    XLSX.writeFile(
      workbook,
      'DataSurvey.xlsx'
    )

  }

  // ======================
  // EXPORT PDF
  // ======================

  const exportPDF = () => {

    const doc =
      new jsPDF()

    doc.text(
      'Data Survey Mahasiswa',
      14,
      15
    )

    autoTable(doc, {

      startY: 25,

      head: [[
        'Jurusan',
        'Rating',
        'Tanggal'
      ]],

      body:

        filteredData.map(
          item => [

            item.student?.fakultas
            || item.student?.jurusan
            || item.fakultas
            || item.jurusan
            || '-',

            item.averageRating,

            new Date(
              item.submittedAt
            ).toLocaleString()

          ]
        )

    })

    doc.save(
      'DataSurvey.pdf'
    )

  }

  // ======================
  // EXPORT CSV
  // ======================

  const exportCSV = () => {

    const headers = [

      'Jurusan',
      'Rating',
      'Tanggal'

    ]

    const rows =
      filteredData.map(item => [

        item.student?.fakultas
        || item.student?.jurusan
        || item.fakultas
        || item.jurusan
        || '-',

        item.averageRating,

        new Date(
          item.submittedAt
        ).toLocaleString()

      ])

    const csvContent = [

      headers.join(','),

      ...rows.map(
        row => row.join(',')
      )

    ].join('\n')

    const blob =
      new Blob(

        [csvContent],

        {
          type: 'text/csv'
        }

      )

    const url =
      window.URL.createObjectURL(
        blob
      )

    const a =
      document.createElement('a')

    a.href = url

    a.download =
      'DataSurvey.csv'

    a.click()

  }

  // ======================
  // PRINT
  // ======================

  const handlePrint = () => {

    window.print()

  }

  const markNotificationRead =
  async(id)=>{
    try{
      const response = await fetch(API.NOTIFICATIONS.MARK_READ(id))

      if(response.ok){
        setNotifications(prev=>
          prev.map(item =>
            item.id === Number(id)
              ? { ...item, status: 'read' }
              : item
          )
        )
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const markAllNotificationsRead =
  async()=>{
    try{
      const response = await fetch(API.NOTIFICATIONS.READ_ALL)

      if(response.ok){
        setNotifications(prev=>
          prev.map(item => ({ ...item, status: 'read' }))
        )
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const deleteAllNotifications =
  async()=>{
    try{
      const response = await fetch(
        '/api/notifications',
        {
          method: 'DELETE'
        }
      )

      if(response.ok){
        setNotifications([])
      }
    }
    catch(error){
      console.log(error)
    }
  }

  // ======================
  // LOADING
  // ======================

  if (loading) {

    return (

      <div className="
        min-h-screen
        overflow-y-auto
        flex
        items-center
        justify-center
        text-2xl
        font-bold
      ">

        Loading...

      </div>

    )

  }

  // ======================
  // UI
  // ======================

  return (

    <div className={`
      min-h-screen
      flex

      ${

        darkMode

          ? `
            bg-gradient-to-br
            from-[#0f172a]
            via-[#111827]
            to-[#1e1b4b]
          `

          : `
            bg-gradient-to-br
            from-slate-100
            via-indigo-50
            to-cyan-50
            `

      }

    `}>

    {/* SIDEBAR */}

<aside className="
hidden
lg:flex
flex-col

w-[280px]
h-screen

sticky
top-0
self-start

bg-gradient-to-b
from-[#0f172a]
via-[#111827]
to-[#1e1b4b]

text-white

p-6

border-r
border-slate-800

relative
overflow-x-hidden
">

<div className="
absolute
top-0
right-0

w-48
h-48

rounded-full

bg-indigo-500/10

blur-3xl
"/>

<div className="
relative
z-10
">

{/* IDENTITAS */}

<div className="
mb-10
">

<div className="
flex
items-center
gap-3
mb-4
">

<img
src="/logopbjt.png"
className="
w-12
h-12
object-contain
"
/>

<div>

<h2 className="
font-bold
text-lg
">

Panel Monitoring

</h2>

<p className="
text-xs
text-slate-400
">

Politeknik Baja Tegal

</p>

</div>

</div>

<div className="
flex
items-center
gap-2

text-green-400
text-sm
">

<div className="
w-2
h-2

rounded-full

bg-green-400

animate-pulse
"/>

Sistem aktif

</div>

</div>

{/* MENU */}

<div className="
space-y-4
">

{

[
{
key:'overview',
label:'📈 Overview'
},

{
key:'layanan',
label:'🏢 Per Layanan'
},

{
key:'jurusan',
label:'🎓 Per Program Studi'
},

{
key:'tren',
label:'📅 Tren Waktu'
},

{
key:'responden',
label:'👨‍🎓 Data Responden'
}

].map(menu=>(

<button

key={menu.key}

onClick={() => {

setActiveMenu(menu.key)

setMobileMenu(false)

mainRef.current?.scrollTo({
  top: 0,
  behavior: 'smooth'
})

}}

className={`

w-full
text-left

px-5
py-4

rounded-2xl

font-medium
text-sm
tracking-wide

transition-all
duration-300

${

activeMenu===menu.key

?

`
bg-gradient-to-r
from-cyan-500
via-indigo-500
to-purple-600

shadow-xl

scale-[1.02]
`

:

`
hover:bg-white/10
hover:translate-x-2
`

}

`}
>

{menu.label}

</button>

))

}

</div>

<button

onClick={()=>{

localStorage.removeItem(
'adminLogin'
)

window.location.href=
'/admin/login'

}}

className="
mt-8
w-full

py-3

text-sm

rounded-2xl

bg-red-500

hover:bg-red-600

font-semibold

transition-all
"

>

Logout

</button>

</div>

</aside>

      {/* MAIN */}

      <main
ref={mainRef}

onScroll={(e) => {

if(e.currentTarget.scrollTop > 120){

setShowHandle(true)

}else{

setShowHandle(false)

}

}}

className="
flex-1
p-4
sm:p-6
lg:p-8

relative
overflow-x-visible
overflow-y-scroll
h-screen

scrollbar-hide
"
>

        <div className="
          relative
          z-10

          w-full
          max-w-full

          mx-auto
          ">

        {/* MENU UTAMA */}

{

!showHandle && !mobileMenu && (

<div className="
lg:hidden

fixed
top-5
left-4

z-[80]

transition-all
duration-300
">

<button

onClick={() =>
setMobileMenu(true)
}

className="

w-12
h-12

rounded-2xl

bg-gradient-to-r
from-indigo-600
to-purple-600

shadow-xl
shadow-indigo-500/30

text-white
text-xl

flex
items-center
justify-center

backdrop-blur-xl

active:scale-95

transition-all
duration-300

hover:scale-105
"

>

☰

</button>

</div>

)

}

{/* HANDLE SAAT SCROLL */}

{

showHandle && !mobileMenu && (

<div

onClick={() =>
setMobileMenu(true)
}

className="
lg:hidden

fixed
top-1/2
left-0

-translate-y-1/2

z-[90]

w-2
h-24

rounded-r-full

bg-gradient-to-b
from-cyan-400
to-purple-600

shadow-lg
shadow-cyan-500/30

opacity-80

transition-all
duration-300

active:w-4
hover:opacity-100

cursor-pointer
"

/>

)

}

        {

mobileMenu && (

<div

onClick={() =>
setMobileMenu(false)
}

className="
lg:hidden

fixed
inset-0

bg-black/50
backdrop-blur-sm
animate-in
fade-in
duration-300

z-40
"

/>

)

}

        {/* MOBILE SIDEBAR */}

<div className={`
fixed
top-0
left-0

h-screen
w-[220px]

z-50

bg-gradient-to-b
from-[#0f172a]
via-[#111827]
to-[#1e1b4b]

p-5

text-white

shadow-2xl

border-r
border-white/10

transition-all
duration-500
ease-[cubic-bezier(0.22,1,0.36,1)]

lg:hidden

${

mobileMenu

?

'translate-x-0 opacity-100'

:

'-translate-x-full opacity-0'

}

`}>

<div className="
flex
justify-between
items-center

mb-8
">



<button

onClick={() =>
setMobileMenu(false)
}

className="
text-2xl
"
>

✕

</button>

</div>

<div className="
space-y-4
">

{

[
{ key:'overview', label:'📈 Overview' },
{ key:'layanan', label:'🏢 Per Layanan' },
{ key:'jurusan', label:'🎓 Per Program Studi' },
{ key:'tren', label:'📅 Tren Waktu' },
{ key:'responden', label:'👨‍🎓 Data Responden' }

].map(menu => (

<button

key={menu.key}

onClick={() => {

setActiveMenu(menu.key)

setMobileMenu(false)

mainRef.current?.scrollTo({
top: 0,
behavior: 'smooth'
})

}}

className={`

w-full
text-left

px-4
py-3

rounded-2xl

font-medium

transition-all

${

activeMenu === menu.key

?

`
bg-gradient-to-r
from-cyan-500
via-indigo-500
to-purple-600
`

:

`
hover:bg-white/10
hover:translate-x-2
hover:scale-[1.02]
`

}

`}
>

{menu.label}

</button>

))

}

<button

onClick={() => {

localStorage.removeItem('adminLogin')

window.location.href =
'/admin/login'

}}

className="
w-full
mt-6
py-3

rounded-2xl

bg-red-500

hover:bg-red-600

font-semibold
"

>

Logout

</button>

</div>

</div>

<div className="
absolute
top-0
right-0

w-56
h-56

bg-pink-400/15

rounded-full

blur-3xl
pointer-events-none
"/>

<div className="
absolute
bottom-0
left-0

w-72
h-72

bg-cyan-400/15

rounded-full

blur-3xl
pointer-events-none
"/>

        {/* HEADER */}

        <div className="
          mt-14
          sm:mt-0

          flex
          justify-end
          items-center
          flex-wrap
          gap-6
          mb-10
        ">

          {/* LEFT */}

          <div>

<p className="
text-sm
text-slate-400
mb-2
">

Dashboard Monitoring

</p>

<h1 className={`
text-4xl
lg:text-6xl
font-black

bg-gradient-to-r
from-indigo-700
via-purple-700
to-cyan-500

bg-clip-text
text-transparent
drop-shadow-[0_0_20px_rgba(99,102,241,0.35)]
`}>

Survei Kepuasan Mahasiswa

</h1>

<p className={`

mt-3

${

darkMode

?

'text-slate-300'

:

'text-slate-500'

}

`}>

Pantau respon mahasiswa secara realtime

</p>

</div>

          {/* RIGHT */}

          <div className="
            flex
            flex-wrap
            gap-4
            items-center
          ">

            

            {/* FILTER */}

            <select

              value={filterType}

              onChange={(e) =>
                setFilterType(
                  e.target.value
                )
              }

              className={`

                px-5
                py-3

                rounded-2xl

                border

                text-sm
                font-semibold

                ${

                  darkMode

                    ? `
                      bg-[#1e293b]
                      border-slate-600
                      text-slate-100
                    `

                    : `
                      bg-white/80
                      backdrop-blur-md

                      border-white

                      shadow-lg
                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:shadow-2xl

                      text-slate-700
                    `

                }

              `}
            >

              <option value="all">
                Semua Data
              </option>

              <option value="today">
                Hari Ini
              </option>

              <option value="week">
                Minggu Ini
              </option>

              <option value="month">
                Bulan Ini
              </option>

              <option value="year">
                Tahun Ini
              </option>

              <option value="custom">
                Custom Tanggal
              </option>

            </select>

            {/* CUSTOM DATE */}

            {

              filterType === 'custom'

              &&

              <div className="
                flex
                items-center
                gap-3
                flex-wrap
              ">

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value
                    )
                  }

                  className="
                    px-4
                    py-3
                    rounded-2xl
                    bg-[#1e293b]
                    border
                    border-slate-600
                    text-slate-100
                  "
                />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value
                    )
                  }

                  className="
                    px-4
                    py-3
                    rounded-2xl
                    bg-[#1e293b]
                    border
                    border-slate-600
                    text-slate-100
                  "
                />

              </div>

            }

            {/* EXPORT */}

            <div className="
              relative
            ">

              <button

                onClick={() =>
                  setShowExport(
                    !showExport
                  )
                }

                className="
                  px-6
                  py-3

                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-indigo-600

                  text-white
                  font-bold

                  shadow-xl
                  shadow-cyan-300/50

                  hover:scale-105
                  hover:shadow-cyan-400/50

                  transition-all
                  duration-300
                  "
              >

                📤 Export

              </button>

              {

                showExport

                &&

                <div className="
                  absolute
                  top-[70px]
                  right-0

                  w-[220px]

                  rounded-2xl

                  overflow-hidden

                  shadow-2xl

                  border

                  bg-[#1e293b]
                  border-slate-700

                  z-50
                ">

                  <button

                    onClick={() => {

                      exportExcel()

                      setShowExport(false)

                    }}

                    className="
                      w-full
                      px-5
                      py-4
                      text-left
                      text-white
                      font-semibold
                      hover:bg-emerald-500
                      transition-all
                    "
                  >

                    📥 Export Excel

                  </button>

                  <button

                    onClick={() => {

                      exportPDF()

                      setShowExport(false)

                    }}

                    className="
                      w-full
                      px-5
                      py-4
                      text-left
                      text-white
                      font-semibold
                      hover:bg-rose-500
                      transition-all
                    "
                  >

                    📄 Export PDF

                  </button>

                  <button

                    onClick={() => {

                      exportCSV()

                      setShowExport(false)

                    }}

                    className="
                      w-full
                      px-5
                      py-4
                      text-left
                      text-white
                      font-semibold
                      hover:bg-cyan-500
                      transition-all
                    "
                  >

                    🧾 Export CSV

                  </button>

                </div>

              }

            </div>

            {/* PRINT */}

            <button
              onClick={handlePrint}
              className="
                px-5
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-600

                hover:from-indigo-600
                hover:to-purple-700

                shadow-lg
                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-2xl
                shadow-purple-300/40
                transition-all
                text-white
                font-semibold
              "
            >
              🖨️ Print
            </button>

          </div>

        </div>

        {/* CONTENT */}

        {

          activeMenu === 'overview'

          &&

             <Overview
          data={filteredData}
          services={services}
          darkMode={darkMode}
          notifications={notifications}
          onDeleteNotification={deleteNotification}
          onMarkNotificationRead={markNotificationRead}
          onMarkAllNotificationsRead={markAllNotificationsRead}
          onDeleteAllNotifications={deleteAllNotifications}
        />

        }

        {

          activeMenu === 'layanan'

          &&

          <PerLayanan
            data={filteredData}
            services={services}
            darkMode={darkMode}
          />

        }

        {

          activeMenu === 'jurusan'

          &&

          <PerProgramStudi
            data={filteredData}
            darkMode={darkMode}
          />

        }

        {

          activeMenu === 'tren'

          &&

          <TrenWaktu
            data={filteredData}
            darkMode={darkMode}
          />

        }

        {

          activeMenu === 'responden'

          &&

          <DataResponden
            data={filteredData}
            darkMode={darkMode}
          />

        }

        </div>

      </main>

    </div>

  )

}
