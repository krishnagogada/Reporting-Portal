import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";
import { History } from 'history'

import { getRoleType } from '../../../../utils/StorageUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { RpAssignedObservationsListPage } from '../../components/RpAssignedObservationsListPage/RpAssignedObservationsListPage';
import RpStore from '../../stores/RpStore/index'

interface RpAssignedObservationsListPageRouteProps{
    history:History
}
interface InjectedProps extends RpAssignedObservationsListPageRouteProps{
    authStore:AuthStore
    rpStore:RpStore
}
@inject('authStore', 'rpStore')
@observer
class RpAssignedObservationsListPageRoute extends React.Component<RpAssignedObservationsListPageRouteProps> {

    roleType
    componentDidMount() {
        const { getObservationsList } = this.getRpStore().rpPaginationStore
        getObservationsList();
    }

    getInjectedProps = () : InjectedProps => this.props as InjectedProps

    getAuthStore = () =>{
        return this.getInjectedProps().authStore
    }

    getRpStore = () =>{
        return this.getInjectedProps().rpStore
    }

    onClickAssignedObservationCell = (observationId:number) => {
        const { history} = this.getInjectedProps()
        this.getRpStore().getSingleUserObservationDetails(1);
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
    }
    onClickAssignedObservationsPageNumber = (pageNumber: { selected: string; }) => {
        const { onClickPageNumber } = this.getRpStore().rpPaginationStore
        onClickPageNumber(pageNumber.selected);
    }

    render() {
        const {
            // assignedObservationsList,
            onChangeRpFilter,
            // assignedObservationsLimit,
            // totalAssignedObservations,
            // // getAssignedObservationsList,
            // getAssignedObservationsListAPIStatus,
            // getAssignedObservationsListAPIError,
            // rpSelectedPage,
            onClickAssignedObservationsDueDate,
            onClickAssignedObservationsReportedOn,
            rpPaginationStore
        } = this.getRpStore()

        const roleType = getRoleType();
        const {observationsList,limit,totalObservations,selectedPage,getObservationsListAPIStatus,getObservationsListAPIError,getObservationsList}=rpPaginationStore
        // if (this.props.history.location.state) {
        //     this.roleType = this.props.history.location.state.roleType;
        // }
        // else {
            this.roleType = 'rp';
        // }
        return (<RpAssignedObservationsListPage assignedObservationsList={observationsList}
                                                onClickAssignedObservationCell={this.onClickAssignedObservationCell}                                            
                                                onChangeRpFilter={onChangeRpFilter}
                                                totalPages={totalObservations/limit}
                                                onClickAssignedObservationsPageNumber={this.onClickAssignedObservationsPageNumber}
                                                getAssignedObservationsList={getObservationsList}
                                                getAssignedObservationsListAPIStatus={getObservationsListAPIStatus}
                                                getAssignedObservationsListAPIError={getObservationsListAPIError}
                                                roleType={roleType}
                                                rpSelectedPage={selectedPage}
                                                onClickAssignedObservationsReportedOn={onClickAssignedObservationsReportedOn}
                                                onClickAssignedObservationsDueDate={onClickAssignedObservationsDueDate}
                                                />);
    }
}

export default withRouter(RpAssignedObservationsListPageRoute);
