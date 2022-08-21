import Image from 'next/image';
import { StaticImageData } from 'next/image';

import Gradient from './Gradient';

interface ImageWithGradientsProps {
  readonly src: string | StaticImageData;
  readonly alt?: string;
  readonly light?: boolean;
  readonly dark?: boolean;
  readonly pinkGradient?: boolean;
};

export default function ImageWithGradients({
  src, alt, light, dark, pinkGradient,
 }: ImageWithGradientsProps) {
  const gradients = [];
  if (pinkGradient) gradients.push(<Gradient key={20} pink />);

  let numOfGradients = 2;
  if (dark) numOfGradients = 6;
  else if (light) numOfGradients = 1;

  for (let i = 0; i < numOfGradients; i++) {
    gradients.push(<Gradient key={i} />);
  }

  return (
    <>
      <Image src={src} alt={alt || ''} layout="fill" objectFit="cover" />
      {gradients}
    </>
  )
}
