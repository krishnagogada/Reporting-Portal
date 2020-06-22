import React from 'react';

class UserModel {

    title
    observationId
    profilePic
    description
    reportedOn
    assignedTo
    username
    mobileNumber
    severty
    status
    dueDate
    category
    subCategory
    attachements

    constructor(observationDetailsObject) {

        this.title = observationDetailsObject.title;
        this.observationId = observationDetailsObject.observation_id;
        this.reportedOn = observationDetailsObject.reported_date;
        this.personDetails = observationDetailsObject.assigned_to;
        if (this.personDetails) {
            this.username = observationDetailsObject.assigned_to.name;
            this.mobileNumber = observationDetailsObject.assigned_to.mobile;
            this.profilePic = observationDetailsObject.assigned_to.profile_pic;
        }
        else {
            this.personDetails = 'RP not assigned';
        }
        this.severity = observationDetailsObject.severity;
        this.status = observationDetailsObject.status;
        this.dueDate = observationDetailsObject.due_date;

    }
}

export default UserModel;
