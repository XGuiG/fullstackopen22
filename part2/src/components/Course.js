import React from 'react'

const Header = ({course}) => {
    // console.log(props)
    return (
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
    // console.log(part)
    return (
      <div>
          <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part => <Part key = {part.id} part = {part} />)}
      </div>
    )
  }
  
  const LessonInfo = ({course}) => {
    return (
      <div>
        <Header course = {course} />
        <Content course = {course} />
        <Total course = {course} />
      </div>
    )
  }
  
 const Course = ({courses}) => {
    return (
      <div>
        {courses.map(course => <LessonInfo key={course.id} course={course} />)}
      </div>
    )
  }
  
  const Total = ({course}) => {
    // console.log({parts})
    return (
      <div>
        <p>total of {course.parts.reduce((sum, part) => {return part.exercises + sum}, 0)} exercises</p>
      </div>
    )
  }

export default Course