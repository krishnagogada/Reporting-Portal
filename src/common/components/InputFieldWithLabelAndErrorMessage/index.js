import React from 'react'
import { Input } from '../Input/index.js'
import {
   InputFieldLabelAndErrorMessage,
   InputFieldLabel,
   ErrorMessageDisplay
} from './styledComponent.js'

class InputFieldWithLabelAndErrorMessage extends React.Component {
   render() {
      const {
         labelName,
         value,
         onChangeInputField,
         type,
         errorMessage
      } = this.props
      return (
         <InputFieldLabelAndErrorMessage>
            <InputFieldLabel>{labelName}</InputFieldLabel>
            <Input
               type={type}
               value={value}
               onChangeInputField={onChangeInputField}
               errorMessage={errorMessage}
            />
            <ErrorMessageDisplay>{errorMessage}</ErrorMessageDisplay>
         </InputFieldLabelAndErrorMessage>
      )
   }
}

export { InputFieldWithLabelAndErrorMessage }
