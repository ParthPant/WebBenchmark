import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons"
import { ReactComponent as Parth } from "../parth.svg"

const website = 'https://parthpant.github.io'
const gh = 'https://github.com/ParthPant/Profile'
const twitter = 'https://twitter.com/PantParth'
const linkedin = 'https://www.linkedin.com/in/parth-pant-866bb4189/'

const linkstyle = {textDecoration: "none", color:"inherit"}

export default function Footer() {
    return (
        <div className="flex px-5 w-full justify-evenly items-center">
            <div className="flex items-center flex-wrap">
                <p> Made with ❤️ by</p>
                <a href={website} style={linkstyle}>
                    <Parth style={{width:"100px", height:"auto", padding:0, margin:0}}/>
                </a>
            </div>

            <div className="flex gap-x-4">
                <a href={linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} size='2x' style={linkstyle}/>
                </a>
                <a href={gh}>
                    <FontAwesomeIcon icon={faGithub} size='2x' style={linkstyle}/>
                </a>
                <a href={twitter}>
                    <FontAwesomeIcon icon={faTwitter} size='2x' style={linkstyle}/>
                </a>
            </div>
        </div>
    )
}