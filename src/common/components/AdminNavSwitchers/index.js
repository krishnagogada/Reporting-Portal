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
class AdminNavSwitchers extends React.Component {

    @observable inActive = strings.totalObservations;

    @action
    onClickRpNavSwitcher = (selectedNav) => {
        this.inActive = selectedNav;
        const { onClickRpNavSwitcher } = this.props;
        onClickRpNavSwitcher(selectedNav);
    }
    render() {
        return (
            <AssignedToMeAndMyObservations>
                <ActiveandInactiveNav onClick={()=>this.onClickRpNavSwitcher(strings.totalObservations)} active={this.inActive===strings.totalObservations}>{strings.totalObservations}</ActiveandInactiveNav>
                <ActiveandInactiveNav onClick={()=>this.onClickRpNavSwitcher(strings.categories)} active={this.inActive===strings.categories}>{strings.categories}</ActiveandInactiveNav>
            </AssignedToMeAndMyObservations>
        );
    }
}

export { AdminNavSwitchers };
