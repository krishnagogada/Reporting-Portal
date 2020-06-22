import React from 'react';
import ButtonComponent from './styledComponent.js';

class SecondaryButton extends React.Component {

   render() {
      const { children, className, value, onClickButton, testId, isDisable } = this.props;

      return (
         <ButtonComponent className={className} value={value} onClick={onClickButton} data-testid={testId} disabled={isDisable}>
            {children}
         </ButtonComponent>
      );
   }
}

export { SecondaryButton };
