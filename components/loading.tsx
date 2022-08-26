import Image from 'next/image';

// Assets
import spinnerSrc from '../public/images/spinners/spinner.gif';

interface LoadingPageProps {
  readonly title: string;
  readonly description?: string;
  readonly centerText?: Boolean;
  readonly isVisible?: Boolean;
};

export default function LoadingPage({
  title, description, centerText, isVisible,
 }: LoadingPageProps) {
  let defaultClassName = "flex flex-col min-h-screen w-screen bg-dark-jungle-green px-10 py-20 block";
  let className = defaultClassName;

  if (!isVisible) className = defaultClassName + " hidden";

  return (
    <div className={className}>
      <div className={centerText ? "text-center" : ""}>
        <h1 className="font-light text-white text-5xl pt-5 pb-8">{title}</h1>
        <p className="text-white text-lg pb-2">{description}</p>
      </div>
      <div className="relative flex flex-1 my-8 m-auto justify-center items-center">
        <div>
          <Image src={spinnerSrc} alt="spinner gif" height={150} width={150} />
        </div>
      </div>
    </div>
  );
}
