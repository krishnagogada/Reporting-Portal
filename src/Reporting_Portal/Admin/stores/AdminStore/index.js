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
    @observable categories
    @observable subCategories
    @observable totalObservationsOffset;
    @observable totalObservationsLimit;
    @observable totalObservations;
    @observable adminSelectedPage;

    constructor(totalObservationsAPI, rpObservationsService, userObservationsService) {
        super(rpObservationsService, userObservationsService);
        this.initAdminStore(totalObservationsAPI);
    }

    @action.bound
    initAdminStore(totalObservationsAPI) {
        this.getTotalObservationsAPIStatus = API_INITIAL;
        this.getTotalObservationsAPIError = null;

        this.totalObservationsAPIService = totalObservationsAPI;

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
            .to(this.setTotalObservationsListAPIStatus, this.setTotalObservationsListAPIResponse)
            .catch(this.setTotalObservationsListAPIError);
        this.getCategoryAndSubCategoryList();
    }

    @action.bound
    setTotalObservationsListAPIResponse(totalObservationsListResponse) {
        this.totalObservations = totalObservationsListResponse.total;
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
    onClickAdminDueDate() {
        if (this.dueDateSortType === "latestDueDate") {
            this.dueDateSortType = "oldestDueDate";
        }
        else {
            this.dueDateSortType = "latestDueDate";
        }
    }

    @action.bound
    onChangeAdminFilter(selectedFilter) {
        if (selectedFilter !== 'ALL') {
            this.adminSelectedFilter = selectedFilter;
        }
        else {
            this.adminSelectedFilter = '';
        }
    }

    @action.bound
    onChangeAdminSubCategory(selectedOption) {
        this.subCategories = selectedOption;
    }

    @action.bound
    onChangeAdminCategory(selectedOption) {
        this.categories = selectedOption;
    }

    //------------------------------------------->Methods For Pagination<-----------------------------------------

    @action.bound
    onClickAdminObservationStorePageNumber(pageNumber) {
        this.totalObservationsOffset = parseInt(pageNumber) * this.totalObservationsLimit;
        this.getTotalObservationsList();
        this.adminSelectedPage = pageNumber;
    }
}

export default AdminStore;
