import { useState } from 'react'

export default function DataResponden({
  data,
  darkMode
}) {

  const [selected, setSelected] =
    useState(null)

  const [searchJurusan,setSearchJurusan]=
    useState("")

  // ======================
  // EMOJI
  // ======================

              const getEmoji = (rating) => {

            const value=Math.round(rating)

            if(value>=5) return "😄"

            if(value>=4) return "🙂"

            if(value>=3) return "😐"

            if(value>=2) return "😕"

            return "😠"

            }

  // ======================
  // TEXT
  // ======================

  const getText = (rating) => {

    if (rating === 5)
      return 'Sangat Puas'

    if (rating === 4)
      return 'Puas'

    if (rating === 3)
      return 'Netral'

    if (rating === 2)
      return 'Tidak Puas'

    return 'Sangat Tidak Puas'

  }

          const filteredData = data.filter((item) => {

          const jurusan = String(
          item.fakultas
          || item.jurusan
          || item.student?.fakultas
          || item.student?.jurusan
          || ""
          ).toLowerCase()

          return jurusan.includes(
          searchJurusan.toLowerCase()
          )

          })

  const getJurusanDisplay = (item) =>
    item.fakultas
    || item.jurusan
    || item.student?.fakultas
    || item.student?.jurusan
    || '-'

  return (

    <div className="space-y-8">

      {/* ====================== */}
      {/* TABLE */}
      {/* ====================== */}

      <div className={`

        rounded-2xl sm:rounded-3xl
        overflow-hidden

        border

        shadow-2xl

        ${

          darkMode

            ? `
              bg-slate-900
              border-slate-800
            `

            : `
              bg-white
              border-slate-200
            `

        }

      `}>

        {/* HEADER */}

        <div className={`

          px-4 sm:px-5 md:px-7
          py-4 sm:py-6

          border-b

          flex
          justify-between
          items-center
          flex-col sm:flex-row
          gap-4

          ${

            darkMode

              ? `
                border-slate-800
              `

              : `
                border-slate-200
              `

          }
          

        `}>

          <div>

            

            <h2 className={`

              text-2xl sm:text-3xl
              font-black

              ${

                darkMode
                  ? 'text-white'
                  : 'text-slate-800'

              }

            `}>

              Data Responden

            </h2>

          </div>

          <div className="
                flex
                gap-2 sm:gap-3
                flex-wrap
                justify-center
                w-full
                sm:w-auto
                ">

<div
className={`
border
rounded-lg sm:rounded-2xl
px-3 sm:px-5
py-2 sm:py-3
shadow

${
darkMode
? 'bg-slate-800 border-slate-700'
: 'bg-white border-slate-200'
}
`}
>

<p
className={`
text-xs

${
darkMode
? 'text-slate-300'
: 'text-slate-500'
}
`}
>

👥 Total Responden

</p>

<h3
className={`
font-black
text-xl sm:text-2xl

${
darkMode
? 'text-white'
: 'text-slate-800'
}
`}
>

{data.length}

</h3>

</div>



        </div>

        </div>

        {/* SEARCH */}

        <div className="p-4 sm:p-5 md:p-6">

          <input

          type="text"

          placeholder="🔍 Cari Program Studi..."

          value={searchJurusan}

          onChange={(e)=>
          setSearchJurusan(
          e.target.value
          )
          }

          className={`
            w-full
            border
            rounded-xl sm:rounded-2xl
            px-4 sm:px-5
            py-3 sm:py-4
            text-sm sm:text-base
            outline-none
            focus:ring-2
            focus:ring-indigo-500

            ${
            darkMode
            ? `
            bg-slate-700
            border-slate-600
            border-slate-700
            text-white
            placeholder:text-slate-400
            `
            : `
            bg-white
            border-slate-200
            text-slate-800
            `
            }
            `}
          />

          </div>

        {/* TABLE WRAPPER */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead className={`
              ${
              darkMode
              ? 'bg-slate-700'
              : 'bg-slate-100'
              }
              `}>

              <tr>

                <th className="
                  px-4 sm:px-6
                  py-3 sm:py-4
                  text-left
                  text-xs sm:text-sm
                  font-semibold
                ">
                  Program Studi
                </th>

                <th className="
                  px-4 sm:px-6
                  py-3 sm:py-4
                  text-left
                  text-xs sm:text-sm
                  font-semibold
                ">
                  Rating
                </th>

                <th className="
                  px-4 sm:px-6
                  py-3 sm:py-4
                  text-left
                  text-xs sm:text-sm
                  font-semibold
                ">
                  Tanggal
                </th>

                <th className="
                  px-4 sm:px-6
                  py-3 sm:py-4
                  text-center
                  text-xs sm:text-sm
                  font-semibold
                ">
                  Detail
                </th>

              </tr>

            </thead>

            <tbody>

              {

                filteredData.map((item,index)=>(


                  <tr

                    key={index}

                    className={`

                      border-t

                      ${

                        darkMode

                          ? `
                            border-slate-800
                            hover:bg-slate-800
                          `

                          : `
                            border-slate-200
                            hover:bg-slate-50
                          `

                      }

                    `}
                  >

                    {/* JURUSAN */}

                    <td className={`

                      px-4 sm:px-6
                      py-4 sm:py-5

                      font-semibold
                      text-sm sm:text-base

                      ${

                        darkMode
                          ? 'text-white'
                          : 'text-slate-800'

                      }

                    `}>
                 {getJurusanDisplay(item)}

                    </td>

                    {/* RATING */}

                    <td className="
                      px-4 sm:px-6
                      py-4 sm:py-5
                    ">

                      <div className="
                        inline-flex
                        items-center
                        gap-2

                        px-3 sm:px-4
                        py-1.5 sm:py-2

                        rounded-lg sm:rounded-xl

                        bg-yellow-400

                        text-black
                        font-bold
                        text-xs sm:text-sm
                      ">

                        <span>
              {getEmoji(item.average_rating)}{" "}
              {Number(item.average_rating).toFixed(1)}
              </span>

                      </div>

                    </td>

                    {/* DATE */}

                    <td className={`

                      px-4 sm:px-6
                      py-4 sm:py-5

                      text-xs sm:text-sm

                      ${

                        darkMode
                          ? 'text-slate-300'
                          : 'text-slate-600'

                      }

                    `}>

                      {

                        new Date(
                    item.submitted_at
                    ).toLocaleString("id-ID", {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })

                      }

                    </td>

                    {/* BUTTON */}

                    <td className="
                      px-4 sm:px-6
                      py-4 sm:py-5
                      text-center
                    ">

                      <button

                        onClick={() =>
                          setSelected(item)
                        }

                        className="
                          px-3 sm:px-5
                          py-1.5 sm:py-2

                          rounded-lg sm:rounded-xl

                          bg-indigo-600

                          text-white
                          font-semibold
                          text-xs sm:text-sm

                          hover:bg-indigo-700

                          transition-all
                          min-h-[32px] sm:min-h-[40px]
                        "
                      >

                        Lihat

                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* ====================== */}
      {/* MODAL DETAIL */}
      {/* ====================== */}

      {

        selected && (

          <div className="

            fixed
            inset-0

            z-50

            flex
            items-center
            justify-center

            bg-transparent

            p-5

          ">

            <div className={`

              w-full
              max-w-2xl sm:max-w-3xl lg:max-w-4xl

              max-h-[85vh] sm:max-h-[90vh]

              overflow-y-auto

              rounded-2xl sm:rounded-3xl

              shadow-2xl

              border

              ${

                darkMode

                  ? `
                    bg-slate-900
                    border-slate-800
                  `

                  : `
                    bg-white
                    border-slate-200
                  `

              }

            `}>

              {/* HEADER */}

              <div className={`

                px-4 sm:px-6 md:px-8
                py-4 sm:py-6

                border-b

                flex
                justify-between
                items-center
                flex-col sm:flex-row
                gap-4

                ${

                  darkMode

                    ? `
                      border-slate-800
                    `

                    : `
                      border-slate-200
                    `

                }

              `}>

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

                    📋 Detail Evaluasi

                  </h2>

                  <p className={`

                    text-xs sm:text-sm

                    ${

                      darkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'

                    }

                  `}>

                    Detail review mahasiswa

                  </p>

                </div>

                <button

                  onClick={() =>
                    setSelected(null)
                  }

                  className="
                    px-4 sm:px-5
                    py-2

                    rounded-lg sm:rounded-xl

                    bg-red-500

                    text-white
                    font-bold
                    text-sm sm:text-base

                    hover:bg-red-600

                    transition-all
                    min-h-[40px]
                  "
                >

                  Tutup

                </button>

              </div>

              {/* CONTENT */}

              <div className="
                p-4 sm:p-6 md:p-8

                grid
                gap-4 sm:gap-5
              ">

                {

                  selected.responses?.map(
                      (response,index)=>(

                      <div
                      key={index}
                      className={`
                      rounded-3xl
                      p-5
                      mb-4
                      border

                      ${darkMode
                      ?`
                      bg-slate-700
                      border-slate-600
                      text-white
                      placeholder:text-slate-300
                      `
                      :`
                      bg-slate-50
                      border-slate-200
                      `
                      }
                      `}
                      >

                      <div className="
                      flex
                      justify-between
                      items-center
                      ">

                      <div>

                      <h3 className={`
                      font-black
                      text-xl
                      mb-2

                      ${darkMode
                      ?'text-white'
                      :'text-slate-800'
                      }
                      `}>

                      {response.serviceName}

                      </h3>

                      <div className="
                      flex
                      items-center
                      gap-3
                      ">

                      <div className="
                      bg-yellow-400
                      rounded-xl
                      px-4
                      py-2
                      font-bold
                      ">

                      ⭐ {response.rating}

                      </div>

                      <div className="
                      text-slate-500
                      font-medium
                      ">

                      {getText(response.rating)}

                      </div>

                      </div>

                      </div>

                      <div className="
                      text-4xl
                      ">

                      {getEmoji(response.rating)}

                      </div>

                      </div>

                      {response.comment && (

                      <div className={`
                      mt-4
                      rounded-2xl
                      p-4

                      ${darkMode
                      ?`
                      bg-slate-900
                      text-slate-300
                      `
                      :`
                      bg-white
                      text-slate-600
                      `
                      }
                      `}>

                      💬 {response.comment}

                      </div>

                      )}

                      </div>

                      ))

                }

              </div>

            </div>

          </div>

        )

      }

    </div>

  )

}