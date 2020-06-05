import React from 'react';

class SingleObservationModel {

    title
    observationId
    description
    reportedOn
    assignedToPersonId
    assignedToPersonName
    severity
    status
    dueDate
    categoryName
    subCategoryName
    categoryId
    subCategoryId
    attachments

    constructor(observationDetailsObject) {

        this.title = observationDetailsObject.title;
        this.observationId = observationDetailsObject.observation_id;
        this.description = observationDetailsObject.description;
        this.status = observationDetailsObject.status;
        this.severity = observationDetailsObject.severity;
        this.attachments = observationDetailsObject.attachments;
        this.reportedOn = observationDetailsObject.reported_date;
        this.dueDate = observationDetailsObject.due_date;
        this.personDetails = observationDetailsObject.assigned_to;
        if (this.personDetails) {
            this.assignedToPersonName = observationDetailsObject.assigned_to.name;
            this.assignedToPersonId = observationDetailsObject.assigned_to.user_id;
        }
        else {
            this.personDetails = 'RP not assigned';
        }
        this.categoryName = observationDetailsObject.category.name;
        this.categoryId = observationDetailsObject.category.category_id;
        this.subCategoryName = observationDetailsObject.sub_category.name;
        this.subCategoryId = observationDetailsObject.sub_category.sub_category_id;
    }
}

export default SingleObservationModel;
