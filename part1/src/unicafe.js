import { useState } from 'react'

// const Header = (props) => {
//   return (
//     <div>
//       <h1>
//         {props.course}
//       </h1>
//     </div>
//   )
// }

// const Part = (part) => {
//   return (
//     <div>
//       <p>
//         {part.msg}: {part.value}
//       </p>
//     </div>
//   )
// }

// const Content = (content) => {
//   return (
//     <div>
//       <Part msg = "Fundamentals of React" value = {content.part1} />
//       <Part msg = "Using props to pass data" value = {content.part2} />
//       <Part msg = "State of a component" value = {content.part3} />
//     </div>
//   )
// }

// const Total = (total) => {

//   return (
//     <div>
//       <Part msg = "Number of exercises" value = {total.total} />
//     </div>
//   )
// }


// const App = () => {
//   const course = 'Half Stack application development'
//   const exercises1 = 10
//   const exercises2 = 7
//   const exercises3 = 14 
//   const exercises = [10,7,14]

//   return (
//     <div>
//         <Header course={course} />
//         {/* <Content part1={exercises1}
//           part2={exercises2} 
//           part3={exercises3}  /> */}
//         <Content part1={exercises[0]} />
//         <Total total={exercises[0] + exercises[1] + exercises[2]} />
//     </div>
//   )
// }


// 1.3-1.5

// const Header = (props) => {
//   // console.log(props)
//   return (
//     <div>
//       <h1>
//         {props.course}
//       </h1>
//     </div>
//   )
// }

// const Part = (part) => {
//   // console.log(part)
//   return (
//     <div>
//       <p>
//         {part.name}: {part.exercises}
//       </p>
//     </div>
//   )
// }

// const Content = (content) => {
//   // console.log(content)
//   return (
//     <div>
//       <Part name = {content.parts[0].name} exercises = {content.parts[0].exercises} />
//       <Part name = {content.parts[1].name} exercises = {content.parts[1].exercises} />
//       <Part name = {content.parts[2].name} exercises = {content.parts[2].exercises} />
//     </div>
//   )
// }

// const Total = (total) => {
//   console.log(total)
//   return (
//     <div>
//       <Part name = "Number of exercises" 
//       exercises = {total.total[0].exercises + total.total[1].exercises + total.total[2].exercises} />
//     </div>
//   )
// }


// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//         <Header course = {course["name"]} />
//         <Content parts = {course.parts} />
//         <Total total = {course.parts} />
//     </div>
//   )
// }


//1.6-1.14

const Header = ({header}) => (
    <div>
      <h1>{header}</h1>
    </div>
)

const Button = ({handleClick, txt}) => <button onClick={handleClick}>{txt}</button>

const Statisticline = (props) => {
  return (
    <div>
      <table border="1">
        <tbody>
          <tr>
            <td align="left" width="60">{props.msg}</td>
            <td align="left" >{props.value} {props.percent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistics = (props) => {
  return(
    <div>
      <Statisticline msg = "good" value = {props.good} />
      <Statisticline msg = "neutral" value = {props.neutral} />
      <Statisticline msg = "bad" value = {props.bad} />
      <Statisticline msg = "all" value = {props.all} />
      <Statisticline msg = "average" value = {(props.good - props.bad) / props.all} />
      <Statisticline msg = "positive" value = {props.good / props.all *100} percent = "%" />
    </div>
  )
}

const History = (props) => {
  if (props.isClick == false) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad} all = {props.all} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [isClick,setClick]=useState(false)
  const all = good + neutral + bad
  

  const setValueGood = () => () => { 
    setClick(true)  
    setGood(good + 1)
  }
  
  const setValueNeutral = () => () => { 
    setClick(true)  
    setNeutral(neutral + 1)
  }

  const setValueBad = () => () => { 
    setClick(true)  
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header = "give feedback" />
      <Button handleClick={setValueGood()} txt = "good" />
      <Button handleClick={setValueNeutral()} txt = "neutral" />
      <Button handleClick={setValueBad()} txt = "bad" />
      <Header header = "statistics" />
      <History isClick = {isClick} 
        good = {good} neutral = {neutral} bad = {bad} all = {all}  />
    </div>
  )
}


export default App
