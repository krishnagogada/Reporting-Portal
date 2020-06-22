import React from 'react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import { ToastContainer, Slide } from 'react-toastify';
import strings from '../../i18n/strings.json';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import LoadingWrapperWithFailure from '../LoadingWrapper/LoadingWrapperWithFailure/index.jsx';
import NoDataView from '../LoadingWrapper/NoDataView/index.jsx';
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
import { RadioField } from '../RadioField/index.jsx';
import { PrimaryButton } from '../PrimaryButton/index.jsx';
import { SecondaryButton } from '../SecondaryButton/index.jsx';
import { DateAndTimePicker } from '../DateAndTimePicker/index.jsx';
import './index.css';

const statusList = ["All", "Closed", "Action in progress", "Resolved", "Reported", "Acknowledged by RP"];
const severityList = ["Low", "Medium", "High"];

@observer
class SingleObservation extends React.Component {

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

        const { getSingleUserObservationDetails, observationDetails } = this.props;
        getSingleUserObservationDetails(observationDetails.observationId);
    }

    renderObservationsDetails = observer(() => {

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
