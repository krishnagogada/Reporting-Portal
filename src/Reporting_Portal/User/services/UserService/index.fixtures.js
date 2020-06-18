import getObservationList from '../../fixtures/userObservationsList.json';
import getSingleUserObservation from '../../fixtures/userSingleObservation.json';
import getCategoryAndSubCateograyList from '../../fixtures/categoryAndSubCategoryList.json';

class UserFixtureService {

    getObservationsListAPI = (limit, offset) => {

        return new Promise(resolve => resolve(getObservationList));
    }

    createReportedObservation = (reportingObservationObject) => {

        return new Promise(resolve => resolve(reportingObservationObject));

    }

    getSingleUserObservationsDetails = (objectToGetSingleObsesrvation) => {
        return new Promise(resolve => resolve(getSingleUserObservation));
    }

    updateAssignedObservationAPI = (objectToUpdateObservation) => {
        return new Promise(resolve => resolve(objectToUpdateObservation));
    }

    getCategoryAndSubCategoryList = () => {
        return new Promise(resolve => resolve(getCategoryAndSubCateograyList));
    }

}

export default UserFixtureService;
