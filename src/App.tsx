import axios from 'axios'
import { useEffect, useState } from 'react'
import PrefecturePicker from './components/PrefecturePicker'
import Title from './components/Title'

export interface Prefecture {
  prefCode: number
  prefName: string
}

type Prefectures = {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

const url = 'https://opendata.resas-portal.go.jp/api'
const apiKey = process.env.REACT_APP_RESAS_APIKEY || ''

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefectures | null>(null)

  // 都道府県名を取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const res = await axios.get<Prefectures>(`${url}/v1/prefectures`, { headers: { 'X-API-KEY': apiKey } })
        setPrefectures(res.data)
      } catch (error) {
        alert('データ取得失敗')
      }
    }
    void fetchPrefectures()
  }, [])

  return (
    <div>
      <Title />
      {prefectures ? <PrefecturePicker prefectures = {prefectures.result}/> :  'Loading...'}
    </div>
  )
}

export default App
