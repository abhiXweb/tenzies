import { useState, useEffect } from "react";
import Die from "./components/Die";
function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(Math.ceil(Math.random() * 6));
    }
    return newArr
  }

  function rollDice() {
    setDice(allNewDice())
    console.log(dice);
  }

  const diceElement = dice.map(value => <Die value={value} />)


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
