// Components
import BackBtn from '../BackBtn';
import { HomeBtn } from '../Btns';

interface LoginPageLayoutProps {
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
  readonly isVisible: Boolean;
  readonly isValidEntry: Boolean;
  readonly title: string;
  readonly description?: string;
  children: React.ReactNode;
};

export default function LoginPageLayout({
  goPrevPage, goNextPage, isVisible, isValidEntry, title, description, children,
 }: LoginPageLayoutProps) {
  let defaultClassName = "flex flex-col min-h-screen w-screen bg-dark-jungle-green px-5 py-10";
  let className = defaultClassName;
  if (!isVisible) className = defaultClassName + " hidden";

  return (
    <div className={className}>
      <div>
        <BackBtn clickHandler={goPrevPage} />
      </div>
      <h1 className="font-light text-white text-5xl pt-5 pb-14">{title}</h1>
      <p className="text-white text-lg">{description}</p>
      {children}
      {
        isValidEntry ?
          <HomeBtn text="Next" clickHandler={goNextPage} /> :
          <></>
      }
    </div>
  );
}
