import React from 'react';

import ButtonComponent from './styledComponent.js';

class PrimaryButton extends React.Component {

   render() {
      const { children, className, value, onClickButton } = this.props;

      return (
         <ButtonComponent
            className={className}
            value={value}
            onClick={onClickButton}
         >
            {children}
         </ButtonComponent>
      );
   }
}

export { PrimaryButton };
