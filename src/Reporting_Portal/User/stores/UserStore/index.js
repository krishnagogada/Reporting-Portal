import React from 'react';
import { observable, action } from 'mobx';
import {
    API_INITIAL,
    API_FETCHING,
    API_SUCCESS,
    API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

import UserModel from '../models/UserModel/index.js';

class UserStore {

    @observable getObservationsListAPIStatus
    @observable getObservationsListAPIError

    @observable getReportedObservationAPIStatus
    @observable getReportedObservationAPIError

    @observable getSingleUserObservationAPIStatus
    @observable getSingleUserObservationAPIError

    @observable observationsListAPIService
    @observable singleUserObservationDetails
    @observable observationsList
    @observable categoryList
    @observable subCategoryList
    @observable severityList
    @observable filterList
    @observable reportedOn
    @observable dueDate
    @observable sortType
    @observable selectedFilter
    @observable userObservationsStorelimit
    @observable userObservationsStoreOffset
    @observable userObservationsStoreTotal

    constructor(observationsListAPI) {
        this.initUserStore(observationsListAPI);
    }

    @action.bound
    initUserStore(observationsListAPI) {

        this.getObservationsListAPIStatus = API_INITIAL;
        this.getObservationsListAPIError = null;

        this.getReportedObservationAPIStatus = API_INITIAL;
        this.getReportedObservationAPIError = null;

        this.getSingleUserObservationAPIStatus = API_INITIAL;
        this.getSingleUserObservationAPIError = null;

        this.observationsListAPIService = observationsListAPI;
        this.singleUserObservationDetails = {};
        this.observationsList = [];
        this.categoryList = [];
        this.subCategoryList = [];
        this.severityList = [];
        this.filterList = [];
        this.selectedFilter = 'All';
        this.sortType = 'LatestReported';
        this.totalObservationsListSortType = 'Latest';
        this.userObservationsStoreLimit = 8;
        this.userObservationsStoreOffset = 0;
        this.userObservationsStoreTotal = 0;
    }

    //---------------------------------------->API Call For Observation List And Its Methods<---------------------------

    @action.bound
    getObservationsList() {

        const objectToGetObservationsList = {
            sort_type: this.sortType,
            selected_filter: this.selectedFilter
        };
        const observationsPromise = this.observationsListAPIService.getObservationsListAPI(this.limit, this.offset, objectToGetObservationsList);

        return bindPromiseWithOnSuccess(observationsPromise)
            .to(this.setObservationsListAPIStatus, this.setObservationsListAPIResponse)
            .catch((error) => { this.getObservationsListAPIError = error; });
    }

    @action.bound
    setObservationsListAPIResponse(observationsListResponse) {

        this.userObservationsStoreTotal = observationsListResponse.total;
        this.categoryList = observationsListResponse.category;
        this.subCategoryList = observationsListResponse.sub_category;
        this.severityList = observationsListResponse.severity;
        this.filterList = observationsListResponse.filter;

        this.observationsList = observationsListResponse.observations.slice(this.userObservationsStoreOffset, this.userObservationsStoreOffset + this.userObservationsStoreLimit).map((eachObservation) => {

            return new UserModel(eachObservation);
        });
    }

    @action.bound
    setObservationsListAPIStatus(apiStatus) {
        this.getObservationsListAPIStatus = apiStatus;
    }

    //------------------------------------------>API Call For Create A Observation And Its Methods<-----------------------------

    @action
    onClickSubmit = async(reportingObservationObject) => {

        const reportingObservationPromise = this.observationsListAPIService.createReportedObservation(reportingObservationObject);
        await bindPromiseWithOnSuccess(reportingObservationPromise)
            .to(this.setReportedObservationAPIStatus, this.setReportedObservationAPIResponse)
            .catch(this.setReportedObservationAPIError);

    }
    @action.bound
    setReportedObservationAPIResponse(observationsListResponse) {
        // console.log(observationsListResponse, "yes i agian did it");
    }

    @action.bound
    setObservationsListAPIError(error) {
        this.getReportedObservationAPIError = error;
    }

    @action.bound
    setReportedObservationAPIStatus(apiStatus) {
        this.getReportedObservationAPIStatus = apiStatus;
    }

    //----------------------------------------------->API Call For Display Single Observation<-------------------------------

    @action
    getSingleUserObservationDetails = async(userId, observationId, type) => {
        const objectToGetSingleObsesrvation = {
            user_id: userId,
            observationId: observationId,
            type: type
        };
        const singleUserObservationPromise = this.observationsListAPIService.getSingleUserObservationsDetails(objectToGetSingleObsesrvation);
        await bindPromiseWithOnSuccess(singleUserObservationPromise)
            .to(this.setSingleUserObservationAPIStatus, this.setSingleUserObservationAPIResponse)
            .catch(this.setSingleUserObservationAPIError);

    }
    @action.bound
    setSingleUserObservationAPIResponse(singleUserObservationResponse) {
        this.singleUserObservationDetails = new UserModel(singleUserObservationResponse);
    }

    @action.bound
    setSingleUserObservationAPIError(error) {
        this.getSingleUserObservationAPIError = error;
    }

    @action.bound
    setSingleUserObservationAPIStatus(apiStatus) {
        this.getSingleUserObservationAPIStatus = apiStatus;
    }

    //----------------------------------------------->Methods For Filter The Observations List<-------------------------------

    @action.bound
    onClickUserObservationStoreReportedOn() {

        if (this.totalObservationsListSortType === 'Latest') {
            this.sortType = 'latestReported';
            this.totalObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'oldestReported';
            this.totalObservationsListSortType = 'Latest';
        }
    }

    @action.bound
    onClickUserObservationStoreDueDate() {
        if (this.totalObservationsListSortType === 'Latest') {
            this.sortType = 'latestDueDate';
            this.totalObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'oldestDueDate';
            this.totalObservationsListSortType = 'Latest';
        }
    }
    @action.bound
    onChangeUserFilter(selectedFilter) {
        this.selectedFilter = selectedFilter;
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickUserObservationStorePageNumber(pageNumber) {
        this.userObservationsStoreOffset = parseInt(pageNumber) * this.userObservationsStoreLimit;
        console.log(this.userObservationsStoreOffset, ">>>>User Store")
        this.getObservationsList();
    }

}

export default UserStore;
