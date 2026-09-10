/**
 * Challenge1: Start a brand new React app!
 * - Create a separate App component
 * - Import and render the App component here
 * - In the App component, render a <main> element
 * - Style everything to look like the slide
 */

/**
 * Challenge2:
 *
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components
 *   to look like they do in the slide
 *      - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *      - Use flexbox on main to center the dice container
 *        in the center of the page
 */

/**
 * Challenge3:
 *
 * Write a function (allNewDice) that returns an array
 * of 10 random numbers between 1-6 inclusive.
 *
 * Log the array of numbers to the console for now
 */

/**
 * Challenge4:
 *
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `generateAllNewDice` function so it
 * loads all new dice as soon as the app loads)
 *
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */

/**
 * Challenge5: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 *
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */

/**
 * Challenge6: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 *
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

/**
 * Challenge7: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 *
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.
 */

/**
 * Challenge8: Create a function `hold` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 *
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 *
 */

/**
 * Challenge9: Update the `hold` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 *
 * Hint: as usual, there's more than one way to
 * accomplish this.
 */

/**
 * Challenge10: Update the `getDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 *
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When we're "rolling" a die, we're really
 * just updating the `value` property of the die object.
 */

/**
 * Critical thinking time!
 *
 * We want to indicate to the user that the game is over
 * if (1) all the dice are held, and (2) all the dice have
 * the same value.
 *
 * How might we do this? Some questions to consider:
 *
 * 1. Do we need to save a `gameWon` value in state? If so, why?
 *    If not, why not?
 *    I don't think so as we don't need to re render the page if all dice are held or all dice have same value.
 *
 * 2. Do we need to create a side effect to synchronize the `gameWon`
 *    value (whether it's in state or not) with the current state of
 *    the dice?
 *    No
 *
 *
 * Conclusion:
 *  We can derive the gameWon status based on the condition(s) of the current
 *  dice state.
 */

/**
 * Challenge11:
 * Log "Game won!" to the console only if the 2 winning
 * conditions are met.
 *
 * 1. all the dice are being held, and
 * 2. all the dice have the same value
 *
 * For now, no need to even save a variable!
 */

/**
 * Challenge11 part 2:
 * 1. Create a new `gameWon` variable.
 * 2. If `gameWon` is true, change the button text to
 *    "New Game" instead of "Roll"
 */

/**
 * Challenge12:
 * Make the confetti drop when the game is won! 🎉🎊
 */

/**
 * Challenge13: Allow the user to play a new game when the
 * button is clicked and they've already won
 */

/**
 * Challenge14:
 * Make it so when the game is over, the "New Game" button
 * automatically receives keyboard focus so keyboard users
 * can easily trigger that button without having to tab
 * through all the dice first.
 *
 * Hints:
 * 1. Focusing a DOM element with the DOMNode.focus() method
 *    requires accessing the native DOM node. What tool have
 *    we learned about that allows us to do that?
 *
 * 2. Automatically calling the .focus() on a DOM element when
 *    the game is won requires us to synchronize the local
 *    `gameWon` variable with an external system (the DOM). What
 *    tool have we learned about that allows us to do that?
 */

import { useEffect, useRef, useState } from 'react';
import Dice from './components/Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [die, setDie] = useState(() => generateAllNewDice());
  const newGame = useRef(null);

  let gameWon =
    die.every((dice) => dice.isHeld) &&
    die.every((dice) => dice.number === die[0].number);

  useEffect(() => {
    newGame.current.focus();
  }, [gameWon]);

  function generateAllNewDice() {
    // let dice = [];
    // for (let i = 1; i <= 10; i++) {
    //   dice.push(Math.floor(Math.random() * 6) + 1);
    // }
    // return dice;
    return new Array(10).fill(0).map(() => ({
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }));
  }

  function held(id) {
    setDie((prevDie) => {
      return prevDie.map((d) => {
        return d.id === id ? { ...d, isHeld: !d.isHeld } : d;
      });
    });
  }

  function getDice() {
    if (!gameWon) {
      setDie((oldDice) =>
        oldDice.map((dice) =>
          dice.isHeld ? dice : { ...dice, number: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDie(generateAllNewDice());
    }
  }

  const dieElement = die.map((el) => {
    return <Dice id={el.id} key={el.id} number={el} held={held} />;
  });

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-component">{dieElement}</div>
      <button ref={newGame} className="roll-dice" onClick={getDice}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
