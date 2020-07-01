import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { History } from 'history';

import { getRoleType } from '../../../../utils/StorageUtils';
import AuthStore from '../../../Authentication/stores/AuthStore/index'

import { AdminObservationsList } from '../../components/AdminObservationsList/index';
import AdminStore from '../../stores/AdminStore/index'

interface AdminObservationsListRouteProps{
    history:History
}

interface InjectedProps extends AdminObservationsListRouteProps{
    authStore:AuthStore
    adminStore:AdminStore
}

@inject('authStore', 'adminStore')
@observer
class AdminObservationsListRoute extends React.Component<AdminObservationsListRouteProps> {

    @observable categoryList:Array<{value:number;label:string}> = [];
    @observable subCategoryList:Array<{value:number;label:string}> = [];
    roleType!:string

    componentDidMount() {
        const { getObservationsList } = this.getAdminStore().adminPaginationStore
        getObservationsList();
    }

    getInjectedProps = () : InjectedProps => this.props as InjectedProps

    getAuthStore = () =>{
        return this.getInjectedProps().authStore
    }

    getAdminStore = () =>{
        return this.getInjectedProps().adminStore
    }

    onClickAdminObservationCell = (observationId: number) => {
        const { history } = this.getInjectedProps()
        history.push({ pathname: '/user-observation-page', state: { roleType: this.roleType, observationId: observationId } });
        this.getAdminStore().getCategoryAndSubCategoryList();
    }

    onClickAdminObservationStorePageNumber = (pageNumber: { selected: string; }) => {
        const { onClickPageNumber } = this.getAdminStore().adminPaginationStore
        onClickPageNumber(pageNumber.selected);
    }

    onChangeSubCategory = (selectedOptions: Array<{value:number;label:string}>) => {
        this.categoryList = selectedOptions;
    }

    onChangeCategory = (selectedOptions:Array<{value:number;label:string}>) => {
        this.subCategoryList = selectedOptions;
    }

    onChangeAdminFilter = (selectedFilter: string) => {
        const { onChangeAdminFilter } = this.getAdminStore()
        onChangeAdminFilter(selectedFilter);
    }

    onClickSearch = () => {

        const categoryList = this.categoryList.map((eachCategory) => eachCategory.value);
        const subCategoryList = this.subCategoryList.map((eachSubCategory) => eachSubCategory.value);
        const { onChangeAdminCategory, onChangeAdminSubCategory } = this.getAdminStore()
        onChangeAdminCategory(categoryList)
        onChangeAdminSubCategory(subCategoryList)

        const { getObservationsList } = this.getAdminStore().adminPaginationStore
        getObservationsList();

    }
    render() {

        const {
            onClickAdminDueDate,
            categoryAndSubCategoryList,
            adminPaginationStore

        } = this.getAdminStore()

        const { observationsList,
                limit,totalObservations,
                selectedPage,
                getObservationsListAPIStatus,
                getObservationsListAPIError,
                getObservationsList
            }=adminPaginationStore
            
        const roleType = getRoleType();
        // if (this.props.history.location.state) {
        //     this.roleType = this.props.history.location.state.roleType;
        // }
        // else {
            this.roleType = 'admin';
        // }
        return (
            <AdminObservationsList  totalObservationsList={observationsList}
                                    onClickDueDate={onClickAdminDueDate}
                                    onClickAdminObservationCell={this.onClickAdminObservationCell}
                                    totalPages={totalObservations/limit} 
                                    getTotalObservationsAPIStatus={getObservationsListAPIStatus}
                                    getTotalObservationsAPIError={getObservationsListAPIError}
                                    getTotalObservationsList={getObservationsList}
                                    categoryAndSubCategoryList={categoryAndSubCategoryList}
                                    roleType={roleType}
                                    onChangeSubCategory={this.onChangeSubCategory}
                                    onChangeCategory={this.onChangeCategory}
                                    onClickSearch={this.onClickSearch}
                                    onChangeAdminFilter={this.onChangeAdminFilter}
                                    adminSelectedPage={selectedPage}
                                    onClickAdminObservationStorePageNumber={this.onClickAdminObservationStorePageNumber}/>
        );
    }
}

export default withRouter(AdminObservationsListRoute);
