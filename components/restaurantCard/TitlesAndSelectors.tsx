// Components
import LikeBtn from "../buttons/LikeBtn";
import DislikeBtn from "../buttons/DislikeBtn";

interface TitlesAndSelectorsProps {
  readonly title: string;
  readonly cuisine: string;
  readonly likeHandler: () => void;
  readonly dislikeHandler: () => void;
};

export default function TitlesAndSelectors({
  title, cuisine, likeHandler, dislikeHandler,
}: TitlesAndSelectorsProps) {
  const formattedTitle = formatTitle(title);

  function formatTitle(title: string) {
    if (title.length < 20) return title;
    return title.slice(0, 17) + '...';
  }

  return (
    <div className="absolute flex flex-col items-center gap-y-4 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <p className="text-4xl font-dark drop-shadow-lg">{formattedTitle}</p>
      <h1 className="text-lg drop-shadow-lg">{cuisine} Restaurant</h1>
      <div className="flex justify-center gap-x-6">
        <DislikeBtn clickHandler={dislikeHandler} />
        <LikeBtn clickHandler={likeHandler} active />
      </div>
    </div>
  );
}
