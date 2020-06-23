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

// import PaginationStore from '../../../../common/stores/PaginationStore'
import AdminService from '../../services/AdminService/index.fixtures'

import AdminModel from '../models/AdminModel';

export type adminModelType={
    title:string
    reportedByName:string
    observationId:number
    reportedByMobileNumber:number
    reportedByProfileUrl:string
    reportedByUserId:number
    assignedToName:string
    assignedToMobileNumber:number
    assignedToProfileUrl:string
    assignedToUserId:number
    assignedToId:number
    severity:string
    status:string
    dueDate:string
}

class AdminStore extends RpStore {

    @observable getTotalObservationsAPIStatus!:number;
    @observable getTotalObservationsAPIError!:null|string;

    @observable totalObservationsAPIService!:AdminService;
    // @observable adminPaginationStore;

    @observable totalObservationsList!:Array<adminModelType>
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

        this.totalObservationsAPIService = totalObservationsAPI;
        // this.adminPaginationStore = new PaginationStore();

        this.totalObservationsList = [];
        this.adminSelectedFilter = 'REPORTED';
        this.categories = [];
        this.subCategories = [];
        this.dueDateSortType = "latestDueDate";
        this.totalObservationsLimit = 8;
        this.totalObservationsOffset = 0;
        this.totalObservations = 0;
        this.adminSelectedPage = 0;
    }

    //------------------------------------------>API Call To Get Total Observations<------------------------

    @action
    getTotalObservationsList = async() => {

        const objectToGetTotalObservationsList = {
            sort_type: this.dueDateSortType,
            status_filter: this.adminSelectedFilter,
            category_filters: this.categories,
            sub_category_filters: this.subCategories
        };
        const totalObservationsPromise = this.totalObservationsAPIService.getTotalObservationsListAPI(this.totalObservationsLimit, this.totalObservationsOffset, objectToGetTotalObservationsList);

        await bindPromiseWithOnSuccess(totalObservationsPromise)
            .to(this.setTotalObservationsListAPIStatus,(response:any)=>{ this.setTotalObservationsListAPIResponse(response)})
            .catch(this.setTotalObservationsListAPIError);
        this.getCategoryAndSubCategoryList();
    }

    @action.bound
    setTotalObservationsListAPIResponse(totalObservationsListResponse: { total: number; observations: Array<adminModelType>; }) {
        this.totalObservations = totalObservationsListResponse.total;
        this.totalObservationsList = totalObservationsListResponse.observations.map((eachObservation) => new AdminModel(eachObservation));
    }

    @action.bound
    setTotalObservationsListAPIError(error: string | null) {
        this.getTotalObservationsAPIError = error;
    }

    @action.bound
    setTotalObservationsListAPIStatus(apiStatus: number) {
        this.getTotalObservationsAPIStatus = apiStatus;
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
    }

    @action.bound
    onChangeAdminFilter(selectedFilter: string) {
        if (selectedFilter !== 'ALL') {
            this.adminSelectedFilter = selectedFilter;
        }
        else {
            this.adminSelectedFilter = '';
        }
    }

    @action.bound
    onChangeAdminSubCategory(selectedOption: Array<number>) {
        this.subCategories = selectedOption;
    }

    @action.bound
    onChangeAdminCategory(selectedOption: Array<number>) {
        this.categories = selectedOption;
    }

    //------------------------------------------->Methods For Pagination<-----------------------------------------

    @action.bound
    onClickAdminObservationStorePageNumber(pageNumber: string ) {
        this.totalObservationsOffset = parseInt(pageNumber) * this.totalObservationsLimit;
        this.getTotalObservationsList();
        this.adminSelectedPage = parseInt(pageNumber);
    }
}

export default AdminStore;
