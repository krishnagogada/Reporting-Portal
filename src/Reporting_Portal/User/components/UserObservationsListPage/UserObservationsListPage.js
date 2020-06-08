import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';

import { UserObservationsListContainer, ObservationListFilter, ListOfObservationsTextAndAddButton, ListOfObservationsText, PlusAndAddNewDisplay, AddNewText } from './styledComponent.js';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index.js';
import strings from '../../../../common/i18n/strings.json';
import { Image } from '../../../../common/components/Image/index.js';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index.js';

import { TableHeading, FilterList } from '../../constants/optionsConstants/optionsConstants.js';
import { FilterImageUrl, AddImageUrl } from '../../constants/imageUrlsConstants/imageUrlsConstants.js';

import './index.css';

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

    renderObservationsList = observer(() => {

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
    })

    render() {

        const {
            onClickAddNew,
            roleType,
            getObservationsListAPIStatus,
            getObservationsListAPIError
        } = this.props;

        const filterOptions = FilterList.map((eachFilter) => { return { value: eachFilter.toUpperCase(), label: eachFilter } });

        return (
            <UserObservationsListContainer>
            
                <DesktopLayout roleType={roleType}>
                
                    <ListOfObservationsTextAndAddButton>
                        <ListOfObservationsText>{strings.listOfObservations}</ListOfObservationsText>
                        <PrimaryButton onClickButton={onClickAddNew}><PlusAndAddNewDisplay>
                        <Image source={AddImageUrl} classname={'add-new-button'}/>
                        <AddNewText>{strings.addNew}</AddNewText></PlusAndAddNewDisplay></PrimaryButton>
                    </ListOfObservationsTextAndAddButton>
                    
                    <ObservationListFilter>
                        <Image source={FilterImageUrl} className={'filter-image'}/>
                        <Select options={filterOptions} 
                                onChange={this.onChangeUserFilter} 
                                className={'user-filter'}
                            />
                    </ObservationListFilter>
                    
                    <LoadingWrapperWithFailure  apiStatus={getObservationsListAPIStatus}
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
