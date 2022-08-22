interface ColoredTextCapsuleProps {
  readonly bgColor: String;
  readonly text: string;
};

export default function ColoredTextCapsule({
  bgColor, text
}: ColoredTextCapsuleProps) {
  return (
    <div>
      <div className={`rounded-2xl ${bgColor} px-2.5`}>
        <p className="font-regular">{text}</p>
      </div>
    </div>
  );
};
