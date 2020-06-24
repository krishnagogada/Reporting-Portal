import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index';
import endPoints from '../endPoints';

class RpService {

    api
    constructor() {
        this.api = create({
            baseURL: EnvironmentConstants.LogIn_BASE_URL
        });
    }
    
    getAssignedObservationsListAPI = (limit, offset, objectToGetAssignedObservationsList) => {
        return networkCallWithApisauce(
            this.api,
            `${endPoints.RpAssignedObservations}?limit=${limit}&offset=${offset}`, objectToGetAssignedObservationsList,
            apiMethods.post);
    }
}

export default RpService;
