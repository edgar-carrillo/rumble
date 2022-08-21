import ColoredTextCapsule from "../ColoredTextCapsule";

interface TitleProps {
  readonly children: string;
};

function Title({ children }: TitleProps) {
  return (
    <p className="font-bold text-dark-jungle-green">{children}</p>
  );
}

interface RestaurantProps {
  readonly isOpen: boolean;
  readonly averageCost: string;
  readonly location: string;
  readonly name: string;
};

interface DetailsContainerProps {
  readonly restaurant: RestaurantProps;
  readonly expanded?: boolean;
  readonly clickHandler?: () => void;
};

export default function DetailsContainer({
  restaurant, expanded, clickHandler,
}: DetailsContainerProps) {
  let backgroundClass = 'absolute bottom-4 inset-x-4 flex flex-col gap-8 p-6 bg-white rounded-3xl cursor-pointer transition-all ease-in-out duration-200 max-h-28 overflow-hidden';

  if (expanded) backgroundClass += ' max-h-96';

  return (
    <div className={backgroundClass} onClick={clickHandler} onTouchStart={clickHandler}>

      <div className="flex flex-col gap-2">
        <Title>About</Title>
        <div className="flex gap-2 flex-wrap text-white">
          <ColoredTextCapsule
            bgColor={restaurant.isOpen ? 'bg-military-green' : 'bg-sunset-orange'}
            text={restaurant.isOpen ? 'Open' : 'Closed'}
          />
          <ColoredTextCapsule bgColor="bg-limed-spruce" text={restaurant.averageCost || '?'} />
          <ColoredTextCapsule bgColor="bg-limed-spruce" text={restaurant.location} />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-black">
        <Title>Restaurant Name</Title>
        <p>{restaurant.name}</p>
      </div>

    </div>
  );
}
