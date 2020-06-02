import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { RpAssignedObservationsListPage } from '../../components/RpAssignedObservationsListPage/RpAssignedObservationsListPage.js';
import strings from '../../../../common/i18n/strings.json';

@inject('rpStore')
@observer
class RpAssignedObservationsListPageRoute extends React.Component {

    @observable isActive = strings.assignedObservations;

    componentDidMount() {
        const { rpStore } = this.props;
        rpStore.getAssignedObservationsList();
    }

    onClickAssignedObservationCell = () => {
        const { history } = this.props;
        history.push('/rp-assigned-observations-list');
    }

    render() {
        const {
            assignedObservationsList,
            onChangeRpFilter,
            rpFilterList,
            assignedObservationsLimit,
            totalAssignedObservations,
            onClickAssignedObservationsPageNumber
        } = this.props.rpStore;
        console.log(assignedObservationsList, ">>>>>AssignedObservationRoute")
        return (<RpAssignedObservationsListPage assignedObservationsList={assignedObservationsList}
                                                onClickAssignedObservationCell={this.onClickAssignedObservationCell}                                            
                                                onChangeRpFilter={onChangeRpFilter}
                                                rpFilterList={rpFilterList}
                                                totalPages={totalAssignedObservations/assignedObservationsLimit}
                                                onClickAssignedObservationsPageNumber={onClickAssignedObservationsPageNumber}/>);
    }
}

export default withRouter(RpAssignedObservationsListPageRoute);
