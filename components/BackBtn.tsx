import Image from 'next/image';

// Assets
import leftArrow from '../public/images/left-arrow.svg';

const btnClass = "z-50 absolute bg-transparent h-full w-full cursor-pointer"

const btnContainerClass = "relative w-11 h-11 bg-limed-spruce flex items-center justify-center";

const shadowContainerClass = "inline-block shadow-light rounded-full overflow-hidden"

const iconClass = "w-1/2 h-1/2 relative";

interface BackBtnProps {
  readonly clickHandler: () => void;
};

const BackBtn = ({ clickHandler }: BackBtnProps) => {
  return (
    <div className={shadowContainerClass}>
      <div className={btnContainerClass}>
        <button type="button" className={btnClass} onClick={clickHandler}>
        </button>
        <div className={iconClass}>
          <Image className="absolute" src={leftArrow} alt="" layout="fill"/>
        </div>
      </div>
    </div>
  );
};

export default BackBtn;
