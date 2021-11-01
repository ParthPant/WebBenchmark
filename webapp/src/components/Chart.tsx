import { useContext } from 'react'
import { Bar } from 'react-chartjs-2'
import { ThemeContext } from './ThemeContext'
interface functionStat {
  avg: number,
  count: number
}

export interface Data {
  [key: string] : functionStat
}

export default function Chart(props: {data: Data|null}) {
  let chartData = null
  const { data } = props
  let labels = undefined
  let chart_data: number[] = []

  const { theme } = useContext(ThemeContext)

  if (data) {
    labels = Object.keys(data)
    Object.values(data).forEach(value => {
      chart_data.push(value.avg)
    })
  }

  const makeColors = (len: number) => {
    const base = ['magenta', 'cyan', 'green', 'pink']
    let res: string[] = []
    for (let i=0; i<len; i++) {
      res.push(base[i%base.length])
    }
    return res;
  }

  chartData =  {
    labels: labels,
    datasets: [
      {
        // label: 'benchmark (lower is better)',
        backgroundColor: labels && makeColors(labels.length),
        borderColor: labels && makeColors(labels.length),
        borderWidth: 2,
        data: chart_data
      },
    ]
  }

  const color = theme === 'dark' ? '#d1d1d180' : '#80808080'

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true ,
            color
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true ,
            color
          },
        },
      ],
    },
    legend: {
        display: false,
        color: 'white'
    },
    title: {
        display: true,
        text: 'Benchmark (μs)',
        //color: 'white'
    },
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold dark:text-white">Results</h1>
      <article className="mt-4 w-full md:h-[400px]">
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </article>
    </div>
  )
}
