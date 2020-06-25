import React from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { PrimaryButton } from '../../../../common/components/PrimaryButton';
import { Image } from '../../../../common/components/Image';
import LoadingWrapperWithFailure from '../../../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index';
import NoDataView from '../../../../common/components/LoadingWrapper/NoDataView/index';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';
import strings from '../../../../common/i18n/strings.json';
import { ObservationsListTable } from '../../../../common/components/ObservationsListTable';

import { CategoryType } from '../../../User/stores/types'
import { AdminModelType } from '../../stores/types' 

import { AdminObservationsListContainer, AdminObservationListHeading, ObservationListFilters, CategorySelects, Filter } from './styledComponent';
import './index.css';
const TableHeading = ['TITLE', 'REPORTED BY', 'SEVERTY', 'STATUS', 'ASSIGNED TO', 'DUE DATE', 'MESSAGES'];
const filterList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Ackownledged by RP"];

type adminObservationsListProps={
    onChangeCategory:(selectedOptions:Array<{value:number,label:string}>)=>void
    categoryAndSubCategoryList:Array<CategoryType>
    onChangeAdminFilter:(selectedOption:string)=>void
    getTotalObservationsList:()=>void
    totalObservationsList:Array<AdminModelType>
    totalPages:number
    onClickDueDate:()=>void
    onClickAdminObservationCell:(observationId: number)=>void
    onClickAdminObservationStorePageNumber:(SelectedPageNumber: { selected: string; })=>void
    roleType:string
    adminSelectedPage:number
    getTotalObservationsAPIStatus:number
    getTotalObservationsAPIError:null|string
    onChangeSubCategory:(selectedOptions:Array<{value:number,label:string}>)=>void
    onClickSearch:()=>void
}

@observer
class AdminObservationsList extends React.Component<adminObservationsListProps>{

    @observable selectedFilter = '';
    @observable subCategories:Array<{value:number;label:string}> = [];

    onChangeCategory = (selectedOptions:Array<{value:number;label:string}>) => {
        const { onChangeCategory, categoryAndSubCategoryList } = this.props;
        const categoriesObject = {};

        categoryAndSubCategoryList.forEach((eachCategory) => {
            categoriesObject[eachCategory.categoryId] = eachCategory.subCategories.map((eachSubCategory) => {
                return { value: eachSubCategory.subCategoryId, label: eachSubCategory.subCategoryName };
            });
        });
        selectedOptions.forEach((eachOption) => this.subCategories.push(...categoriesObject[eachOption.value]));
        onChangeCategory(selectedOptions);
    }

    onChangeAdminFilter = (selectedFilter:{value:string}) => {

        const { onChangeAdminFilter } = this.props;
        this.selectedFilter = selectedFilter.value;
        onChangeAdminFilter(selectedFilter.value);
    }

    mapTheOptionsForCategory = (listOfOptions:Array<CategoryType>) => {
        return listOfOptions.map((eachOption) => {
            return { value: eachOption.categoryId, label: eachOption.categoryName };
        });
    }

    doNetworkCalls = () => {

        const { getTotalObservationsList } = this.props;
        getTotalObservationsList();
    }

    renderTotalObservationsList = observer(() => {
        const {
            totalObservationsList,
            totalPages,
            onClickDueDate,
            onClickAdminObservationCell,
            onClickAdminObservationStorePageNumber,
            roleType,
            adminSelectedPage
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
                                    marginPagesDisplayed={5}
                                    pageRangeDisplayed={5}
                                    forcePage={adminSelectedPage}
                                    onPageChange={onClickAdminObservationStorePageNumber}
                                    containerClassName={'flex'}
                                    pageLinkClassName={'pages'}
                                    nextLinkClassName={'pages'}
                                    previousLinkClassName={'pages'}
                                />
                </AdminObservationsListContainer>
            );
        }
    })

    render() {

        const { getTotalObservationsAPIStatus,
                getTotalObservationsAPIError, 
                categoryAndSubCategoryList, 
                onChangeSubCategory, 
                onClickSearch,
                roleType} = this.props;

        const filterOptions = filterList.map((eachFilter) => { return { value: eachFilter.toUpperCase(), label: eachFilter } });
        const categoryOptions = this.mapTheOptionsForCategory(categoryAndSubCategoryList);

        return (
            <DesktopLayout roleType={roleType}>
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
                                alt={'filter'}
                            />
                        <Select options={filterOptions} 
                                onChange={this.onChangeAdminFilter}
                                className={'admin-filter'}
                                defaultValue={[{value:'ALL',label:'All'}]}
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
