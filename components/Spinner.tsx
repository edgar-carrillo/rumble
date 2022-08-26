import Image from 'next/image';

import spinnerSrc from '../public/images/spinners/spinner.gif';
import blackSpinner from '../public/images/spinners/spinner-black-bg.gif';

interface SpinnerProps {
  readonly black?: boolean;
};

export default function Spinner({ black }: SpinnerProps) {
  let src = spinnerSrc;

  if (black) src = blackSpinner;

  return (
    <div>
      <Image src={src} alt="spinner gif" height={150} width={150} />
    </div>
  );
}
