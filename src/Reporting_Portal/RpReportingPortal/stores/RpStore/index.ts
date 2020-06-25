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
// import PaginationStore from '../../../../common/stores/PaginationStore'

import RpService from '../../services/RpService/index.fixtures'

import RpModel from '../models/RpModel';

import {RpModelType} from '../types'

class RpStore extends UserStore {

    @observable getAssignedObservationsListAPIStatus!:number;
    @observable getAssignedObservationsListAPIError!:null|string;

    @observable assignedObservationsAPIService!:RpService;

    @observable assignedObservationsList!:Array<RpModelType>;
    @observable rpSelectedFilter!:string;
    @observable sortType!:string;
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

        this.assignedObservationsAPIService = updatedObservationAndAssignedObservationsAPI;
        // this.rpPaginationStore = new PaginationStore()

        this.assignedObservationsList = [];
        this.rpSelectedFilter = '';
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
        const assignedObservationsPromise = this.assignedObservationsAPIService.getAssignedObservationsListAPI(this.assignedObservationsLimit, this.assignedObservationsOffset, objectToGetAssignedObservationsList);
        await bindPromiseWithOnSuccess(assignedObservationsPromise)
            .to(this.setAssignedObservationsListAPIStatus, (response: any)=>{this.setAssignedObservationsListAPIResponse(response)})
            .catch(this.setAssignedObservationsListAPIError);
    }

    @action.bound
    setAssignedObservationsListAPIResponse(assignedObservationsListResponse: { total: number; observations:Array<RpModelType>; }) {

        this.totalAssignedObservations = assignedObservationsListResponse.total;
        this.assignedObservationsList = assignedObservationsListResponse.observations.map((eachObservation: any) => new RpModel(eachObservation));
    }

    @action.bound
    setAssignedObservationsListAPIError(error: string | null) {
        this.getAssignedObservationsListAPIError = error;
    }

    @action.bound
    setAssignedObservationsListAPIStatus(apiStatus: number) {
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
    onChangeRpFilter(selectedFilter: { value: string; }) {
        this.rpSelectedFilter = selectedFilter.value;
        this.getAssignedObservationsList();
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickAssignedObservationsPageNumber(pageNumber: string ) {
        this.assignedObservationsOffset = parseInt(pageNumber) * Number(this.assignedObservationsLimit);
        if (this.assignedObservationsOffset === 0) {
            this.assignedObservationsOffset = 1;
        }
        this.getAssignedObservationsList();
        this.rpSelectedPage = parseInt(pageNumber);
    }

}

export default RpStore;
