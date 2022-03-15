
import axios from 'axios'
import { useEffect, useState } from 'react'
import Graph from './components/Graph'
import PrefecturePicker from './components/PrefecturePicker'
import Title from './components/Title'

export interface Prefecture {
  prefCode: number
  prefName: string
}

type FetchedPrefs = {
  message: null
  result: Prefecture[]
}

type FetchedPops = {
  message: null
  result: {
    boundaryYear: number
    data:{
      label: string
      data:{
        year: string
        value: number
      }[]
    }[]
  }
}

type Data = {
  prefName: string
  prefCode: number
  data: {
    year: string
    value: number
  }[]
}

const url = 'https://opendata.resas-portal.go.jp/api'
const apiKey = process.env.REACT_APP_RESAS_APIKEY || ''

const App = () => {
  const [prefectures, setPrefectures] = useState<FetchedPrefs | null>(null)
  const [activePrefectures, setActivePrefectures] = useState<Data[]>([])

  // 都道府県名を取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const res = await axios.get<FetchedPrefs>(`${url}/v1/prefectures`, { headers: { 'X-API-KEY': apiKey } })
        setPrefectures(res.data)
      } catch (error) {
        alert('データ取得失敗')
      }
    }
    void fetchPrefectures()
  }, [])

  const onPrefectureClick = (prefecture: Prefecture) => {
    const newActivePrefecture = [...activePrefectures]
    const prefIndex = newActivePrefecture.findIndex((value) => value.prefName === prefecture.prefName)

    if (prefIndex > -1) {
      newActivePrefecture.splice(prefIndex, 1)
      setActivePrefectures(newActivePrefecture)
    } else {
      const fetchPopulations = async () => {
        try {
          const res = await axios.get<FetchedPops>(
            `${url}/v1/population/composition/perYear?cityCode=-&prefCode=${prefecture.prefCode}`,
            { headers: { 'X-API-KEY': apiKey } }
          )
          newActivePrefecture.push({
            prefName : prefecture.prefName,
            prefCode : prefecture.prefCode,
            data : res.data.result.data[0].data
          })
          setActivePrefectures(newActivePrefecture)
        } catch (error) {
          alert('データ取得失敗')
        }
      }
      void fetchPopulations()
    }
  }

  return (
    <div>
      <Title />
      {prefectures ? <PrefecturePicker prefectures={prefectures.result} onClick={onPrefectureClick} /> : 'Loading...'}
      <Graph populations={activePrefectures}/>
    </div>
  )
}

export default App