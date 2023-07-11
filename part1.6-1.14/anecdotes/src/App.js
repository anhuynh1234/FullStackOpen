import { useState } from 'react'

const Button = ({handleClick, text}) => {

  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Title = ({title}) => {
  return(
    <h1>{title}</h1>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votesAll, setVotes] = useState(Array(8).fill(0))

  const handleClickNext = () => {

    const numberRandom = Math.floor(Math.random() * anecdotes.length)
    setSelected(numberRandom)

  }

  const handleClickVote = () => {
    const newVotes = {...votesAll}
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  let maxIndex = 0
  let min = 0

  for(let i = 0; i < 8; i++){
    if(votesAll[i] >= min){
      min = votesAll[i]
      maxIndex = i
    }
  }


  return (
    <div>
      <Title title="Anecdotes" />
      <div>{anecdotes[selected]}</div>
      <p>Has {votesAll[selected]} votes</p>
      <Button handleClick={handleClickVote} text="Vote"/>
      <Button handleClick={handleClickNext} text="Next anecdote"/>
      <Title title="Anecdoteswith the most votes" />
      <p>{anecdotes[maxIndex]}</p>
      <p>Has {Number(min)} votes</p>    
      </div>
  )
}

export default App
