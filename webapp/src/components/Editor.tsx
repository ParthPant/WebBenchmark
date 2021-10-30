import {useEffect, useState} from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/mode-c_cpp"
import Chart, { Data } from './Chart'

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
    <div className="flex flex-nowrap justify-around sm:flex-col md:flex-col lg:flex-row">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold">Code</h1>
        <div className="mt-5 shadow-md">
          <AceEditor
            value={code}
            width='100%'
            theme="github"
            mode="c_cpp"
            onChange={(val)=>setCode(val)}
            />
        </div>

        <button 
          className="bg-green-400 p-2 rounded text-lg my-5 hover:bg-green-500 disabled:bg-gray-400 disabled:text-gray-500 shadow-md"
          onClick={handleClick}
          disabled={polling}>
            Run Benchmark
        </button>
        <p className="text-gray-600 text-opacity-90 font-mono">Status: {status}</p>
        <h2 className="text-gray-600 font-semibold text-lg my-3">Logs:</h2>
        <div className="bg-gray-700 text-gray-200 font-mono border-2 h-48 w-11/12 p-2 rounded-lg border-none overflow-auto shadow-md whitespace-pre-line">{log || "Nothing to show"}</div>
      </div>
      
      <div className="md:w-[100%] lg:w-[40%] lg:ml-4 md:mt-4">
        <Chart data={benchmark}/>
      </div>
    </div>
  )
}
