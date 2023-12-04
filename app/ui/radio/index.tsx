import * as React from "react";
import "./styles.css";

interface CommonRadioProps {
  onChange?: (value: string) => void;
  children: React.ReactNode
}

export const RadioGroup: React.FC<CommonRadioProps &{selected : string}> = ({ onChange, selected, children }) => {
  // Use React.Children.map and React.cloneElement to clone the children
  // and pass the correct props to each RadioOption
  const RadioOptions= React.Children.map(children, (child) => {
    const radioElement = child as ReactElement<CommonRadioProps>;
   return React.cloneElement(child, {checked : radioElement.props.value === selected, onChange} )
  })

  return <div className="RadioGroup">{RadioOptions}</div>;
};

interface RadioOptionProps extends CommonRadioProps {
  checked?: boolean;
  children: React.ReactNode;
  value: string
}

export const RadioOption: React.FC<RadioOptionProps> = ({ value, checked = false, onChange = ()=> {}, children }) => {
  // Hook up the onChange handler to call the onChange prop passed to RadioGroup
  // Also, make sure to pass the correct checked prop to the input element

  const handleChange = (event) => {
    const newValueSelected = event.target.id
    console.log(newValueSelected)
    onChange(newValueSelected)
  }

  return (
    <div className="RadioOption">
    <input id={value} type="radio" name={value} checked={checked} onChange={handleChange} />
      <label htmlFor={value}>{children}</label>
    </div>
  );
};
