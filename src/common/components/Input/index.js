import React from 'react';

import { InputComponent } from './styledComponent.js';

class Input extends React.Component {
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
            disable={disable}
            onChange={onChangeInputField}
            errorMessage={errorMessage}
            name={name}
            data-testid={testId}
         />
      );
   }
}

export { Input };
