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
            onChangeDueDate
        } = this.props;

        return (
            <DesktopLayout roleType={roleType}>
                <SingleObservation  observationDetails={singleUserObservationDetails}
                                    roleType={singleObservationPageRoleType}
                                    onClickBack={onClickBack}
                                    getSingleUserObservationDetails={getSingleUserObservationDetails}
                                    getSingleUserObservationAPIStatus={getSingleUserObservationAPIStatus}
                                    getSingleUserObservationAPIError={getSingleUserObservationAPIError}
                                    onChangeDueDate={onChangeDueDate}
                                    />
            </DesktopLayout>
        );
    }
}

export { UserObservationPage };
