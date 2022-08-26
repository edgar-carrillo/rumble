interface RoundedBtnProps {
  readonly text: string;
  readonly white?: boolean;
  readonly clickHandler?: () => void;
  readonly link?: string;
};

export default function RoundedBtn({ text, white, clickHandler, link }: RoundedBtnProps) {
  let className = 'w-full bg-sunset-orange text-white rounded-3xl p-2.5 font-bold text-center';
  if (white) className += ' bg-white text-black';

  let btnElem = <button type="button" className={className} onClick={clickHandler}>{text}</button>

  if (link) {
    btnElem = <a className={className} href={link} target="_blank" rel="noreferrer">{text}</a>
  }

  return btnElem;
}
