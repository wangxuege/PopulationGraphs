import { Prefecture } from '../App'

interface Props {
  prefectures: Prefecture[]
}

const PrefecturePicker: React.FC<Props> = ({ prefectures }) => (
  <div>
    <h2>都道府県</h2>
    <ul>
      {prefectures.map((prefecture: Prefecture) => (
        <li key={prefecture.prefCode}>
          <input type="checkbox" id={`${prefecture.prefCode}`}
          />
          <label htmlFor={`${prefecture.prefCode}`}>{prefecture.prefName}</label>
        </li>
      ))}
    </ul>
  </div>
)

export default PrefecturePicker
