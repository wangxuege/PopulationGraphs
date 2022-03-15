import { Prefecture } from '../App'

interface Props {
  prefectures: Prefecture[]
  onClick: (prefecture: Prefecture) => void
}

const PrefecturePicker: React.FC<Props> = ({ prefectures, onClick }) => (
  <div>
    <h2 style={{marginLeft: "20pt"}}>都道府県</h2>
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        justifySelf: 'auto',
      }}
    >
      {prefectures.map((prefecture: Prefecture) => (
        <li key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={`${prefecture.prefCode}`}
            onClick={() => onClick(prefecture)}
            style={{ transform: 'scale(1.65)' }}
          />

          <label htmlFor={`${prefecture.prefCode}`} style={{ cursor: 'pointer', margin: '0.5rem', fontSize: '1.5rem' }}>
            {prefecture.prefName}
          </label>
        </li>
      ))}
    </ul>
  </div>
)

export default PrefecturePicker
