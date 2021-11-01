import {useEffect, useState, useContext} from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/keybinding-vim"
import Chart, { Data } from './Chart'
import {ThemeContext} from './ThemeContext'
import "./utility.css"

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
            setStatus("Error Code "+res.EXIT_STATUS)
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
    <div className="flex justify-around flex-nowrap sm:flex-col md:flex-col lg:flex-row gap-4">
      <div className="flex-grow md:mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Code</h1>
          <div>
            <span className="mr-2 text-gray-700 dark:text-gray-300">Vim Mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle" checked={vimMode} onChange={()=>setVimMode(!vimMode)} className="absolute block w-4 h-4 bg-white border-4 rounded-full shadow appearance-none cursor-pointer toggle-checkbox dark:bg-gray-500"/>
              <label htmlFor="toggle" className="block h-4 overflow-hidden bg-gray-300 rounded-full shadow cursor-pointer toggle-label dark:bg-gray-700"></label>
            </div>
          </div>
        </div>

        <div className="mt-5 shadow-md">
          <AceEditor
            value={code}
            width='100%'
            fontSize={15}
            theme={theme==='dark'?'dracula':'github'}
            mode="c_cpp"
            onChange={(val)=>setCode(val)}
            keyboardHandler={vimMode?'vim':undefined}
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
        <div className="mt-4">
          <h1 className="text-2xl font-bold dark:text-white">API Docs</h1>
          <p className="mt-4 font-mono text-base dark:text-white">
            You can add member functions to the class App and then run benchmarks on them inside <span className="code">App::Run()</span>.<br/>
            <br/>
            Use <span className="code">PROFILE('NAME', COUNT, FUNCTION)</span> to run benchmarks on a function.<br/>
            Use <span className="code">FUNCTION(func, ...inputs)</span> to supply inputs to a function.<br/>
            <br/>
            <span className="code">#include "Profiler.hpp"</span> is necessary to include profiler utilities.<br/>
            <br/>
            If your functions take more than 5 seconds to complete execution, they will hit timeout and output return status will be <span className="code">143</span>.<br/>
            <br/>
            Do not take user input in your functions and that you cause timeout since the runner does not provide any input to <span className="code">stdin</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
