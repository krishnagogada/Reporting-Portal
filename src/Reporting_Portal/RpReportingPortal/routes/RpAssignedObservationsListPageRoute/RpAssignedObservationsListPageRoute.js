import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";
import { RpAssignedObservationsListPage } from '../../components/RpAssignedObservationsListPage/RpAssignedObservationsListPage.js';
import strings from '../../../../common/i18n/strings.json';

@inject('authStore', 'rpStore')
@observer
class RpAssignedObservationsListPageRoute extends React.Component {

    roleType
    componentDidMount() {
        const { rpStore } = this.props;
        rpStore.getAssignedObservationsList();
    }

    onClickAssignedObservationCell = (observationId) => {
        const { history, rpStore } = this.props;
        // rpStore.setObservationId(observationId);
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
    }

    render() {
        const {
            assignedObservationsList,
            onChangeRpFilter,
            assignedObservationsLimit,
            totalAssignedObservations,
            onClickAssignedObservationsPageNumber,
            getAssignedObservationsList,
            getAssignedObservationsListAPIStatus,
            getAssignedObservationsListAPIError
        } = this.props.rpStore;

        const roleType = this.props.authStore.type;
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
                                                onClickAssignedObservationsPageNumber={onClickAssignedObservationsPageNumber}
                                                getAssignedObservationsList={getAssignedObservationsList}
                                                getAssignedObservationsListAPIStatus={getAssignedObservationsListAPIStatus}
                                                getAssignedObservationsListAPIError={getAssignedObservationsListAPIError}
                                                roleType={roleType}
                                                />);
    }
}

export default withRouter(RpAssignedObservationsListPageRoute);
