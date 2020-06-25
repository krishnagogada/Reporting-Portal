import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index';
import { DesktopLayout } from '../../../../common/components/DesktopLayout/index';
import { Image } from '../../../../common/components/Image/index';
import strings from '../../../../common/i18n/strings.json';

import {
    RpObservationsListPageContainer,
    RpObservationListHeading,
    ObservationListFilter
}
from './styledComponent';
import './index.css';

import { RpModelType } from '../../stores/types'

const filterList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Acknowledged by RP"];
const TableHeading = ['TITLE', 'REPORTED ON', 'REPORTED BY', 'SEVERTY', 'STATUS', 'DUE DATE', 'MESSAGES'];

type rpAssignedObservationsListPageProps={
    assignedObservationsList:Array<RpModelType>
    onClickAssignedObservationCell:(observationId:number)=>void
    onClickAssignedObservationsPageNumber:(pageNumber: { selected: string; })=>void
    totalPages:number
    roleType:string
    rpSelectedPage:number
    onClickAssignedObservationsReportedOn:()=>void
    onClickAssignedObservationsDueDate:()=>void
    getAssignedObservationsList:()=>void
    onChangeRpFilter:(selectedFilter: { value: string; })=>void
    getAssignedObservationsListAPIStatus:number
    getAssignedObservationsListAPIError:null|string
}

class RpAssignedObservationsListPage extends React.Component<rpAssignedObservationsListPageProps> {

    doNetworkCalls = () => {
        const { getAssignedObservationsList } = this.props;
        getAssignedObservationsList();
    }

    renderAssignedObservationsList = () => {
        const {
            assignedObservationsList,
            onClickAssignedObservationCell,
            onClickAssignedObservationsPageNumber,
            totalPages,
            roleType,
            rpSelectedPage,
            onClickAssignedObservationsReportedOn,
            onClickAssignedObservationsDueDate
        } = this.props;
        if (assignedObservationsList.length === 0) {
            return (<NoDataView/>);
        }
        else {
            return (
                <RpObservationsListPageContainer>
                    <ObservationsListTable  observationsList={assignedObservationsList} 
                                            onClickObservationCell={onClickAssignedObservationCell}
                                            roleType={roleType}
                                            TableHeading={TableHeading}
                                            onClickReportedOn={onClickAssignedObservationsReportedOn}
                                            onClickDueDate={onClickAssignedObservationsDueDate}
                    />
                                            <ReactPaginate  previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={1}
                                forcePage={rpSelectedPage}
                                onPageChange={onClickAssignedObservationsPageNumber}
                                containerClassName={'flex'}
                                pageLinkClassName={'pages'}
                                nextLinkClassName={'pages'}
                                previousLinkClassName={'pages'}
                            />
                    
                </RpObservationsListPageContainer>
            );
        }
    }

    render() {

        const {
            onChangeRpFilter,
            getAssignedObservationsListAPIStatus,
            getAssignedObservationsListAPIError,
            roleType
        } = this.props;

        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter.toUpperCase(), label: eachFilter } });

        return (
            <DesktopLayout roleType={roleType}>
                <RpObservationListHeading>{strings.observationsAssignedToMe}</RpObservationListHeading>
                <ObservationListFilter>
                    <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c29a8db3-f8d9-441d-a982-a9f45a71f070.svg'
                            className={'filter-image'}
                            alt={'filter'}
                    />
                    <Select options={filterOptions} 
                            onChange={onChangeRpFilter} 
                            className={'rp-filter'}
                        />
                </ObservationListFilter>
                <LoadingWrapperWithFailure  apiStatus={getAssignedObservationsListAPIStatus}
                                            apiError={getAssignedObservationsListAPIError}
                                            onRetryClick={this.doNetworkCalls}
                                            renderSuccessUI={this.renderAssignedObservationsList}
                                            />
            </DesktopLayout>
        );
    }
}

export { RpAssignedObservationsListPage };
