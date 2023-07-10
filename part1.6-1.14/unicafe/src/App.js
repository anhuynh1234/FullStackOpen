import {useState} from 'react'

const Title = function({title}){
  return(<h1>{title}</h1>)
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
      <p>Good: {clicks.good}</p>
      <p>Netral: {clicks.neutral}</p>
      <p>Bad: {clicks.bad}</p>
      <p>All: {clicks.bad + clicks.good + clicks.neutral}</p>
      <p>Average: {(clicks.bad*(-1) + clicks.good)/(clicks.bad + clicks.good + clicks.neutral)}</p>
      <p>Positive: {(clicks.good)/(clicks.bad + clicks.good + clicks.neutral)}</p>
    </>
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
      <button onClick={handleGood}>{"Good"}</button>
      <button onClick={handleNeutral}>{"Neutral"}</button>
      <button onClick={handleBad}>{"Bad"}</button>
      <Statistics stats={stats} clicks={clicks} />
    </>
  )
}

export default App;
