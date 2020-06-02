import getObservationList from '../../fixtures/userObservationsList.json';
import getSingleUserObservation from '../../fixtures/userSingleObservation.json';

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

}

export default UserFixtureService;
