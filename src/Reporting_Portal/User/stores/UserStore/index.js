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
import CategoryModel from '../models/CategoryModel';

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
    @observable categoryAndSubCategoryList
    @observable reportedOn
    @observable dueDate
    @observable sortType
    @observable selectedFilter
    @observable userObservationsStorelimit
    @observable userObservationsStoreOffset
    @observable userObservationsStoreTotal
    @observable roleType

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

        this.getCategoryAndSubCategoryListAPIStatus = API_INITIAL;
        this.getCategoryAndSubCategoryListAPIError = null;

        this.observationsListAPIService = observationsListAPI;
        this.singleUserObservationDetails = {};
        this.observationsList = [];
        this.categoryAndSubCategoryList = [];
        this.selectedFilter = [];
        this.sortType = 'latestReported';
        this.totalObservationsListSortType = 'Latest';
        this.userObservationsStoreLimit = 8;
        this.userObservationsStoreOffset = 1;
        this.userObservationsStoreTotal = 0;
    }

    //---------------------------------------->API Call For Observation List And Its Methods<---------------------------

    @action.bound
    getObservationsList() {

        const objectToGetObservationsList = {
            sort_type: this.sortType,
            filter_list: this.selectedFilter
        };
        const observationsPromise = this.observationsListAPIService.getObservationsListAPI(this.userObservationsStoreLimit, this.userObservationsStoreOffset, objectToGetObservationsList);

        return bindPromiseWithOnSuccess(observationsPromise)
            .to(this.setObservationsListAPIStatus, this.setObservationsListAPIResponse)
            .catch((error) => {
                this.getObservationsListAPIError = error;

            });
    }

    @action.bound
    setObservationsListAPIResponse(observationsListResponse) {
        this.userObservationsStoreTotal = observationsListResponse.total;

        this.observationsList = observationsListResponse.observations.map((eachObservation) => {
            console.log(eachObservation)

            return new UserModel(eachObservation);
        });
        // console.log(this.observationsList, ">>>>User Response")
    }

    @action.bound
    setObservationsListAPIStatus(apiStatus) {
        this.getObservationsListAPIStatus = apiStatus;
    }

    //------------------------------------------>API Call For Create A Observation And Its Methods<-----------------------------

    @action
    onClickSubmit = async(objectToCreateObservation) => {

        const reportingObservationPromise = this.observationsListAPIService.createReportedObservation(objectToCreateObservation);
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

    //---------------------------------------------->API Call For Category List And Sub Category List<---------------------

    @action
    getCategoryAndSubCategoryList = async() => {
        const categoryAndSubCategoryListPromise = this.observationsListAPIService.getCategoryAndSubCategoryList();
        await bindPromiseWithOnSuccess(categoryAndSubCategoryListPromise)
            .to(this.setCategoryAndSubCategoryListAPIStatus, this.setCategoryAndSubCategoryListAPIResponse)
            .catch(this.setCategoryAndSubCategoryListAPIError);
    }
    @action.bound
    setCategoryAndSubCategoryListAPIResponse(categoryAndSubCategoryListResponse) {

        this.categoryAndSubCategoryList = categoryAndSubCategoryListResponse.categories.map((eachCategory) => {
            return new CategoryModel(eachCategory);
        });
    }

    @action.bound
    setCategoryAndSubCategoryListAPIError(error) {
        this.getCategoryAndSubCategoryListAPIError = error;
    }

    @action.bound
    setCategoryAndSubCategoryListAPIStatus(apiStatus) {
        this.getCategoryAndSubCategoryListAPIStatus = apiStatus;
    }



    //----------------------------------------------->API Call For Display Single Observation<-------------------------------

    @action
    getSingleUserObservationDetails = async(observationId, type) => { //Check it once
        const objectToGetSingleObsesrvation = {
            observation_id: observationId,
            user_type: type
        };
        const singleUserObservationPromise = this.observationsListAPIService.getSingleUserObservationsDetails(objectToGetSingleObsesrvation);
        await bindPromiseWithOnSuccess(singleUserObservationPromise)
            .to(this.setSingleUserObservationAPIStatus, this.setSingleUserObservationAPIResponse)
            .catch(this.setSingleUserObservationAPIError);

    }
    @action.bound
    setSingleUserObservationAPIResponse(singleUserObservationResponse) {
        this.singleUserObservationDetails = new UserModel(singleUserObservationResponse); //Check It Once
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
            this.totalObservationsListSortType = 'Oldest'; //keep constant
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
        this.selectedFilter.push(selectedFilter);
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickUserObservationStorePageNumber(pageNumber) {
        this.userObservationsStoreOffset = parseInt(pageNumber) * this.userObservationsStoreLimit;
        this.getObservationsList();
    }

    @action.bound
    changeRoleType(type) {
        alert(type)
        this.roleType = type;
    }
}

export default UserStore;
