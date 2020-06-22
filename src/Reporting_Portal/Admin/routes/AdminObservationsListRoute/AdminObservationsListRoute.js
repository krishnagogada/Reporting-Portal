import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import { getRoleType } from '../../../../utils/StorageUtils.js';
import { AdminObservationsList } from '../../components/AdminObservationsList/AdminObservationsList.js';

@inject('authStore', 'adminStore')
@observer
class AdminObservationsListRoute extends React.Component {

    @observable categoryList = [];
    @observable subCategoryList = [];
    roleType

    componentDidMount() {
        const { getTotalObservationsList } = this.props.adminStore;
        getTotalObservationsList();
    }

    onClickAdminObservationCell = (observationId) => {
        const { history, adminStore } = this.props;
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
        adminStore.getCategoryAndSubCategoryList();
    }

    onClickAdminObservationStorePageNumber = (pageNumber) => {
        const { onClickAdminObservationStorePageNumber } = this.props.adminStore;
        onClickAdminObservationStorePageNumber(pageNumber.selected);
    }

    onChangeSubCategory = (selectedOptions) => {
        this.categoryList = selectedOptions;
    }

    onChangeCategory = (selectedOptions) => {
        this.subCategoryList = selectedOptions;
    }

    onChangeAdminFilter = (selectedFilter) => {
        const { onChangeAdminFilter } = this.props.adminStore;
        onChangeAdminFilter(selectedFilter);
    }

    onClickSearch = () => {

        const categoryList = this.categoryList.map((eachCategory) => eachCategory.value);
        const subCategoryList = this.subCategoryList.map((eachSubCategory) => eachSubCategory.value);
        const { onChangeAdminCategory, onChangeAdminSubCategory, getTotalObservationsList } = this.props.adminStore;
        onChangeAdminCategory(categoryList);
        onChangeAdminSubCategory(subCategoryList);
        getTotalObservationsList();

    }
    render() {
        const {
            totalObservationsList,
            totalObservationsLimit,
            totalObservations,
            onClickAdminDueDate,
            getTotalObservationsAPIStatus,
            getTotalObservationsAPIError,
            getTotalObservationsList,
            categoryAndSubCategoryList,
            onChangeAdminSubCategory,
            onChangeAdminCategory,
            adminSelectedPage

        } = this.props.adminStore;
        const roleType = getRoleType();
        if (this.props.history.location.state) {
            this.roleType = this.props.history.location.state.roleType;
        }
        else {
            this.roleType = 'admin';
        }
        return (
            <AdminObservationsList  totalObservationsList={totalObservationsList}
                                    onClickDueDate={onClickAdminDueDate}
                                    onClickAdminObservationCell={this.onClickAdminObservationCell}
                                    totalPages={totalObservations/totalObservationsLimit}
                                    getTotalObservationsAPIStatus={getTotalObservationsAPIStatus}
                                    getTotalObservationsAPIError={getTotalObservationsAPIError}
                                    getTotalObservationsList={getTotalObservationsList}
                                    categoryAndSubCategoryList={categoryAndSubCategoryList}
                                    onChangeSubCategory={onChangeAdminSubCategory}
                                    onChangeCategory={onChangeAdminCategory}
                                    roleType={roleType}
                                    onChangeSubCategory={this.onChangeSubCategory}
                                    onChangeCategory={this.onChangeCategory}
                                    onClickSearch={this.onClickSearch}
                                    onChangeAdminFilter={this.onChangeAdminFilter}
                                    adminSelectedPage={adminSelectedPage}
                                    onClickAdminObservationStorePageNumber={this.onClickAdminObservationStorePageNumber}/>
        );
    }
}

export default withRouter(AdminObservationsListRoute);
