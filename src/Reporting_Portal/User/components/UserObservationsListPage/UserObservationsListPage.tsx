import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { getLoadingStatus } from '@ib/api-utils';

import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index';
import { DesktopLayout } from '../../../../common/components/DesktopLayout/index';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index';
import strings from '../../../../common/i18n/strings.json';
import { Image } from '../../../../common/components/Image/index';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index';

import { TableHeading, FilterList } from '../../constants/optionsConstants/optionsConstants';
import { FilterImageUrl, AddImageUrl } from '../../constants/imageUrlsConstants/imageUrlsConstants';

import { userModelType } from '../../stores/UserStore/index'

import {
    UserObservationsListContainer,
    ObservationListFilter,
    ListOfObservationsTextAndAddButton,
    ListOfObservationsText,
    PlusAndAddNewDisplay,
    AddNewText
}
from './styledComponent';
import './index.css';

type userObservationsListPageProps={
    observationsList:Array<userModelType>
    onClickReportedOn:()=>void
    onClickDueDate:()=>void
    onClickAddNew:()=>void
    onChangeUserFilter:(selectedFilter)=>void
    totalPages:number
    onClickUserObservationStorePageNumber:(selectedPage)=>void
    onClickUserObservationCell:(observationId)=>void
    roleType:string
    selectedPage:number
    getObservationsList:()=>void
    getObservationsListAPIStatus:number
    getObservationsListAPIError:null|string

}

@observer
class UserObservationsListPage extends React.Component<userObservationsListPageProps> {

    onChangeUserFilter = (selectedFilter: { value: string }) => {

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
                    <ObservationsListTable  key={Math.random()}
                                            observationsList={observationsList} 
                                            onClickReportedOn={onClickReportedOn} 
                                            onClickDueDate={onClickDueDate}
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
                        <PrimaryButton onClickButton={onClickAddNew}>
                            <PlusAndAddNewDisplay>
                                <Image source={AddImageUrl} className={'add-new-button'} alt={'add new button'}/>
                                <AddNewText>{strings.addNew}</AddNewText>
                            </PlusAndAddNewDisplay>
                        </PrimaryButton>
                    </ListOfObservationsTextAndAddButton>
                    
                    <ObservationListFilter>
                        <Image source={FilterImageUrl} className={'filter-image'} alt={'filter'}/>
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
