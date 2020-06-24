import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index';

const ObservationListTableContainer = styled.table `${tw `rounded mb-12`}
width:1240px;
border:1px solid ${Colors.lightBlueGrey};`;

export { ObservationListTableContainer };