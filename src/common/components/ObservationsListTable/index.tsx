import React from 'react';

import { ObservationsListTableHeader } from '../ObservationsListTableHeader/index';
import { ObservationCell } from '../ObservationCell/index';

import { ObservationListTableContainer } from './styledComponent';

import { userModelType } from '../../../Reporting_Portal/User/stores/UserStore/index'
import { rpModelType } from '../../../Reporting_Portal/RpReportingPortal/stores/RpStore/index'
import './index.css';

type observationsListTableProps={

    observationsList:any
    onClickObservationCell:(observationId:number)=>void
    roleType:string
    onClickReportedOn?:()=>void
    onClickDueDate:()=>void
    TableHeading:Array<string>
}

class ObservationsListTable extends React.Component<observationsListTableProps> {

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
