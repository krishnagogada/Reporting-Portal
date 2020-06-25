import React from 'react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import { ToastContainer, Slide } from 'react-toastify';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { SingleObservationModelType,CategoryType } from '../../../Reporting_Portal/User/stores/types'

import strings from '../../i18n/strings.json';

import LoadingWrapperWithFailure from '../LoadingWrapper/LoadingWrapperWithFailure/index';
import NoDataView from '../LoadingWrapper/NoDataView/index';
import { RadioField } from '../RadioField/index';
import { PrimaryButton } from '../PrimaryButton/index';
import { SecondaryButton } from '../SecondaryButton/index';
import { DateAndTimePicker } from '../DateAndTimePicker/index';

import {
    ObservationAndChatNav,
    SecondaryActiveAndInactiveNav,
    AssignedObservationInnerContainer,
    TitleHeading,
    DescriptionField,
    Description,
    CateogaryAndSubCateogaryField,
    CateogaryText,
    SubCateogaryText,
    StatusField,
    StatusText,
    SeverityField,
    SeverityText,
    AttachmentsField,
    AttachmentsText,
    AssignedToField,
    AssignedToText,
    ReportedOnField,
    ReportedText,
    DueDateField,
    DueDateText,
    SecurityField,
    ResetAndUpdateButtons
}
from './styledComponent';
import './index.css';


const statusList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Acknowledged by RP"];
const severityList = ["Low", "Medium", "High"];

type singleObservationProps={
    roleType:string
    observationDetails:SingleObservationModelType
    onClickBack:()=>void
    getSingleUserObservationDetails:(observationId:number)=>void
    getSingleUserObservationAPIStatus:number
    getSingleUserObservationAPIError:null|string
    // singleObservationPageRoleType:string
    onChangeDueDate:(event:any)=>void
    onClickUpdate:(observationId:number)=>void
    onClickReset:()=>void
    status:{value:string,label:string};
    assignedToPerson:{value:number,label:string}
    dueDate:string
    defaultCategoryOption:{value:number,label:string}
    defaultSubCategoryOption:{value:number,label:string}
    onChangeCategory:(selectedOption: { value: number;label:string })=>void
    onChangeSubCategory:(selectedOption: { value: number;label:string })=>void
    severity:{value:string;label:string}
    onChangeStatus:(selectedOption:{value:string;label:string})=>void
    onChangeAssignedTo:(selectedOption:{value:number;label:string})=>void
    onChangeRadio:(event:any)=>void
    categoryAndSubCategoryList:Array<CategoryType>
}

@observer
class SingleObservation extends React.Component<singleObservationProps> {

    @observable selectedCategoryId = 0;
    @observable subCategories = [];
    categoriesObject = {};
    onChangeCategory = (selectedOption) => {
        this.selectedCategoryId = selectedOption.value;
        const { onChangeCategory, categoryAndSubCategoryList } = this.props;

        categoryAndSubCategoryList.forEach((eachCategory) => {
            this.categoriesObject[eachCategory.categoryId] = eachCategory.subCategories.map((eachSubCategory) => {
                return { value: eachSubCategory.subCategoryId, label: eachSubCategory.subCategoryName };
            });
        });

        this.subCategories = this.categoriesObject[selectedOption.value];

        onChangeCategory(selectedOption);
    }

    getRpOptions = (categoryAndSubCategoryList:Array<CategoryType>) => {

        let options:Array<{value:number;label:string}> = [];

        categoryAndSubCategoryList.forEach((eachCategory) => {
            eachCategory.subCategories.forEach((eachSubCategory) => {
                options.push({ value: eachSubCategory.rpUserId, label: eachSubCategory.rpUsername });
            });
        });
        return options;
    }

    doNetworkCalls = () => {

        const { getSingleUserObservationDetails, observationDetails } = this.props;
        getSingleUserObservationDetails(observationDetails.observationId);
    }

    renderObservationsDetails = observer(() => {

        const {
            roleType,
            onChangeStatus,
            onChangeAssignedTo,
            onChangeRadio,
            observationDetails,
            onClickBack,
            onChangeDueDate,
            onChangeSubCategory,
            onClickUpdate,
            onClickReset,
            status,
            assignedToPerson,
            dueDate,
            defaultCategoryOption,
            defaultSubCategoryOption,
            severity,
            categoryAndSubCategoryList
        } = this.props;

        const statusOptions = statusList.map((eachOption) => { return { value: eachOption.toUpperCase(), label: eachOption } });
        const assignedToRpList = this.getRpOptions(categoryAndSubCategoryList);
        const categoryOptions = categoryAndSubCategoryList.map((eachCategory) => { return { value: eachCategory.categoryId, label: eachCategory.categoryName } });
        const severityOptions = severityList.map((eachSeverity) => { return { value: eachSeverity.toUpperCase(), label: eachSeverity } });

        if (!observationDetails) {
            return <NoDataView/>;
        }
        else {
            return (
                <AssignedObservationInnerContainer>
                
                    <TitleHeading><FiChevronLeft className={'back-icon'} data-testid='back-button' onClick={onClickBack}/>{observationDetails.title}</TitleHeading>
                    
                    <DescriptionField>
                        <Description>{observationDetails.description}</Description>
                    </DescriptionField>
                    
                    <CateogaryAndSubCateogaryField>
                        <CateogaryText>{strings.category}</CateogaryText>
                        <Select className={'medium-select'} 
                                isDisabled={roleType===strings.admin?false:true} 
                                defaultValue={defaultCategoryOption}
                                onChange={this.onChangeCategory}
                                options={categoryOptions}
                            />
                        <SubCateogaryText>{strings.subCategory}</SubCateogaryText>
                        <Select isDisabled={roleType===strings.admin?false:true} 
                                className={'medium-select'}
                                defaultValue={defaultSubCategoryOption}
                                onChange={onChangeSubCategory}
                                options={this.subCategories}
                                key={this.selectedCategoryId}/>
                    </CateogaryAndSubCateogaryField>
                    
                    <StatusField>
                        <StatusText>{strings.status}</StatusText>
                        <Select options={statusOptions} 
                                className={'small-select'} 
                                isDisabled={roleType===strings.rp?false:true} 
                                onChange={onChangeStatus} 
                                defaultValue={status}
                            />
                    </StatusField>
                    
                    <SeverityField>
                        <SeverityText>{strings.severity}</SeverityText>
                        <Select options={severityOptions} 
                                className={'small-select'} 
                                isDisabled={true} 
                                defaultValue={severity}
                            />
                    </SeverityField>
                    
                    <AttachmentsField>
                        <AttachmentsText>{strings.attachements}</AttachmentsText>
                    </AttachmentsField>
                    
                    <AssignedToField>
                        <AssignedToText>{strings.assignedTo}</AssignedToText>
                        <Select options={assignedToRpList} 
                                className={'medium-select'} 
                                isDisabled={roleType===strings.user?true:false} 
                                onChange={onChangeAssignedTo}
                                defaultValue={assignedToPerson}
                            />
                    </AssignedToField>
                    
                    <ReportedOnField>
                        <ReportedText>{strings.reportedOn}</ReportedText>
                        <Select className={'large-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.reportedOn}
                            />
                    </ReportedOnField>
                    
                    <DueDateField>
                        <DueDateText>{strings.dueDate}</DueDateText>
                        <DateAndTimePicker  onChangeDateAndTimePicker={onChangeDueDate} 
                                            isDisabled={roleType===strings.rp?false:true} 
                                            value={dueDate}
                                        />
                    </DueDateField>
                    {roleType===strings.rp?<SecurityField><RadioField options={['PUBLIC','PRIVATE']} name='security' onChangeRadio={onChangeRadio}/></SecurityField>:null}
                    
                    <ResetAndUpdateButtons>
                        <SecondaryButton testId='reset-button' onClickButton={onClickReset} className={'reset-button'} isDisabled={roleType===strings.user?true:false}>{strings.reset}</SecondaryButton>
                        <PrimaryButton testId='update-button'onClickButton={()=>onClickUpdate(observationDetails.observationId)} isDisabled={roleType===strings.user?true:false}>{strings.update}</PrimaryButton>
                    </ResetAndUpdateButtons>
                </AssignedObservationInnerContainer>
            );
        }
    })
    render() {

        const { getSingleUserObservationAPIStatus, getSingleUserObservationAPIError } = this.props;

        return (
            <div>
            
                <ObservationAndChatNav>
                    <SecondaryActiveAndInactiveNav>{strings.observation}</SecondaryActiveAndInactiveNav>
                    <SecondaryActiveAndInactiveNav>{strings.chat}</SecondaryActiveAndInactiveNav>
                </ObservationAndChatNav>
                <LoadingWrapperWithFailure
                                                apiStatus={getSingleUserObservationAPIStatus}
                                                apiError={getSingleUserObservationAPIError}
                                                onRetryClick={this.doNetworkCalls}
                                                renderSuccessUI={this.renderObservationsDetails}
                                            />
                                            <ToastContainer hideProgressBar={true} autoClose={3000} closeButton={false} transition={Slide} position="bottom-center"/>
                
            </div>
        );
    }
}

export { SingleObservation }
