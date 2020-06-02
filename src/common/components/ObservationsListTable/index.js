import React from 'react';
import { ObservationsListTableHeader } from '../ObservationsListTableHeader/index.js';
import { ObservationCell } from '../ObservationCell/index.js';
import { ObservationListTableContainer } from './styledComponent.js';
import './index.css';

class ObservationsListTable extends React.Component {

    renderObservationCell = () => {
        const { observationsList, onClickObservationCell } = this.props;
        console.log(onClickObservationCell, ">>>>>>>>ObservationListTable")
        return observationsList.map((eachObservation) => <ObservationCell key = {Math.random()} className={'table-row'} observationDetails={eachObservation} onClickObservationCell={onClickObservationCell} />);

    }

    render() {
        const { onClickReportedOn, onClickDueDate } = this.props;
        return (
            <ObservationListTableContainer >
                <thead>
                <ObservationsListTableHeader tableHeadings={['TITLE','REPORTED ON','REPORTED BY','SEVERTY','STATUS','DUE DATE','MESSAGES']}
                                                onClickReportedOn={onClickReportedOn} onClickDueDate={onClickDueDate}/>
                </thead>
                <tbody>
                {this.renderObservationCell()}
                </tbody>
            </ObservationListTableContainer>
        );
    }
}

export { ObservationsListTable };
