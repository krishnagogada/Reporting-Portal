import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import strings from '../../i18n/strings.json';
import {
    AssignedToMeAndMyObservations,
    ActiveandInactiveNav
}
from './styledComponent.js';

@observer
class RpNavSwitchers extends React.Component {

    @observable inActive = strings.assignedToMe;

    @action
    onClickRpNavSwitcher = (selectedNav) => {
        this.inActive = selectedNav;
        const { onClickRpNavSwitcher } = this.props;
        onClickRpNavSwitcher(selectedNav);
    }
    render() {
        return (
            <AssignedToMeAndMyObservations>
                <ActiveandInactiveNav onClick={()=>this.onClickRpNavSwitcher(strings.assignedToMe)} active={this.inActive===strings.assignedToMe}>{strings.assignedToMe}</ActiveandInactiveNav>
                <ActiveandInactiveNav onClick={()=>this.onClickRpNavSwitcher(strings.myObservations)} active={this.inActive===strings.myObservations}>{strings.myObservations}</ActiveandInactiveNav>
            </AssignedToMeAndMyObservations>
        );
    }
}

export { RpNavSwitchers };
