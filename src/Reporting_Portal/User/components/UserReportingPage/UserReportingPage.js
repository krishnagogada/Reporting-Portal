import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Select from 'react-select';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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

@observer
class UserReportingPage extends React.Component {

    @observable subCategories

    onChangeCategory = (selectedOption) => {

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

    mapTheOPtionsForCategory = (listOfOptions) => {
        return listOfOptions.map((eachOption) => { return { value: eachOption.categoryId, label: eachOption.categoryName } });
    }

    render() {

        const {
            onClickBackToObservationsList,
            onChangeTitleOfObservation,
            onChangeSubCategory,
            onChangeSeverity,
            onChangeDescription,
            onClickSubmit,
            descriptionValue,
            titleOfObservationValue,
            titleErrorMessage,
            descriptionErrorMessage,
            severityErrorMessage,
            categoryAndSubCategoryList,
            roleType

        } = this.props;

        const categoryOptions = this.mapTheOPtionsForCategory(categoryAndSubCategoryList);

        const severityOptions = [{ value: 'LOW', label: "LOW" },
            { value: 'MEDIUM', label: "MEDIUM" },
            { value: 'HIGH', label: "HIGH" }
        ];

        return (
            <DesktopLayout roleType={roleType}>
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
                        <Select onChange={this.onChangeCategory}
                                className={'category-select'} 
                                options={categoryOptions}
                        />
                        <SubCategoryText>{strings.subCategory}</SubCategoryText>
                        <Select onChange={onChangeSubCategory} 
                                className={'sub-category-select'} 
                                options={this.subCategories}
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
