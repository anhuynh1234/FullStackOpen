const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part1 = function(props){
  return(
    <p>{props.part1} {props.exercises1}</p>
  )
}

const Part2 = function(props){
  return(
    <p>{props.part2} {props.exercises2}</p>
  )
}

const Part3 = function(props){
  return(
    <p>{props.part3} {props.exercises3}</p>
  )
}

function Content(props){
  return(
    <>
      <Part1 part1={props.part1} exercise1={props.exercise1} />
      <Part2 part2={props.part2} exercise2={props.exercise2} />
      <Part3 part3={props.part3} exercise3={props.exercise3} />
    </>
  )
}

const Total = function(props){
  return(
    <p>Number of exercises {Number(props.exercises1) + Number(props.exercises2) + Number(props.exercises3)}</p>
  )
}

const App = () => {
  return (
    <div>
      <Header course = 'Half Stack application development' />
      <Content part1 = 'Fundamentals of React' exercises1 = {10} part2 = 'Using props to pass data' exercises2 = {7} part3 = 'State of a component' exercises3 = {14} />
      <Total exercises1 = {10} exercises2 = {7} exercises3 = {14} />
    </div>
  )
}

export default App