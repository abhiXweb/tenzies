import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return newArr
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElement = dice.map(value => <Die key={value.id} value={value.value} />)


  return (
    <>
      <main>
        <div className="dice-container">
          {diceElement}
        </div>
        <button className="roll-dice-btn" onClick={rollDice}>Roll</button>
      </main>
    </>
  );
}

export default App;
