import React from 'react';
import { SingleObservation } from '../../../../common/components/SingleObservation/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

class UserObservationPage extends React.Component {
    render() {
        const { type, singleUserObservationDetails, onClickBack } = this.props;

        return (
            <DesktopLayout >
                <SingleObservation  observationDetails={singleUserObservationDetails}
                                    type={type}
                                    onClickBack={onClickBack}
                                    />
            </DesktopLayout>

        );
    }
}

export { UserObservationPage };
