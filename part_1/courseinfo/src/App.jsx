const Header = ({ course }) => {
  return (
  <h1>{course.name}</h1>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return (
  <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
  <p>Number of exercises {total}</p>
  )
}

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
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
