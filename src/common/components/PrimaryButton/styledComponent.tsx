import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Colors } from '../../Themes/Colors/index';
const ButtonComponent = styled.button `
   ${tw`flex justify-center text-sm text-center text-white px-5 py-2 outline-none`}
   border-radius: 4px;
   background-color: ${Colors.brightBlue};
`
export default ButtonComponent
