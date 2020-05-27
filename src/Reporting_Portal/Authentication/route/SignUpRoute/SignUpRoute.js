import React from 'react'
import { SignUp } from '../../components/SignUp/SignUp.js'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { getAccessToken } from '../../utils/StorageUtils'

@inject('authStore')
@observer
class SignUpRoute extends React.Component {
   @observable userName = ''
   @observable password = ''
   @observable comfirmPassword = ''
   @observable comfirmPasswordErrorMessage = ''
   @observable userNameErrorMessage = ''
   @observable passwordErrorMessage = ''
   @observable errorMessage = ''

   onChangeUserName = event => {
      this.userName = event.target.value
   }
   onChangePassword = event => {
      this.password = event.target.value
   }
   onChangeComfirmPassword = event => {
      this.comfirmPassword = event.target.value
   }
   onClickLogIn = async () => {
      const { history, authStore } = this.props
      if (
         this.userName.length !== 0 &&
         this.password.length !== 0 &&
         authStore.getUserLogInAPIError === null
      ) {
         await authStore.userLogIn()

         if (getAccessToken()) {
            // history.push("/ecommerce-store/products/");
            this.userNameErrorMessage = ''
            this.passwordErrorMessage = ''
         } else {
         }
      } else if (authStore.getUserLogInAPIError) {
         this.errorMessage = 'Network Error'
      } else {
         if (this.userName.length === 0) {
            this.errorMessage = 'Please enter username'
            // this.formRef.current.userNameRef.current.focus();
         } else {
            this.errorMessage = 'Please enter password'
            // this.formRef.current.passwordRef.current.focus();
         }
      }
   }
   render() {
      return (
         <SignUp
            userName={this.userName}
            password={this.password}
            onChangeUserName={this.onChangeUserName}
            onChangePassword={this.onChangePassword}
            onChangeComfirmPassword={this.comfirmPassword}
            onClickLogIn={this.onClickLogIn}
            userNameErrorMessage={this.userNameErrorMessage}
            passwordErrorMessage={this.passwordErrorMessage}
            comfirmPasswordErrorMessage={this.comfirmPasswordErrorMessage}
            errorMessage={this.errorMessage}
         />
      )
   }
}

export { SignUpRoute }
