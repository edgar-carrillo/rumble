import { useState } from 'react';

// Assets
import cuisines from '../../assets/cuisines';

// Components
import LoginPageLayout from './LoginPageLayout';
import SelectionContainer from './selection/SelectionContainer';

interface CuisinePageProps {
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
};

export default function CuisinePage({
  isVisible, goPrevPage, goNextPage,
}: CuisinePageProps) {
  const [cuisine, setCuisine] = useState('');

  const cuisineHandler = (index: number) => setCuisine(cuisines[index]);

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Choose cuisine"
      description="You choose the cuisine, we'll show you the relevant restaurants!"
      showButton={Boolean(cuisine.length)}
    >
      <div className="flex-1 my-8">
        <SelectionContainer
          items={cuisines}
          selectionHandler={cuisineHandler}
        />
      </div>
    </LoginPageLayout>
  );
}
