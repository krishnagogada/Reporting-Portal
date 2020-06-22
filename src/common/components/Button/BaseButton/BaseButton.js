import React from 'react'

import {BaseButtonWrapper} from './styledComponent'

class BaseButton extends React.Component{

    render(){
        const {onClickButton,css,className,testId,children}=this.props
        console.log(this.props,">>>>Button")
    return(<BaseButtonWrapper   onClick={onClickButton} 
                                css={css} className={className} 
                                data-testid={testId}
                            >   
                            {children}
            </BaseButtonWrapper>)
    }
}

export {BaseButton}