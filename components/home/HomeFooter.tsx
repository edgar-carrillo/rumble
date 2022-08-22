import RestaurantsBtn from "../buttons/RestaurantsBtn";
import FavoritesBtn from "../buttons/FavoritesBtn";
import UndoBtn from "../buttons/UndoBtn";

interface HomeFooterProps {
  readonly undoHandler: () => void;
};

export default function HomeFooter({
  undoHandler,
}: HomeFooterProps) {

  return (
    <div className="flex justify-between items-center h-24 px-8 bg-dark-jungle-green">
      <UndoBtn clickHandler={undoHandler} />
      <RestaurantsBtn clickHandler={() => {}} />
      <FavoritesBtn />
    </div>
  );
}
