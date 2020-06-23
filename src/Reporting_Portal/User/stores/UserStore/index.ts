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

import UserModel from '../models/UserModel/index';
import CategoryModel from '../models/CategoryModel';
import SingleObservationModel from '../models/SingleObservationModel';
import UserService from '../../services/UserService/index.fixtures'

export type userModelType = {
    title:string
    observationId:number
    profilePic:string
    description:string
    reportedOn:string
    personDetails:Object
    username:string
    mobileNumber:number
    severity:string
    status:string
    dueDate:string
}

export type singleObservationModelType= {

    title:string
    observationId:number
    description:string
    reportedOn:string
    assignedToPersonId:number
    assignedToPersonName:string
    severity:string
    status:string
    dueDate:string
    category:Object
    subCategory:Object
    categoryName:string
    subCategoryName:string
    categoryId:number
    subCategoryId:number
    attachments:Array<string>

}
export type subCategoryType={
    subCategoryName:string
    subCategoryId:number
    rpUsername:string
    rpUserId:number
}

export type categoryType={
    categoryName:string
    categoryId:number
    subCategories:Array<subCategoryType>
}

export type reportingObservationObjectType={
    title: string
    category_id: number,
    sub_category_id: number,
    severity: string,
    description: string,
    attachments: Array<string>
}

class UserStore {

    @observable getObservationsListAPIStatus!: number
    @observable getObservationsListAPIError!: null|string

    @observable getReportedObservationAPIStatus!: number
    @observable getReportedObservationAPIError!: null|string

    @observable getSingleUserObservationAPIStatus!: number
    @observable getSingleUserObservationAPIError!:null|string

    @observable getUpdatedObservationAPIStatus!: number;
    @observable getUpdatedObservationAPIError!: null|string;

    @observable getUpdatedObservationByAdminAPIStatus!: number;
    @observable getUpdatedObservationByAdminAPIError!: null|string;

    @observable getCategoryAndSubCategoryListAPIStatus!: number
    @observable getCategoryAndSubCategoryListAPIError!: null|string

    @observable observationsListAPIService!:UserService
    //TODO: @observable userPaginationStore 

    @observable singleUserObservationDetails:any
    @observable observationsList!:Array<userModelType>
    @observable categoryAndSubCategoryList!:Array<categoryType>
    @observable sortType!:string
    @observable totalObservationsListSortType!:string
    @observable selectedFilter!:string
    @observable userObservationsStoreLimit!:number
    @observable userObservationsStoreOffset!:number
    @observable userObservationsStoreTotal!:number
    @observable selectedObservationId!:number
    @observable selectedPage!:number

    constructor(observationsListAPI: any) {
        this.initUserStore(observationsListAPI);
    }

    @action.bound
    initUserStore(observationsListAPI: any) {

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

        this.getUpdatedObservationByAdminAPIStatus = API_INITIAL;
        this.getUpdatedObservationByAdminAPIError = null;

        this.observationsListAPIService = observationsListAPI;
        // this.userPaginationStore = paginationStore(UserModel);

        this.singleUserObservationDetails = {};
        this.observationsList = [];
        this.categoryAndSubCategoryList = [];
        this.selectedFilter = '';
        this.sortType = 'latestReported';
        this.totalObservationsListSortType = 'Latest';
        this.userObservationsStoreLimit = 8;
        this.userObservationsStoreOffset = 0;
        this.userObservationsStoreTotal = 0;
        this.selectedObservationId = 0;
        this.selectedPage = 0;
    }

    //---------------------------------------->API Call For Observation List And Its Methods<---------------------------

    @action.bound
    getObservationsList = async() => {

        const objectToGetObservationsList = {
            sort_type: this.sortType,
            status_filter: this.selectedFilter
        };

        // this.paginationStore.getObservationsList(this.observationsListAPIService.getObservationsListAPI,objectToGetObservationsList)
        const observationsPromise = this.observationsListAPIService.getObservationsListAPI(this.userObservationsStoreLimit, this.userObservationsStoreOffset, objectToGetObservationsList);

        await bindPromiseWithOnSuccess(observationsPromise)
            .to(this.setObservationsListAPIStatus, (response:any)=>{this.setObservationsListAPIResponse(response)})
            .catch((error) => {
                this.getObservationsListAPIError = error;

            });
    }

    @action.bound
    setObservationsListAPIResponse(observationsListResponse: { total: number; observations: Array<userModelType>; }) {
        this.userObservationsStoreTotal = observationsListResponse.total;

        this.observationsList = observationsListResponse.observations.map((eachObservation: any) => {

            return new UserModel(eachObservation);
        });
    }

    @action.bound
    setObservationsListAPIStatus(apiStatus: number) {
        this.getObservationsListAPIStatus = apiStatus;
    }

    //----------------------------------------->API Call For Create A Observation And Its Methods<-----------------------------

    @action
    onClickSubmit = async(objectToCreateObservation:reportingObservationObjectType) => {
        const reportingObservationPromise = this.observationsListAPIService.createReportedObservation(objectToCreateObservation);
        await bindPromiseWithOnSuccess(reportingObservationPromise)
            .to(this.setReportedObservationAPIStatus, this.setReportedObservationAPIResponse)
            .catch(this.setReportedObservationAPIError);

    }
    @action.bound
    setReportedObservationAPIResponse(observationsListResponse) {}

    @action.bound
    setReportedObservationAPIError(error: null|string) {
        this.getReportedObservationAPIError = error;
    }

    @action.bound
    setReportedObservationAPIStatus(apiStatus: number) {
        this.getReportedObservationAPIStatus = apiStatus;
    }

    //---------------------------------------->API Call For Category List And Sub Category List<---------------------

    @action
    getCategoryAndSubCategoryList = async() => {
        const categoryAndSubCategoryListPromise = this.observationsListAPIService.getCategoryAndSubCategoryList();
        await bindPromiseWithOnSuccess(categoryAndSubCategoryListPromise)
            .to(this.setCategoryAndSubCategoryListAPIStatus,(Response:any)=>this.setCategoryAndSubCategoryListAPIResponse(Response))
            .catch(this.setCategoryAndSubCategoryListAPIError);
    }
    @action.bound
    setCategoryAndSubCategoryListAPIResponse(categoryAndSubCategoryListResponse:Array<categoryType>) {
        this.categoryAndSubCategoryList = categoryAndSubCategoryListResponse.map((eachCategory) => {
            return new CategoryModel(eachCategory);
        });
    }

    @action.bound
    setCategoryAndSubCategoryListAPIError(error:null|string) {

        this.getCategoryAndSubCategoryListAPIError = error;
    }

    @action.bound
    setCategoryAndSubCategoryListAPIStatus(apiStatus: number) {
        this.getCategoryAndSubCategoryListAPIStatus = apiStatus;
    }

    //------------------------------------------>API Call For Display Single Observation<-------------------------------

    @action
    getSingleUserObservationDetails = async(observationId:Number) => {
        const singleUserObservationPromise = this.observationsListAPIService.getSingleUserObservationsDetails(observationId);
        await bindPromiseWithOnSuccess(singleUserObservationPromise)
            .to(this.setSingleUserObservationAPIStatus, (response:any)=>this.setSingleUserObservationAPIResponse(response))
            .catch(this.setSingleUserObservationAPIError);
    }

    @action.bound
    setSingleUserObservationAPIResponse(singleUserObservationResponse:singleObservationModelType) {
        this.singleUserObservationDetails = new SingleObservationModel(singleUserObservationResponse);
    }

    @action.bound
    setSingleUserObservationAPIError(error:null|string) {
        this.getSingleUserObservationAPIError = error;
    }

    @action.bound
    setSingleUserObservationAPIStatus(apiStatus:number) {
        this.getSingleUserObservationAPIStatus = apiStatus;
    }

    //----------------------------------------->Update The Observation By Rp<---------------------------------

    @action
    updateObservationByRp = async(objectToUpdateObservation:object, observationId:number) => {
        const observationsUpdatePromise = this.observationsListAPIService.updateAssignedObservationAPI(objectToUpdateObservation, observationId);
        await bindPromiseWithOnSuccess(observationsUpdatePromise)
            .to(this.setUpdatedObservationAPIStatus, this.setUpdatedObservationAPIResponse)
            .catch(this.setUpdatedObservationAPIError);
    }

    @action.bound
    setUpdatedObservationAPIResponse(updatedResponse: any) {}

    @action.bound
    setUpdatedObservationAPIError(error: null|string) {
        this.getUpdatedObservationAPIError = error;
    }

    @action.bound
    setUpdatedObservationAPIStatus(apiStatus: number) {
        this.getUpdatedObservationAPIStatus = apiStatus;
    }

    //----------------------------------------->Update The Observation By Admin<---------------------------------

    @action
    updateObservationByAdmin = async(objectToUpdateObservation:object, observationId: number) => {
        const observationsUpdatePromise = this.observationsListAPIService.updateObservationByAdminAPI(objectToUpdateObservation, observationId);
        await bindPromiseWithOnSuccess(observationsUpdatePromise)
            .to(this.setUpdatedObservationByAdminAPIStatus, this.setUpdatedObservationByAdminAPIResponse)
            .catch(this.setUpdatedObservationByAdminAPIError);
    }

    @action.bound
    setUpdatedObservationByAdminAPIResponse(updatedResponse: any) {}

    @action.bound
    setUpdatedObservationByAdminAPIError(error: null|string) {
        this.getUpdatedObservationByAdminAPIError = error;
    }

    @action.bound
    setUpdatedObservationByAdminAPIStatus(apiStatus: number) {
        this.getUpdatedObservationByAdminAPIStatus = apiStatus;
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
    onChangeUserFilter(selectedFilter: string) {
        this.selectedFilter = selectedFilter;
        this.getObservationsList()
    }
    //------------------------------------->Methods For Pagination<--------------------------

    @action.bound
    onClickUserObservationStorePageNumber(pageNumber:string) {
        this.userObservationsStoreOffset = parseInt(pageNumber) * Number(this.userObservationsStoreLimit);
        if (this.userObservationsStoreOffset === 0) {
            this.userObservationsStoreOffset = 1;
        }
        this.getObservationsList();
        this.selectedPage = parseInt(pageNumber);
    }

}

export default UserStore;
