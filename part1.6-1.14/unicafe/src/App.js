import {useState} from 'react'

const Title = function({title}){
  return(<h1>{title}</h1>)
}

function Button({handleClick, text, clicks}){

  return(
    <button onClick={handleClick(clicks)}>{text}</button>
  )
}



function App() {
  const title = "Feedback"
  const stats = "Statistics"
  const [clicks, setClicks] = useState({
    good: 0, netral: 0, bad: 0
  })

  const handleGood = (clicks) => {
    const clicks1 = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(clicks1)
  }
  
  const handleBad = () => {
    const clicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(clicks)
  }
  
  const handleNetral = () => {
    const clicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(clicks)
  }

  return(
    <>
      <Title title={title} />
      <Button handleClick = {handleGood} text="Good" clicks={clicks}/>
      <Title title={stats} />
    </>
  )
}

export default App;
