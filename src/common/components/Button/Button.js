import React, { Children } from 'react';

import {buttonType,buttonVarient} from './constants'
import { BaseButton } from './BaseButton/BaseButton';
import {Outline,OvalVarient,RectangularVarient} from './styledComponent';

class Button extends React.Component{

    static defaultProps={
        type:buttonType.filled,
        varient:buttonVarient.oval
    }

    static defaultTypes={
        type:buttonType,
        varient:buttonVarient
    }

    varientStyles=(varient)=>{
        
        switch(varient){
            case buttonVarient.oval:
                return OvalVarient
            case buttonVarient.rectangular:
                return RectangularVarient
            default:
                null
        }
    }

    render(){
        
        const {type,varient,...otherProps}=this.props;
        alert(varient)
        switch(type){
            case buttonType.filled:
                return <BaseButton {...otherProps} css={this.varientStyles(varient)}/>
            case buttonType.outLine:
                return <Outline {...otherProps} css={this.varientStyles(varient)}/>
            default:
                return null
        }
    }
}

export {Button}