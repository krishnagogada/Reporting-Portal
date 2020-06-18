import React from 'react';
import { withRouter } from "react-router-dom";
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import { UserReportingPage } from '../../components/UserReportingPage/UserReportingPage.js';
import { getRoleType } from '../../../Authentication/utils/StorageUtils.js';
import { goToBack } from '../../utils/NavigationUtils.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


@inject('authStore', 'userStore')
@observer
class UserReportingPageRoute extends React.Component {

    @observable titleOfObservationValue = '';
    @observable descriptionValue = '';
    @observable titleErrorMessage = '';
    @observable descriptionErrorMessage = '';
    @observable severityErrorMessage = '';
    category = '';
    subCategory = '';
    severity = '';

    onChangeTitleOfObservation = (event) => {
        this.titleOfObservationValue = event.target.value;
    }
    onChangeCategory = (selectedOption) => {
        this.category = selectedOption.value;
    }
    onChangeSubCategory = (selectedOption) => {
        this.subCategory = selectedOption.value;
    }
    onChangeSeverity = (selectedOption) => {
        this.severity = selectedOption.value;
    }
    onChangeDescription = (event) => {
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
            const reportingObservationObject = {

                title: this.titleOfObservationValue,
                category_id: this.category,
                sub_category_id: this.subCategory,
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
