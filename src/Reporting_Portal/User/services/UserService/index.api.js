import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../constants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index.js';
import endPoints from '../endPoints.js';
class UserService {

    api

    constructor() {
        this.api = create({
            baseURL: EnvironmentConstants.LogIn_BASE_URL
        });

    }

    getObservationsListAPI = (limit, offset, objectToGetObservationsList) => { //send the access token to header

        return networkCallWithApisauce(
            this.api,
            `${endPoints.ObservationsList}?limit=${limit}&offset=${offset}`, objectToGetObservationsList,
            apiMethods.post);
    }

    createReportedObservation = (objectToCreateObservation) => { //send the access token to header
        return networkCallWithApisauce(
            this.api,
            endPoints.CreateObservation, objectToCreateObservation,
            apiMethods.post);
    }

    getSingleUserObservationsDetails = (objectToGetSingleObsesrvation) => {

        return networkCallWithApisauce(
            this.api,
            endPoints.SingleObservation, objectToGetSingleObsesrvation,
            apiMethods.post);

    }

    getCategoryAndSubCategoryList = () => {
        return networkCallWithApisauce(
            this.api,
            endPoints.CategoryAndSubCategory, {},
            apiMethods.get);
    }

}

export default UserService;
