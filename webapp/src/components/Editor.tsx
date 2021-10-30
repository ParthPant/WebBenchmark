import {useEffect, useState} from 'react'
import AceEditor from 'react-ace'
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
  if (res.status == 204) return null
  const json = await res.json()
  return json[0]
}


export default function Editor() {
  const [code, setCode] = useState("loading....")
  const [benchmark, setBenchmark] = useState<Data|null>(null)
  const [status, setStatus] = useState("Status")
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

          if (res.EXIT_STATUS == 0) {
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
    <div>
      <AceEditor
        value={code}
        onChange={(val)=>setCode(val)}
      />
      <button onClick={handleClick} disabled={polling}>Run Benchmark</button>
      <p>{status}</p>
      <p>{log}</p>
      <Chart data={benchmark}/>
    </div>
  )
}
