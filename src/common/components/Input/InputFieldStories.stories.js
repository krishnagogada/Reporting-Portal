import React from 'react'
import { withKnobs,text, boolean } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import '../../../styles/tailwind.css'

import { ValidateUsername } from "../../../utils/ValidationUtils"

import { Input } from "./index"
export default {
    component: Input,
    title: 'Common/InputField'
 }
export const InputDefaultView = () => (
    <Input
    onChangeInputField={action("change fullname")}
        placeHolder={"FullName"}
        className={text('')}
        type={'text'}
    />
 )
 export const knobs = () => (
    <Input
    onChangeInputField={action("onChange")}
    placeHolder={text("PlaceHolder","FullName")}
    className={text('className','border border-solid border-red')}
    type={'text'}
    disable={text('')}
    showError={boolean(true)}
    />
 )
knobs.story = {
    decorators: [withKnobs]
 }
 