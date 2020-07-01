import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { API_FETCHING } from '@ib/api-constants';
import { ToastContainer, Slide } from 'react-toastify';

import strings from '../../../../common/i18n/strings.json';
import { Image } from '../../../../common/components/Image/index';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index';
import { InputFieldWithLabelAndErrorMessage } from '../../../../common/components/InputFieldWithLabelAndErrorMessage/index';
// import {Button} from '../../../../common/components/Button/Button';

import {
   LogInForm,
   LogInContainer,
   HeadingText,
   CreateAccount,
   ErrorMessage,
   SignUpLink
}
from './styledComponent';
import './logIn.css';

type loginProps={
   userName:string
   password:string
   onChangeUserName:(event:any)=>void
   onChangePassword:(event:any)=>void
   onClickLogIn:()=>void
   userNameErrorMessage:string
   passwordErrorMessage:string
   errorMessage:string
   apiStatus:Number
   showUserNameErrorMessage:boolean
   showPasswordErrorMessage:boolean
}

class LogIn extends React.Component<loginProps> {

   render() {
      const {
         userName,
         password,
         onChangeUserName,
         onChangePassword,
         onClickLogIn,
         userNameErrorMessage,
         passwordErrorMessage,
         errorMessage,
         apiStatus,
         showUserNameErrorMessage,
         showPasswordErrorMessage

      } = this.props;

      return (
         <LogInContainer>
            <LogInForm>
               <Image
                  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/d1119fe1-4f3a-40fd-860b-3adee7ca7915.svg'
                  alt={strings.ibhubsLogo}
                  className={'company-logo'}
               />
              
               <HeadingText>{strings.hiTherePleaseLogIn}</HeadingText>
               
               <InputFieldWithLabelAndErrorMessage
                  labelName={strings.userName}
                  value={userName}
                  onChangeInputField={onChangeUserName}
                  type={strings.text}
                  errorMessage={userNameErrorMessage}
                  testId={strings.userName}
                  showError={showUserNameErrorMessage}
               />
               
               <InputFieldWithLabelAndErrorMessage
                  labelName={strings.password}
                  value={password}
                  onChangeInputField={onChangePassword}
                  type={strings.passwordType}
                  errorMessage={passwordErrorMessage}
                  testId={strings.password}
                  showError={showPasswordErrorMessage}
               />
               
               <PrimaryButton
                  className={'log-in-button'}
                  onClickButton={onClickLogIn}
               >
                  {apiStatus===API_FETCHING?<Loader type="TailSpin" color="#00BFFF" height={20} width={20}/>:strings.logIn}
               </PrimaryButton>
               
               <ErrorMessage>{errorMessage}</ErrorMessage>
               
               <CreateAccount>
                  {strings.dontHaveAnAccount}
                  <SignUpLink>{strings.signUp}</SignUpLink>
               </CreateAccount>
               
            </LogInForm>
            <ToastContainer hideProgressBar={true} autoClose={3000} closeButton={false} transition={Slide} position="bottom-center"/>
         </LogInContainer>
      );
   }
}
export { LogIn };

{/* <Button
                  className={'log-in-button'}
                  onClickButton={onClickLogIn}
                  >
                  {apiStatus===API_FETCHING?<Loader type="TailSpin" color="#00BFFF" height={20} width={20}/>:strings.logIn}
               </Button> */}
//TODO: replace primaryButton to Button component