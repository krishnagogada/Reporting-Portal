import React from 'react';
import { withRouter } from "react-router-dom";
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { UserReportingPage } from '../../components/UserReportingPage/UserReportingPage.js';

@inject('userStore')
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
        this.category = selectedOption;

    }
    onChangeSubcategory = (selectedOption) => {
        this.subCategory = selectedOption;
    }
    onChangeSeverity = (selectedOption) => {
        this.severity = selectedOption;
    }
    onChangeDescription = (event) => {
        this.descriptionValue = event.target.value;
    }
    onClickBackToObservationsList = () => {
        const { history } = this.props;
        history.goBack();
    }
    onClickSubmit = () => {

        if (this.titleOfObservationValue.search('^[a-z0-9_-]{3,16}$') !== -1 && this.descriptionValue.length !== 0 && this.severity.length !== 0) {

            const { userStore } = this.props;
            const reportingObservationObject = {

                title: this.titleOfObservationValue,
                category_id: this.category,
                sub_category_id: this.subCategory,
                severity: this.severity,
                description: this.descriptionValue

            };
            userStore.onClickSubmit(reportingObservationObject);
            this.titleOfObservationValue = '';
            this.category = '';
            this.subCategory = '';
            this.severity = '';
            this.descriptionValue = '';
        }
        else {
            if (this.titleOfObservationValue.search('^[a-z0-9_-]{3,16}$') === -1) {
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
        const { categoryList, subCategoryList, severityList } = this.props.userStore;
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
                                    categoryList={categoryList} 
                                    subCategoryList={subCategoryList}
                                    severityList={severityList}
                />);
    }
}

export default withRouter(UserReportingPageRoute);