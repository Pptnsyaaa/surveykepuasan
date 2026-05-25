import { useState } from 'react'
import {
  User,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

export default function LoginAdmin() {

  const darkMode =
    JSON.parse(
      localStorage.getItem(
        'darkMode'
      )
    ) || false

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  // =========================
  // LOGIN MYSQL
  // =========================

  const handleLogin = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const response = await fetch(
        'fetch("https://silica-purging-durable.ngrok-free.dev/api/admin/login")',
        {
          method: 'POST',

          headers: {
            'Content-Type':
            'application/json'
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      )

      const data =
        await response.json()

      if (data.success) {

        localStorage.setItem(
          'adminLogin',
          true
        )

        localStorage.setItem(
          'adminData',
          JSON.stringify(
            data.admin
          )
        )

        window.location.href =
        '/admin/dashboard'

      }

      else {

        alert(
          data.message ||
          'Username atau password salah!'
        )

      }

    }

    catch (error) {

      console.log(error)

      alert(
        'Server backend gagal terhubung!'
      )

    }

    setLoading(false)

  }

  return (

<div className={`

min-h-screen

relative
overflow-hidden

flex
flex-col

px-3
sm:px-4
md:px-6
lg:px-8

py-6
sm:py-8
md:py-10
lg:py-12

transition-all

${

darkMode

?`

bg-gradient-to-br
from-slate-950
via-slate-900
to-indigo-950

`

:`

bg-gradient-to-br
from-orange-50
via-white
to-yellow-50

`

}

`}>

{/* BLUR */}

<div className="
absolute
top-0
left-0

w-24 sm:w-32 md:w-40 lg:w-56

h-24 sm:h-32 md:h-40 lg:h-56

bg-orange-200/30

rounded-full

blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px]
"/>

<div className="
absolute
bottom-0
right-0

w-28 sm:w-40 md:w-56 lg:w-72

h-28 sm:h-40 md:h-56 lg:h-72

bg-indigo-200/30

rounded-full

blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[140px]
"/>

{/* TOP */}

<div className="
relative
z-10

flex
justify-end

mb-6
sm:mb-8
md:mb-10
lg:mb-12
">

<a

href="/"

className="
px-3
sm:px-4
md:px-5
lg:px-6
py-2
sm:py-2.5
md:py-3
lg:py-3

rounded-lg
sm:rounded-xl
md:rounded-2xl

bg-orange-500

text-white
font-semibold
text-xs
sm:text-sm
md:text-base

shadow-md
sm:shadow-lg
md:shadow-xl

hover:scale-105

transition-all
"

>

🏠 Menu Awal

</a>

</div>

{/* LOGIN */}

<div className="
flex-1

flex
items-center
justify-center

relative
z-10

w-full
">

<div className={`

w-full
max-w-xs
sm:max-w-sm
md:max-w-md
lg:max-w-lg

rounded-2xl
sm:rounded-2xl
md:rounded-3xl
lg:rounded-[35px]

shadow-lg
sm:shadow-xl
md:shadow-2xl

p-4
sm:p-6
md:p-8
lg:p-10

backdrop-blur-xl

transition-all

${

darkMode

?`

bg-slate-900/90

border
border-white/10

`

:`

bg-white/95

`

}

`}>

{/* HEADER */}

<div className="
text-center
mb-4
sm:mb-5
md:mb-6
lg:mb-8
">

<img
src="/logopbjt.png"
className="
w-10
sm:w-12
md:w-14
lg:w-16
mx-auto
mb-2
sm:mb-3
md:mb-4
"
/>

<p className={`
text-xs
sm:text-sm
md:text-base

${

darkMode

?

'text-slate-400'

:

'text-slate-500'

}

`}>

Politeknik Baja Tegal

</p>

<h1 className={`
text-2xl
sm:text-3xl
md:text-3xl
lg:text-4xl
font-black
mb-1
sm:mb-2
md:mb-2
lg:mb-2

${

darkMode

?

'text-white'

:

'text-slate-800'

}

`}>

Login Admin

</h1>

<p className={`

text-xs
sm:text-sm
md:text-base

${

darkMode

?

'text-slate-400'

:

'text-slate-500'

}

`}>

Dashboard Monitoring Survei

</p>

</div>

<form
onSubmit={handleLogin}
className="
space-y-3
sm:space-y-4
md:space-y-5
lg:space-y-5
">

{/* USERNAME */}

<div>

<label className={`

block
mb-1.5
sm:mb-2
md:mb-2
lg:mb-2

font-semibold
text-xs
sm:text-sm
md:text-base
lg:text-base

${

darkMode

?

'text-white'

:

'text-slate-700'

}

`}>

Username

</label>

<div className={`

flex
items-center

rounded-lg
sm:rounded-xl
md:rounded-2xl

px-2.5
sm:px-3
md:px-4
lg:px-4

border-2

${

darkMode

?`

bg-slate-800
border-slate-700

`

:`

bg-slate-50
border-slate-200

`

}

`}>

<User
size={16}
className="
text-slate-400
mr-2
sm:mr-3
md:mr-3
lg:mr-3
"
/>

<input

type="text"

value={username}

onChange={(e)=>
setUsername(
e.target.value
)
}

placeholder="
Masukkan username
"

className={`

w-full

py-2
sm:py-2.5
md:py-3
lg:py-4

bg-transparent

outline-none
text-xs
sm:text-sm
md:text-base
lg:text-base

${

darkMode

?

'text-white'

:

'text-slate-800'

}

`}

/>

</div>

</div>

{/* PASSWORD */}

<div>

<label className={`

block
mb-1.5
sm:mb-2
md:mb-2
lg:mb-2

font-semibold
text-xs
sm:text-sm
md:text-base
lg:text-base

${

darkMode

?

'text-white'

:

'text-slate-700'

}

`}>

Password

</label>

<div className={`

flex
items-center

rounded-lg
sm:rounded-xl
md:rounded-2xl

px-2.5
sm:px-3
md:px-4
lg:px-4

border-2

${

darkMode

?`

bg-slate-800
border-slate-700

`

:`

bg-slate-50
border-slate-200

`

}

`}>

<Lock
size={16}
className="
text-slate-400
mr-2
sm:mr-3
md:mr-3
lg:mr-3
"/>

<input

type={
showPassword
?
'text'
:
'password'
}

value={password}

onChange={(e)=>
setPassword(
e.target.value
)
}

placeholder="
Masukkan password
"

className={`

w-full

py-2
sm:py-2.5
md:py-3
lg:py-4

bg-transparent

outline-none
text-xs
sm:text-sm
md:text-base
lg:text-base

${

darkMode

?

'text-white'

:

'text-slate-800'

}

`}

/>

<button

type="button"

onClick={()=>
setShowPassword(
!showPassword
)
}

className="
text-slate-400
hover:text-slate-600
transition-colors
p-1
"

>

{
showPassword
?
<EyeOff size={18} />
:
<Eye size={18} />
}

</button>

</div>

</div>

<p className="
text-xs
text-slate-400
mb-1
sm:mb-1.5
">

🛡 Akses administrator dilindungi

</p>

<button

type="submit"

disabled={loading}

className="
w-full

py-2
sm:py-2.5
md:py-3
lg:py-4

rounded-lg
sm:rounded-xl
md:rounded-2xl

bg-gradient-to-r
from-indigo-600
to-purple-600

text-white

font-bold
text-xs
sm:text-sm
md:text-base
lg:text-lg

hover:scale-[1.02]
active:scale-[0.99]

transition-all
duration-300

disabled:opacity-50
disabled:cursor-not-allowed
"

>

{
loading
?
'Memverifikasi...'
:
'Login'
}

</button>

</form>

<p className="
text-center
text-xs
text-slate-400
mt-4
sm:mt-5
md:mt-6
lg:mt-6
">

© 2026 Sistem Survei Kepuasan Mahasiswa

</p>

</div>

</div>

</div>

  )

}