interface ErrorMsgProps {
  readonly text: string;
  readonly visible: Boolean;
};

export default function ErrorMsg({ text, visible }: ErrorMsgProps) {
  const defaultClassName = "mt-2.5 text-sunset-orange text-sm";
  let className = defaultClassName + " opacity-100";
  if (visible) className = defaultClassName + " opacity-100";

  return (
    <p className={className}>{text}</p>
  );
}
