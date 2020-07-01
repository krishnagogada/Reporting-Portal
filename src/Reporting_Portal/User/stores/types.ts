export type UserModelType = {
    title:string
    observationId:number
    profilePic:string
    description:string
    reportedOn:string
    personDetails:Object
    username:string
    mobileNumber:number
    severity:string
    status:string
    dueDate:string
}

export type SingleObservationModelType= {

    title:string
    observationId:number
    description:string
    reportedOn:string
    assignedToPersonId:number
    assignedToPersonName:string
    severity:string
    status:string
    dueDate:string
    category:Object
    subCategory:Object
    categoryName:string
    subCategoryName:string
    categoryId:number
    subCategoryId:number
    attachments:Array<string>

}
export type SubCategoryType={
    subCategoryName:string
    subCategoryId:number
    rpUsername:string
    rpUserId:number
}

export type CategoryType={
    categoryName:string
    categoryId:number
    subCategories:Array<SubCategoryType>
}

export type ReportingObservationObjectType={
    title: string
    category_id: number,
    sub_category_id: number,
    severity: string,
    description: string,
    attachments: Array<string>
}

export type ObservationsListSotingTypeAndFilters={
    sort_type:string,
    status_filter:string
}