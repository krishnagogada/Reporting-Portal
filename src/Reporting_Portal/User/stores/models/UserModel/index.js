import React from 'react';

class UserModel {

    title
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
        console.log("model")
        this.title = observationDetailsObject.title;
        this.reportedOn = observationDetailsObject.reported_date;
        this.personDetails = observationDetailsObject.assigned_to;
        this.username = observationDetailsObject.assigned_to.name;
        this.mobileNumber = observationDetailsObject.assigned_to.mobile_number;
        this.severity = observationDetailsObject.severity;
        this.status = observationDetailsObject.status;
        this.dueDate = observationDetailsObject.due_date;
        this.description = observationDetailsObject.description;
        this.attachements = observationDetailsObject.attachements;
        this.category = observationDetailsObject.category.name;
        this.subCategory = observationDetailsObject.sub_category.name;
    }
}

export default UserModel;
