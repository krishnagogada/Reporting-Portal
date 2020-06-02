import rpAssignedObservationsList from '../../fixtures/rpAssignedObservationsList.json';

class RpFixtureService {

    updateAssignedObservationAPI = (objectToUpdateObservation) => {
        return new Promise(resolve => resolve(objectToUpdateObservation));
    }
    getAssignedObservationsListAPI = () => {
        return new Promise(resolve => resolve(rpAssignedObservationsList));
    }
}

export default RpFixtureService;
