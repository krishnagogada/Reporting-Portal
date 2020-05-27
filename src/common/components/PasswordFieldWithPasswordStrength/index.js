import React from 'react';
import { Input } from '../Input/index.js';
import strings from '../../i18n/strings.json';
import { PasswordFieldWithPasswordStrengthContainer, PasswordFieldLabel } from './styledComponent.js';

class PasswordFieldWithPasswordStrength extends React.Component {
    render() {
        const { value, onChangeInputField, passwordStrength } = this.props;
        return (
            <PasswordFieldWithPasswordStrengthContainer>
                <PasswordFieldLabel>{strings.password}</PasswordFieldLabel>
                <Input type={strings.passwordType} value={value} onChangeInputField={onChangeInputField}/>
                
            </PasswordFieldWithPasswordStrengthContainer>
        );
    }
}

export { PasswordFieldWithPasswordStrength };
