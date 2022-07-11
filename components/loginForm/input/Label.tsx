interface LabelProps {
  readonly text: string;
  readonly isActive: Boolean;
  readonly isValid: Boolean;
  readonly isDefault: Boolean;
};

export default function Label({ text, isActive, isValid, isDefault }: LabelProps) {
  const defaultClassName = "absolute transition-all";
  let className = defaultClassName + " bottom-1 text-light-white";

  if (isActive) className = defaultClassName + " text-white bottom-full text-sm";
  if (isValid && !isDefault) className += " text-amber";
  if (!isValid && !isDefault) className += " text-sunset-orange";

  return (
    <label className={className}>
      {text}
    </label>
  );
}
