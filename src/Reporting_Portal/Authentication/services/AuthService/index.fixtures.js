import getUserLogInResponse from '../../fixtures/getUserLogInResponse.json';

class AuthFixtureService {

    logInAPI = () => {
        return new Promise(resovle => resovle(getUserLogInResponse));
    }
}

export { AuthFixtureService };
