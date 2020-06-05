import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { PrimaryButton } from '../../../../common/components/PrimaryButton';

import { Image } from '../../../../common/components/Image';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import strings from '../../../../common/i18n/strings.json';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable';

import { AdminObservationsListContainer, AdminObservationListHeading, ObservationListFilters, CategorySelects, Filter } from './styledComponent.js';
import './index.css';

const TableHeading = ['TITLE', 'REPORTED BY', 'SEVERTY', 'STATUS', 'ASSIGNED TO', 'DUE DATE', 'MESSAGES'];
const filterList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Ackownledged by RP"];

@observer
class AdminObservationsList extends React.Component {

    @observable selectedFilter = '';
    @observable subCategories = [];

    onChangeCategory = (selectedOptions) => {

        const { onChangeCategory, categoryAndSubCategoryList } = this.props;
        const categoriesObject = {};

        categoryAndSubCategoryList.forEach((eachCategory) => {
            categoriesObject[eachCategory.categoryId] = eachCategory.subCategories.map((eachSubCategory) => {
                return { value: eachSubCategory.subCategoryId, label: eachSubCategory.subCategoryName };
            });
        });
        this.subCategories = [];
        selectedOptions.forEach((eachOption) => this.subCategories.push(...categoriesObject[eachOption.value]));
        onChangeCategory(selectedOptions);
    }

    onChangeAdminFilter = (selectedFilter) => {

        const { onChangeAdminFilter } = this.props;
        this.selectedFilter = selectedFilter.value;
        onChangeAdminFilter(selectedFilter.value);
    }

    mapTheOptionsForCategory = (listOfOptions) => {
        return listOfOptions.map((eachOption) => { return { value: eachOption.categoryId, label: eachOption.categoryName } });
    }

    doNetworkCalls = () => {

        const { getTotalObservationsList } = this.props;
        getTotalObservationsList();
    }

    renderTotalObservationsList = () => {
        const {
            totalObservationsList,
            totalPages,
            onClickDueDate,
            onClickAdminObservationCell,
            onClickAdminObservationStorePageNumber,
            roleType
        } = this.props;

        if (totalObservationsList.length === 0) {
            return <NoDataView/>;
        }
        else {
            return (
                <AdminObservationsListContainer>
                    <ObservationsListTable  observationsList={totalObservationsList} 
                                            onClickDueDate={onClickDueDate} 
                                            onClickObservationCell={onClickAdminObservationCell}
                                            TableHeading={TableHeading}
                                            roleType={roleType}
                                        />
                    <ReactPaginate  previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={1}
                                    onPageChange={onClickAdminObservationStorePageNumber}
                                    containerClassName={'flex'}
                                    pageLinkClassName={'pages'}
                                    nextLinkClassName={'pages'}
                                    previousLinkClassName={'pages'}
                                />
                </AdminObservationsListContainer>
            );
        }
    }

    render() {

        const { getTotalObservationsAPIStatus, getTotalObservationsAPIError, categoryAndSubCategoryList, onChangeSubCategory, onClickSearch } = this.props;
        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter.toUpperCase(), label: eachFilter } });
        const categoryOptions = this.mapTheOptionsForCategory(categoryAndSubCategoryList);
        return (
            <DesktopLayout>
                <AdminObservationListHeading>{strings.totalObservations}</AdminObservationListHeading>
                <ObservationListFilters>
                    <CategorySelects>
                        <Select onChange={this.onChangeCategory}
                                className={'category-selects'} 
                                options={categoryOptions}
                                isMulti={true}
                        />
                        <Select onChange={onChangeSubCategory} 
                                className={'category-selects'} 
                                options={this.subCategories}
                                isMulti={true}
                        />
                        <PrimaryButton onClickButton={onClickSearch}>{strings.search}</PrimaryButton>
                    </CategorySelects>
                    <Filter>
                        <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/c29a8db3-f8d9-441d-a982-a9f45a71f070.svg'
                                className={'filter-image'}
                            />
                        <Select options={filterOptions} 
                                onChange={this.onChangeAdminFilter}
                                className={'admin-filter'}
                                isMulti={true}
                            />
                        </Filter>
                    
                </ObservationListFilters>
                <LoadingWrapperWithFailure  apiStatus={getTotalObservationsAPIStatus}
                                                apiError={getTotalObservationsAPIError}
                                                onRetryClick={this.doNetworkCalls}
                                                renderSuccessUI={this.renderTotalObservationsList}
                                            />
            </DesktopLayout>
        );
    }
}

export { AdminObservationsList };
