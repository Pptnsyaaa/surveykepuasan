// src/pages/AboutSystem.jsx

import { motion } from 'framer-motion'
import {
  Home,
  Target,
  Sparkles,
  Building,
  Globe,
  MessageCircle,
  Mail,
  CheckCircle2
} from 'lucide-react'

export default function AboutSystem() {

  const darkMode = localStorage.getItem('darkMode') === 'true'

  return (

    <div className={`

      min-h-[100dvh]

      px-3
      sm:px-4
      md:px-6
      lg:px-8
      py-6
      sm:py-8
      md:py-10
      lg:py-12

      transition-all
      duration-500

      ${

        darkMode

          ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white'

          : 'bg-gradient-to-br from-orange-50 via-white to-amber-100 text-slate-800'

      }

    `}>

      <motion.div

        initial={{
          opacity: 0,
          y: 30
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        className="

          max-w-xs
          sm:max-w-2xl
          md:max-w-4xl
          lg:max-w-6xl
          mx-auto

        "
      >

        {/* HEADER */}

        <div className="
          flex
          justify-between
          items-start
          flex-col
          sm:flex-row
          gap-3
          sm:gap-4
          md:gap-5
          mb-6
          sm:mb-8
          md:mb-10
        ">

          <div>

            <h1 className="

              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl

              font-black

              mb-2
              sm:mb-3
              md:mb-4

              leading-tight

            ">

              Tentang Sistem

            </h1>

            <p className={`

              text-xs
              sm:text-sm
              md:text-base
              lg:text-lg
              leading-relaxed
              max-w-2xl
              sm:max-w-3xl

              ${

                darkMode
                  ? 'text-slate-300'
                  : 'text-slate-600'

              }

            `}>

              Sistem survei kepuasan mahasiswa
              berbasis AI Face Emotion Detection
              untuk membantu evaluasi layanan
              kampus secara realtime.

            </p>

          </div>

          {/* BUTTON */}

          <a

            href="/"

            className="

              px-3
              sm:px-4
              md:px-6
              py-2
              sm:py-3
              md:py-4

              rounded-xl
              sm:rounded-2xl
              md:rounded-3xl

              bg-indigo-600

              hover:bg-indigo-700

              text-white
              font-bold
              text-xs
              sm:text-sm
              md:text-base

              transition-all
              duration-300

              shadow-md
              sm:shadow-lg
              md:shadow-xl
              hover:shadow-xl
              sm:hover:shadow-2xl

              whitespace-nowrap
              flex-shrink-0

            "
          >

            <Home className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            <span>Menu Awal</span>
          </a>

        </div>

        {/* CARD */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          gap-3
          sm:gap-4
          md:gap-6
          lg:gap-8
        ">

          {/* TUJUAN */}

          <div className={`

            rounded-xl
            sm:rounded-2xl
            md:rounded-3xl
            lg:rounded-[32px]

            p-3
            sm:p-5
            md:p-6
            lg:p-8

            shadow-md
            sm:shadow-lg
            md:shadow-xl

            border

            ${

              darkMode

                ? 'bg-white/5 border-white/10'

                : 'bg-white border-slate-200'

            }

          `}>

            <h2 className="
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              font-black
              mb-3
              sm:mb-4
              md:mb-5
            ">

              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 inline mr-2 -mt-1" />
              <span>Tujuan Sistem</span>
            </h2>

            <p className={`

              text-xs
              sm:text-sm
              md:text-base
              lg:text-base
              leading-relaxed
              line-clamp-none

              ${

                darkMode
                  ? 'text-slate-300'
                  : 'text-slate-600'

              }

            `}>

              Sistem ini dirancang untuk membantu
              institusi pendidikan dalam melakukan
              evaluasi kepuasan mahasiswa terhadap
              berbagai layanan kampus secara digital,
              interaktif, dan realtime menggunakan
              teknologi Artificial Intelligence (AI).

            </p>

          </div>

          {/* TEKNOLOGI */}

          <div className={`

            rounded-xl
            sm:rounded-2xl
            md:rounded-3xl
            lg:rounded-[32px]

            p-3
            sm:p-5
            md:p-6
            lg:p-8

            shadow-md
            sm:shadow-lg
            md:shadow-xl

            border

            ${

              darkMode

                ? 'bg-white/5 border-white/10'

                : 'bg-white border-slate-200'

            }

          `}>

            <h2 className="
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  lg:text-3xl
                  font-black
                  mb-3
                  sm:mb-4
                  md:mb-5
                ">

                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 inline mr-2 -mt-1" />
                  <span>Fitur Utama Sistem</span>
                </h2>

                <ul className={`

                  space-y-2
                  sm:space-y-2.5
                  md:space-y-3

                  text-xs
                  sm:text-sm
                  md:text-base

                  ${

                    darkMode
                      ? 'text-slate-300'
                      : 'text-slate-600'

                  }

                `}>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>Survei kepuasan mahasiswa secara online</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>Deteksi ekspresi wajah berbasis AI</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>Analisis sentimen respon mahasiswa</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>Dashboard monitoring realtime</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>Visualisasi data dalam bentuk grafik interaktif</span>
                  </li>

                </ul>

          </div>

          {/* KAMPUS */}

          <div className={`

            rounded-xl
            sm:rounded-2xl
            md:rounded-3xl
            lg:rounded-[32px]

            p-3
            sm:p-5
            md:p-6
            lg:p-8

            shadow-md
            sm:shadow-lg
            md:shadow-xl

            border
            col-span-1
            sm:col-span-2
            md:col-span-2

            ${

              darkMode

                ? 'bg-white/5 border-white/10'

                : 'bg-white border-slate-200'

            }

          `}>

            <h2 className="
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              font-black
              mb-3
              sm:mb-4
              md:mb-5
            ">

              <Building className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 inline mr-2 -mt-1" />
              <span>Tentang Kampus</span>
            </h2>

            <p className={`

              text-xs
              sm:text-sm
              md:text-base
              lg:text-base
              leading-relaxed
              mb-4
              sm:mb-5
              md:mb-6

              ${

                darkMode
                  ? 'text-slate-300'
                  : 'text-slate-600'

              }

            `}>

              Politeknik Baja Tegal merupakan
              perguruan tinggi vokasi yang
              berfokus pada pengembangan
              keterampilan, teknologi, dan
              inovasi untuk menciptakan lulusan
              unggul yang siap menghadapi dunia kerja.

              Sistem survei kepuasan mahasiswa
              berbasis AI ini dikembangkan untuk
              membantu meningkatkan kualitas
              pelayanan kampus secara digital
              dan modern.

            </p>

            {/* BUTTONS */}

            <div className="
              flex
              flex-col
              sm:flex-row
              flex-wrap
              gap-2
              sm:gap-3
              md:gap-4
            ">

              {/* WEBSITE */}

              <a

                href="https://pbjt.ac.id/"

                target="_blank"

                rel="noreferrer"

                className="

                  px-3
                  sm:px-4
                  md:px-6
                  py-2
                  sm:py-2.5
                  md:py-3
                  lg:py-4

                  rounded-lg
                  sm:rounded-xl
                  md:rounded-2xl
                  lg:rounded-3xl

                  bg-indigo-600

                  hover:bg-indigo-700

                  text-white
                  font-bold
                  text-xs
                  sm:text-sm
                  md:text-base

                  transition-all
                  duration-300

                  shadow-md
                  sm:shadow-lg
                  md:shadow-xl
                  hover:shadow-lg
                  sm:hover:shadow-xl

                "
              >

                <Globe className="w-4 h-4 inline mr-2 -mt-0.5" />
                <span>Website Kampus</span>
              </a>

              {/* WHATSAPP */}

              <a

                href="https://wa.me/6282325580008"

                target="_blank"

                rel="noreferrer"

                className="

                  px-3
                  sm:px-4
                  md:px-6
                  py-2
                  sm:py-2.5
                  md:py-3
                  lg:py-4

                  rounded-lg
                  sm:rounded-xl
                  md:rounded-2xl
                  lg:rounded-3xl

                  bg-green-500

                  hover:bg-green-600

                  text-white
                  font-bold
                  text-xs
                  sm:text-sm
                  md:text-base

                  transition-all
                  duration-300

                  shadow-md
                  sm:shadow-lg
                  md:shadow-xl
                  hover:shadow-lg
                  sm:hover:shadow-xl

                "
              >

                <MessageCircle className="w-4 h-4 inline mr-2 -mt-0.5" />
                <span>Contact WhatsApp Admin</span>
              </a>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="

          mt-8
          sm:mt-10
          md:mt-12
          lg:mt-14

          pt-4
          sm:pt-5
          md:pt-6
          lg:pt-6

          border-t
          border-white/10

          text-center

        ">

          <p className={`

            text-xs
            sm:text-sm
            md:text-base
            leading-relaxed

            ${

              darkMode
                ? 'text-slate-300'
                : 'text-slate-500'

            }

          `}>

            © 2026 Sistem Survei Kepuasan Mahasiswa

            <br />

            Developed by Pipit Developer

          </p>

          {/* EMAIL */}

          <a

            href="https://mail.google.com/mail/?view=cm&fs=1&to=pipitfn675@gmail.com"

            target="_blank"

            rel="noreferrer"

            className="

              inline-block

              mt-2
              sm:mt-3
              md:mt-4

              text-xs
              sm:text-sm
              md:text-base

              text-orange-400

              hover:text-orange-500

              transition-all
              duration-300

            "
          >

            <Mail className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            <span>pipitfn675@gmail.com</span>
          </a>

        </div>

      </motion.div>

    </div>

  )

}