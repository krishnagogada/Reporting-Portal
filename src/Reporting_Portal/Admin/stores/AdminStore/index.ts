import React from 'react';
import { observable, action, computed } from 'mobx';
import {
    API_INITIAL,
    API_FETCHING,
    API_SUCCESS,
    API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

import RpStore from '../../../RpReportingPortal/stores/RpStore';
import UserService from '../../../User/services/UserService/index.fixtures'
import RpService from '../../../RpReportingPortal/services/RpService/index.fixtures'

import PaginationStore from '../../../../common/stores/PaginationStore'
import AdminService from '../../services/AdminService/index.fixtures'

import AdminModel from '../models/AdminModel';
import {AdminModelType} from '../types'

class AdminStore extends RpStore {

    @observable getTotalObservationsAPIStatus!:number;
    @observable getTotalObservationsAPIError!:null|string;

    @observable totalObservationsAPIService!:AdminService;
    @observable adminPaginationStore!:PaginationStore

    @observable objectToGetTotalObservationsList
    @observable totalObservationsList!:Array<AdminModelType>
    @observable adminSelectedFilter!:string
    @observable dueDateSortType!:string
    @observable categories!:Array<number>
    @observable subCategories!:Array<number>
    @observable totalObservationsOffset!:number
    @observable totalObservationsLimit!:number
    @observable totalObservations!:number
    @observable adminSelectedPage!:number

    constructor(totalObservationsAPI:AdminService, rpObservationsService:RpService, userObservationsService:UserService) {
        super(rpObservationsService, userObservationsService);
        this.initAdminStore(totalObservationsAPI);
    }

    @action.bound
    initAdminStore(totalObservationsAPI:AdminService) {
        this.getTotalObservationsAPIStatus = API_INITIAL;
        this.getTotalObservationsAPIError = null;

        this.sortType = 'latestReported';
        this.selectedFilter = '';
        
        this.dueDateSortType = "latestDueDate";
        this.adminSelectedFilter = 'REPORTED';
        this.categories = [];
        this.subCategories = [];
        this.objectToGetTotalObservationsList = {
            sort_type: this.dueDateSortType,
            status_filter: this.adminSelectedFilter,
            category_filters: this.categories,
            sub_category_filters: this.subCategories
        }

        this.totalObservationsAPIService = totalObservationsAPI;
        this.adminPaginationStore = new PaginationStore(this.totalObservationsAPIService.getTotalObservationsListAPI,AdminModel,this.objectToGetTotalObservationsList);

        this.totalObservationsList = [];
    }

    //-------------------------------------->Methods For Filter The Observations List<-------------------------------

    @action.bound
    onClickAdminDueDate() {
        if (this.dueDateSortType === "latestDueDate") {
            this.dueDateSortType = "oldestDueDate";
        }
        else {
            this.dueDateSortType = "latestDueDate";
        }
        this.setAdminFiltersOrSortingType()
        this.adminPaginationStore.onChangeFilterOrSortingType(this.objectToGetTotalObservationsList)
    }

    @action.bound
    onChangeAdminFilter(selectedFilter: string) {
        if (selectedFilter !== 'ALL') {
            this.adminSelectedFilter = selectedFilter;
        }
        else {
            this.adminSelectedFilter = '';
        }
        this.setAdminFiltersOrSortingType()
        this.adminPaginationStore.onChangeFilterOrSortingType(this.objectToGetTotalObservationsList)
    }

    @action.bound
    onChangeAdminSubCategory(selectedOption: Array<number>) {
        this.subCategories = selectedOption;
        this.setAdminFiltersOrSortingType()
        this.adminPaginationStore.onChangeFilterOrSortingType(this.objectToGetTotalObservationsList)
    }

    @action.bound
    onChangeAdminCategory(selectedOption: Array<number>) {
        this.categories = selectedOption;
        this.setAdminFiltersOrSortingType()
        this.adminPaginationStore.onChangeFilterOrSortingType(this.objectToGetTotalObservationsList)
    }

    @action.bound
    setAdminFiltersOrSortingType(){
        this.objectToGetTotalObservationsList = {
            sort_type: this.dueDateSortType,
            status_filter: this.adminSelectedFilter,
            category_filters: this.categories,
            sub_category_filters: this.subCategories
        }
    }
}

export default AdminStore;
