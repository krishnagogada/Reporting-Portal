import React from 'react';

import ButtonComponent from './styledComponent';

type primaryButtonProps={
   className?:any
   value?:string
   onClickButton:()=>void
   testId?:string
   isDisabled?:boolean
}

class PrimaryButton extends React.Component<primaryButtonProps> {

   render() {
      const { children, className, value, onClickButton, testId,isDisabled } = this.props;

      return (
         <ButtonComponent
            className={className}
            value={value}
            onClick={onClickButton}
            data-testid={testId}
            disabled={isDisabled}
         >
            {children}
         </ButtonComponent>
      );
   }
}

export { PrimaryButton };
