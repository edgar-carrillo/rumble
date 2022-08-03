import { useEffect, useState } from 'react';

interface ItemProps {
  readonly text: string;
  readonly isSelected: Boolean;
};

function Item({ text, isSelected }: ItemProps) {
  const defaultClassName = "cursor-pointer border-b border-solid mb-10";
  let className = defaultClassName + " text-white border-white";
  if (isSelected) className = defaultClassName + " text-amber border-amber font-bold";

  return <p className={className}>{text}</p>;
}

interface SelectionContainerProps {
  readonly items: string[];
  readonly selectionHandler: (arg0: number) => void;
  readonly defaultSelected?: number;
};

export default function SelectionContainer({
  items, selectionHandler, defaultSelected,
}: SelectionContainerProps) {
  const [selectedItem, setSelectedItem] = useState(defaultSelected !== undefined ? defaultSelected : -1);

  useEffect(() => {
    if (selectedItem !== -1) selectionHandler(selectedItem);
  }, [selectedItem, selectionHandler]);

  useEffect(() => {
    if (!items.length) setSelectedItem(-1);
  }, [items]);

  return (
    <ul className="max-h-60 overflow-hidden overflow-y-scroll mb-8">
      {items.map((item: string, index: number) => (
        <li key={index} onClick={() => setSelectedItem(index)}>
          <Item text={item} isSelected={index === selectedItem} />
        </li>
      ))}
    </ul>
  );
}
