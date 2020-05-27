import React from 'react';
import { Image } from '../../../../common/components/Image/index.js';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index.js';
import strings from '../../../../common/i18n/strings.json';
import { InputFieldWithLabelAndErrorMessage } from '../../../../common/components/InputFieldWithLabelAndErrorMessage/index.js';
import './logIn.css';
import { LogInForm, LogInContainer, LogInHeading, CreateAccount, SignUpLink } from './styledComponent.js';

class LogIn extends React.Component {
    render() {
        const { userName, password, onChangeUserName, onChangePassword, onClickLogIn, userNameErrorMessage, passwordErrorMessage, onClickSignUp, errorMessage } = this.props;
        return (
            <LogInContainer>
                <LogInForm>
                    <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/d1119fe1-4f3a-40fd-860b-3adee7ca7915.svg' 
                        alt={strings.ibhubsLogo} width='90' height='90'/>
                    <LogInHeading>{strings.hiTherePleaseLogIn}</LogInHeading>
                    <InputFieldWithLabelAndErrorMessage labelName={strings.userName} value={userName} 
                                                        onChangeInputField={onChangeUserName} type={strings.text} errorMessage={userNameErrorMessage}/>
                    <InputFieldWithLabelAndErrorMessage labelName={strings.password} value={password} 
                                                        onChangeInputField={onChangePassword} type={strings.passwordType} errorMessage={passwordErrorMessage}/>
                    <PrimaryButton className={'log-in-button'} onClickButton={onClickLogIn}>{strings.logIn}</PrimaryButton>
                    <CreateAccount>{strings.dontHaveAnAccount}<SignUpLink onClick={onClickSignUp}>{strings.signUp}</SignUpLink></CreateAccount>
                </LogInForm>
            </LogInContainer>
        );
    }
}
export { LogIn };
