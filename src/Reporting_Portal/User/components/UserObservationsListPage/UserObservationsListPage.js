import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { UserObservationsListContainer, ObservationListFilter, ObservationListTableAndPagination, ListOfObservationsTextAndAddButton, ListOfObservationsText, PlusAndAddNewDisplay, AddNewText } from './styledComponent.js';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index.js';
import strings from '../../../../common/i18n/strings.json';
import { Image } from '../../../../common/components/Image/index.js';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index.js';
import './index.css';

const TableHeading = ['TITLE', 'REPORTED ON', 'ASSIGNED TO', 'SEVERTY', 'STATUS', 'DUE DATE', 'MESSAGES']

@observer
class UserObservationsListPage extends React.Component {

    onChangeUserFilter = (selectedFilter) => {

        const { onChangeUserFilter } = this.props;
        onChangeUserFilter(selectedFilter.value);
    }

    doNetworkCalls = () => {

        const { getObservationsList } = this.props;
        getObservationsList();
    }

    renderObservationsList = () => {

        const {
            observationsList,
            onClickReportedOn,
            onClickDueDate,
            onClickAddNew,
            totalPages,
            onClickUserObservationStorePageNumber,
            onClickUserObservationCell,
            roleType,
            selectedPage
        } = this.props;
        console.log(totalPages, ">>>>>> USer obsevations")
        if (observationsList.length === 0) {
            return <NoDataView/>;
        }
        else {
            return (
                <UserObservationsListContainer>
                    <ObservationsListTable  observationsList={observationsList} 
                                            onClickReportedOn={onClickReportedOn} 
                                            onClickDueDate={onClickDueDate} 
                                            onClickAddNew={onClickAddNew} 
                                            onClickObservationCell={onClickUserObservationCell}
                                            TableHeading={TableHeading}
                                            roleType={roleType}
                                        />
                                        <ReactPaginate  previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={5}
                                    pageRangeDisplayed={5}
                                    forcePage={selectedPage}
                                    onPageChange={onClickUserObservationStorePageNumber}
                                    containerClassName={'flex'}
                                    pageLinkClassName={'pages'}
                                    nextLinkClassName={'pages'}
                                    previousLinkClassName={'pages'}
                                />
                    
                </UserObservationsListContainer>
            );
        }
    }
    render() {
        const {
            onClickAddNew,
            roleType,
            getObservationsListAPIStatus,
            getObservationsListAPIError,
            totalPages,
            onClickUserObservationStorePageNumber,
            selectedPage
        } = this.props;

        const filterList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Acknowledged by RP"];
        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter.toUpperCase(), label: eachFilter } });


        return (
            <UserObservationsListContainer>
            
                <DesktopLayout roleType={roleType}>
                    <ListOfObservationsTextAndAddButton>
                        <ListOfObservationsText>{strings.listOfObservations}</ListOfObservationsText>
                        <PrimaryButton onClickButton={onClickAddNew}><PlusAndAddNewDisplay><Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'
                                        classname={'add-new-button'}/><AddNewText>{strings.addNew}</AddNewText></PlusAndAddNewDisplay></PrimaryButton>
                    </ListOfObservationsTextAndAddButton>
                    <ObservationListFilter><Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c29a8db3-f8d9-441d-a982-a9f45a71f070.svg'
                                                className={'filter-image'}/><Select options={filterOptions} onChange={this.onChangeUserFilter} className={'user-filter'}/></ObservationListFilter>
                    <LoadingWrapperWithFailure
                                                apiStatus={getObservationsListAPIStatus}
                                                apiError={getObservationsListAPIError}
                                                onRetryClick={this.doNetworkCalls}
                                                renderSuccessUI={this.renderObservationsList}
                                            />
                                            
                </DesktopLayout>
            </UserObservationsListContainer>
        );
    }
}
export { UserObservationsListPage };
