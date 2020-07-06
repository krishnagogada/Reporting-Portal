import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
// import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index';
import Config from '../../../../common/constants/environmentConstants/enivronmentConstants'
import endPoints from '../endPoints';
class UserService {

    api
    constructor() {
        this.api = create({
            baseURL: Config.BASE_URL
        });
    }

    getObservationsListAPI = (limit, offset, objectToGetObservationsList) => {

        return networkCallWithApisauce(
            this.api,
            `${endPoints.ObservationsList}?limit=${limit}&offset=${offset}`, objectToGetObservationsList,
            apiMethods.post);
    }

    createReportedObservation = (objectToCreateObservation) => {
        return networkCallWithApisauce(
            this.api,
            endPoints.CreateObservation, objectToCreateObservation,
            apiMethods.post);
    }

    getSingleUserObservationsDetails = (observationId) => {

        return networkCallWithApisauce(
            this.api,
            `observation/${observationId}/v1/`, {},
            apiMethods.get);

    }

    getCategoryAndSubCategoryList = () => {
        return networkCallWithApisauce(
            this.api,
            endPoints.CategoryAndSubCategory, {},
            apiMethods.get);
    }

    updateAssignedObservationAPI = (objectToUpdateObservation, observationId) => {

        return networkCallWithApisauce(
            this.api,
            `observation/${observationId}/update/v1/`, objectToUpdateObservation,
            apiMethods.post);
    }

    updateObservationByAdminAPI = (objectToUpdateObservation, observationId) => {

        return networkCallWithApisauce(
            this.api,
            `admin/${observationId}/update/v1/`, objectToUpdateObservation,
            apiMethods.post);
    }
}

export default UserService;
