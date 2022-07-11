import { useState } from 'react';

// Assets
import loginForm from '../../scripts/models/loginForm';

// Components
import LoginPageLayout from './LoginPageLayout';
import InputContainer from './input/InputContainer';

interface NamePageProps {
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
  readonly userName: string;
};

export default function NamePage({
  isVisible, goPrevPage, goNextPage, userName,
}: NamePageProps) {
  const [validEntry, setValidEntry] = useState(false);

  const toggleValidEntry = (val: Boolean) => {
    setValidEntry(validEntry === val ? validEntry : !validEntry);
  }

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Enter name"
      description="This is how your friends will view you on Rumble."
      isValidEntry={validEntry}
    >
      <div className="flex-1">
        <InputContainer
          labelText="Name"
          errorHandler={loginForm.nameErrorHandler}
          inputType="text"
          inputText={userName}
          updateValidEntry={toggleValidEntry}
        />
      </div>
    </LoginPageLayout>
  );
}
