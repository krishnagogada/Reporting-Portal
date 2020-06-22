import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { Colors } from '../../../Themes/Colors/index.js';

export const BaseButtonWrapper=styled.button`${tw `flex justify-center items-center px-2 py-1 text-white`}background-color:${Colors.brightBlue}${props=>props.css}`;