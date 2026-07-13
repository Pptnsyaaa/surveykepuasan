// src/pages/SurveyPage.jsx

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Info, Lock, Sun, Moon, Home, Sparkles } from 'lucide-react'

import StudentForm from '../components/survey/StudentForm'
import CameraPanel from '../components/survey/CameraPanel'
import QuestionPanel from '../components/survey/QuestionPanel'
import ResultPanel from '../components/survey/ResultPanel'

import ParticleBackground from '../components/ui/ParticleBackground'

import { API } from '../api'

const DEFAULT_SERVICES = [
  {
    id: 'akademik',
    name: 'Layanan Akademik',
    question: 'Bagaimana kepuasan Anda terhadap pelayanan administrasi akademik (KRS, surat-menyurat, transkrip)?'
  },
  {
    id: 'pengajaran',
    name: 'Kualitas Pengajaran',
    question: 'Bagaimana kepuasan Anda terhadap kompetensi, kedisiplinan, dan metode pengajaran dosen perkuliahan?'
  },
  {
    id: 'perpustakaan',
    name: 'Perpustakaan',
    question: 'Bagaimana kepuasan Anda terhadap kelengkapan koleksi buku, ruang baca, dan pelayanan perpustakaan?'
  },
  {
    id: 'laboratorium',
    name: 'Laboratorium & Praktikum',
    question: 'Bagaimana kepuasan Anda terhadap kelengkapan peralatan dan kenyamanan kegiatan praktikum di laboratorium?'
  },
  {
    id: 'keuangan',
    name: 'Layanan Keuangan',
    question: 'Bagaimana kepuasan Anda terhadap kemudahan pelayanan administrasi keuangan (UKT/beasiswa)?'
  },
  {
    id: 'kemahasiswaan',
    name: 'Layanan & Fasilitas Kampus',
    question: 'Bagaimana kepuasan Anda terhadap layanan kemahasiswaan, dukungan BEM/Ormawa, dan kegiatan mahasiswa?'
  },
  {
    id: 'karir_magang',
    name: 'Bimbingan Karir & Magang',
    question: 'Bagaimana kepuasan Anda terhadap layanan informasi magang (Kampus Merdeka), bimbingan karir, dan konseling?'
  },
  {
    id: 'fasilitas',
    name: 'Fasilitas Kampus',
    question: 'Bagaimana kepuasan Anda terhadap kebersihan dan kenyamanan fasilitas umum kampus (ruang kelas, toilet, parkir)?'
  },
  {
    id: 'layanan_it',
    name: 'Layanan IT & Wi-Fi',
    question: 'Bagaimana kepuasan Anda terhadap keandalan jaringan internet (Wi-Fi) dan portal sistem informasi digital kampus?'
  },
  {
    id: 'pelayanan_staf',
    name: 'Responsivitas Staf',
    question: 'Bagaimana kepuasan Anda terhadap keramahan, kecepatan, dan responsivitas petugas/staf kampus dalam memberikan pelayanan?'
  }
]

const emotionToRating = {

  angry: 1,
  disgusted: 1,

  sad: 2,

  neutral: 3,

  surprised: 4,

  happy: 5,

  fearful: 2

}

export default function SurveyPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES)

  useEffect(() => {
    fetch(API.SETTINGS.GET)
      .then(res => res.json())
      .then(data => {
        if (data && data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setServices(data.questions)
        }
      })
      .catch(err => console.log('Using default questions:', err))
  }, [])

  const [step, setStep] =
    useState('student')

  const [student, setStudent] =
    useState(null)

  const [currentQuestion, setCurrentQuestion] =
    useState(0)

  const [responses, setResponses] =
    useState([])

  // =========================
  // FIX EMOTION
  // =========================

  const [currentEmotion, setCurrentEmotion] =
    useState(null)

  const [currentRating, setCurrentRating] =
    useState(3)

  const [isManualMode, setIsManualMode] =
    useState(false)

  const [hasDetectedFace, setHasDetectedFace] =
    useState(false)

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('darkMode') === 'true'
    )

  // =========================
  // START SURVEY
  // =========================

  const handleStartSurvey = (
    studentData
  ) => {

    setStudent(studentData)

    setStep('survey')

  }

  // =========================
  // SAVE NEXT
  // =========================

  const handleSaveAndNext = (
    comment = ''
  ) => {

    const service =
      services[currentQuestion] || services[0]

    const newResponse = {

  serviceId: service.id,

  serviceName: service.name,

  rating: currentRating,

  emotion: currentEmotion,

  ai_rating: currentRating,

  raw_ai_emotion: currentEmotion,

  comment:
    currentRating <= 2
      ? comment
      : '',

  timestamp:
    new Date().toISOString()

}

    const newResponses = [
      ...responses,
      newResponse
    ]

    setResponses(newResponses)

    if (
      currentQuestion <
      services.length - 1
    ) {

      setCurrentQuestion(
        prev => prev + 1
      )

      // =========================
      // RESET EMOTION
      // =========================

      setCurrentEmotion(null)

      setCurrentRating(3)

      setIsManualMode(false)
      setHasDetectedFace(false)

    } else {

      saveSurvey(
        newResponses
      )

      setStep('result')

    }

  }

  // =========================
  // SAVE API
  // =========================

  const saveSurvey = async (
    finalResponses
  ) => {

    const average = (

      finalResponses.reduce(
        (a, r) =>
          a + r.rating,
        0
      ) /

      finalResponses.length

    ).toFixed(2)

    const surveyData = {

      student,

      responses:
        finalResponses,

      averageRating:
        average

    }

    try {

      console.log(
  "DATA DIKIRIM:",
  surveyData
)

      await fetch(
       '/api/save-survey',

        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            surveyData
          )

        }

      )

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // RESET
  // =========================

  const handleReset = () => {

    setStep('student')

    setStudent(null)

    setCurrentQuestion(0)

    setResponses([])

    setCurrentEmotion(null)

    setCurrentRating(3)

    setIsManualMode(false)
    setHasDetectedFace(false)
  }

  // =========================
  // HOME
  // =========================

  const handleBackToHome = () => {

    handleReset()

  }

  // =========================
  // DARK MODE
  // =========================

  const handleToggleTheme = () => {

    const newMode =
      !darkMode

    setDarkMode(newMode)

    localStorage.setItem(
      'darkMode',
      JSON.stringify(newMode)
    )

  }

  // =========================
  // AVERAGE
  // =========================

  const calculateAverage =
    (responses) => {

      const total =
        responses.reduce(
          (a, r) =>
            a + r.rating,
          0
        )

      return (
        total /
        responses.length
      ).toFixed(2)

    }

  return (

    <div
      className={`
        survey-page-shell
        min-h-[100dvh]
        relative
        overflow-x-hidden
        transition-all
        duration-500

        ${

          darkMode

            ? 'bg-[#020617]'

            : 'bg-[#f8fafc]'

        }

      `}
    >

      {/* BACKGROUND */}

      <ParticleBackground />

      <div className="
        absolute
        top-0
        right-0
        w-[450px]
        h-[450px]
        bg-indigo-200/20
        rounded-full
        blur-3xl
      " />

      <div className="
        absolute
        bottom-0
        left-0
        w-[400px]
        h-[400px]
        bg-orange-200/20
        rounded-full
        blur-3xl
      " />

      {/* CONTENT */}

      <div className={`
        relative
        z-10
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-2
        sm:py-3
        ${step === 'student' || step === 'survey' ? 'min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-between overflow-x-hidden' : 'py-6'}
        `}>

        {/* HEADER */}

        <header className="
            flex
            flex-col
            sm:flex-row
            justify-between
            items-center
            gap-3
            sm:gap-4
            mb-3
            sm:mb-4
            ">

          {/* LOGO */}

          <div className="
            flex
            items-center
            gap-4
          ">

            <img
                src="/logopbjt.png"
                alt="Logo"
                className="
                  w-10
                  h-10
                  sm:w-14
                  sm:h-14
                  object-contain
                "
              />

            <div>

              <h1 className={`

                text-xl
                font-bold

                ${

                  darkMode
                    ? 'text-white'
                    : 'text-slate-800'

                }

              `}>

                Politeknik Baja Tegal

              </h1>

              <p className="
                text-slate-500
                text-sm
              ">

                Sistem Survei Kepuasan Mahasiswa

              </p>

            </div>

          </div>

          {/* MENU */}

          <div className="
              flex
              justify-center
              sm:justify-end

              gap-3
              flex-wrap

              w-full
              sm:w-auto

              mt-2
              ">

            {step !== 'student' ? (
              <button
                onClick={handleBackToHome}
                className={`flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-2xl font-medium transition-all ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Menu Awal</span>
              </button>
            ) : (
              <>
                <a
                  href="/tentang"
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                    darkMode
                      ? 'bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span>Tentang</span>
                </a>

                <a
                  href="/admin/login"
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                    darkMode
                      ? 'bg-orange-500/10 text-orange-200 hover:bg-orange-500/20'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Admin</span>
                </a>

                <button
                  onClick={handleToggleTheme}
                  className={`flex items-center justify-center px-4 py-3 rounded-2xl font-medium transition-all ${
                    darkMode
                      ? 'bg-white/10 text-amber-300 hover:bg-white/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                  aria-label="Toggle Theme"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>
        </header>

        {/* HERO & FORM (COMPACT FIT TO SCREEN / DILEBARKAN AGAR TIDAK PERLU SCROLL) */}
        {step === 'student' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto flex-1 py-1 sm:py-2 max-w-6xl mx-auto w-full">
            {/* LEFT COLUMN: HERO & CAMPUS PHOTO (SIMETRIS PERSIS DENGAN FORM KANAN) */}
            <div className="lg:col-span-6 w-full max-w-lg mx-auto flex flex-col justify-between h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 shadow-sm ${
                  darkMode ? 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                }`}>
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Smart Campus Survey</span>
                </span>

                <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight mb-2 sm:mb-3 ${
                  darkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  Survei Kepuasan Mahasiswa
                </h1>

                <p className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Evaluasi pelayanan kampus menggunakan teknologi
                  <span className="font-semibold text-indigo-500"> AI Face Emotion Detection </span>
                  untuk meningkatkan kualitas pelayanan secara akurat, nyata, dan responsif.
                </p>
              </motion.div>

              {/* FOTO KAMPUS (JANGAN FULL KE ATAS & MAHASISWA FULL BODY SERTA SIMETRIS PERSIS) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl border w-full flex-1 min-h-[220px] sm:min-h-[240px] max-h-[280px] relative flex items-center justify-center ${
                  darkMode ? 'border-white/10 bg-slate-900/50' : 'border-slate-200/80 bg-slate-100'
                }`}
              >
                <img
                  src="/kampus.jpg"
                  alt="Politeknik Baja Tegal"
                  className="w-full h-full object-cover object-[center_bottom] hover:scale-[1.03] transition-transform duration-700 block"
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: COMPACT STUDENT FORM (SIMETRIS PERSIS DENGAN KIRI) */}
<div className="lg:col-span-6 w-full max-w-lg mx-auto flex flex-col justify-between h-full lg:pt-[44px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 lg:p-7 w-full h-full flex flex-col justify-between border shadow-2xl backdrop-blur-2xl ${
                  darkMode ? 'bg-slate-900/80 border-white/10' : 'bg-white/90 border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                }`}
              >
                <StudentForm onStart={handleStartSurvey} darkMode={darkMode} />
              </motion.div>
            </div>
          </div>
        )}

        {/* SURVEY */}

        {

          step === 'survey'

          && (

            <motion.div

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5
              }}

              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-4
                sm:gap-6
                items-stretch
                my-auto
                flex-1
                w-full
                max-w-6xl
                mx-auto
                px-2
                sm:px-0
              "
            >
              <div className="lg:col-span-6 w-full max-w-lg mx-auto flex flex-col justify-between h-full">
                <CameraPanel

                onEmotionDetected={(
                  emotion
                ) => {

                  if (
                    !isManualMode
                  ) {

                    // FIX NATURAL

                    if (!emotion) {

                    // loading hanya awal
                    if (!hasDetectedFace) {

                      setCurrentEmotion(null)

                    }

                    return

                  }

                    const mappedRating =
                      emotionToRating[
                        emotion
                      ] || 3

                    setCurrentEmotion(
                      emotion
                    )
                    setHasDetectedFace(true)

                    setCurrentRating(
                      mappedRating
                    )

                  }

                }}

                currentEmotion={
                  currentEmotion
                }

                currentRating={
                  currentRating
                }

                manualMode={
                  isManualMode
                }
              />
              </div>

              <div className="lg:col-span-6 w-full max-w-lg mx-auto flex flex-col justify-between h-full">
                <QuestionPanel


                services={services}

                currentQuestion={
                  currentQuestion
                }

                currentEmotion={
                  currentEmotion
                }

                currentRating={
                  currentRating
                }

                hasDetectedFace={
                  hasDetectedFace
                }

                isManualMode={
                  isManualMode
                }

                onManualRating={(
                  rating,
                  emotion
                ) => {

                  setIsManualMode(
                    true
                  )

                  setCurrentRating(
                    rating
                  )

                  setCurrentEmotion(
                    emotion
                  )

                }}

                onToggleManual={() =>
                  setIsManualMode(
                    prev => !prev
                  )
                }

                onNext={
                  handleSaveAndNext
                }

                isLast={
                  currentQuestion ===
                  services.length - 1
                }
              />
              </div>

            </motion.div>

          )

        }

        {/* RESULT */}

        {

          step === 'result'

          && (

            <ResultPanel

              responses={responses}

              averageRating={
                calculateAverage(
                  responses
                )
              }

              onReset={
                handleReset
              }
            />

          )

        }

      </div>

    </div>

  )

}