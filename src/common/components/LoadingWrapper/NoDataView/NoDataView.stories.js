import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, object, array, color } from '@storybook/addon-knobs'
import { NoDataViewContainer, NoDataViewText } from './styledComponents'

import '../../../styles/tailwind.css'
import NoDataView from './index.js'

export default {
   component: NoDataView,
   title: 'Common/NoDataView'
}

const colorLabel = 'Color'
const defaultValueOfColor = '#ff00ff'
const tailwindStylesLabel = 'Styles'
const defaultValueOfTailwindStyle = ['border border-solid border-black']
const separator = ''

export const defaultView = () => (
   <NoDataViewContainer
      style={{ backgroundColor: color(colorLabel, defaultValueOfColor) }}
      className={array(
         tailwindStylesLabel,
         defaultValueOfTailwindStyle,
         separator
      )}
   >
      <NoDataViewText>
         {text('Not found message', 'No Data Found!')}
      </NoDataViewText>
   </NoDataViewContainer>
)

defaultView.story = {
   decorators: [withKnobs]
}
