interface HomeBtnProps {
  readonly text: string;
  readonly secondary?: boolean;
  readonly clickHandler?: () => void;
  readonly link?: string;
}

function HomeBtn({ text, secondary, clickHandler, link }: HomeBtnProps) {
  let className = 'w-full bg-sunset-orange text-white rounded-3xl p-2.5 font-bold text-center';
  if (secondary) className += ' bg-white text-black';

  let btnElem = <button type="button" className={className} onClick={clickHandler}>{text}</button>
  if (link) {
    btnElem = <a className={className} href={link} target="_blank" rel="noreferrer">{text}</a>
  }

  return btnElem;
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

export { HomeBtn, Btn2 };