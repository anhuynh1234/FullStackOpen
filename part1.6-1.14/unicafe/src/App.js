import {useState} from 'react'

const Title = function({title}){
  return(<h1>{title}</h1>)
}

const StatisticsLine = function ({text, value}) {
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats, clicks}) => {

  if(clicks.good + clicks.bad + clicks.neutral === 0){
    return(
      <>
        <Title title={stats} />
        <div>No feedbacks given</div>
      </>
    )
  }


  return(
    <>
      <Title title={stats} />
      <table>
        <tbody>
        <StatisticsLine text="Good" value={clicks.good} />
        <StatisticsLine text="Neutral" value={clicks.neutral} />
        <StatisticsLine text="Bad" value={clicks.bad} />
        <StatisticsLine text="All" value={clicks.bad + clicks.good + clicks.neutral} />
        <StatisticsLine text="Average" value={(clicks.bad*(-1) + clicks.good)/(clicks.bad + clicks.good + clicks.neutral)} />
        <StatisticsLine text="Positive" value={(clicks.good)/(clicks.bad + clicks.good + clicks.neutral)} />
        </tbody>
      </table>
    </>
  )
}

function Button ({handleClick, text}) {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const title = "Feedback"
  const stats = "Statistics"
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGood = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks)
  }
  
  const handleBad = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks)
  }
  
  const handleNeutral = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks)
  }

  return(
    <>
      <Title title={title} />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <Statistics stats={stats} clicks={clicks} />
    </>
  )
}

export default App;
