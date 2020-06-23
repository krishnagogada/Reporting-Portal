import getTotalObservationsList from '../../fixtures/getTotalObservationsList.json';

class AdminFixtureService {
    getTotalObservationsListAPI = (limit,offset,objectToGetTotalObservationsList) => {
        return new Promise(resolve => resolve(getTotalObservationsList));
    }
}

export default AdminFixtureService;
