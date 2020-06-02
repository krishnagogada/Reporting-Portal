import React from 'react';
import { observer } from 'mobx-react';
import strings from '../../i18n/strings.json';
import {
    AssignedToMeAndMyObservations,
    ActiveandInactiveNav
}
from './styledComponent.js';

@observer
class RpNavSwitchers extends React.Component {
    render() {
        const { onClickRpNavSwitcher, inActive } = this.props;

        return (
            <AssignedToMeAndMyObservations>
                <ActiveandInactiveNav onClick={()=>onClickRpNavSwitcher(strings.assignedToMe)} active={inActive===strings.assignedToMe}>{strings.assignedToMe}</ActiveandInactiveNav>
                <ActiveandInactiveNav onClick={()=>onClickRpNavSwitcher(strings.myObservartions)} active={inActive===strings.myObservartions}>{strings.myObservartions}</ActiveandInactiveNav>
            </AssignedToMeAndMyObservations>
        );
    }
}

export { RpNavSwitchers };
