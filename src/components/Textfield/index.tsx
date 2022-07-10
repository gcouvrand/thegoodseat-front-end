import { FocusEventHandler } from "react";
import "./index.css";

interface Props {
  type: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  label: string,
}

export const Textfield: React.FC<Props> = ({ type, onBlur, onFocus, label }) => {
  return (
    <div className="signin--textfield">
      <input
        type={type}
        required
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <span className="signin--textfield-highlight"></span>
      <span className="signin--textfield-bar"></span>
      <label>{label}</label>
    </div>
  );
}
