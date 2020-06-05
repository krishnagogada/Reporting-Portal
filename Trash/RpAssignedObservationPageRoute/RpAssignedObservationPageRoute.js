import React from 'react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RpAssignedObservationPage } from '../../components/RpAssignedObservationPage/RpAssignedObservationPage.js';

@inject('rpStore')
@observer
class RpAssignedObservationPageRoute extends React.Component {

    @observable status;
    @observable assignedToPerson;
    @observable dueDateValue;
    @observable security;

    componentDidMount() {
        const { rpStore } = this.props;
        rpStore.getSingleUserObservationDetails(1, 1, 'rp');
    }
    onChangeStatus = (selectedOption) => {
        this.status = selectedOption.value;
    }
    onChangeAssignedTo = (selectedOption) => {
        this.assignedToPerson = selectedOption.value;
    }
    onChangeDueDate = (event) => {
        this.dueDateValue = event.target.value;
    }
    onChangeRadio = (event) => {
        this.security = event.target.value;
    }
    onClickBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    onClickSubmit = () => {

        const { rpStore } = this.props;
        const objectToUpdateObservation = { //send observation_id
            status: this.status,
            due_date: this.dueDateValue,
            assigned_to: this.assignedToPerson,
            security: this.security
        };
        rpStore.updateObservation(objectToUpdateObservation);

    }

    render() {
        const { singleUserObservationDetails, type } = this.props.rpStore;
        return (<RpAssignedObservationPage  onChangeStatus={this.onChangeStatus}
                                            onChangeAssignedTo={this.onChangeAssignedTo}
                                            onChangeDueDate={this.onChangeDueDate}
                                            onClickSubmit={this.onClickSubmit}
                                            dueDateValue={this.dueDateValue}
                                            onChangeRadio={this.onChangeRadio}
                                            onClickAssignedToMe={this.onClickAssignedToMe}
                                            onClickMyObservations={this.onClickMyObservations}
                                            singleUserObservationDetails={singleUserObservationDetails}
                                            onClickBack={this.onClickBack}
                                            type={type}
                />);
    }
}

export default withRouter(RpAssignedObservationPageRoute);
