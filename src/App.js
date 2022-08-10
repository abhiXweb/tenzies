import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
function App() {
  const [dice, setDice] = useState(allNewDice());

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
    setDice(dice => (
      dice.map(die => (die.isHeld === true) ? die : generateDice())
    ))
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
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElement}
        </div>
        <button className="roll-dice-btn" onClick={rollDice}>Roll</button>
      </main>
    </>
  );
}

export default App;
