import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Select from 'react-select';

import strings from '../../../../common/i18n/strings.json';
import { Input } from '../../../../common/components/Input';
import { TextAreaField } from '../../../../common/components/TextAreaField';
import { PrimaryButton } from '../../../../common/components/PrimaryButton';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

import {
    UserReportingPageInnerContainer,
    BackToObservationList,
    BackToObservationListText,
    TitleObservationFieldAndLabel,
    TitleOfObservationText,
    CategoryAndSubCategoryWithFieldAndLabel,
    CategoryText,
    SubCategoryText,
    SeverityFieldAndLabel,
    SeverityText,
    DescriptionAndTextAreaField,
    DescriptionText,
    UploadField,
    AttachementsText,
    ErrorMessage,
    RequiredField
}
from './styledComponent.js';
import './index.css';

class UserReportingPage extends React.Component {

    mapTheOPtionsForSelect = (listOfOptions) => {
        return listOfOptions.map((eachOption) => { return { value: eachOption, label: eachOption } });
    }

    render() {

        const {
            onClickBackToObservationsList,
            onChangeTitleOfObservation,
            onChangeCategory,
            onChangeSubCategory,
            onChangeSeverity,
            onChangeDescription,
            onClickSubmit,
            descriptionValue,
            titleOfObservationValue,
            titleErrorMessage,
            descriptionErrorMessage,
            severityErrorMessage,
            categoryList,
            subCategoryList,
            severityList,

        } = this.props;

        const categoryOptions = this.mapTheOPtionsForSelect(categoryList);
        const subCategoryOptions = this.mapTheOPtionsForSelect(subCategoryList);
        const severityOptions = this.mapTheOPtionsForSelect(severityList);

        return (
            <DesktopLayout>
                <UserReportingPageInnerContainer>
                    <BackToObservationList>
                        <FiChevronLeft className={'left-arrow'} />
                        <BackToObservationListText onClick={onClickBackToObservationsList}>{strings.backToObservations}</BackToObservationListText>
                    </BackToObservationList>
                    <TitleObservationFieldAndLabel>
                    
                        <TitleOfObservationText>{strings.titleOfObservation}<RequiredField>*</RequiredField></TitleOfObservationText>
                        
                        <Input  onChangeInputField={onChangeTitleOfObservation} 
                                className={'title-of-observation'} 
                                type={strings.text} 
                                value={titleOfObservationValue}
                        />
                        <ErrorMessage>{titleErrorMessage}</ErrorMessage>
                        
                    </TitleObservationFieldAndLabel>
                    
                    <CategoryAndSubCategoryWithFieldAndLabel>
                        <CategoryText>{strings.category}</CategoryText>
                        <Select onChange={onChangeCategory}
                                className={'category-select'} 
                                options={categoryOptions}
                        />
                        <SubCategoryText>{strings.subCategory}</SubCategoryText>
                        <Select onChange={onChangeSubCategory} 
                                className={'sub-category-select'} 
                                options={subCategoryOptions}
                        />
                    </CategoryAndSubCategoryWithFieldAndLabel>
                    
                    <SeverityFieldAndLabel>
                        <SeverityText>{strings.severity}<RequiredField>*</RequiredField></SeverityText>
                        <Select onChange={onChangeSeverity} 
                                className={'severity-select'} 
                                options={severityOptions}
                        />
                        <ErrorMessage>{severityErrorMessage}</ErrorMessage>
                    </SeverityFieldAndLabel>
                    
                    <DescriptionAndTextAreaField>
                        <DescriptionText    onChangeTextAreaField={onChangeDescription} 
                                            value={descriptionValue}
                        >{strings.description}<RequiredField>*</RequiredField>
                        </DescriptionText>
                        <TextAreaField  onChangeTextAreaField={onChangeDescription}/>
                        <ErrorMessage>{descriptionErrorMessage}</ErrorMessage>
                    </DescriptionAndTextAreaField>
                    
                    <UploadField>
                        <AttachementsText>{strings.attachements}</AttachementsText>
                        <Input type={strings.fileType} />
                    </UploadField>
                    
                    <PrimaryButton onClickButton={onClickSubmit} className={'submit-button'}>{strings.submit}</PrimaryButton>
                    
                </UserReportingPageInnerContainer>
           </DesktopLayout>
        );
    }
}

export { UserReportingPage };
