import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const GoodFeed = ({good}) => {
  return (
    <tr> 
        <td>good</td>
        <td>{good}</td>
    </tr>  
  )
}

const NeutrFeed = ({neutral}) => {
  return (
    <tr> 
        <td>neutral</td>
        <td>{neutral}</td>
    </tr>  
  )
}

const BadFeed = ({bad}) => {
  return (
    <tr> 
        <td>bad</td>
        <td>{bad}</td>
    </tr>  
  )
}

const All = ({all}) => {
  return (
    <tr> 
        <td>all</td>
        <td>{all}</td>
    </tr>  
  )
}

const Avg = ({good, bad, all}) => {
  return (
    <tr> 
        <td>average</td>
        <td>{(good - bad) / all}</td>
    </tr>  
  )
}

const Positive = ({good, all}) => {
  return (
      <tr> 
        <td>positive</td>
        <td>{good / all * 100} %</td>
      </tr>     
  )
}


const Statistics = (props) => {
  
  const all = props.good + props.neutral + props.bad

  if (all !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <GoodFeed good={props.good} />
            <NeutrFeed neutral={props.neutral} />
            <BadFeed bad = {props.bad} />
            <All all = {all} />
            <Avg good = {props.good} bad = {props.bad} all ={all} />
            <Positive good = {props.good} all = {all} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1> give feedback </h1>

      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App