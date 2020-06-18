import rpAssignedObservationsList from '../../fixtures/rpAssignedObservationsList.json';

class RpFixtureService {

    getAssignedObservationsListAPI = () => {
        return new Promise(resolve => resolve(rpAssignedObservationsList));
    }
}

export default RpFixtureService;
