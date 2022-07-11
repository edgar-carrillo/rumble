interface BorderProps {
  readonly isActive: Boolean;
  readonly isValid: Boolean;
  readonly isDefault: Boolean;
};

export default function Border({ isActive, isValid, isDefault }: BorderProps) {
  const defaultClassName = "absolute w-full bottom-0 transition-all";
  let className = defaultClassName + " h-0.5 scale-x-1";

  if (isActive && isDefault) className += " bg-white"
  if (!isActive) className = defaultClassName + " h-px scale-x-0";
  if (isValid && !isDefault) className += " bg-amber";
  if (!isValid && !isDefault) className += " bg-sunset-orange ";

  return (
    <div className={className}></div>
  );
}
