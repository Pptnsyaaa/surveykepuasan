// src/pages/SurveyPage.jsx

import { useState } from 'react'
import { motion } from 'framer-motion'

import StudentForm from '../components/survey/StudentForm'
import CameraPanel from '../components/survey/CameraPanel'
import QuestionPanel from '../components/survey/QuestionPanel'
import ResultPanel from '../components/survey/ResultPanel'

import ParticleBackground from '../components/ui/ParticleBackground'

const SERVICES = [

  {
    id: 'akademik',
    name: 'Layanan Akademik',
    question:
      'Bagaimana kepuasan Anda terhadap pelayanan administrasi akademik?'
  },

  {
    id: 'perpustakaan',
    name: 'Perpustakaan',
    question:
      'Bagaimana kepuasan Anda terhadap fasilitas dan pelayanan perpustakaan?'
  },

  {
    id: 'keuangan',
    name: 'Layanan Keuangan',
    question:
      'Bagaimana kepuasan Anda terhadap pelayanan administrasi keuangan?'
  },

  {
    id: 'kemahasiswaan',
    name: 'Kemahasiswaan',
    question:
      'Bagaimana kepuasan Anda terhadap layanan kemahasiswaan?'
  },

  {
    id: 'fasilitas',
    name: 'Fasilitas Kampus',
    question:
      'Bagaimana kepuasan Anda terhadap fasilitas umum kampus?'
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

      JSON.parse(
        localStorage.getItem(
          'darkMode'
        )
      ) || false

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
      SERVICES[currentQuestion]

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
      SERVICES.length - 1
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

      <div className="
        relative
        z-10
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        ">

        {/* HEADER */}

        <header className="

            flex
            flex-col
            sm:flex-row

            justify-between
            items-center

            gap-5
            mb-8

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

                onClick={
                  handleBackToHome
                }

                className={`

                  px-3
                  py-2
                  sm:px-5
                  sm:py-3

                  rounded-2xl

                  font-medium

                  transition-all

                  ${

                    darkMode

                      ? `
                        bg-white/10
                        text-white
                      `

                      : `
                        bg-white
                        text-slate-700
                        border
                        border-slate-200
                      `

                  }

                `}
              >

                🏠 Menu Awal

              </button>

            ) : (

              <>

                <a

                  href="/tentang"

                  className={`

                    px-5
                    py-3

                    rounded-2xl

                    font-medium

                    transition-all

                    ${

                      darkMode

                        ? `
                          bg-indigo-500/10
                          text-indigo-200
                        `

                        : `
                          bg-indigo-50
                          text-indigo-700
                        `

                    }

                  `}
                >

                  ℹ️ Tentang

                </a>

                <a

                  href="/admin/login"

                  className={`

                    px-5
                    py-3

                    rounded-2xl

                    font-medium

                    transition-all

                    ${

                      darkMode

                        ? `
                          bg-orange-500/10
                          text-orange-200
                        `

                        : `
                          bg-orange-50
                          text-orange-700
                        `

                    }

                  `}
                >

                  🔐 Admin

                </a>

                <button

                  onClick={
                    handleToggleTheme
                  }

                  className={`

                    px-5
                    py-3

                    rounded-2xl

                    font-medium

                    transition-all

                    ${

                      darkMode

                        ? `
                          bg-white/10
                          text-white
                        `

                        : `
                          bg-white
                          text-slate-700
                          border
                          border-slate-200
                        `

                    }

                  `}
                >

                  {

                    darkMode
                      ? '☀️'
                      : '🌙'

                  }

                </button>

              </>

            )}

          </div>

        </header>

        {/* HERO */}

        {

          step === 'student'

          && (

            <div className="

              grid
              grid-cols-1
              lg:grid-cols-2

              gap-4
              sm:gap-8

              items-center

              mb-6

              ">

              {/* TEXT */}

              <div>

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
                    duration: 0.6
                  }}

                >

                  <span className={`

                    inline-block

                    px-4
                    py-2

                    rounded-full

                    text-sm
                    font-medium

                    mb-5

                    ${

                      darkMode

                        ? `
                          bg-indigo-500/10
                          text-indigo-200
                        `

                        : `
                          bg-indigo-100
                          text-indigo-700
                        `

                    }

                  `}>

                    🎓 Smart Campus Survey

                  </span>

                  <h1 className={`

                    text-lg
                    sm:text-3xl
                    lg:text-6xl

                    font-black
                    leading-tight
                    mb-3

                ${
                  darkMode
                      ? 'text-white'
                      : 'text-slate-800'
                }`}
                >

                    Survei Kepuasan
                    Mahasiswa

                  </h1>

                  <p className={`

                    text-xs
                    sm:text-lg
                    leading-normal

                    ${

                      darkMode
                        ? 'text-slate-300'
                        : 'text-slate-600'

                    }

                  `}>

                    Evaluasi pelayanan kampus
                    menggunakan teknologi

                    <span className="
                      font-semibold
                    ">

                      {' '}
                      AI Face Emotion Detection

                    </span>

                    {' '}untuk meningkatkan kualitas
                    pelayanan kampus.

                  </p>

                </motion.div>

              </div>

              {/* IMAGE */}

              <motion.div

                initial={{
                  opacity: 0,
                  scale: 0.95
                }}

                animate={{
                  opacity: 1,
                  scale: 1
                }}

                transition={{
                  duration: 0.6
                }}

              >

                <div className="
                  rounded-[32px]

                  p-2
                  sm:p-4
                  ">

                  <img
                    src="/kampus.jpg"
                    alt="Kampus"
                    className="
                    w-full
                    h-[100px]
                    sm:h-[220px]
                    lg:h-[340px]

                    rounded-3xl
                    object-cover
                    "
                  />

                </div>

              </motion.div>

            </div>

          )

        }

        {/* FORM MAHASISWA */}

        {

          step === 'student'

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

              className={`

                rounded-[32px]

                p-3
                sm:p-6
                lg:p-8

                w-full
                h-auto
                min-h-[300px]
                sm:min-h-fit

                border

                shadow-xl

                backdrop-blur-xl

                ${

                  darkMode

                    ? `
                      bg-slate-900/60
                      border-white/10
                    `

                    : `
                      bg-white/80
                      border-white/50
                    `

                }

              `}

            >

              <StudentForm
                onStart={
                  handleStartSurvey
                }
              />

            </motion.div>

          )

        }

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
                lg:grid-cols-2
                gap-4
                sm:gap-6
                px-2
                sm:px-0
              "
            >

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

              <QuestionPanel


                services={SERVICES}

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
                  SERVICES.length - 1
                }
              />

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