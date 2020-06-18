import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import { getRoleType } from '../../../Authentication/utils/StorageUtils.js';
import { RpAssignedObservationsListPage } from '../../components/RpAssignedObservationsListPage/RpAssignedObservationsListPage.js';

@inject('authStore', 'rpStore')
@observer
class RpAssignedObservationsListPageRoute extends React.Component {

    roleType
    componentDidMount() {
        const { rpStore } = this.props;
        rpStore.getAssignedObservationsList();
    }

    onClickAssignedObservationCell = (observationId) => {
        const { history } = this.props;
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
    }
    onClickAssignedObservationsPageNumber = (pageNumber) => {
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
        if (this.props.history.location.state) {
            this.roleType = this.props.history.location.state.roleType;
        }
        else {
            this.roleType = 'rp';
        }
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
