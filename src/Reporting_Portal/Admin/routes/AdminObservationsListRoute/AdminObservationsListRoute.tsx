import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { History } from 'history';

import { getRoleType } from '../../../../utils/StorageUtils';
import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { AdminObservationsList } from '../../components/AdminObservationsList/AdminObservationsList';
import AdminStore from '../../stores/AdminStore/index'

type adminObservationsListRouteProps={
    authStore:AuthStore
    adminStore:AdminStore
    history:History
}

@inject('authStore', 'adminStore')
@observer
class AdminObservationsListRoute extends React.Component<adminObservationsListRouteProps> {

    @observable categoryList:Array<{value:number;label:string}> = [];
    @observable subCategoryList:Array<{value:number;label:string}> = [];
    roleType!:string

    componentDidMount() {
        const { getTotalObservationsList } = this.props.adminStore;
        getTotalObservationsList();
    }

    onClickAdminObservationCell = (observationId: number) => {
        const { history, adminStore } = this.props;
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
        adminStore.getCategoryAndSubCategoryList();
    }

    onClickAdminObservationStorePageNumber = (pageNumber: { selected: string; }) => {
        const { onClickAdminObservationStorePageNumber } = this.props.adminStore;
        onClickAdminObservationStorePageNumber(pageNumber.selected);
    }

    onChangeSubCategory = (selectedOptions: Array<{value:number;label:string}>) => {
        this.categoryList = selectedOptions;
    }

    onChangeCategory = (selectedOptions:Array<{value:number;label:string}>) => {
        this.subCategoryList = selectedOptions;
    }

    onChangeAdminFilter = (selectedFilter: string) => {
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
        // if (this.props.history.location.state) {
        //     this.roleType = this.props.history.location.state.roleType;
        // }
        // else {
            this.roleType = 'admin';
        // }
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
