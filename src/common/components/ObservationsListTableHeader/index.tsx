import React from 'react';
import { TableHeading, Heading, HeadingWithDropDown, HeadingRow } from './styledComponent';
import { Image } from '../Image/index';
import './index.css'

type observationsListTableHeaderProps={
    tableHeadings:Array<string>
    onClickReportedOn:()=>void
    onClickDueDate:()=>void
}

class ObservationsListTableHeader extends React.Component<observationsListTableHeaderProps> {
    renderTableHeadings = () => {
        const { tableHeadings, onClickReportedOn, onClickDueDate } = this.props;

        return tableHeadings.map((eachHeading) => {

            if ((eachHeading !== 'REPORTED ON') && eachHeading !== 'DUE DATE') {
                return <TableHeading key={Math.random()}><Heading>{eachHeading}</Heading></TableHeading>;
            }
            else if (eachHeading === 'REPORTED ON') {

                return <TableHeading data-testid={eachHeading} key={Math.random()}>
                            <HeadingWithDropDown onClick={onClickReportedOn}>
                                <Heading>{eachHeading}</Heading>
                                <Image  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/8858d716-3b90-491d-a04d-28f1dae3fe1e.svg' 
                                        alt={'drop down'}
                                        className={'drop-down-image'}
                                />
                            </HeadingWithDropDown>
                        </TableHeading>;
            }

            return <TableHeading data-testid={eachHeading} key={Math.random()}>
                        <HeadingWithDropDown onClick={onClickDueDate}>
                            <Heading>{eachHeading}</Heading>
                            <Image  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/8858d716-3b90-491d-a04d-28f1dae3fe1e.svg'
                                    alt={'drop down'} 
                                    className={'drop-down-image'}/>
                        </HeadingWithDropDown>
                    </TableHeading>;
        });

    }
    render() {
        return (
            <HeadingRow>
                {this.renderTableHeadings()}
            </HeadingRow>
        );
    }
}

export { ObservationsListTableHeader };
