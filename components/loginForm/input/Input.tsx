import { LegacyRef } from 'react';

// Assets
import loginForm from '../../../scripts/models/loginForm';

interface InputProps {
  readonly handleValidation: Function;
  readonly handleIsActive: () => void;
  readonly setActive: () => void;
  readonly type: string;
  readonly inputText?: string;
  readonly elem: LegacyRef<HTMLInputElement> | undefined;
  readonly labelText: string;
};

export default function Input({
  handleValidation, handleIsActive, setActive, type, inputText, elem, labelText,
}: InputProps) {
  const defaultClassName = "bg-transparent h-8 outline-none box-border text-base transition-all";
  let className = defaultClassName + " border-b border-white text-white";

  return (
    <input
      id={loginForm.formatInputName(labelText)}
      name={loginForm.formatInputName(labelText)}
      className={className}
      onChange={(e) => handleValidation(e.target)}
      onFocus={setActive}
      onBlur={handleIsActive}
      type={type}
      defaultValue={inputText || ''}
      ref={elem}
      required
    ></input>
  );
}
