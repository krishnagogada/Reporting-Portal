import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { UserObservationPage } from '../../components/UserObservationPage/UserObservationPage.js';

@inject('userStore')
@observer
class UserObservationPageRoute extends React.Component {

    componentDidMount() {
        const { userStore } = this.props;
        userStore.getSingleUserObservationDetails(1, 1);
    }
    onClickBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { singleUserObservationDetails } = this.props.userStore;
        console.log(singleUserObservationDetails, ">>>>>USer Route")
        return (<UserObservationPage    type='user' 
                                        singleUserObservationDetails={singleUserObservationDetails}
                                        onClickBack={this.onClickBack}/>);
    }

}

export default withRouter(UserObservationPageRoute);
