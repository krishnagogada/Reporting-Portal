import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { UserObservationsListContainer, ObservationListFilter, ListOfObservationsTextAndAddButton, ListOfObservationsText, PlusAndAddNewDisplay, AddNewText } from './styledComponent.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import { PrimaryButton } from '../../../../common/components/PrimaryButton/index.js';
import strings from '../../../../common/i18n/strings.json';
import { Image } from '../../../../common/components/Image/index.js';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable/index.js';
import './index.css';
@observer
class UserObservationsListPage extends React.Component {

    @observable selectedFilter = '';

    onChangeUserFilter = (selectedFilter) => {
        const { onChangeUserFilter } = this.props;
        this.selectedFilter = selectedFilter.label;
        onChangeUserFilter(selectedFilter.label);
    }

    render() {
        const {
            observationsList,
            onClickReportedOn,
            onClickDueDate,
            onClickAddNew,
            totalPages,
            onClickUserObservationStorePageNumber,
            onClickUserObservationCell,
            filterList
        } = this.props;

        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter, label: eachFilter } });

        return (
            <UserObservationsListContainer>
            
                <DesktopLayout>
                    <ListOfObservationsTextAndAddButton>
                        <ListOfObservationsText>{strings.listOfObservations}</ListOfObservationsText>
                        <PrimaryButton onClickButton={onClickAddNew}><PlusAndAddNewDisplay><Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/7930d80d-a88c-485e-b54b-4239b82c39f0.svg'
                                        classname={'add-new-button'}/><AddNewText>{strings.addNew}</AddNewText></PlusAndAddNewDisplay></PrimaryButton>
                    </ListOfObservationsTextAndAddButton>
                    <ObservationListFilter><Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c29a8db3-f8d9-441d-a982-a9f45a71f070.svg'
                                                className={'filter-image'}/><Select options={filterOptions} onChange={this.onChangeUserFilter} className={'user-filter'}/></ObservationListFilter>
                    <ObservationsListTable  observationsList={observationsList} 
                                            onClickReportedOn={onClickReportedOn} 
                                            onClickDueDate={onClickDueDate} 
                                            onClickAddNew={onClickAddNew} 
                                            onClickObservationCell={onClickUserObservationCell}
                                        />
                    <ReactPaginate  previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={1}
                                    onPageChange={onClickUserObservationStorePageNumber}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                    pageClassName={'pages'}
                                    breakClassName={'break-page'}
                                    previousClassName={'pages'}
                                    nextClassName={'pages'}
                                />
                </DesktopLayout>
            </UserObservationsListContainer>
        );
    }
}
export { UserObservationsListPage };
