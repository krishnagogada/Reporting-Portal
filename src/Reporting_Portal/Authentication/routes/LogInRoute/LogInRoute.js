import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { toast } from 'react-toastify';
import { getAccessToken } from '../../utils/StorageUtils';

import { LogIn } from '../../components/LogIn';

const usernameRegx = '^[a-z0-9_-]{3,16}$';

@inject("authStore", "userStore")
@observer
class LogInRoute extends React.Component {

    @observable userName = '';
    @observable password = '';
    @observable userNameErrorMessage = '';
    @observable passwordErrorMessage = '';
    @observable errorMessage = '';

    @action.bound
    onChangeUserName(event) {
        this.userName = event.target.value;
        if (this.userName.search() !== -1) {
            this.errorMessage = '';
        }
    }

    @action.bound
    onChangePassword(event) {
        this.password = event.target.value;
        if (this.userName.search(usernameRegx) !== -1) {
            this.errorMessage = '';
        }
    }
    onClickLogIn = async() => {

        const { history, authStore } = this.props;
        if (this.userName.length !== 0 && this.password.length !== 0) {

            //----------------------------------------->When Username And Password entered<----------------------------

            const logInDetails = {
                "username": this.userName,
                "password": this.password
            };

            await authStore.userLogIn(logInDetails);
            const { type } = authStore;

            const logInError = authStore.getUserLogInAPIError;

            if (type) {

                //------------------------------------------>When Username And Password are Correct<------------------------

                history.push(`/${type}-observations-list`);
                this.userNameErrorMessage = '';
                this.passwordErrorMessage = '';
                toast.info("Logged In Successful");
            }
            else if (logInError) {

                //------------------------------------------->When LogIn Details Entered Incorrect<-------------------------                

                if (logInError.data.response === 'InvalidUsername') {
                    this.userNameErrorMessage = 'invalid username';
                    this.passwordErrorMessage = '';
                }
                else if (logInError.data.response === 'InvalidPassword') {
                    this.userNameErrorMessage = '';
                    this.passwordErrorMessage = 'invalid password';
                }

                toast.warn("Logged In Failed");
            }
        }
        else {

            //------------------------------------------------->When Username or Password Didn't Entered<----------------------

            if (this.userName.search(usernameRegx) === -1) {
                this.errorMessage = "Please enter username";

            }
            else {
                this.errorMessage = "Please enter password";
            }
        }
    }

    render() {

        const { getUserLogInAPIStatus, type, userLogOut } = this.props.authStore;
        const { history } = this.props;
        // userLogOut()
        if (getAccessToken()) {
            history.push(`/${type}-observations-list`);
        }

        return (<LogIn  userName={this.userName} 
                        password={this.password} 
                        onChangeUserName={this.onChangeUserName}
                        onChangePassword={this.onChangePassword} 
                        onClickLogIn={this.onClickLogIn} 
                        userNameErrorMessage={this.userNameErrorMessage} 
                        passwordErrorMessage={this.passwordErrorMessage}
                        errorMessage={this.errorMessage}
                        apiStatus={getUserLogInAPIStatus}
                />);
    }
}

export default withRouter(LogInRoute);
