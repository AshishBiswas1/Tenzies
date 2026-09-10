export default function Dice(props) {
  const styles = {
    backgroundColor: props.number.isHeld ? '#59E391' : '#FFFFFF'
  };

  return (
    <button
      style={styles}
      className="die"
      onClick={() => props.held(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with a value of ${props.number}, ${props.isHeld ? 'held' : 'Not held'}`}
    >
      {props.number.number}
    </button>
  );
}
