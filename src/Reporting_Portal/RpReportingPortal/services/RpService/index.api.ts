import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index.js';
import endPoints from '../endPoints.js';

class RpService {

    api
    constructor() {
        this.api = create({
            baseURL: EnvironmentConstants.LogIn_BASE_URL
        });
    }

    updateAssignedObservationAPI = (objectToUpdateObservation) => {

        return networkCallWithApisauce(
            this.api,
            endPoints.ProductList, objectToUpdateObservation,
            apiMethods.put);
    }
    getAssignedObservationsListAPI = (limit, offset, objectToGetAssignedObservationsList) => {
        console.log(objectToGetAssignedObservationsList, ">>>> RP API")
        return networkCallWithApisauce(
            this.api,
            `${endPoints.RpAssignedObservations}?limit=${limit}&offset=${offset}`, objectToGetAssignedObservationsList,
            apiMethods.post);
    }
}

export default RpService;
