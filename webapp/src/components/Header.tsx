import {useContext} from 'react'
import  { ReactComponent as Logo }  from '../logo.svg'
import {ThemeContext} from './ThemeContext'

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext)

  const changeTheme = () => {
    setTheme(theme==='dark'?'light':'dark')
  }

  return(
    <div className="flex justify-between w-full mb-4 bg-transparent">
      <Logo style={{width:'150px', height:'auto'}} fill={theme === 'dark' ? 'white' : 'black'}/>
      <button className="inline-flex items-center px-4 py-2 bg-transparent" onClick={changeTheme}>
        <img
          style={theme==='dark' ? { filter: 'invert(1)' } : undefined}
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3WvUodQRQH8J969YIiBlIJPoEPoA8gWAliYgLiLbXyo/Gjip0vYGGRh0hhSBVI0kUuhiRdqkQtRFBQxMpbpdgRr+Dunf0AQfzDYWd35/z/M2fOmRmeEY+JYIVQKyH8Njy/FHHuLiFcClnCPRXwp3KkCddwjkYGaStYGho4U2A5G7jJEB8KVsQ3Wnw2h8+bsqLtRPOhXcMivknCeIavWHAX0vmYgXblGMAwPuIldnEQvo9hSZIT0zjNwdkRdfzEHvof+N8fBvUDfVUKr+Bfimi7+JFk9pWhibWIfhvYjyFsr7FJvG57b+EdrjDqbk2zcICt0B7Ctvuh/4DP5Nsy8yRiZWhiPaLfpshQx2IVh7KTawDHWK5SuI7fkpJ5SHwAn/BLZDnlWbeRQP5CsoE0g/+4pIQuMIWTHJyZeIW50K5Lanof18G+S8J7O9M5zJQVLXJIzKroZEojGAxWxDcVvbjs4LgTLA2NwNGbV7xTdr4PVogja+fKutbEIpXj0W6ZZW6SLfzB34rG8sTxHxQCSoItZf48AAAAAElFTkSuQmCC'
          alt='change theme icon'
        />
      </button>
    </div>
  )
}
