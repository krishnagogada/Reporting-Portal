import React from 'react';

class AdminModel {
    title
    reportedByName
    reportedByMobileNumber
    reportedByProfileUrl
    reportedByUserId
    assignedToName
    assignedToMobileNumber
    assignedToProfileUrl
    assignedToId
    severity
    status
    dueDate
    constructor(observationDetails) {
        this.title = observationDetails.title;
        this.reportedByName = observationDetails.reported_by.name;
        this.reportedByMobileNumber = observationDetails.reported_by.mobile_number;
        this.reportedByProfileUrl = observationDetails.reported_by.profile_pic;
        this.reportedByUserId = observationDetails.reported_by.user_id;
        this.assignedToName = observationDetails.reported_by.name;
        this.assignedToMobileNumber = observationDetails.reported_by.mobile_number;
        this.assignedToProfileUrl = observationDetails.reported_by.profile_pic;
        this.assignedToUserId = observationDetails.reported_by.user_id;
        this.severity = observationDetails.severity;
        this.status = observationDetails.severity;
        this.dueDate = observationDetails.due_date;
    }
}

export default AdminModel;
