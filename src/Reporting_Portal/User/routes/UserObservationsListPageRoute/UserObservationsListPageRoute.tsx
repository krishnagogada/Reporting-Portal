import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { History } from 'history';

import { getRoleType } from '../../../../utils/StorageUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { UserObservationsListPage } from '../../components/UserObservationsListPage/UserObservationsListPage';
import { USER_OBSERVATION_PAGE_PATH, USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
import UserStore from '../../stores/UserStore/index'

type userObservationsListPageRouteProps={
    history:History
    userStore:UserStore
    authStore:AuthStore
}
@inject('authStore', 'userStore')
@observer
class UserObservationsListPageRoute extends React.Component<userObservationsListPageRouteProps> {

    roleType

    componentDidMount() {
        const { userStore } = this.props;
        userStore.getObservationsList();
    }

    onClickUserObservationCell = (observationId) => {
        const { history } = this.props;
        history.push({ pathname: USER_OBSERVATION_PAGE_PATH, state: { roleType: this.roleType, observationId: observationId } });
    }

    onClickReportedOn = () => {
        const { onClickUserObservationStoreReportedOn } = this.props.userStore;
        onClickUserObservationStoreReportedOn();
    }

    onClickDueDate = () => {
        const { onClickUserObservationStoreDueDate } = this.props.userStore;
        onClickUserObservationStoreDueDate();
    }

    onClickAddNew = () => {
        const { history, userStore } = this.props;
        userStore.getCategoryAndSubCategoryList();
        history.push(USER_REPORTING_PAGE_PATH);
    }

    onClickPageNumber = (data) => {
        const { onClickUserObservationStorePageNumber } = this.props.userStore;
        onClickUserObservationStorePageNumber(data.selected);
    }

    render() {

        const {
            userObservationsStoreLimit,
            userObservationsStoreTotal,
            observationsList,
            onChangeUserFilter,
            getObservationsListAPIStatus,
            getObservationsListAPIError,
            getObservationsList,
            selectedPage,
            // paginationStore
        } = this.props.userStore;

        // const {observationsList,getObservationsListAPIStatus,getObservationsListAPIError}=paginationStore

        // if (this.props.history.location.state) {
        //     this.roleType = this.props.history.location.state.roleType;
        // }
        // else {
        this.roleType = 'user';
        // }
        const roleType = getRoleType();

        return (
            <UserObservationsListPage   observationsList={observationsList} 
                                        onClickReportedOn={this.onClickReportedOn} 
                                        onClickDueDate={this.onClickDueDate}
                                        onClickAddNew={this.onClickAddNew}  
                                        onClickUserObservationStorePageNumber={this.onClickPageNumber}
                                        totalPages={userObservationsStoreTotal/userObservationsStoreLimit} 
                                        onClickUserObservationCell={this.onClickUserObservationCell} 
                                        onChangeUserFilter={onChangeUserFilter}
                                        getObservationsListAPIStatus={getObservationsListAPIStatus}
                                        getObservationsListAPIError={getObservationsListAPIError}
                                        getObservationsList={getObservationsList}
                                        roleType={roleType}
                                        selectedPage={selectedPage}
                                    />
        );
    }
}

export default withRouter(UserObservationsListPageRoute);
