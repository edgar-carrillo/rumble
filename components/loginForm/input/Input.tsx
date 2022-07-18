import { LegacyRef } from 'react';

// Assets
import loginForm from '../../../scripts/models/loginForm';

interface InputProps {
  readonly validationHandler: Function;
  readonly clickHandler: (arg0: Boolean) => void;
  readonly type: string;
  readonly inputText?: string;
  readonly elem: LegacyRef<HTMLInputElement> | undefined;
  readonly labelText: string;
};

export default function Input({
  validationHandler, clickHandler, type, inputText, elem, labelText,
}: InputProps) {
  const defaultClassName = "bg-transparent h-8 outline-none box-border text-base transition-all";
  let className = defaultClassName + " border-b border-white text-white";

  return (
    <input
      id={loginForm.formatInputName(labelText)}
      name={loginForm.formatInputName(labelText)}
      className={className}
      onChange={(e) => validationHandler(e.target.value, e.target.validationMessage)}
      onFocus={() => clickHandler(true)}
      onBlur={() => clickHandler(false)}
      type={type}
      defaultValue={inputText || ''}
      ref={elem}
      required
    ></input>
  );
}
