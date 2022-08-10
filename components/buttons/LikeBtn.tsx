import Image from 'next/image';

// Assets
import heartIcon from '../../public/images/heart-icon.svg';

interface LikeBtnProps {
  readonly clickHandler: () => {};
};

export default function LikeBtn({ clickHandler }: LikeBtnProps) {

  let containerClass = 'relative flex w-14 h-14 shadow-lg shadow-black rounded-full justify-center items-center bg-sunset-orange';

  const btnClass = 'absolute h-full w-full cursor-pointer rounded-full';

  return (
    <div className={containerClass}>
      <Image height="25px" width="25px" src={heartIcon} alt="#" />
      <input type="button" className={btnClass} onClick={clickHandler} onTouchStart={clickHandler} />
    </div>
  );
}
