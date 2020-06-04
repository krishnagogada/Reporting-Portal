import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index.js';
import endPoints from '../endPoints.js';

class AdminService {

    api
    constructor() {
        this.api = create({
            baseURL: EnvironmentConstants.Product_BASE_URL
        });
    }
    getTotalObservationsListAPI = (limit, offset, objectToGetTotalObservationsList) => {
        return networkCallWithApisauce(
            this.observationsListAPI,
            `${endPoints.ProductList}?limit=${limit}&offset=${offset}`, objectToGetTotalObservationsList,
            apiMethods.post);
    }
}

export default AdminService;
