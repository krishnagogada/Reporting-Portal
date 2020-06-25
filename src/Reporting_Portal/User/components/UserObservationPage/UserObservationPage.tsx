import React from 'react';

import { SingleObservation } from '../../../../common/components/SingleObservation/index';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

import {SingleObservationModelType,CategoryType} from '../../stores/types'

type userObservationPageProps={
    roleType:string
    singleUserObservationDetails:SingleObservationModelType
    onClickBack:()=>void
    getSingleUserObservationDetails:(observationId:number)=>void
    getSingleUserObservationAPIStatus:number
    getSingleUserObservationAPIError:null|string
    // singleObservationPageRoleType:string
    onChangeDueDate:(event:any)=>void
    onClickUpdate:(observationId:number)=>void
    onClickReset:()=>void
    status:{value:string,label:string};
    assignedToPerson:{value:number,label:string}
    dueDate:string
    defaultCategoryOption:{value:number,label:string}
    defaultSubCategoryOption:{value:number,label:string}
    onChangeCategory:(selectedOption: { value: number;label:string })=>void
    onChangeSubCategory:(selectedOption: { value: number;label:string })=>void
    severity:{value:string;label:string}
    onChangeStatus:(selectedOption:{value:string;label:string})=>void
    onChangeAssignedTo:(selectedOption:{value:number;label:string})=>void
    onChangeRadio:(event:any)=>void
    categoryAndSubCategoryList:Array<CategoryType>
}

class UserObservationPage extends React.Component<userObservationPageProps> {

    render() {
        const {
            roleType,
            singleUserObservationDetails,
            onClickBack,
            getSingleUserObservationDetails,
            getSingleUserObservationAPIStatus,
            getSingleUserObservationAPIError,
            // singleObservationPageRoleType,
            onChangeDueDate,
            onClickUpdate,
            onClickReset,
            status,
            assignedToPerson,
            dueDate,
            defaultCategoryOption,
            defaultSubCategoryOption,
            onChangeCategory,
            onChangeSubCategory,
            severity,
            onChangeStatus,
            onChangeAssignedTo,
            onChangeRadio,
            categoryAndSubCategoryList
        } = this.props;

        return (
            <DesktopLayout roleType={roleType}>
                <SingleObservation  observationDetails={singleUserObservationDetails}
                                    roleType={roleType}
                                    onClickBack={onClickBack}
                                    getSingleUserObservationDetails={getSingleUserObservationDetails}
                                    getSingleUserObservationAPIStatus={getSingleUserObservationAPIStatus}
                                    getSingleUserObservationAPIError={getSingleUserObservationAPIError}
                                    onChangeDueDate={onChangeDueDate}
                                    onClickUpdate={onClickUpdate}
                                    onClickReset={onClickReset}
                                    status={status}
                                    assignedToPerson={assignedToPerson}
                                    dueDate={dueDate}
                                    defaultCategoryOption={defaultCategoryOption}
                                    defaultSubCategoryOption={defaultSubCategoryOption}
                                    onChangeCategory={onChangeCategory}
                                    onChangeSubCategory={onChangeSubCategory}
                                    severity={severity}
                                    onChangeStatus={onChangeStatus}
                                    onChangeAssignedTo={onChangeAssignedTo}
                                    onChangeRadio={onChangeRadio}
                                    categoryAndSubCategoryList={categoryAndSubCategoryList}
                                    />
            </DesktopLayout>
        );
    }
}

export { UserObservationPage };
