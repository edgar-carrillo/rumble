import Image from 'next/image';

import undoIcon from '../../public/images/undo-icon.svg';

interface UndoBtnProps {
  readonly clickHandler: () => void;
};

export default function UndoBtn({ clickHandler }: UndoBtnProps) {
  let containerClass = 'relative w-10 h-10 ';

  const btnClass = 'absolute h-full w-full cursor-pointer rounded-full';

  return (
    <div className={containerClass}>
      <Image src={undoIcon} alt="" layout="fill" />
      <input type="button" className={btnClass} onClick={clickHandler} onTouchStart={clickHandler} />
    </div>
  );
}
