import React from 'react';

import { InputComponent } from './styledComponent';

type inputFieldProps={
   className?:any
   type:string
   disable?:boolean
   value?:string
   onChangeInputField?:(event:any)=>void
   name?:string
   errorMessage?:string
   testId?:string
}

class Input extends React.Component <inputFieldProps>{
   render() {
      const {
         className,
         type,
         disable,
         value,
         onChangeInputField,
         name,
         errorMessage,
         testId
      } = this.props;
      return (
         <InputComponent
            className={className}
            type={type}
            value={value}
            onChange={onChangeInputField}
            name={name}
            data-testid={testId}
         />
      );
   }
}

export { Input };

// disable={disable}
// errorMessage={errorMessage}
//TODO:disabled and errorMessage styles to input tag