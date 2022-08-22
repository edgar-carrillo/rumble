import Image from 'next/image';

import xMarkIcon from '../../public/images/x-mark-icon.svg';

interface DislikeBtnProps {
  readonly clickHandler: () => void;
};

export default function DislikeBtn({ clickHandler }: DislikeBtnProps) {

  let containerClass = 'relative flex w-14 h-14 shadow-lg shadow-black rounded-full justify-center items-center bg-white';

  const btnClass = 'absolute h-full w-full cursor-pointer rounded-full';

  return (
    <div className={containerClass}>
      <Image height="25px" width="25px" src={xMarkIcon} alt="" />
      <input type="button" className={btnClass} onClick={clickHandler} onTouchStart={clickHandler} />
    </div>
  );
}
