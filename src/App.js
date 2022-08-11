import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from 'react-confetti'
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)
  let [rollCount, setRollCount] = useState(0)
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])
  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    let newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateDice());
    }
    return newArr
  }

  function rollDice() {
    if (!tenzies) {
      setDice(dice => (
        dice.map(die => (die.isHeld === true) ? die : generateDice())
      ))
      setRollCount(prevCount => prevCount + 1)
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
    }
  }

  function holdDice(id) {
    setDice(oldDice => {
      return (
        oldDice.map(die => (
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        ))
      )
    })
  }
  const diceElement = dice.map(value => <Die hold={() => holdDice(value.id)} isHeld={value.isHeld} key={value.id} value={value.value} />)


  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          {tenzies ? "Congratulations you've WON the Game!" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
        </p>
        <p>Total Roll Count: {rollCount}</p>
        <div className="dice-container">
          {diceElement}
        </div>
        <button className="roll-dice-btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </>
  );
}

export default App;
