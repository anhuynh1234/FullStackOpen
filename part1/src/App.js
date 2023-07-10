const Header = (props) => {
  return (<h1>{props.course.name}</h1>)
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
      <Part1 part1={props.parts[0].name} exercises1={props.parts[0].exercises} />
      <Part2 part2={props.parts[1].name} exercises2={props.parts[1].exercises} />
      <Part3 part3={props.parts[2].name} exercises3={props.parts[2].exercises} />
    </>
  )
}

const Total = function(props){
  return(
    <p>Number of exercises {Number(props.parts[0].exercises) + Number(props.parts[1].exercises) + Number(props.parts[2].exercises)}</p>
  )
}

// For 1.2
// const App = () => {
//   return (
//     <div>
//       <Header course = 'Half Stack application development' />
//       <Content part1 = 'Fundamentals of React' exercises1 = {10} part2 = 'Using props to pass data' exercises2 = {7} part3 = 'State of a component' exercises3 = {14} />
//       <Total exercises1 = {10} exercises2 = {7} exercises3 = {14} />
//     </div>
//   )
// }

// For 1.3
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3} />
//       <Total part1={part1} part2={part2} part3={part3} />
//     </div>
//   )
// }

// For 1.4
// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]

//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={parts} />
//       <Total parts={parts} />
//     </div>
//   )
// }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
    </div>
  )
}

export default App