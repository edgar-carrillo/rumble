import { useState } from 'react';

// Assets
import cuisines from '../../assets/cuisines';
import loginFormModel from '../../scripts/models/loginForm';

// Components
import LoginPageLayout from './LoginPageLayout';
import SelectionContainer from './selection/SelectionContainer';

interface CuisinePageProps {
  readonly userCuisine: string;
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
};

export default function CuisinePage({
  userCuisine, isVisible, goPrevPage, goNextPage,
}: CuisinePageProps) {
  const [cuisine, setCuisine] = useState(userCuisine || '');

  const cuisineHandler = (index: number) => {
    setCuisine(cuisines[index]);
    loginFormModel.updateCuisine(cuisines[index]);
  };

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
          defaultSelected={userCuisine ? cuisines.indexOf(userCuisine) : -1}
        />
      </div>
    </LoginPageLayout>
  );
}
