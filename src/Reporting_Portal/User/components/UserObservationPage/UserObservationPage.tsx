import React from 'react';
import { SingleObservation } from '../../../../common/components/SingleObservation/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

class UserObservationPage extends React.Component {

    render() {
        const {
            roleType,
            singleUserObservationDetails,
            onClickBack,
            getSingleUserObservationDetails,
            getSingleUserObservationAPIStatus,
            getSingleUserObservationAPIError,
            singleObservationPageRoleType,
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
