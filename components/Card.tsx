interface CardProps {
  readonly title: string;
  readonly description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div className="relative h-full w-full rounded-2xl bg-dark-red">
      <div className="absolute flex text-center flex-col gap-y-4 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-2">
        <p className="text-4xl font-dark drop-shadow-lg">{title}</p>
        <h1 className="text-lg drop-shadow-lg">{description}</h1>
      </div>
    </div>
  );
}
