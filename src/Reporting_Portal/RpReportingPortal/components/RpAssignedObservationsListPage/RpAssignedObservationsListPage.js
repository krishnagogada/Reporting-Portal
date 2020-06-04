import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index.js';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout/index.js';
import { Image } from '../../../../common/components/Image/index.js';
import strings from '../../../../common/i18n/strings.json';

import {
    RpObservationListHeading,
    ObservationListFilter
}
from './styledComponent.js';
import './index.css';
const TableHeading = ['TITLE', 'REPORTED ON', 'REPORTED BY', 'SEVERTY', 'STATUS', 'DUE DATE', 'MESSAGES'];
class RpAssignedObservationsListPage extends React.Component {

    doNetworkCalls = () => {
        const { getAssignedObservationsList } = this.props;
        getAssignedObservationsList();
    }

    renderAssignedObservationsList = () => {
        const {
            assignedObservationsList,
            onClickAssignedObservationCell,
            totalPages,
            onClickAssignedObservationsPageNumber,
            roleType
        } = this.props;
        if (assignedObservationsList === 0) {
            return (<NoDataView/>);
        }
        else {
            return (
                <div>
                    <ObservationsListTable  observationsList={assignedObservationsList} 
                                            onClickObservationCell={onClickAssignedObservationCell}
                                            roleType={roleType}
                                            TableHeading={TableHeading}
                                            
                    />
                    <ReactPaginate  previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={1}
                                onPageChange={onClickAssignedObservationsPageNumber}
                                containerClassName={'pagination'}
                                subContainerClassName={'pagination'}
                                activeClassName={'active'}
                                breakClassName={'break-page'}
                                pageClassName={'pages'}
                                previousClassName={'pages'}
                                nextClassName={'pages'}
                            />
                </div>
            );
        }
    }

    render() {

        const {
            onChangeRpFilter,
            rpFilterList,
            getAssignedObservationsListAPIStatus,
            getAssignedObservationsListAPIError,
            roleType
        } = this.props;

        const filterOptions = rpFilterList.map((eachFilter) => { return { value: eachFilter, label: eachFilter } });

        return (
            <DesktopLayout roleType={roleType}>
                <RpObservationListHeading>{strings.observationsAssignedToMe}</RpObservationListHeading>
                <ObservationListFilter>
                    <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c29a8db3-f8d9-441d-a982-a9f45a71f070.svg'
                            className={'filter-image'}
                    />
                    <Select options={filterOptions} 
                            onChange={onChangeRpFilter} 
                            className={'rp-filter'}
                        />
                </ObservationListFilter>
                <LoadingWrapperWithFailure
                                                apiStatus={getAssignedObservationsListAPIStatus}
                                                apiError={getAssignedObservationsListAPIError}
                                                onRetryClick={this.doNetworkCalls}
                                                renderSuccessUI={this.renderAssignedObservationsList}
                                            />
                
                
                
                
                
            </DesktopLayout>
        );
    }
}

export { RpAssignedObservationsListPage };
