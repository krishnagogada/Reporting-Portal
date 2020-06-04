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

import UserStore from '../../../User/stores/UserStore';
import RpModel from '../models/RpModel';

class RpStore extends UserStore {

    @observable getUpdatedObservationAPIStatus;
    @observable getUpdatedObservationAPIError;

    @observable getAssignedObservationsListAPIStatus;
    @observable getAssignedObservationsListAPIError;

    @observable updatedObservationAPIService;
    @observable assignedObservationsList;
    @observable rpFilterList;
    @observable rpSelectedFilter;
    @observable status;
    @observable assignedTo;
    @observable sortType;
    @observable allObservationsListSortType;
    @observable assignedObservationsOffset;
    @observable assignedObservationsLimit;
    @observable totalAssignedObservations;

    constructor(updatedObservationAndAssignedObservationsAPI, userObservationsService) {
        super(userObservationsService);
        this.initRpStore(updatedObservationAndAssignedObservationsAPI);
    }

    @action.bound
    initRpStore(updatedObservationAndAssignedObservationsAPI) {

        this.getUpdatedObservationAPIStatus = API_INITIAL;
        this.getUpdatedObservationAPIError = null;

        this.getAssignedObservationsListAPIStatus = API_INITIAL;
        this.getAssignedObservationsListAPIError = null;

        this.updatedObservationAndAssignedObservationsAPIService = updatedObservationAndAssignedObservationsAPI;

        this.assignedObservationsList = [];
        this.rpFilterList = [];
        this.rpSelectedFilter = 'All';
        this.status = [];
        this.sortType = 'LatestReported';
        this.allObservationsListSortType = 'Latest';
        this.assignedObservationsLimit = 8;
        this.assignedObservationsOffset = 0;
        this.totalAssignedObservations = 0;
    }

    //----------------------------------------->Update The Observation<---------------------------------

    @action
    updateObservation = async(objectToUpdateObservation) => {

        const observationsUpdatePromise = this.updatedObservationAndAssignedObservationsAPIService.updateAssignedObservationAPI(objectToUpdateObservation);
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

    //----------------------------------------------------->API Call To Get Assigned Observations<------------------------

    @action
    getAssignedObservationsList = async() => {

        const objectToGetAssignedObservationsList = {
            sort_type: this.sortType,
            filter_list: this.rpSelectedFilter
        };
        const assignedObservationsPromise = this.updatedObservationAndAssignedObservationsAPIService.getAssignedObservationsListAPI(objectToGetAssignedObservationsList);

        await bindPromiseWithOnSuccess(assignedObservationsPromise)
            .to(this.setAssignedObservationsListAPIStatus, this.setAssignedObservationsListAPIResponse)
            .catch(this.setAssignedObservationsListAPIError);
    }

    @action.bound
    setAssignedObservationsListAPIResponse(assignedObservationsListResponse) {

        this.totalAssignedObservations = assignedObservationsListResponse.total;
        this.status = assignedObservationsListResponse.status;
        this.rpFilterList = assignedObservationsListResponse.filter;
        this.assignedTo = assignedObservationsListResponse.assigned_to;
        this.assignedObservationsList = assignedObservationsListResponse.observations.slice(this.assignedObservationsOffset, this.assignedObservationsOffset + this.assignedObservationsLimit).map((eachObservation) => new RpModel(eachObservation));
    }

    @action.bound
    setAssignedObservationsListAPIError(error) {
        this.getAssignedObservationsListAPIError = error;
    }

    @action.bound
    setAssignedObservationsListAPIStatus(apiStatus) {
        this.getAssignedObservationsListAPIStatus = apiStatus;
    }

    //----------------------------------------------->Methods For Filter The Observations List<-------------------------------

    @action.bound
    onClickAssignedObservationsReportedOn() {

        if (this.allObservationsListSortType === 'Latest') {
            this.sortType = 'latestReported';
            this.allObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'oldestReported';
            this.allObservationsListSortType = 'Latest';
        }
    }

    @action.bound
    onClickAssignedObservationsDueDate() {
        if (this.allObservationsListSortType === 'Latest') {
            this.sortType = 'latestDueDate';
            this.allObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'oldestDueDate';
            this.allObservationsListSortType = 'Latest';
        }
    }
    @action.bound
    onChangeRpFilter(selectedFilter) {
        this.rpSelectedFilter = selectedFilter;
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickAssignedObservationsPageNumber(pageNumber) {
        this.assignedObservationsOffset = parseInt(pageNumber) * this.assignedObservationsLimit;
        this.getAssignedObservationsList();
    }

}

export default RpStore;
