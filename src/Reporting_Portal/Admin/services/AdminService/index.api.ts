import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index';
import endPoints from '../endPoints';

class AdminService {

    api
    constructor() {
        this.api = create({
            baseURL: EnvironmentConstants.LogIn_BASE_URL
        });
    }
    getTotalObservationsListAPI = (limit, offset, objectToGetTotalObservationsList) => {
        return networkCallWithApisauce(
            this.api,
            `${endPoints.TotalObservations}?limit=${limit}&offset=${offset}`, objectToGetTotalObservationsList,
            apiMethods.post);
    }
}

export default AdminService;
