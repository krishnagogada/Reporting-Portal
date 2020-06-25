import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { toast } from 'react-toastify';
import { History } from 'history';

import { getAccessToken, getRoleType } from '../../../../utils/StorageUtils';

import { LogIn } from '../../components/LogIn';
import AuthStore from '../../stores/AuthStore/index';

const usernameRegx = '^[a-z0-9_-]{3,16}$';

interface LogInRouteProps{
    history:History
}

interface InjectedProps extends LogInRouteProps{
    authStore:AuthStore
}

@inject("authStore")
@observer
class LogInRoute extends React.Component <LogInRouteProps>{

    @observable userName = '';
    @observable password = '';
    @observable userNameErrorMessage = '';
    @observable passwordErrorMessage = '';
    @observable errorMessage = '';

    @action.bound
    onChangeUserName(event: { target: { value: string; }; }) {
        this.userName = event.target.value;
        if (this.userName.search(usernameRegx) !== -1) {
            this.errorMessage = '';
        }
    }

    @action.bound
    onChangePassword(event: { target: { value: string; }; }) {
        this.password = event.target.value;
        if (this.userName.search(usernameRegx) !== -1) {
            this.errorMessage = '';
        }
    }

    getInjectedProps = (): InjectedProps => this.props as InjectedProps

    getAuthStore = () => {
        return this.getInjectedProps().authStore
    }

    @action
    onClickLogIn = async() => {

        const { history } = this.getInjectedProps();
        if (this.userName.length !== 0 && this.password.length !== 0) {

            //----------------------------------------->When Username And Password entered<---------------------------------

            const logInDetails = {
                "username": this.userName,
                "password": this.password
            };

            await this.getAuthStore().userLogIn(logInDetails);
            const { type } = this.getAuthStore();

            const logInError = this.getAuthStore().getUserLogInAPIError;

            if (getRoleType() !== '') {

                //------------------------------------------>When Username And Password are Correct<------------------------

                this.userNameErrorMessage = '';
                this.passwordErrorMessage = '';
                toast.info("Logged In Successful");
                history.push(`/${type}-observations-list`);
            }
            else if (logInError) {

                //------------------------------------------->When LogIn Details Entered Incorrect<-------------------------                

                if (logInError === 'InvalidUsername') {
                    this.userNameErrorMessage = 'invalid username';
                    this.passwordErrorMessage = '';
                }
                else if (logInError === 'InvalidPassword') {
                    this.userNameErrorMessage = '';
                    this.passwordErrorMessage = 'invalid password';
                }
                else {
                    this.errorMessage = 'Network Error';
                    this.userNameErrorMessage = '';
                    this.passwordErrorMessage = '';
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
        const { getUserLogInAPIStatus, type, userLogOut } = this.getAuthStore();

        // userLogOut();
        if (getAccessToken()) {
            return <Redirect to={{pathname:`/${getRoleType()}-observations-list`}}/>;
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
