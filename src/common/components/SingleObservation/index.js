import React from 'react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import strings from '../../i18n/strings.json';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import LoadingWrapperWithFailure from '../LoadingWrapper/LoadingWrapperWithFailure/index.js';
import NoDataView from '../LoadingWrapper/NoDataView/index.js';
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
from './styledComponent.js';
import { RadioField } from '../RadioField/index.js';
import { PrimaryButton } from '../PrimaryButton/index.js';
import { SecondaryButton } from '../SecondaryButton/index.js';
import { DateAndTimePicker } from '../DateAndTimePicker/index.js';
import './index.css';

const statusList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Acknowledged by RP"];
const severityList = ["Low", "Medium", "High"];

@observer
class SingleObservation extends React.Component {

    @observable selectedCategoryId = 0;
    @observable subCategories;

    onChangeCategory = (selectedOption) => {
        this.selectedCategoryId = selectedOption.value;
        const { onChangeCategory, categoryAndSubCategoryList } = this.props;

        categoryAndSubCategoryList.forEach((eachCategory) => {
            if (eachCategory.categoryId === selectedOption.value) {

                this.subCategories = eachCategory.subCategories.map((eachSubCategory) => {
                    return { value: eachSubCategory.subCategoryId, label: eachSubCategory.subCategoryName };

                });
            }
        });
        onChangeCategory(selectedOption);
    }

    getRpOptions = (categoryAndSubCategoryList) => {
        let options = [];

        categoryAndSubCategoryList.forEach((eachCategory) => {
            eachCategory.subCategories.forEach((eachSubCategory) => {
                options.push({ value: eachSubCategory.rpUserId, label: eachSubCategory.rpUsername });
            });
        });
        return options;
    }

    doNetworkCalls = () => {

        const { getSingleUserObservationDetails } = this.props;
        getSingleUserObservationDetails();
    }

    renderObservationsDetails = () => {

        const {
            roleType,
            onChangeStatus,
            onChangeAssignedTo,
            dueDateValue,
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
        const categoryOptions = categoryAndSubCategoryList.map((eachCategory) => { return { value: eachCategory.categoryName, label: eachCategory.categoryId } });
        const severityOptions = severityList.map((eachSeverity) => { return { value: eachSeverity.toUpperCase(), label: eachSeverity } });

        if (!observationDetails) {
            return <NoDataView/>;
        }
        else {
            return (
                <AssignedObservationInnerContainer>
                
                    <TitleHeading><FiChevronLeft className={'back-icon'} onClick={onClickBack}/>{observationDetails.title}</TitleHeading>
                    
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
                                onChange={onChangeAssignedTo}
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
                                            value={dueDateValue} 
                                            isDisabled={roleType===strings.rp?false:true} 
                                            value={dueDate}
                                        />
                    </DueDateField>
                    {roleType===strings.rp?<SecurityField><RadioField options={['PUBLIC','PRIVATE']} name='security' onChangeRadio={onChangeRadio}/></SecurityField>:null}
                    
                    <ResetAndUpdateButtons>
                        <SecondaryButton onClickButton={onClickReset} className={'reset-button'} isDisabled={roleType===strings.user?true:false}>{strings.reset}</SecondaryButton>
                        <PrimaryButton onClickButton={()=>onClickUpdate(observationDetails.observationId)} isDisabled={roleType===strings.user?true:false}>{strings.update}</PrimaryButton>
                    </ResetAndUpdateButtons>
                </AssignedObservationInnerContainer>
            );
        }
    }
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
                
            </div>
        );
    }
}

export { SingleObservation }
