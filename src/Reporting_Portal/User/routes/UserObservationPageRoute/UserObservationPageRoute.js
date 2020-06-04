import React from 'react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { UserObservationPage } from '../../components/UserObservationPage/UserObservationPage.js';

@inject('authStore', 'userStore')
@observer
class UserObservationPageRoute extends React.Component {

    @observable singleObservationPageRoleType
    @observable status;
    @observable assignedToPerson;
    @observable dueDateValue;
    @observable security;

    constructor(props) {
        super(props);
        this.singleObservationPageRoleType = this.props.history.location.state.roleType;
    }

    componentDidMount() {
        const { userStore } = this.props;
        userStore.getSingleUserObservationDetails(1, 1, this.singleObservationPageRoleType);
    }
    onChangeStatus = (selectedOption) => {
        this.status = selectedOption.value;
    }
    onChangeAssignedTo = (selectedOption) => {
        this.assignedToPerson = selectedOption.value;
    }
    onChangeDueDate = (event) => {
        this.dueDateValue = event.target.value;
        console.log(event.target.value.toString(), ">>>>>due date");
    }
    onChangeRadio = (event) => {
        this.security = event.target.value;
    }
    onClickBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {

        const { singleUserObservationDetails, getSingleUserObservationDetails, getSingleUserObservationAPIStatus, getSingleUserObservationAPIError } = this.props.userStore;
        const roleType = this.props.authStore.type;


        return (<UserObservationPage    roleType={roleType}
                                        singleUserObservationDetails={singleUserObservationDetails}
                                        onClickBack={this.onClickBack}
                                        getSingleUserObservationDetails={getSingleUserObservationDetails}
                                        getSingleUserObservationAPIStatus={getSingleUserObservationAPIStatus}
                                        getSingleUserObservationAPIError={getSingleUserObservationAPIError}
                                        singleObservationPageRoleType={this.singleObservationPageRoleType}
                                        onChangeDueDate={this.onChangeDueDate}
                                        />);
    }

}

export default withRouter(UserObservationPageRoute);
