/*global expect*/
import React from 'react';

import UserFixtureService from './index.fixtures.js';

describe("testing for user fixtures service", () => {
    let userFixtureService;
    beforeEach(() => {
        userFixtureService = new UserFixtureService();
    });

    it("should test getObservationsListAPI", () => {
        expect(userFixtureService.getObservationsListAPI()).toBeDefined;
    });

    it("should test createReportedObservation", () => {
        expect(userFixtureService.createReportedObservation()).toBeDefined;
    });

    it("should test getSingleUserObservationsDetails", () => {
        expect(userFixtureService.getSingleUserObservationsDetails()).toBeDefined;
    });

    it("should test updateAssignedObservationAPI", () => {
        expect(userFixtureService.updateAssignedObservationAPI()).toBeDefined;
    });

    it("should test getCategoryAndSubCategoryList", () => {
        expect(userFixtureService.getCategoryAndSubCategoryList()).toBeDefined;
    });
});
