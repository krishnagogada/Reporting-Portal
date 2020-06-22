/*global expect*/
import React from 'react';

import { AuthFixtureService } from './index.fixtures.js';

describe("testing for user fixtures service", () => {

    let authFixtureService;

    beforeEach(() => {
        authFixtureService = new AuthFixtureService();
    });

    it("should test logInAPI", () => {
        expect(authFixtureService.logInAPI()).toBeDefined;
    });

    it("should test logOutAPI", () => {
        expect(authFixtureService.logOutAPI()).toBeDefined;
    });
});
