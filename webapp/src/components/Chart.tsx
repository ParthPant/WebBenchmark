import { Bar} from 'react-chartjs-2'

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

  if (data) {
    labels = Object.keys(data)
    Object.values(data).forEach(value => {
      chart_data.push(value.avg)
    })
  }

  chartData =  {
    labels: labels,
    datasets: [
      {
        //label: 'benchmark (lower is better)',
        backgroundColor: ['magenta', 'cyan', 'green', 'pink'],
        borderColor: ['magenta', 'cyan', 'green', 'pink'],
        borderWidth: 2,
        data: chart_data
      },
    ]
  }

  const chartOptions = {
    maintainAspectRatio: false,
    // responsive: true,
    plugins: {
      legend: {
          display: false
      },
      title: {
          display: true,
          text: 'Benchmark (μs)'
      }
    }
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold">Results</h1>
      <article className="mt-4 w-full md:h-[400px]">
        <Bar
          data={chartData}
          width={'100%'}
          options={chartOptions}
        />
      </article>
    </div>
  )
}
