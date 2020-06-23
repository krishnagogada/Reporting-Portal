import React from 'react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { History } from 'history'
import 'react-toastify/dist/ReactToastify.css';

import strings from '../../../../common/i18n/strings.json';
import { getRoleType } from '../../../../utils/StorageUtils';
import {goToBack} from '../../../../utils/NavigationUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { UserObservationPage } from '../../components/UserObservationPage/UserObservationPage';
import UserStore from '../../stores/UserStore/index'

type userObservationPageRouteProps={
    authStore:AuthStore
    userStore:UserStore
    history:History
}

@inject('authStore', 'userStore')
@observer
class UserObservationPageRoute extends React.Component<userObservationPageRouteProps> {

    @observable singleObservationPageRoleType!:string
    @observable status!:{value:string,label:string};
    @observable severity !:{value:string,label:string};
    @observable assignedToPerson!:{value:number,label:string};
    @observable dueDateValue!:string;
    @observable security!:string;
    @observable categoryId!:number;
    @observable subCategoryId!:number;
    @observable defaultCategoryOption!:{value:number,label:string};
    @observable defaultSubCategoryOption!:{value:number,label:string};

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
    onChangeCategory = (selectedOption: { value: number;label:string }) => {
        this.categoryId = selectedOption.value;
    }
    onChangeSubCategory = (selectedOption: { value: number;label:string }) => {
        this.subCategoryId = selectedOption.value;
    }
    onChangeStatus = (selectedOption: { value: string;label:string;}) => {
        this.status = { value: selectedOption.value, label: selectedOption.value };
    }
    onChangeAssignedTo = (selectedOption: { value: any;label:string;}) => {
        this.assignedToPerson = { value: selectedOption.value, label: selectedOption.value };
    }
    onChangeDueDate = (event:any) => {
        this.dueDateValue = event.target.value;
    }
    onChangeRadio = (event: any) => {
        this.security = event.target.value;
    }
    onClickBack = () => {
        const { history } = this.props;
        goToBack(history)
    }
    onClickUpdate = (observationId: any) => {

        const { userStore, authStore } = this.props;
        let objectToUpdateObservation = {};
        if (authStore.type !== strings.admin) {

            objectToUpdateObservation = {
                status: this.status.value,
                rp_id: this.assignedToPerson.value,
                due_date: this.dueDateValue,
                security: this.security
            };

            // userStore.updateObservationByRp(objectToUpdateObservation, this.props.history.location.state.observationId);
            userStore.updateObservationByRp(objectToUpdateObservation,1);
            toast.info("Observation Updated");
        }
        else {
            objectToUpdateObservation = {
                rp_id: this.assignedToPerson.value,
                severity: this.severity.value,
                category_id: this.categoryId,
                sub_category_id: this.subCategoryId
            };
            // userStore.updateObservationByAdmin(objectToUpdateObservation, this.props.history.location.state.observationId);
            userStore.updateObservationByAdmin(objectToUpdateObservation, 1);
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
                                        // singleObservationPageRoleType={this.singleObservationPageRoleType}
                                        onChangeDueDate={this.onChangeDueDate}
                                        onClickUpdate={this.onClickUpdate}
                                        onClickReset={this.onClickReset}
                                        status={this.status}
                                        assignedToPerson={this.assignedToPerson}
                                        dueDate={this.dueDateValue}
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
