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

    @observable getAssignedObservationsListAPIStatus;
    @observable getAssignedObservationsListAPIError;

    @observable updatedObservationAPIService;
    @observable assignedObservationsList;
    @observable rpFilterList;
    @observable rpSelectedFilter;
    @observable status;
    @observable assignedTo;
    @observable sortType;
    @observable assignedObservationsListSortType;
    @observable assignedObservationsOffset;
    @observable assignedObservationsLimit;
    @observable totalAssignedObservations;
    @observable rpSelectedPage

    constructor(updatedObservationAndAssignedObservationsAPI, userObservationsService) {
        super(userObservationsService);
        this.initRpStore(updatedObservationAndAssignedObservationsAPI);
    }

    @action.bound
    initRpStore(updatedObservationAndAssignedObservationsAPI) {

        this.getAssignedObservationsListAPIStatus = API_INITIAL;
        this.getAssignedObservationsListAPIError = null;

        this.updatedObservationAndAssignedObservationsAPIService = updatedObservationAndAssignedObservationsAPI;

        this.assignedObservationsList = [];
        this.rpSelectedFilter = '';
        this.status = [];
        this.sortType = 'latestReported';
        this.assignedObservationsListSortType = 'Latest';
        this.assignedObservationsLimit = 8;
        this.assignedObservationsOffset = 0;
        this.totalAssignedObservations = 0;
        this.rpSelectedPage = 0;
    }

    //----------------------------------------------------->API Call To Get Assigned Observations<------------------------

    @action
    getAssignedObservationsList = async() => {
        const objectToGetAssignedObservationsList = {
            sort_type: this.sortType,
            status_filter: this.rpSelectedFilter
        };
        const assignedObservationsPromise = this.updatedObservationAndAssignedObservationsAPIService.getAssignedObservationsListAPI(this.assignedObservationsLimit, this.assignedObservationsOffset, objectToGetAssignedObservationsList);
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
        this.assignedObservationsList = assignedObservationsListResponse.observations.map((eachObservation) => new RpModel(eachObservation));
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

        if (this.assignedObservationsListSortType === 'Latest') {
            this.sortType = 'oldestReported';
            this.assignedObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'latestReported';
            this.assignedObservationsListSortType = 'Latest';
        }
        this.getAssignedObservationsList();
    }

    @action.bound
    onClickAssignedObservationsDueDate() {
        if (this.assignedObservationsListSortType === 'Latest') {
            this.sortType = 'oldestDueDate';
            this.assignedObservationsListSortType = 'Oldest';
        }
        else {
            this.sortType = 'latestDueDate';
            this.assignedObservationsListSortType = 'Latest';
        }
        this.getAssignedObservationsList();
    }
    @action.bound
    onChangeRpFilter(selectedFilter) {
        this.rpSelectedFilter = selectedFilter.value;
        this.getAssignedObservationsList();
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickAssignedObservationsPageNumber(pageNumber) {
        this.assignedObservationsOffset = parseInt(pageNumber, 10) * this.assignedObservationsLimit;
        if (this.assignedObservationsOffset === 0) {
            this.assignedObservationsOffset = 1;
        }
        this.getAssignedObservationsList();
        this.rpSelectedPage = pageNumber;
    }

}

export default RpStore;
