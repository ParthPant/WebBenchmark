import { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons"
import { ReactComponent as Parth } from "../parth.svg"
import { ThemeContext } from './ThemeContext'

const website = 'https://parthpant.github.io'
const gh = 'https://github.com/ParthPant/Profile'
const twitter = 'https://twitter.com/PantParth'
const linkedin = 'https://www.linkedin.com/in/parth-pant-866bb4189/'

const linkstyle = {textDecoration: "none"}

export default function Footer() {
    const { theme } = useContext(ThemeContext)
    const color = theme=='dark'?'white':'black'
    return (
        <div className="flex items-center w-full px-5 justify-evenly">
            <div className="flex flex-wrap items-center dark:text-white">
                <p> Made with ❤️ by</p>
                <a href={website} style={linkstyle}>
                    <Parth style={{width:"100px", height:"auto", padding:0, margin:0}} fill={color}/>
                </a>
            </div>

            <div className="flex gap-x-4">
                <a href={linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} size='2x' style={linkstyle} color={color}/>
                </a>
                <a href={gh}>
                    <FontAwesomeIcon icon={faGithub} size='2x' style={linkstyle} color={color}/>
                </a>
                <a href={twitter}>
                    <FontAwesomeIcon icon={faTwitter} size='2x' style={linkstyle} color={color}/>
                </a>
            </div>
        </div>
    )
}
