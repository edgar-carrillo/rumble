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
  readonly entryHandler: (arg0: Boolean, arg1: string) => void;
};

export default function InputContainer({
  labelText,
  inputType,
  errorHandler,
  inputText,
  entryHandler,
}: InputContainerProps) {
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const inputElem = useRef<HTMLInputElement>(null);

  const updateErrorMsg = (text: string) => {
    setErrorMsg(text);
  };

  const errorMsgHandler = useCallback((text: string, errorMsg: string) => {
    const errorText = errorHandler(text, errorMsg);
    errorText ? setIsValid(false) : setIsValid(true);
    updateErrorMsg(errorText);
  }, [errorHandler]);

  const handleValidation = (text: string, errorMsg: string) => {
    setUserInput(text);
    if (text.length > 0) {
      setIsActive(true);
      setIsDefault(false);
    }
    errorMsgHandler(text, errorMsg);
  };

  const handleFocus = (isFocused: Boolean) => {
    if (isFocused) {
      setIsActive(true);
    } else if (!isFocused && userInput.length === 0) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    entryHandler(isValid, userInput);
  }, [isValid, userInput, entryHandler]);

  useEffect(() => {
    const { current } = inputElem;
    if (inputText && current) {
      handleValidation(inputText, current.validationMessage);
      current.value = inputText;
    }
  }, []);

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
            validationHandler={handleValidation}
            clickHandler={handleFocus}
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
