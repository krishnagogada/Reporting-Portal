import React from 'react';

class SingleObservationModel {

    title
    observationId
    description
    reportedOn
    personDetails
    assignedToPersonId
    assignedToPersonName
    severity
    status
    dueDate
    category
    subCategory
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
        this.category = observationDetailsObject.category
        if (this.category) {
            this.categoryName = observationDetailsObject.category.name;
            this.categoryId = observationDetailsObject.category.category_id;
        }
        else {
            this.categoryName = "";
            this.categoryId = "";
        }
        this.subCategory = observationDetailsObject.sub_category
        if (this.subCategory) {
            this.subCategoryName = observationDetailsObject.sub_category.name;
            this.subCategoryId = observationDetailsObject.sub_category.sub_category_id;
        }
        else {
            this.subCategoryName = "";
            this.subCategoryId = "";
        }
    }
}

export default SingleObservationModel;
