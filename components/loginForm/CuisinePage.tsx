import { useEffect, useState } from 'react';

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

  const updateCuisine = (index: number) => {
    setCuisine(cuisines[index]);
  };

  useEffect(() => {
    loginFormModel.updateCuisine(cuisine);
  }, [cuisine]);

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Choose cuisine"
      description="You choose the cuisine, we'll show you the relevant restaurants!"
      showButton={Boolean(cuisine.length)}
    >
      <div className="flex-1 my-8 text-white">
        <p className="pb-6 font-bold">
          Selected Cuisine:
          {' '}
          <span className={`${cuisine ? 'text-amber' : 'text-sunset-orange'} underline`}>
            {cuisine || 'None'}
          </span>
        </p>
        <SelectionContainer
          items={cuisines}
          selectionHandler={updateCuisine}
          defaultSelected={userCuisine ? cuisines.indexOf(userCuisine) : -1}
        />
      </div>
    </LoginPageLayout>
  );
}
