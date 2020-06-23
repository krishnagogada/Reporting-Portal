import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";
import { History } from 'history'

import { getRoleType } from '../../../../utils/StorageUtils';

import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { RpAssignedObservationsListPage } from '../../components/RpAssignedObservationsListPage/RpAssignedObservationsListPage';
import RpStore from '../../stores/RpStore/index'

type rpAssignedObservationsListPageRouteProps={
    authStore:AuthStore
    rpStore:RpStore
    history:History
}

@inject('authStore', 'rpStore')
@observer
class RpAssignedObservationsListPageRoute extends React.Component<rpAssignedObservationsListPageRouteProps> {

    roleType
    componentDidMount() {
        const { rpStore } = this.props;
        rpStore.getAssignedObservationsList();
    }

    onClickAssignedObservationCell = (observationId:number) => {
        const { history,rpStore } = this.props;
        rpStore.getSingleUserObservationDetails(1);
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
    }
    onClickAssignedObservationsPageNumber = (pageNumber: { selected: string; }) => {
        const { onClickAssignedObservationsPageNumber } = this.props.rpStore;
        onClickAssignedObservationsPageNumber(pageNumber.selected);
    }

    render() {
        const {
            assignedObservationsList,
            onChangeRpFilter,
            assignedObservationsLimit,
            totalAssignedObservations,
            getAssignedObservationsList,
            getAssignedObservationsListAPIStatus,
            getAssignedObservationsListAPIError,
            rpSelectedPage,
            onClickAssignedObservationsDueDate,
            onClickAssignedObservationsReportedOn
        } = this.props.rpStore;

        const roleType = getRoleType();

        // if (this.props.history.location.state) {
        //     this.roleType = this.props.history.location.state.roleType;
        // }
        // else {
            this.roleType = 'rp';
        // }
        return (<RpAssignedObservationsListPage assignedObservationsList={assignedObservationsList}
                                                onClickAssignedObservationCell={this.onClickAssignedObservationCell}                                            
                                                onChangeRpFilter={onChangeRpFilter}
                                                totalPages={totalAssignedObservations/assignedObservationsLimit}
                                                onClickAssignedObservationsPageNumber={this.onClickAssignedObservationsPageNumber}
                                                getAssignedObservationsList={getAssignedObservationsList}
                                                getAssignedObservationsListAPIStatus={getAssignedObservationsListAPIStatus}
                                                getAssignedObservationsListAPIError={getAssignedObservationsListAPIError}
                                                roleType={roleType}
                                                rpSelectedPage={rpSelectedPage}
                                                onClickAssignedObservationsReportedOn={onClickAssignedObservationsReportedOn}
                                                onClickAssignedObservationsDueDate={onClickAssignedObservationsDueDate}
                                                />);
    }
}

export default withRouter(RpAssignedObservationsListPageRoute);
