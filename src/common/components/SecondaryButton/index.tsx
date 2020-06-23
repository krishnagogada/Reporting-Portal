import React from 'react';
import ButtonComponent from './styledComponent';

type secondaryButtonProps={
   className:any
   onClickButton:(event:any)=>void
   testId:string
   isDisabled:boolean
}

class SecondaryButton extends React.Component<secondaryButtonProps> {

   render() {
      const { children, className, onClickButton, testId, isDisabled } = this.props;

      return (
         <ButtonComponent className={className} onClick={onClickButton} data-testid={testId} disabled={isDisabled}>
            {children}
         </ButtonComponent>
      );
   }
}

export { SecondaryButton };
