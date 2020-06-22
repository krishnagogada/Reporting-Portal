import getTotalObservationsList from '../../fixtures/getTotalObservationsList.json';

class AdminFixtureService {
    getTotalObservationsListAPI = () => {
        return new Promise(resolve => resolve(getTotalObservationsList));
    }
}

export default AdminFixtureService;
