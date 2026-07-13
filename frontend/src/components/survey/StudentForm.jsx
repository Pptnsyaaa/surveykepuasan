import { useState, useEffect } from 'react'
import { FileText, ShieldAlert, ArrowRight } from 'lucide-react'
import { API } from '../../api'

const DEFAULT_DEPARTMENTS = [
  { id: 'TI', name: 'Teknik Informatika' },
  { id: 'TM', name: 'Teknik Mesin' },
  { id: 'TO', name: 'Teknik Otomotif' },
  { id: 'TEI', name: 'Teknik Elektronika Industri' }
]

export default function StudentForm({ onStart }) {
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS)

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
      {/* TITLE */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
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
            <h2 className="
              text-lg sm:text-xl lg:text-2xl xl:text-3xl
              font-black text-slate-800 dark:text-white leading-tight
            ">
              Data Mahasiswa
            </h2>

            <p className="
              text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed
            ">
              Sistem Kepuasan Mahasiswa Berbasis AI
            </p>
          </div>
        </div>
      </div>

      {/* ALERT */}
      <div className="flex items-start gap-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100/80 dark:border-blue-800/40 text-blue-800 dark:text-blue-200 rounded-xl p-3 mb-4 text-xs sm:text-sm shadow-sm leading-relaxed">
        <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          Survei ini bersifat <strong className="font-semibold text-blue-950 dark:text-blue-100">anonim</strong> dan hanya digunakan untuk meningkatkan kualitas pelayanan kampus.
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* SELECT */}
        <div className="mb-4 sm:mb-5">
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
            Fakultas Teknik
          </label>

          <select
            name="fakultas"
            required
            className="
              w-full appearance-none border border-slate-200 dark:border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
              bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-white text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md
              focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/50
              transition-all duration-300 cursor-pointer min-h-[44px] sm:min-h-[48px]
            "
          >
            <option value="" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">Pilih Program Studi</option>
            {Array.isArray(departments) && departments.map((dept, idx) => {
              const id = dept?.id || dept?.code || dept?.name || `dept-${idx}`
              const name = dept?.name || (typeof dept === 'string' ? dept : 'Program Studi')
              return (
                <option key={id} value={id} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
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