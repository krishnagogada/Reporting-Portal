import React from 'react';
import { ObservationsListTableHeader } from '../ObservationsListTableHeader/index.js';
import { ObservationCell } from '../ObservationCell/index.jsx';
import { ObservationListTableContainer } from './styledComponent.js';
import './index.css';

class ObservationsListTable extends React.Component {

    renderObservationCell = () => {
        const { observationsList, onClickObservationCell, roleType } = this.props;

        return observationsList.map((eachObservation) => <ObservationCell   key = {Math.random()} 
                                                                            className={'table-row'} 
                                                                            observationDetails={eachObservation} 
                                                                            onClickObservationCell={onClickObservationCell} 
                                                                            roleType={roleType}
                                                                            />);

    }

    render() {
        const { onClickReportedOn, onClickDueDate, TableHeading } = this.props;
        return (
            <ObservationListTableContainer >
                <thead>
                <ObservationsListTableHeader    tableHeadings={TableHeading}
                                                onClickReportedOn={onClickReportedOn} 
                                                onClickDueDate={onClickDueDate}/>
                </thead>
                <tbody>
                {this.renderObservationCell()}
                </tbody>
            </ObservationListTableContainer>
        );
    }
}

export { ObservationsListTable };
