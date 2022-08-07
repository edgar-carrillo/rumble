interface ErrorPageProps {
  readonly title: string;
  readonly description?: string;
  readonly centerText?: Boolean;
  readonly isVisible?: Boolean;
};

export default function ErrorPage({
  title, description, centerText, isVisible,
 }: ErrorPageProps) {
  let defaultClassName = "flex flex-col min-h-screen w-screen bg-dark-red px-10 py-20 block";
  let className = defaultClassName;

  if (!isVisible) className = defaultClassName + " hidden";

  return (
    <div className={className}>
      <div className={centerText ? "text-center" : ""}>
        <h1 className="font-light text-white text-5xl pt-5 pb-8">{title}</h1>
        <p className="text-white text-lg pb-2">{description}</p>
      </div>
    </div>
  );
}
