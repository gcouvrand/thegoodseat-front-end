import "./index.css";

function Textfield(props: any) {
  return (
    <div className="signin--textfield">
      <input
        type={props.type}
        required
        onBlur={props.onblur}
        onFocus={props.onfocus}
        pattern={props.pattern}
      />
      <span className="signin--textfield-highlight"></span>
      <span className="signin--textfield-bar"></span>
      <label>{props.label}</label>
    </div>
  );
}

export default Textfield;
