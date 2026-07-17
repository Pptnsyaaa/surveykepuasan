import { useState, useEffect } from 'react'
import { FileText, ShieldAlert, ArrowRight } from 'lucide-react'
import { API } from '../../api'

const DEFAULT_DEPARTMENTS = [
  { id: 'TI', name: 'Teknik Informatika' },
  { id: 'TM', name: 'Teknik Mesin' },
  { id: 'TO', name: 'Teknik Otomotif' },
  { id: 'TEI', name: 'Teknik Elektronika Industri' }
]

export default function StudentForm({ onStart, darkMode }) {
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS)

  const isDark = darkMode ?? (
    typeof window !== 'undefined' && (
      localStorage.getItem('darkMode') === 'true' ||
      document.documentElement.classList.contains('dark')
    )
  )

  useEffect(() => {
    fetch(API.SETTINGS.GET)
      .then(res => res.json())
      .then(data => {
        if (data && data.departments && Array.isArray(data.departments) && data.departments.length > 0) {
          setDepartments(data.departments)
        }
      })
      .catch(err => {
        console.log('Using default departments:', err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fakultas = e.target.fakultas.value
    if (!fakultas) {
      alert('Pilih Program Studi dulu!')
      return
    }
    onStart({ fakultas })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between transition-all duration-500">
      {/* TOP SECTION: TITLE & ALERT GROUPED TOGETHER */}
      <div>
        {/* TITLE */}
        <div className="mb-2.5 sm:mb-3">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-1 sm:mb-1.5">
            <div className="
              w-9 h-9 sm:w-11 sm:h-11
              rounded-xl
              bg-gradient-to-r from-indigo-500 to-blue-600
              flex items-center justify-center
              text-white shadow-md
            ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div>
              <h2 className={`
                text-lg sm:text-xl lg:text-2xl xl:text-3xl
                font-black leading-tight
                ${isDark ? 'text-white' : 'text-slate-800'}
              `}>
                Data Mahasiswa
              </h2>

              <p className={`
                text-xs sm:text-sm leading-relaxed
                ${isDark ? 'text-slate-200' : 'text-slate-500'}
              `}>
                Sistem Kepuasan Mahasiswa Berbasis AI
              </p>
            </div>
          </div>
        </div>

        {/* ALERT */}
        <div className={`flex items-start gap-2.5 rounded-xl p-3 mb-2 text-xs sm:text-sm shadow-sm leading-relaxed border ${
          isDark
            ? 'bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border-blue-800/60 text-blue-200'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100/80 text-blue-800'
        }`}>
          <ShieldAlert className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            Survei ini bersifat <strong className={`font-semibold ${isDark ? 'text-blue-100' : 'text-blue-950'}`}>anonim</strong> dan hanya digunakan untuk meningkatkan kualitas pelayanan kampus.
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-auto pt-2">
        {/* SELECT */}
        <div className="mb-4 sm:mb-5">
          <label className={`block font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base ${
            isDark ? 'text-white' : 'text-slate-700'
          }`}>
            Fakultas Teknik
          </label>

          <select
            name="fakultas"
            required
            className={`
              w-full appearance-none border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
              text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md
              focus:outline-none focus:border-indigo-500 focus:ring-4 transition-all duration-300 cursor-pointer min-h-[44px] sm:min-h-[48px]
              ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-indigo-900/50' : 'bg-white border-slate-200 text-slate-700 focus:ring-indigo-100'}
            `}
          >
            <option value="" className={isDark ? "bg-slate-800 text-white" : "bg-white text-slate-800"}>Pilih Program Studi</option>
            {Array.isArray(departments) && departments.map((dept, idx) => {
              const id = dept?.id || dept?.code || dept?.name || `dept-${idx}`
              const name = dept?.name || (typeof dept === 'string' ? dept : 'Program Studi')
              return (
                <option key={id} value={id} className={isDark ? "bg-slate-800 text-white" : "bg-white text-slate-800"}>
                  {name}
                </option>
              )
            })}
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            py-3 sm:py-3.5
            px-4
            rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white
            font-bold
            text-sm sm:text-base
            shadow-md hover:shadow-xl
            hover:scale-[1.02] active:scale-[0.99]
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            min-h-[44px] sm:min-h-[48px]
          "
        >
          <span className="flex items-center justify-center gap-2">
            <span>Mulai Survei</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </form>
    </div>
  )
}
