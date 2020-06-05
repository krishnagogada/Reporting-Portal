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
import SingleObservationModel from '../models/SingleObservationModel';

class UserStore {

    @observable getObservationsListAPIStatus
    @observable getObservationsListAPIError

    @observable getReportedObservationAPIStatus
    @observable getReportedObservationAPIError

    @observable getSingleUserObservationAPIStatus
    @observable getSingleUserObservationAPIError

    @observable getUpdatedObservationAPIStatus;
    @observable getUpdatedObservationAPIError;

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
    @observable selectedObservationId
    @observable selectedPage

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

        this.getUpdatedObservationAPIStatus = API_INITIAL;
        this.getUpdatedObservationAPIError = null;

        this.observationsListAPIService = observationsListAPI;
        this.singleUserObservationDetails = {};
        this.observationsList = [];
        this.categoryAndSubCategoryList = [];
        this.selectedFilter = '';
        this.sortType = 'latestReported';
        this.totalObservationsListSortType = 'Latest';
        this.userObservationsStoreLimit = 8;
        this.userObservationsStoreOffset = 1;
        this.userObservationsStoreTotal = 0;
        this.selectedObservationId = 0;
        this.selectedPage = 0;
    }

    //---------------------------------------->API Call For Observation List And Its Methods<---------------------------

    @action.bound
    getObservationsList() {

        const objectToGetObservationsList = {
            sort_type: this.sortType,
            status_filter: this.selectedFilter
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
    }

    @action.bound
    setObservationsListAPIStatus(apiStatus) {
        this.getObservationsListAPIStatus = apiStatus;
    }

    //----------------------------------------->API Call For Create A Observation And Its Methods<-----------------------------

    @action
    onClickSubmit = async(objectToCreateObservation) => {
        console.log(objectToCreateObservation, ">>>>>>Create User");
        const reportingObservationPromise = this.observationsListAPIService.createReportedObservation(objectToCreateObservation);
        await bindPromiseWithOnSuccess(reportingObservationPromise)
            .to(this.setReportedObservationAPIStatus, this.setReportedObservationAPIResponse)
            .catch(this.setReportedObservationAPIError);

    }
    @action.bound
    setReportedObservationAPIResponse(observationsListResponse) {}

    @action.bound
    setObservationsListAPIError(error) {
        this.getReportedObservationAPIError = error;
    }

    @action.bound
    setReportedObservationAPIStatus(apiStatus) {
        this.getReportedObservationAPIStatus = apiStatus;
    }

    //---------------------------------------->API Call For Category List And Sub Category List<---------------------

    @action
    getCategoryAndSubCategoryList = async() => {
        const categoryAndSubCategoryListPromise = this.observationsListAPIService.getCategoryAndSubCategoryList();
        await bindPromiseWithOnSuccess(categoryAndSubCategoryListPromise)
            .to(this.setCategoryAndSubCategoryListAPIStatus, this.setCategoryAndSubCategoryListAPIResponse)
            .catch(this.setCategoryAndSubCategoryListAPIError);
    }
    @action.bound
    setCategoryAndSubCategoryListAPIResponse(categoryAndSubCategoryListResponse) {
        this.categoryAndSubCategoryList = categoryAndSubCategoryListResponse.map((eachCategory) => {
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

    //------------------------------------------>API Call For Display Single Observation<-------------------------------

    @action
    getSingleUserObservationDetails = async(observationId) => {
        console.log(observationId);
        const singleUserObservationPromise = this.observationsListAPIService.getSingleUserObservationsDetails(observationId);
        await bindPromiseWithOnSuccess(singleUserObservationPromise)
            .to(this.setSingleUserObservationAPIStatus, this.setSingleUserObservationAPIResponse)
            .catch(this.setSingleUserObservationAPIError);

    }
    @action.bound
    setSingleUserObservationAPIResponse(singleUserObservationResponse) {
        this.singleUserObservationDetails = new SingleObservationModel(singleUserObservationResponse);
    }

    @action.bound
    setSingleUserObservationAPIError(error) {
        console.log(error, ">>>>>>observationErrror")
        this.getSingleUserObservationAPIError = error;
    }

    @action.bound
    setSingleUserObservationAPIStatus(apiStatus) {
        this.getSingleUserObservationAPIStatus = apiStatus;
    }

    //----------------------------------------->Update The Observation<---------------------------------

    @action
    updateObservation = async(objectToUpdateObservation, observationId) => {
        const observationsUpdatePromise = this.observationsListAPIService.updateAssignedObservationAPI(objectToUpdateObservation, observationId);
        await bindPromiseWithOnSuccess(observationsUpdatePromise)
            .to(this.setUpdatedObservationAPIStatus, this.setUpdatedObservationAPIResponse)
            .catch(this.setUpdatedObservationAPIError);
    }

    @action.bound
    setUpdatedObservationAPIResponse(updatedResponse) {}

    @action.bound
    setUpdatedObservationAPIError(error) {
        this.getUpdatedObservationAPIError = error;
    }

    @action.bound
    setUpdatedObservationAPIStatus(apiStatus) {
        this.getUpdatedObservationAPIStatus = apiStatus;
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
        this.getObservationsList()
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
        this.getObservationsList()
    }
    @action.bound
    onChangeUserFilter(selectedFilter) {
        this.selectedFilter = selectedFilter;
        this.getObservationsList()
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickUserObservationStorePageNumber(pageNumber) {
        console.log(pageNumber, ">>>> userStore ");
        this.userObservationsStoreOffset = parseInt(pageNumber) * this.userObservationsStoreLimit;
        if (this.userObservationsStoreOffset === 0) {
            this.userObservationsStoreOffset = 1;
        }
        this.getObservationsList();
        this.selectedPage = pageNumber;
    }

}

export default UserStore;
