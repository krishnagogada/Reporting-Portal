import React from 'react';

import { Input } from '../Input/index.js';

import {
   InputFieldLabelAndErrorMessage,
   InputFieldLabel,
   ErrorMessageDisplay
}
from './styledComponent.js';
import './index.css';

class InputFieldWithLabelAndErrorMessage extends React.Component {

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
