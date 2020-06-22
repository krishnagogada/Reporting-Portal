import React from 'react';

import ButtonComponent from './styledComponent.js';

type primaryButtonProps={
   className:any
   value?:string
   onClickButton:()=>void
   testId?:string
}

class PrimaryButton extends React.Component<primaryButtonProps> {

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
