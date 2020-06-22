import React from 'react';

import { Input } from '../Input/index.jsx';

import {
   InputFieldLabelAndErrorMessage,
   InputFieldLabel,
   ErrorMessageDisplay
}
from './styledComponent.js';
import './index.css';

type inputFieldWithLabelAndErrorMessageProps={
   labelName:string
   value:string
   onChangeInputField:(event:any)=>void
   type:string
   testId:string
   errorMessage:string
}

class InputFieldWithLabelAndErrorMessage extends React.Component<inputFieldWithLabelAndErrorMessageProps>{

   isError = false;

   render() {
      const {
         labelName,
         value,
         onChangeInputField,
         type,
         testId,
         errorMessage
      } = this.props;

      return (
         <InputFieldLabelAndErrorMessage>
            <InputFieldLabel>{labelName}</InputFieldLabel>
            <Input
               type={type}
               value={value}
               onChangeInputField={onChangeInputField}
               errorMessage={errorMessage}
               className={'authencation-input'}
               testId={testId}
            />
            <ErrorMessageDisplay>{errorMessage}</ErrorMessageDisplay>
         </InputFieldLabelAndErrorMessage>
      );
   }
}

export { InputFieldWithLabelAndErrorMessage };
