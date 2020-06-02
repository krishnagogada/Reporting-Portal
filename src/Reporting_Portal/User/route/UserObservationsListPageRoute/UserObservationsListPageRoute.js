import React from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";

import { UserObservationsListPage } from '../../components/UserObservationsListPage/UserObservationsListPage.js';

@inject('userStore')
@observer
class UserObservationsListPageRoute extends React.Component {

    componentDidMount() {
        const { userStore } = this.props;
        userStore.getObservationsList();
    }
    onClickUserObservationCell = () => {
        const { history } = this.props;
        history.push('/user-observation-page');
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
        const { history } = this.props;
        history.push('/user-reporting-page');
    }

    onClickPageNumber = (data) => {

        const { onClickUserObservationStorePageNumber } = this.props.userStore;
        onClickUserObservationStorePageNumber(data.selected);
    }

    render() {
        const { userObservationsStoreLimit, userObservationsStoreTotal, observationsList, filterList, onChangeUserFilter } = this.props.userStore;

        return (
            <UserObservationsListPage   observationsList={observationsList} 
                                        onClickReportedOn={this.onClickReportedOn} 
                                        onClickDueDate={this.onClickDueDate}
                                        onClickAddNew={this.onClickAddNew}  
                                        onClickUserObservationStorePageNumber={this.onClickPageNumber}
                                        totalPages={parseInt(userObservationsStoreTotal/userObservationsStoreLimit)} 
                                        onClickUserObservationCell={this.onClickUserObservationCell} 
                                        filterList={filterList} 
                                        onChangeUserFilter={onChangeUserFilter}
                                    />
        );
    }
}

export default withRouter(UserObservationsListPageRoute);
