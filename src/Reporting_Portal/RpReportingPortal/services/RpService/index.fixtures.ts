import rpAssignedObservationsList from '../../fixtures/rpAssignedObservationsList.json';

class RpFixtureService {

    getAssignedObservationsListAPI = (limit,offset,objectToGetAssignedObservationList) => {
        return new Promise(resolve => resolve(rpAssignedObservationsList));
    }
}

export default RpFixtureService;
