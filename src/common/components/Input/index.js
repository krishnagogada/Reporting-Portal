import React from 'react';
import { InputComponent } from './styledComponent.js';

class Input extends React.Component {
    render() {
        const { styles, type, disable, value, onChangeInputField, errorMessage } = this.props;
        return (
            <InputComponent className={styles} type={type} value={value} disable={disable} onChange={onChangeInputField} errorMessage={errorMessage}/>
        );
    }
}

export { Input };
