import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index.js';

const InputComponent = styled.input `${tw `text-sm rounded py-2 pl-4 outline-none h-10`}
                        color:${Colors.darkBlue};
                        width:320px;`;

export { InputComponent };
