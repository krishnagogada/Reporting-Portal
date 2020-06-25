import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { History } from 'history';

import { getRoleType } from '../../../../utils/StorageUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { UserObservationsListPage } from '../../components/UserObservationsListPage/UserObservationsListPage';
import { USER_OBSERVATION_PAGE_PATH, USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
import UserStore from '../../stores/UserStore/index'

interface UserObservationsListPageRouteProps{
    history:History
}

interface InjectedProps extends UserObservationsListPageRouteProps{
    userStore:UserStore
    authStore:AuthStore
}

@inject('authStore', 'userStore')
@observer
class UserObservationsListPageRoute extends React.Component<UserObservationsListPageRouteProps> {

    roleType!:string

    componentDidMount() {
        const { getObservationsList } = this.getUserStore()
        getObservationsList();
    }

    getInjectedProps = (): InjectedProps => this.props as InjectedProps

    getAuthStore = () => {
      return this.getInjectedProps().authStore
    }

    getUserStore = () => {
        return this.getInjectedProps().userStore
    }

    onClickUserObservationCell = (observationId:number) => {
        const { history } = this.getInjectedProps()
        history.push({ pathname: USER_OBSERVATION_PAGE_PATH, state: { roleType: this.roleType, observationId: observationId } });
    }

    onClickReportedOn = () => {
        const { onClickUserObservationStoreReportedOn } = this.getUserStore()
        onClickUserObservationStoreReportedOn();
    }

    onClickDueDate = () => {
        const { onClickUserObservationStoreDueDate } = this.getUserStore()
        onClickUserObservationStoreDueDate();
    }

    onClickAddNew = () => {
        const { getCategoryAndSubCategoryList } = this.getUserStore()
        const { history} = this.getInjectedProps()
        getCategoryAndSubCategoryList();
        history.push(USER_REPORTING_PAGE_PATH);
    }

    onClickPageNumber = (data) => {
        const { onClickUserObservationStorePageNumber } = this.getUserStore()
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
        } = this.getUserStore();

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
