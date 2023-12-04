import * as React from "react";
import "./styles.css";

interface CommonRadioProps {
  onChange?: (value: string) => void;
  children: React.ReactNode
}

interface RadioOptionChildProps extends CommonRadioProps {
  value: string;
  checked: boolean
}

export const RadioGroup: React.FC<RadioOptionChildProps &{selected : string}> = ({ onChange, selected, children }) => {
  // Use React.Children.map and React.cloneElement to clone the children
  // and pass the correct props to each RadioOption
  const RadioOptions= React.Children.map(children, (child) => {
    const radioElement = child as React.ReactElement<RadioOptionChildProps>;
   return React.cloneElement(radioElement, {checked : radioElement.props.value === selected, onChange} )
  })

  return <div className="RadioGroup">{RadioOptions}</div>;
};

interface RadioOptionProps extends CommonRadioProps {
  checked?: boolean;
  value: string
}

export const RadioOption: React.FC<RadioOptionProps> = ({ value, checked = false, onChange = ()=> {}, children }) => {
  // Hook up the onChange handler to call the onChange prop passed to RadioGroup
  // Also, make sure to pass the correct checked prop to the input element

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
