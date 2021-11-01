import {useEffect, useState, useContext} from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/keybinding-vim"
import Chart, { Data } from './Chart'
import {ThemeContext} from './ThemeContext'
import "./toggle.css"

const makeURL = (endpoint: string) => {
  const base = "http://localhost:8080/"
  return base+endpoint
}

const reqOptions = (type: 'GET'|'POST', body? :any) => {
  return {
    crossDomain: true,
    method: type,
    headers: { "Content-Type": "application/json"},
    body: body ? JSON.stringify(body) : null
  }
}

const getBoilerPlate = async () => {
  return fetch(makeURL("profile/boilerplate"), reqOptions("GET"))
  .then(res => res.json())
}

const postCode = async (code: string) => {
  return fetch(makeURL("profile/send-code"), reqOptions("POST", {code}))
  .then(res => res.json())
  .then(json => json.uuid)
}

const pollServer = async (uuid: string) => {
  const res = await fetch(makeURL("profile/get-status/"+uuid), reqOptions("GET"))
  if (res.status === 204) return null
  const json = await res.json()
  return json[0]
}


export default function Editor() {
  const [code, setCode] = useState("loading....")
  const [benchmark, setBenchmark] = useState<Data|null>(null)
  const [status, setStatus] = useState("Idle")
  const [polling, setPolling] = useState(false)
  const [log, setLog] = useState(null)
  const [vimMode, setVimMode] = useState(false)

  const { theme } = useContext(ThemeContext)
 
  let pollInterval: NodeJS.Timeout|null = null

  const handleClick = () => {
    setBenchmark(null)
    postCode(code)
    .then(id => {
      setPolling(true)
      setStatus("Processing...")
      pollInterval = setInterval(async () => {
        const res = await pollServer(id)

        if (pollInterval && res) {
          clearInterval(pollInterval)
          pollInterval = null
          setPolling(false)
          setStatus("Done.")
          setLog(res.LOG)

          if (res.EXIT_STATUS === 0) {
            const benchObj = JSON.parse(res.OUTPUT)
            setBenchmark(benchObj)
          } else {
            setStatus("Error Code: "+res.EXIT_STATUS)
          }
        }
      }, 5000)
    })
  }

  useEffect(() => {
      getBoilerPlate()
      .then( json => {
        setCode(json.boilerplate)
      })
      .catch( _err => {setCode("There has been an error")})
  }, [])

  return(
    <div className="flex justify-around flex-nowrap sm:flex-col md:flex-col lg:flex-row">
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Code</h1>
          <div>
            <span className="text-gray-700 dark:text-gray-200 mr-2">Vim Mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle" checked={vimMode} onChange={()=>setVimMode(!vimMode)} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white dark:bg-gray-500 border-4 appearance-none cursor-pointer"/>
              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"></label>
            </div>
          </div>
        </div>

        <div className="mt-5 shadow-md">
          <AceEditor
            value={code}
            width='100%'
            fontSize={15}
            theme={theme=='dark'?'dracula':'github'}
            mode="c_cpp"
            onChange={(val)=>setCode(val)}
            keyboardHandler={vimMode ? "vim" : "windows"}
            />
        </div>

        <button 
          className="p-2 my-5 text-lg bg-green-400 rounded shadow-md hover:bg-green-500 disabled:bg-gray-400 disabled:text-gray-500"
          onClick={handleClick}
          disabled={polling}>
            Run Benchmark
        </button>
        <p className="font-mono text-gray-600 dark:text-gray-200 text-opacity-90">Status: {status}</p>
        <h2 className="my-3 text-lg font-semibold text-gray-600 dark:text-gray-200">Logs:</h2>
        <div className="w-11/12 h-48 p-2 overflow-auto font-mono text-gray-600 whitespace-pre-line border-2 border-none rounded-lg shadow-md dark:text-gray-200 bg-yellow-50 dark:bg-gray-700">{log || "Nothing to show"}</div>
      </div>
      
      <div className="md:w-[100%] lg:w-[40%] lg:ml-4 md:mt-4">
        <Chart data={benchmark}/>
      </div>
    </div>
  )
}
