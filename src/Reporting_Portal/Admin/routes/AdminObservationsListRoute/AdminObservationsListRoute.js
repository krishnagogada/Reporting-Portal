import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { AdminObservationsList } from '../../components/AdminObservationsList/AdminObservationsList.js';

@inject('authStore', 'adminStore')
@observer
class AdminObservationsListRoute extends React.Component {

    roleType
    componentDidMount() {
        const { getTotalObservationsList } = this.props.adminStore;
        getTotalObservationsList();
    }
    onClickAdminObservationCell = () => {
        const { history, adminStore } = this.props;
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType } });
    }
    onClickAdminObservationStorePageNumber = (pageNumber) => {
        const { onClickAdminObservationStorePageNumber } = this.props.adminStore;
        onClickAdminObservationStorePageNumber(pageNumber.selected);
    }
    render() {
        const {
            totalObservationsList,
            totalObservationsLimit,
            totalObservations,
            onClickDueDate,
            getTotalObservationsAPIStatus,
            getTotalObservationsAPIError,
            getTotalObservationsList,
            categoryAndSubCategoryList,
            onChangeAdminSubCategory,
            onChangeAdminCategory

        } = this.props.adminStore;
        const roleType = this.props.authStore.type;
        if (this.props.history.location.state) {
            this.roleType = this.props.history.location.state.roleType;
        }
        else {
            this.roleType = 'admin';
        }
        return (
            <AdminObservationsList  totalObservationsList={totalObservationsList}
                                    onClickDueDate={onClickDueDate}
                                    onClickAdminObservationCell={this.onClickAdminObservationCell}
                                    totalPages={totalObservations/totalObservationsLimit}
                                    getTotalObservationsAPIStatus={getTotalObservationsAPIStatus}
                                    getTotalObservationsAPIError={getTotalObservationsAPIError}
                                    getTotalObservationsList={getTotalObservationsList}
                                    categoryAndSubCategoryList={categoryAndSubCategoryList}
                                    onChangeSubCategory={onChangeAdminSubCategory}
                                    onChangeCategory={onChangeAdminCategory}
                                    roleType={roleType}/>
        );
    }
}

export default withRouter(AdminObservationsListRoute);
