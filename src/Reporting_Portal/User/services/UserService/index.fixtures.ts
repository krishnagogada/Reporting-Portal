import getObservationList from '../../fixtures/userObservationsList.json';
import getSingleUserObservation from '../../fixtures/userSingleObservation.json';
import getCategoryAndSubCateograyList from '../../fixtures/categoryAndSubCategoryList.json';

class UserFixtureService {

    getObservationsListAPI = (limit:number, offset:number,objectToGetObservationsList) => {

        return new Promise(resolve => resolve(getObservationList));
    }

    createReportedObservation = (reportingObservationObject:any) => {

        return new Promise(resolve => resolve(reportingObservationObject));

    }

    getSingleUserObservationsDetails = (objectToGetSingleObsesrvation:any) => {
        return new Promise(resolve => resolve(getSingleUserObservation));
    }

    updateAssignedObservationAPI = (objectToUpdateObservation:any,observationId:number) => {
        return new Promise(resolve => resolve(objectToUpdateObservation));
    }

    getCategoryAndSubCategoryList = () => {
        return new Promise(resolve => resolve(getCategoryAndSubCateograyList));
    }

    updateObservationByAdminAPI=(objectToUpdateObservation:any,observationId:number)=>{
        return new Promise(resolve=>resolve(objectToUpdateObservation))
    }
}

export default UserFixtureService;
