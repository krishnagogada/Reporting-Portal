import React from 'react';

import ButtonComponent from './styledComponent.js';

class PrimaryButton extends React.Component {

   render() {
      const { children, className, value, onClickButton, testId } = this.props;

      return (
         <ButtonComponent
            className={className}
            value={value}
            onClick={onClickButton}
            data-testid={testId}
         >
            {children}
         </ButtonComponent>
      );
   }
}

export { PrimaryButton };
