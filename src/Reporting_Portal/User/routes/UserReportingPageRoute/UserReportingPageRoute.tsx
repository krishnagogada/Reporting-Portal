import React from 'react';
import { withRouter } from "react-router-dom";
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { History } from 'history';

import { UserReportingPage } from '../../components/UserReportingPage/UserReportingPage';
import { getRoleType } from '../../../../utils/StorageUtils';
import { goToBack } from '../../../../utils/NavigationUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import UserStore from '../../stores/UserStore/index'
import { reportingObservationObjectType } from '../../stores/UserStore/index'

import 'react-toastify/dist/ReactToastify.css';


type userReportingPageRouteProps={
    authStore:AuthStore
    userStore:UserStore
    history:History
}

@inject('authStore', 'userStore')
@observer
class UserReportingPageRoute extends React.Component<userReportingPageRouteProps> {

    @observable titleOfObservationValue:string = '';
    @observable descriptionValue:string = '';
    @observable titleErrorMessage:string = '';
    @observable descriptionErrorMessage:string = '';
    @observable severityErrorMessage:string = '';
    category:string = '';
    subCategory:string = '';
    severity:string = '';

    onChangeTitleOfObservation = (event: { target: { value: string; }; }) => {
        this.titleOfObservationValue = event.target.value;
    }
    onChangeCategory = (selectedOption: { value: string; }) => {
        this.category = selectedOption.value;
    }
    onChangeSubCategory = (selectedOption: { value: string; }) => {
        this.subCategory = selectedOption.value;
    }
    onChangeSeverity = (selectedOption: { value: string; }) => {
        this.severity = selectedOption.value;
    }
    onChangeDescription = (event: { target: { value: string; }; }) => {
        this.descriptionValue = event.target.value;
    }
    onClickBackToObservationsList = () => {
        const { history } = this.props;
        goToBack(history);
        // history.goBack();
    }
    @action.bound
    onClickSubmit() {

        if (this.titleOfObservationValue.length !== 0 && this.descriptionValue.length !== 0 && this.severity.length !== 0) {

            this.titleErrorMessage = '';
            this.descriptionErrorMessage = '';
            this.severityErrorMessage = '';

            const { userStore } = this.props;
            const reportingObservationObject:reportingObservationObjectType = {

                title: this.titleOfObservationValue,
                category_id: Number(this.category),
                sub_category_id: Number(this.subCategory),
                severity: this.severity,
                description: this.descriptionValue,
                attachments: []

            };

            userStore.onClickSubmit(reportingObservationObject);

            toast.info("Observation Created");

            this.titleOfObservationValue = '';
            this.category = '';
            this.subCategory = '';
            this.severity = '';
            this.descriptionValue = '';

        }
        else {
            if (this.titleOfObservationValue.length === 0) {
                this.titleErrorMessage = 'invalid title';
            }
            if (this.descriptionValue.length === 0) {
                this.descriptionErrorMessage = 'invalid description';
            }
            if (this.severity.length === 0) {
                this.severityErrorMessage = 'select severity';
            }
        }

    }
    render() {
        const { categoryAndSubCategoryList } = this.props.userStore;

        const roleType = getRoleType();

        return (<UserReportingPage  onChangeTitleOfObservation={this.onChangeTitleOfObservation} 
                                    onChangeCategory={this.onChangeCategory} 
                                    onChangeSubCategory={this.onChangeSubCategory} 
                                    onChangeSeverity={this.onChangeSeverity}
                                    onChangeDescription={this.onChangeDescription} 
                                    onClickSubmit={this.onClickSubmit}
                                    onClickBackToObservationsList={this.onClickBackToObservationsList} 
                                    titleOfObservationValue={this.titleOfObservationValue}
                                    descriptionValue={this.descriptionValue} 
                                    titleErrorMessage={this.titleErrorMessage} 
                                    descriptionErrorMessage={this.descriptionErrorMessage}
                                    severityErrorMessage={this.severityErrorMessage} 
                                    categoryAndSubCategoryList={categoryAndSubCategoryList}
                                    roleType={roleType}
                />);
    }
}

export default withRouter(UserReportingPageRoute);
