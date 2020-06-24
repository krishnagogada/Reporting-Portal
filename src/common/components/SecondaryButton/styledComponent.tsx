import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Colors } from '../../Themes/Colors/index';

const ButtonComponent = styled.button `
   ${tw`text-sm text-center outline-none rounded`}
   border:1px solid ${Colors.lightBlueGrey};
`;
export default ButtonComponent;
