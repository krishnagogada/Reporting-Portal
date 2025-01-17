import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import { getRoleType } from '../../../../utils/StorageUtils.js';
import { UserObservationsListPage } from '../../components/UserObservationsListPage/UserObservationsListPage.jsx';
import { USER_OBSERVATION_PAGE_PATH, USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants.jsx';

@inject('authStore', 'userStore')
@observer
class UserObservationsListPageRoute extends React.Component {

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
            filterList,
            onChangeUserFilter,
            getObservationsListAPIStatus,
            getObservationsListAPIError,
            getObservationsList,
            selectedPage,
            // paginationStore
        } = this.props.userStore;

        // const {observationsList,getObservationsListAPIStatus,getObservationsListAPIError}=paginationStore

        if (this.props.history.location.state) {
            this.roleType = this.props.history.location.state.roleType;
        }
        else {
            this.roleType = 'user';
        }
        const roleType = getRoleType();

        return (
            <UserObservationsListPage   observationsList={observationsList} 
                                        onClickReportedOn={this.onClickReportedOn} 
                                        onClickDueDate={this.onClickDueDate}
                                        onClickAddNew={this.onClickAddNew}  
                                        onClickUserObservationStorePageNumber={this.onClickPageNumber}
                                        totalPages={parseInt(userObservationsStoreTotal/userObservationsStoreLimit,10)} 
                                        onClickUserObservationCell={this.onClickUserObservationCell} 
                                        filterList={filterList} 
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
