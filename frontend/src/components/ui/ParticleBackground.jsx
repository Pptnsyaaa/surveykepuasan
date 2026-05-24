import Particles from 'react-tsparticles'

export default function ParticleBackground() {

  const particleCount = typeof window !== 'undefined' 
    ? window.innerWidth < 768 
      ? 15 
      : window.innerWidth < 1024 
      ? 25 
      : 35
    : 35

  return (

    <Particles

      className="absolute inset-0 -z-10"

      options={{

        fullScreen: false,

        particles: {

          number: {
            value: particleCount
          },

          color: {
            value: [
              '#f97316',
              '#fb923c',
              '#fbbf24'
            ]
          },

          links: {
            enable: true,
            color: '#fdba74',
            distance: 140,
            opacity: 0.25,
            width: 1
          },

          move: {
            enable: true,
            speed: 1
          },

          opacity: {
            value: 0.5
          },

          size: {
            value: {
              min: 2,
              max: 5
            }
          }

        }

      }}

    />

  )
}