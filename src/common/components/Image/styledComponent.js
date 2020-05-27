import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const ImageComponent = styled.img`${tw`object-contain`}${props => ({
   width: props.width,
   height: props.height
})}`

export { ImageComponent }
