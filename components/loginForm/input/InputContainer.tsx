import { useState, useRef, useCallback, useEffect } from 'react';

// Components
import Input from './Input';
import Label from './Label';
import Border from './Border';
import ErrorMsg from './ErrorMsg';

interface InputContainerProps {
  readonly labelText: string;
  readonly inputType: string;
  readonly errorHandler: Function;
  readonly inputText?: string;
  readonly updateValidEntry: (arg0: Boolean) => void;
};

export default function InputContainer({
  labelText, inputType, errorHandler, inputText, updateValidEntry,
}: InputContainerProps) {
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const inputElem = useRef<HTMLInputElement>(null);

  const updateErrorMsg = (elem: HTMLInputElement) => {
    setErrorMsg(elem.validationMessage);
  };

  const handleErrors = useCallback((elem: HTMLInputElement) => {
    elem.setCustomValidity('');
    const errorText = errorHandler(elem.value, elem.validationMessage);
    errorText ? setIsValid(false) : setIsValid(true);
    elem.setCustomValidity(errorText);
  }, [errorHandler]);

  const handleValidation = useCallback((elem: HTMLInputElement) => {
    setUserInput(elem.value);
    if (elem.value.length > 0) {
      setIsActive(true);
      setIsDefault(false);
    }
    handleErrors(elem);
    updateErrorMsg(elem);
  }, [handleErrors]);

  const handleIsActive = () => {
    if (userInput.length === 0) setIsActive(false);
  };

  useEffect(() => {
    const { current } = inputElem;
    if (inputText && current) handleValidation(current);
  }, [inputText, inputElem, handleValidation]);

  useEffect(() => {
    updateValidEntry(isValid);
  }, [isValid, updateValidEntry]);

  return (
    <div className="relative my-8">
      <div className="relative">
        <div className="flex relative flex-col w-full">
          <Label
            text={labelText}
            isActive={isActive}
            isValid={isValid}
            isDefault={isDefault}
          />
          <Input
            handleValidation={handleValidation}
            handleIsActive={handleIsActive}
            setActive={() => setIsActive(true)}
            type={inputType}
            inputText={inputText}
            labelText={labelText}
            elem={inputElem}
          />
        </div>
        <Border isActive={isActive} isValid={isValid} isDefault={isDefault} />
      </div>
      <ErrorMsg text={errorMsg} visible />
    </div>
  );
}
