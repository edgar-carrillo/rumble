interface BlackOverlayProps {
  readonly isVisible: boolean;
  readonly clickHandler: () => void;
};

export default function BlackOverlay({ isVisible, clickHandler }: BlackOverlayProps) {
  let className = 'absolute h-full w-full transition-all ease-in-out duration-200';
  if (isVisible) className += ' visible bg-light-black backdrop-blur-lg';
  else className += ' invisible';

  return (
    <div className={className} onClick={clickHandler} onTouchStart={clickHandler}></div>
  );
}
