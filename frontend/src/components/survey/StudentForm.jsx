export default function StudentForm({ onStart }) {

  const handleSubmit = (e) => {

    e.preventDefault()

    const fakultas =
      e.target.fakultas.value

    if (!fakultas) {

      alert('Pilih Program Studi dulu!')
      return
    }

    onStart({
      fakultas
    })
  }

  return (

    <div className="

      w-full
      max-w-xs
      sm:max-w-sm
      md:max-w-lg
      lg:max-w-2xl
      xl:max-w-3xl
      mx-auto

      bg-white/80
      backdrop-blur-2xl

      rounded-2xl
      sm:rounded-3xl
      lg:rounded-[2rem]

      shadow-lg
      sm:shadow-xl
      md:shadow-2xl
      lg:shadow-[0_30px_80px_rgba(0,0,0,0.16)]

      p-3
      xs:p-4
      sm:p-6
      md:p-8
      lg:p-10

      transition-all
      duration-500

    ">

      {/* TITLE */}

      <div className="
        mb-5
        sm:mb-6
        md:mb-7
        lg:mb-8
      ">

        <div className="
          flex
          items-center
          gap-2
          sm:gap-3

          mb-2
          sm:mb-3
        ">

          <div className="
            w-10
            h-10
            sm:w-12
            sm:h-12
            md:w-14
            md:h-14

            rounded-lg
            sm:rounded-xl
            md:rounded-2xl

            bg-gradient-to-r
            from-orange-400
            to-amber-300

            flex
            items-center
            justify-center

            text-xl
            sm:text-2xl
            md:text-3xl

            shadow-md
            sm:shadow-lg
          ">

            📝

          </div>

          <div>

            <h2 className="
              text-lg
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              xl:text-5xl
              font-black

              text-slate-800
              leading-tight
            ">

              Data Mahasiswa

            </h2>

            <p className="
              text-sm
              sm:text-base
              md:text-base
              lg:text-base
              text-slate-500
              leading-relaxed
            ">

              Sistem Kepuasan Mahasiswa Berbasis AI

            </p>

          </div>

        </div>

      </div>

      {/* ALERT */}

      <div className="

        bg-gradient-to-r
        from-blue-50
        to-indigo-50

        text-blue-700

        rounded-lg
        sm:rounded-xl
        md:rounded-2xl

        p-3
        sm:p-4
        md:p-5
        lg:p-6

        mb-4
        sm:mb-5
        md:mb-6
        lg:mb-7

        text-xs
        sm:text-sm
        md:text-base
        lg:text-lg

        shadow-sm
        leading-relaxed

      ">

        🔒 Survei ini bersifat
        <strong> anonim </strong>

        dan hanya digunakan untuk meningkatkan kualitas pelayanan kampus.

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
      >

        {/* SELECT */}

        <div className="
          mb-4
          sm:mb-5
          md:mb-6
          lg:mb-7
          xl:mb-8
        ">

          <label className="

            block

            font-bold
            text-slate-700

            mb-2
            sm:mb-2.5
            md:mb-3

            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl

          ">

            Fakultas Teknik

          </label>

          <select

            name="fakultas"

            required

            className="

              w-full
              appearance-none

              border
              border-slate-200

              rounded-lg
              sm:rounded-xl
              md:rounded-2xl

              px-3
              sm:px-4
              md:px-5
              py-2.5
              sm:py-3
              md:py-4

              bg-white/80

              text-slate-700
              text-xs
              sm:text-sm
              md:text-base
              lg:text-lg

              shadow-sm
              hover:shadow-md

              focus:outline-none

              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100

              transition-all
              duration-300
              cursor-pointer

              min-h-[44px] sm:min-h-[48px]

            "
          >

            <option value="">
              Pilih Program Studi
            </option>

            <option value="TI">
              Teknik Informatika
            </option>

            <option value="TM">
              Teknik Mesin
            </option>

            <option value="TO">
              Teknik Otomotif
            </option>

            <option value="TEI">
              Teknik Elektronika Industri
            </option>

          </select>

        </div>

        {/* BUTTON */}

        <button

          type="submit"

          className="

            w-full

            py-3
            sm:py-3
            md:py-4
            lg:py-5

            px-4

            rounded-lg
            sm:rounded-xl
            md:rounded-2xl

            bg-gradient-to-r
            from-indigo-600
            to-purple-600

            text-white

            font-bold
            sm:font-black
            text-sm
            sm:text-base
            md:text-base
            lg:text-lg

            shadow-md
            sm:shadow-lg
            md:shadow-xl
            hover:shadow-lg
            sm:hover:shadow-2xl

            hover:scale-[1.02]
            active:scale-[0.99]

            transition-all
            duration-300

            disabled:opacity-50
            disabled:cursor-not-allowed

            min-h-[44px] sm:min-h-[48px]

          "
        >

          Mulai Survei →

        </button>

      </form>

    </div>
  )
}