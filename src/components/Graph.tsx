import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

type Props = {
  populations: {
    prefCode: number
    prefName: string
    data: { year: string; value: number }[]
  }[]
}

const Graph: React.FC<Props> = ({ populations }) => {
  const series: Highcharts.SeriesOptionsType[] = []
  let categories: string[] = []

  // データを設定
  populations.forEach((population) => {
    const values = population.data.map((data) => data.value)
    series.push({
      type: 'line',
      name: population.prefName,
      data: values,
    })
  })

  // 横軸の値を設定
  if (populations[0]) {
    const years = populations[0].data.map((data) => data.year)
    categories = [...years]
  }

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series: series.length === 0 ? [{ type: 'line', name: '都道府県名', data: [] }] : series,
  }

  return (
    <div style={{ width: '85%', margin: '0 auto', paddingTop: '60px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
export default Graph
