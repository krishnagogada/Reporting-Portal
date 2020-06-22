import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {css} from '@emotion/core'

import {BaseButton} from './BaseButton/BaseButton'

export const OvalVarient = css`${tw `rounded`}`

export const RectangularVarient = css`${tw `rounded-none`}`

export const Outline = styled(BaseButton)`${tw `bg-white`}`