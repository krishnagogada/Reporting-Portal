import React from 'react';

class RpModel {
    title
    reportedOn
    observationId
    username
    mobileNumber
    profilePic
    severty
    status
    dueDate
    constructor(observationDetailsObject) {

        this.title = observationDetailsObject.title;
        this.observationId = observationDetailsObject.observation_id;
        this.reportedOn = observationDetailsObject.reported_date;
        this.personDetails = observationDetailsObject.reported_by;
        this.username = observationDetailsObject.reported_by.name;
        this.mobileNumber = observationDetailsObject.reported_by.mobile_number;
        this.profilePic = observationDetailsObject.reported_by.profile_pic;
        this.severity = observationDetailsObject.severity;
        this.status = observationDetailsObject.status;
        this.dueDate = observationDetailsObject.due_date;
    }
}

export default RpModel;
