import React from 'react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { UserObservationPage } from '../../components/UserObservationPage/UserObservationPage.js';
import strings from '../../../../common/i18n/strings.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRoleType } from '../../../../utils/StorageUtils.js';
import {goToBack} from '../../../../utils/NavigationUtils';

@inject('authStore', 'userStore')
@observer
class UserObservationPageRoute extends React.Component {

    @observable singleObservationPageRoleType
    @observable status = {};
    @observable severity = {};
    @observable assignedToPerson = {};
    @observable dueDateValue = null;
    @observable security = null;
    @observable categoryId;
    @observable subCategoryId;
    @observable defaultCategoryOption = {};
    @observable defaultSubCategoryOption = {};

    componentDidMount() {
        const { userStore } = this.props;
        userStore.getSingleUserObservationDetails(1);
        // userStore.getSingleUserObservationDetails(this.props.history.location.state.observationId);
        userStore.getCategoryAndSubCategoryList();
        this.onClickReset();
    }
    onClickReset = () => {

        const { singleUserObservationDetails } = this.props.userStore;
        this.status = { value: singleUserObservationDetails.status, label: singleUserObservationDetails.status };
        this.assignedToPerson = { value: singleUserObservationDetails.assignedToPersonId, label: singleUserObservationDetails.assignedToPersonName };
        this.severity = { value: singleUserObservationDetails.severity, label: singleUserObservationDetails.severity };
        this.dueDateValue = singleUserObservationDetails.dueDate;
        this.categoryId = singleUserObservationDetails.categoryId;
        this.subCategoryId = singleUserObservationDetails.subCategoryId;
        this.defaultCategoryOption = { value: singleUserObservationDetails.categoryId, label: singleUserObservationDetails.categoryName };
        this.defaultSubCategoryOption = { value: singleUserObservationDetails.subCategoryId, label: singleUserObservationDetails.subCategoryName };

    }
    onChangeCategory = (selectedOption) => {
        this.categoryId = selectedOption.value;
    }
    onChangeSubCategory = (selectedOption) => {
        this.subCategoryId = selectedOption.value;
    }
    onChangeStatus = (selectedOption) => {
        this.status = { value: selectedOption.value, label: selectedOption.value };
    }
    onChangeAssignedTo = (selectedOption) => {
        this.assignedToPerson = { value: selectedOption.value, label: selectedOption.value };
    }
    onChangeDueDate = (event) => {
        this.dueDateValue = event.target.value;
    }
    onChangeRadio = (event) => {
        this.security = event.target.value;
    }
    onClickBack = () => {
        const { history } = this.props;
        goToBack(history)
    }
    onClickUpdate = (observationId) => {

        const { userStore, authStore } = this.props;
        let objectToUpdateObservation = {};
        if (authStore.type !== strings.admin) {

            objectToUpdateObservation = {
                status: this.status.value,
                rp_id: this.assignedToPerson.value,
                due_date: this.dueDateValue,
                security: this.security
            };

            userStore.updateObservationByRp(objectToUpdateObservation, this.props.history.location.state.observationId);
            toast.info("Observation Updated");
        }
        else {
            objectToUpdateObservation = {
                rp_id: this.assignedToPerson.value,
                severity: this.severity.value,
                category_id: this.categoryId,
                sub_category_id: this.subCategoryId
            };
            userStore.updateObservationByAdmin(objectToUpdateObservation, this.props.history.location.state.observationId);
            toast.info("Observation Updated");
        }
        this.onClickReset();
    }

    render() {

        const {
            singleUserObservationDetails,
            getSingleUserObservationDetails,
            getSingleUserObservationAPIStatus,
            getSingleUserObservationAPIError,
            categoryAndSubCategoryList
        } = this.props.userStore;
        const roleType = getRoleType();
        
        return (<UserObservationPage    roleType={roleType}
                                        singleUserObservationDetails={singleUserObservationDetails}
                                        onClickBack={this.onClickBack}
                                        getSingleUserObservationDetails={getSingleUserObservationDetails}
                                        getSingleUserObservationAPIStatus={getSingleUserObservationAPIStatus}
                                        getSingleUserObservationAPIError={getSingleUserObservationAPIError}
                                        singleObservationPageRoleType={this.singleObservationPageRoleType}
                                        onChangeDueDate={this.onChangeDueDate}
                                        onClickUpdate={this.onClickUpdate}
                                        onClickReset={this.onClickReset}
                                        status={this.status}
                                        assignedToPerson={this.assignedToPerson}
                                        dueDate={this.dueDate}
                                        defaultCategoryOption={this.defaultCategoryOption}
                                        defaultSubCategoryOption={this.defaultSubCategoryOption}
                                        onChangeCategory={this.onChangeCategory}
                                        onChangeSubCategory={this.onChangeSubCategory}
                                        severity={this.severity}
                                        onChangeStatus={this.onChangeStatus}
                                        onChangeAssignedTo={this.onChangeAssignedTo}
                                        onChangeRadio={this.onChangeRadio}
                                        categoryAndSubCategoryList={categoryAndSubCategoryList}
                                        />);
    }

}

export default withRouter(UserObservationPageRoute);
