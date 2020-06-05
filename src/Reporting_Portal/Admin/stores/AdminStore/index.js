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
import AdminModel from '../models/AdminModel';

class AdminStore extends RpStore {

    @observable getTotalObservationsAPIStatus;
    @observable getTotalObservationsAPIError;

    @observable totalObservationsAPIService;
    @observable totalObservationsList;
    @observable adminSelectedFilter;
    @observable dueDateSortType
    @observable category
    @observable subCategory
    @observable totalObservationsOffset;
    @observable totalObservationsLimit;
    @observable totalObservations;

    constructor(toatlObservationsAPI, rpObservationsService, userObservationsService) {
        super(rpObservationsService, userObservationsService);
        this.initAdminStore(toatlObservationsAPI);
    }

    @action.bound
    initAdminStore(toatlObservationsAPI) {

        this.getTotalObservationsAPIStatus = API_INITIAL;
        this.getTotalObservationsAPIError = null;

        this.totalObservationsAPIService = toatlObservationsAPI;

        this.totalObservationsList = [];
        this.adminSelectedFilter = 'All';
        this.category = [];
        this.subCategory = [];
        this.dueDateSortType = "latestDueDate";
        this.totalObservationsLimit = 8;
        this.totalObservationsOffset = 0;
        this.totalObservations = 0;
    }

    //------------------------------------------>API Call To Get Total Observations<------------------------

    @action
    getTotalObservationsList = async() => {


        const objectToGetTotalObservationsList = {
            sort_type: this.dueDateSortType,
            filter_list: this.AdminSelectedFilter
        };

        const totalObservationsPromise = this.totalObservationsAPIService.getTotalObservationsListAPI(objectToGetTotalObservationsList);

        await bindPromiseWithOnSuccess(totalObservationsPromise)
            .to(this.setTotalObservationsListAPIStatus, this.setTotalObservationsListAPIResponse)
            .catch(this.setTotalObservationsListAPIError);
        this.getCategoryAndSubCategoryList();
    }

    @action.bound
    setTotalObservationsListAPIResponse(totalObservationsListResponse) {
        this.totalObservationsList = totalObservationsListResponse.observations.map((eachObservation) => new AdminModel(eachObservation));
    }

    @action.bound
    setTotalObservationsListAPIError(error) {
        this.getTotalObservationsListAPIError = error;
    }

    @action.bound
    setTotalObservationsListAPIStatus(apiStatus) {
        this.getTotalObservationsAPIStatus = apiStatus;
    }

    //-------------------------------------->Methods For Filter The Observations List<-------------------------------

    @action.bound
    onClickDueDate() {
        if (this.dueDateSortType === "latestDueDate") {
            this.dueDateSortType = "oldestDueDate";
        }
        else {
            this.dueDateSortType = "latestDueDate";
        }
    }

    @action.bound
    onChangeAdminFilter(selectedFilter) {
        this.adminSelectedFilter = selectedFilter;
    }

    @action.bound
    onChangeAdminSubCategory(selectedOption) {
        this.category.push(selectedOption);
    }

    @action.bound
    onChangeAdminCategory(selectedOption) {
        this.category.push(selectedOption);
    }

    //------------------------------------------->Methods For Pagination<-----------------------------------------

    @action.bound
    onClickAdminObservationsPageNumber(pageNumber) {
        this.totalObservationsOffset = parseInt(pageNumber) * this.totalObservationsLimit;
        this.getTotalObservationsList();
    }
}

export default AdminStore;
