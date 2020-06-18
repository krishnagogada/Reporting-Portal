// import React from 'react'
// import { Image } from '../../../../common/components/Image/index.js'
// import { PrimaryButton } from '../../../../common/components/PrimaryButton/index.js'
// import strings from '../../../../common/i18n/strings.json'
// import { InputFieldWithLabelAndErrorMessage } from '../../../../common/components/InputFieldWithLabelAndErrorMessage/index.js'
// import { PasswordFieldWithPasswordStrength } from '../../../../common/components/PasswordFieldWithPasswordStrength/index.js'
// import './signUp.css'
// import {
//    SignUpForm,
//    SignUpContainer,
//    SignUpHeading
// }
// from './styledComponent.js'

// class SignUp extends React.Component {
//    render() {
//       const {
//          userName,
//          password,
//          onChangeUserName,
//          onChangePassword,
//          onClickLogIn,
//          userNameErrorMessage,
//          passwordErrorMessage,
//          comfirmPassword,
//          onChangeComfirmPassword,
//          comfirmPasswordErrorMessage,
//          errorMessage
//       } = this.props
//       return (
//          <SignUpContainer>
//             <SignUpForm>
//                <Image
//                   source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/d1119fe1-4f3a-40fd-860b-3adee7ca7915.svg'
//                   alt={strings.ibhubsLogo}
//                   className={'company-logo'}
//                />
//                <SignUpHeading>{strings.hiTherePleaseSignUp}</SignUpHeading>
//                <InputFieldWithLabelAndErrorMessage
//                   labelName={strings.userName}
//                   value={userName}
//                   onChangeInputField={onChangeUserName}
//                   type={strings.text}
//                   errorMessage={userNameErrorMessage}
//                />
//                <PasswordFieldWithPasswordStrength
//                   value={password}
//                   onChangeInputField={onChangePassword}
//                />
//                <InputFieldWithLabelAndErrorMessage
//                   labelName={strings.comfirmPassword}
//                   value={comfirmPassword}
//                   onChangeInputField={onChangeComfirmPassword}
//                   type={strings.passwordType}
//                   errorMessage={comfirmPasswordErrorMessage}
//                />
//                <PrimaryButton
//                   className={'sign-up-button'}
//                   onClickButton={onClickLogIn}
//                >
//                   {strings.logIn}
//                </PrimaryButton>
//             </SignUpForm>
//          </SignUpContainer>
//       )
//    }
// }
// export { SignUp }
