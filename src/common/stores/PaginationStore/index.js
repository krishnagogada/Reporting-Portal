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

    @observable offset;
    @observable limit;
    @observable selectedPage;
    @observable totalObservations;
    @observable observationList=new Map();
    @observable model;

    constructor(Model){
        this.init(Model);
    }

    @action.bound
    init(Model){

        this.getObservationsListAPIStatus=API_INITIAL;
        this.getObservationsListAPIError=null;

        this.offset=0;
        this.limit=8;
        this.selectedPage=0;
        this.totalObservations=0;
        this.observationList=[];
        this.model=Model;
    }
    
    @action.bound
    getObservationsList=async(observationListServiceMethod,objectToGetObservationsList)=>{
        
        const observationsPromise = observationListServiceMethod(this.limit, this.offset, objectToGetObservationsList);
        
        await bindPromiseWithOnSuccess(observationsPromise)
        .to(this.setObservationsListAPIStatus, this.setObservationsListAPIResponse)
            .catch((error) => {
                this.getObservationsListAPIError = error;
            });
    }

    @action.bound
    setObservationsListAPIResponse(observationsListResponse) {

        this.totalObservations = observationsListResponse.total;
        this.observationsList = observationsListResponse.observations.map((eachObservation) => {
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
    }

}

export default PaginationStore;