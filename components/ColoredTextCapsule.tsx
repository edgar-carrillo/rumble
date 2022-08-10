interface ColoredTextCapsuleProps {
  readonly colorName: String;
  readonly text: string;
};

export default function ColoredTextCapsule({
  colorName, text
}: ColoredTextCapsuleProps) {
  return (
    <div>
      <div className={`rounded-2xl bg-${colorName} px-2.5`}>
        <p className="font-regular">{text}</p>
      </div>
    </div>
  );
};
