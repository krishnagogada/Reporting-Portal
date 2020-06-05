import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';

import { Image } from '../../../../common/components/Image';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index.js';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import strings from '../../../../common/i18n/strings.json';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable';

import { AdminObservationListHeading, ObservationListFilters, CategorySelects, Filter } from './styledComponent.js';
import './index.css';

const TableHeading = ['TITLE', 'REPORTED BY', 'SEVERTY', 'STATUS', 'ASSIGNED TO', 'DUE DATE', 'MESSAGES'];
const filterList = ["All", "Closed", "Action in progress", "Resolved", "Ackownledged by RP"];

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
        console.log(categoriesObject, ">>>>>Admin List");
        this.subCategories = [];
        selectedOptions.forEach((eachOption) => this.subCategories.push(...categoriesObject[eachOption.value]));
        console.log(this.subCategories, ">>>>>subCat")
        onChangeCategory(selectedOptions);
    }

    onChangeAdminFilter = (selectedFilter) => {

        const { onChangeUserFilter } = this.props;
        this.selectedFilter = selectedFilter.label;
        onChangeUserFilter(selectedFilter.label);
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
                <div>
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
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                    pageClassName={'pages'}
                                    breakClassName={'break-page'}
                                    previousClassName={'pages'}
                                    nextClassName={'pages'}
                                />
                </div>
            );
        }
    }

    render() {

        const { getTotalObservationsAPIStatus, getTotalObservationsAPIError, categoryAndSubCategoryList, onChangeSubCategory } = this.props;
        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter, label: eachFilter } });
        const categoryOptions = this.mapTheOptionsForCategory(categoryAndSubCategoryList);
        console.log(this.subCategories, ">>>>Admin list");
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
