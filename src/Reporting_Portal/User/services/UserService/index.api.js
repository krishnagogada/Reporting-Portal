import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index.js';
import endPoints from '../endPoints.js';
class UserService {

    observationsListAPI
    reportedObservationAPI

    constructor() {
        this.observationsListAPI = create({
            baseURL: EnvironmentConstants.Product_BASE_URL
        });
        this.reportedObservationAPI = create({
            baseURL: '/something'
        });
    }

    getObservationsListAPI = (limit, offset, objectToGetObservationsList) => { //send the access token to header

        return networkCallWithApisauce(
            this.observationsListAPI,
            `${endPoints.ProductList}?limit=${limit}&offset=${offset}`, objectToGetObservationsList,
            apiMethods.post);
    }

    createReportedObservation = (objectToCreateObservation) => { //send the access token to header
        return networkCallWithApisauce(
            this.observationsListAPI,
            endPoints.ProductList, objectToCreateObservation,
            apiMethods.post);
    }

    getSingleUserObservationsDetails = (objectToGetSingleObsesrvation) => {

        return networkCallWithApisauce(
            this.observationsListAPI,
            endPoints.ProductList, objectToGetSingleObsesrvation,
            apiMethods.post);

    }

    getCategoryAndSubCategoryList = () => {
        return networkCallWithApisauce(
            this.observationsListAPI,
            endPoints.ProductList, {},
            apiMethods.get);
    }

}

export default UserService;
