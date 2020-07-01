import React from 'react';

import { Input } from '../Input/index';

import {
   InputFieldLabelAndErrorMessage,
   InputFieldLabel,
   ErrorMessageDisplay
}
from './styledComponent';
import './index.css';

type inputFieldWithLabelAndErrorMessageProps={
   labelName:string
   value:string
   onChangeInputField:(event:any)=>void
   type:string
   testId:string
   errorMessage:string
   showError:boolean
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
         errorMessage,
         showError
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
               showError={showError}
            />
            {showError?<ErrorMessageDisplay>{errorMessage}</ErrorMessageDisplay>:null}
         </InputFieldLabelAndErrorMessage>
      );
   }
}

export { InputFieldWithLabelAndErrorMessage };
