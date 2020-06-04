import React from 'react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import strings from '../../i18n/strings.json';
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
class SingleObservation extends React.Component {

    doNetworkCalls = () => {

        const { getSingleUserObservationDetails } = this.props;
        getSingleUserObservationDetails();
    }

    renderObservationsDetails = () => {

        const {
            roleType,
            onChangeStatus,
            onChangeAssignedTo,
            onClickSubmit,
            onChangeDateAndTimePicker,
            dueDateValue,
            onChangeRadio,
            observationDetails,
            onClickBack,
            onChangeDueDate
        } = this.props;

        const options = [{ value: "milk", label: "milk" }, { value: "milk", label: "milk" }];
        const defaultOption = { value: observationDetails.category, label: observationDetails.category };

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
                                defaultValue={defaultOption}
                            />
                        <SubCateogaryText>{strings.subCategory}</SubCateogaryText>
                        <Select isDisabled={roleType===strings.admin?false:true} placeholder={observationDetails.subCategory} className={'medium-select'}/>
                    </CateogaryAndSubCateogaryField>
                    
                    <StatusField>
                        <StatusText>{strings.status}</StatusText>
                        <Select options={options} 
                                className={'small-select'} 
                                isDisabled={roleType===strings.rp?false:true} 
                                onChange={onChangeStatus} 
                                placeholder={observationDetails.status}
                            />
                    </StatusField>
                    
                    <SeverityField>
                        <SeverityText>{strings.severity}</SeverityText>
                        <Select options={options} 
                                className={'small-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.severity}
                            />
                    </SeverityField>
                    
                    <AttachmentsField>
                        <AttachmentsText>{strings.attachements}</AttachmentsText>
                    </AttachmentsField>
                    
                    <AssignedToField>
                        <AssignedToText>{strings.assignedTo}</AssignedToText>
                        <Select options={options} 
                                className={'medium-select'} 
                                isDisabled={roleType===strings.user?true:false} 
                                onChange={onChangeAssignedTo} 
                                placeholder={observationDetails.username}
                            />
                    </AssignedToField>
                    
                    <ReportedOnField>
                        <ReportedText>{strings.reportedOn}</ReportedText>
                        <Select options={options} 
                                className={'large-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.reportedOn}
                            />
                    </ReportedOnField>
                    
                    <DueDateField>
                        <DueDateText>{strings.dueDate}</DueDateText>
                        <DateAndTimePicker  onChangeDateAndTimePicker={onChangeDueDate} 
                                            value={dueDateValue} 
                                            isDisabled={roleType===strings.rp?false:true} 
                                            placeholder={observationDetails.dueDate}
                                        />
                    </DueDateField>
                    {roleType===strings.rp?<SecurityField><RadioField options={['PUBLIC','PRIVATE']} name='security' onChangeRadio={onChangeRadio}/></SecurityField>:null}
                    
                    <ResetAndUpdateButtons>
                        <SecondaryButton className={'reset-button'} isDisabled={roleType===strings.user?true:false}>{strings.reset}</SecondaryButton>
                        <PrimaryButton onClickButton={onClickSubmit} isDisabled={roleType===strings.user?true:false}>{strings.update}</PrimaryButton>
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
