import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index.js';
const TextAreaComponent = styled.textarea `${tw `text-sm outline-none rounded`}
width:646px;
height:200px;
border:1px solid ${Colors.lightBlueGrey}`;

export { TextAreaComponent };
