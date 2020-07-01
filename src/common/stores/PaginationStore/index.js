import React from 'react';
import {observable,action,computed, ObservableMap} from 'mobx';
import {
    API_INITIAL,
    API_FETCHING,
    API_SUCCESS,
    API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

class PaginationStore {

    @observable getObservationsListAPIStatus
    @observable getObservationsListAPIError
    @observable observationListServiceMethod
    @observable filterAndSortingTypeObject
    @observable offset;
    @observable limit;
    @observable selectedPage;
    @observable totalObservations;
    @observable observationsList;
    @observable model;

    constructor(observationListServiceMethod,Model,filterAndSortingTypeObject){
        this.init(observationListServiceMethod,Model,filterAndSortingTypeObject);
    }

    @action.bound
    init(observationListServiceMethod,Model,filterAndSortingTypeObject){

        this.getObservationsListAPIStatus=API_INITIAL;
        this.getObservationsListAPIError=null;

        this.observationListServiceMethod=observationListServiceMethod
        this.filterAndSortingTypeObject=filterAndSortingTypeObject

        this.offset=0;
        this.limit=8;
        this.selectedPage=0;
        this.totalObservations=0;
        this.observationsList=[];
        this.model=Model;
    }
    
    @action.bound
    getObservationsList=async()=>{
        const observationsPromise = this.observationListServiceMethod(this.limit, this.offset, this.filterAndSortingTypeObject);
        
        await bindPromiseWithOnSuccess(observationsPromise)
        .to(this.setObservationsListAPIStatus, this.setObservationsListAPIResponse)
            .catch((error) => {
                this.getObservationsListAPIError = error;
            });
    }

    @action.bound
    setObservationsListAPIResponse(observationsListResponse) {
        this.totalObservations = observationsListResponse.total;
        this.observationsList = observationsListResponse.observations.slice(this.offset,this.limit+this.offset).map((eachObservation) => {
            return new this.model(eachObservation);
        });
    }

    @action.bound
    setObservationsListAPIStatus(apiStatus) {
        this.getObservationsListAPIStatus = apiStatus;
    }

    @action.bound
    onClickPageNumber(pageNumber) {
        
        this.offset = parseInt(pageNumber) * this.limit;
        if (this.offset === 0) {
            this.offset = 1;
        }
        this.selectedPage = pageNumber;
        this.getObservationsList()
    }

    @action.bound
    onChangeFilterOrSortingType(filterAndSortingTypeObject){
        this.filterAndSortingTypeObject=filterAndSortingTypeObject
        this.getObservationsList()
    }

}

export default PaginationStore;