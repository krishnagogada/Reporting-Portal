import React from 'react';
import { SingleObservation } from '../../../../common/components/SingleObservation/index.js';
import strings from '../../../../common/i18n/strings.json';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

class RpAssignedObservationPage extends React.Component {

    render() {

        const {
            onChangeStatus,
            onChangeAssignedTo,
            onClickSubmit,
            dueDateValue,
            onChangeDueDate,
            onChangeRadio,
            singleUserObservationDetails,
            onClickBack,
            type
        } = this.props;

        return (
            <DesktopLayout type={type}>
                <SingleObservation  onChangeStatus={onChangeStatus} 
                                    onChangeAssignedTo={onChangeAssignedTo} 
                                    onClickSubmit={onClickSubmit} 
                                    onChangeDateAndTimePicker={onChangeDueDate}
                                    type={strings.rp}
                                    dueDateValue={dueDateValue}
                                    onChangeRadio={onChangeRadio}
                                    observationDetails={singleUserObservationDetails}
                                    onClickBack={onClickBack}
                                />
            </DesktopLayout>
        );
    }
}

export { RpAssignedObservationPage };
