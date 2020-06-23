import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import { ToastContainer, Slide } from 'react-toastify';

import strings from '../../../../common/i18n/strings.json';
import { Input } from '../../../../common/components/Input';
import { TextAreaField } from '../../../../common/components/TextAreaField';
import { PrimaryButton } from '../../../../common/components/PrimaryButton';
import { DesktopLayout } from '../../../../common/components/DesktopLayout';

import { SeverityList } from '../../constants/optionsConstants/optionsConstants';

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
    RequiredField,
    TitleBoxAndError
}
from './styledComponent';
import './index.css';

import { categoryType } from '../../stores/UserStore/index'

type userReportingPageProps={

    onChangeCategory:(selectedOption:any)=>void
    categoryAndSubCategoryList:Array<categoryType>
    onClickBackToObservationsList:()=>void
    onChangeTitleOfObservation:(event:any)=>void
    onChangeSubCategory:(selectedOption:any)=>void
    onChangeSeverity:(selectedOption:any)=>void
    onChangeDescription:(event:any)=>void
    onClickSubmit:()=>void
    descriptionValue:string
    titleOfObservationValue:string
    titleErrorMessage:string
    descriptionErrorMessage:string
    severityErrorMessage:string
    roleType:string
}

@observer
class UserReportingPage extends React.Component<userReportingPageProps> {

    @observable subCategories
    @observable selectedCategoryId = 0

    onChangeCategory = (selectedOption:{value:number}) => {

        const { onChangeCategory, categoryAndSubCategoryList } = this.props;

        categoryAndSubCategoryList.forEach((eachCategory) => {
            if (eachCategory.categoryId === selectedOption.value) {
                this.subCategories = eachCategory.subCategories.map((eachSubCategory) => {
                    return { value: eachSubCategory.subCategoryId, label: eachSubCategory.subCategoryName };
                });
            }
        });
        this.selectedCategoryId = selectedOption.value;
        onChangeCategory(selectedOption);
    }

    mapTheOPtionsForCategory = (listOfOptions:Array<categoryType>) => {
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

        const severityOptions = SeverityList.map((eachOption) => { return { value: eachOption.toUpperCase(), label: eachOption } });
        return (
            <DesktopLayout roleType={roleType}>
                <UserReportingPageInnerContainer>
                
                    <BackToObservationList>
                        <FiChevronLeft className={'left-arrow'} />
                        <BackToObservationListText onClick={onClickBackToObservationsList}>{strings.backToObservations}</BackToObservationListText>
                    </BackToObservationList>
                    
                    <TitleObservationFieldAndLabel>
                        <TitleOfObservationText>{strings.titleOfObservation}<RequiredField>*</RequiredField></TitleOfObservationText>
                        <TitleBoxAndError>
                            <Input  onChangeInputField={onChangeTitleOfObservation} 
                                className={'title-of-observation'} 
                                type={strings.text} 
                                value={titleOfObservationValue}
                                testId='title-id'
                            />
                            <ErrorMessage>{titleErrorMessage}</ErrorMessage>
                        </TitleBoxAndError>
                    </TitleObservationFieldAndLabel>
                    
                    <CategoryAndSubCategoryWithFieldAndLabel>
                        <CategoryText>{strings.category}</CategoryText>
                        <Select onChange={this.onChangeCategory}
                                className={'category-select'} 
                                options={categoryOptions}
                                data-testid='category-field'
                        />
                        <SubCategoryText>{strings.subCategory}</SubCategoryText>
                        <Select onChange={onChangeSubCategory} 
                                className={'sub-category-select'} 
                                options={this.subCategories}
                                key={this.selectedCategoryId}
                                data-testid='sub-category-field'
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
                        <DescriptionText>{strings.description}<RequiredField>*</RequiredField>
                        </DescriptionText>
                        <TextAreaField  onChangeTextAreaField={onChangeDescription} value={descriptionValue} testId='description-field'/>
                        <ErrorMessage>{descriptionErrorMessage}</ErrorMessage>
                    </DescriptionAndTextAreaField>
                    
                    <UploadField>
                        <AttachementsText>{strings.attachements}</AttachementsText>
                        <Input type={strings.fileType} />
                    </UploadField>
                    
                    <PrimaryButton onClickButton={onClickSubmit} className={'submit-button'}>{strings.submit}</PrimaryButton>
                    <ToastContainer hideProgressBar={true} autoClose={3000} closeButton={false} transition={Slide} position="bottom-center"/>
                    
                </UserReportingPageInnerContainer>
           </DesktopLayout>
        );
    }
}

export { UserReportingPage };
