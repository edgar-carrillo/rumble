function Btn1({ text, primary, clickHandler }) {
  let className = 'w-full bg-sunset-orange text-white rounded-3xl p-2.5 font-bold'
  if (!primary) {
    className += ' bg-white text-black'
  }

  return (
    <button className={className} onClick={() => clickHandler()}>{text}</button>
  );
}

function Btn2({ text, primary, clickHandler }) {
  let className = 'w-full bg-sunset-orange text-white rounded-xl p-2.5 font-bold'
  if (!primary) {
    className += ' bg-white text-black'
  }

  return (
    <button className={className} onClick={() => clickHandler()}>{text}</button>
  );
}

export { Btn1, Btn2 };