interface GradientProps {
  readonly pink?: boolean;
};

export default function Gradient({ pink }: GradientProps) {
  let className = 'absolute h-full w-full bg-gradient-to-t';
  if (pink) className += ' from-sunset-orange';
  else className += ' from-black';

  return (
    <div className={className}></div>
  );
}
