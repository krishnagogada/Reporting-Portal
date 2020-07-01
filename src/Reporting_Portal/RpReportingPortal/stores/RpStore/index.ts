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
import UserService from '../../../User/services/UserService/index.fixtures'
import PaginationStore from '../../../../common/stores/PaginationStore'

import RpService from '../../services/RpService/index.fixtures'

import RpModel from '../models/RpModel';

import {RpModelType} from '../types'

class RpStore extends UserStore {

    @observable getAssignedObservationsListAPIStatus!:number;
    @observable getAssignedObservationsListAPIError!:null|string;

    @observable assignedObservationsAPIService!:RpService;
    @observable rpPaginationStore!:PaginationStore

    @observable objectToGetAssignedObservationsList
    @observable assignedObservationsList!:Array<RpModelType>;
    @observable rpSelectedFilter!:string;
    @observable rpSortType!:string;
    @observable assignedObservationsListSortType!:string;
    @observable assignedObservationsOffset!:number;
    @observable assignedObservationsLimit!:number;
    @observable totalAssignedObservations!:number;
    @observable rpSelectedPage!:number

    constructor(assignedObservationsAPI:RpService, userObservationsService:UserService) {
        super(userObservationsService);
        this.initRpStore(assignedObservationsAPI);
    }

    @action.bound
    initRpStore(updatedObservationAndAssignedObservationsAPI: RpService) {

        this.getAssignedObservationsListAPIStatus = API_INITIAL;
        this.getAssignedObservationsListAPIError = null;

        this.rpSortType = 'latestReported';
        this.rpSelectedFilter = '';
        this.objectToGetAssignedObservationsList = {
            sort_type: this.rpSortType,
            status_filter: this.rpSelectedFilter
        }

        this.assignedObservationsAPIService = updatedObservationAndAssignedObservationsAPI;
        this.rpPaginationStore = new PaginationStore(this.assignedObservationsAPIService.getAssignedObservationsListAPI,RpModel,this.objectToGetAssignedObservationsList)

        this.assignedObservationsList = [];
        this.assignedObservationsListSortType = 'Latest';
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
        this.setRpFiltersOrSortingType();
        this.rpPaginationStore.onChangeFilterOrSortingType(this.objectToGetAssignedObservationsList)
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
        this.setRpFiltersOrSortingType();
        this.rpPaginationStore.onChangeFilterOrSortingType(this.objectToGetAssignedObservationsList)
    }
    @action.bound
    onChangeRpFilter(selectedFilter: { value: string; }) {
        this.rpSelectedFilter = selectedFilter.value;
        this.setRpFiltersOrSortingType();
        this.rpPaginationStore.onChangeFilterOrSortingType(this.objectToGetAssignedObservationsList)
    }

    @action.bound
    setRpFiltersOrSortingType(){
        this.objectToGetAssignedObservationsList = {
            sort_type: this.rpSortType,
            status_filter: this.rpSelectedFilter
        }
    }
  
}

export default RpStore;
