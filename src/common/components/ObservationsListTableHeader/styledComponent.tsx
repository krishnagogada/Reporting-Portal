import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../styleGuide/Typos/index';

const TableHeading = styled.th `${tw ``}width:177px`;

const Heading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)
`${tw `h-4 pr-2`}`;

const HeadingWithDropDown = styled.div `${tw `flex justify-center cursor-pointer`}`;

const HeadingRow = styled.tr `${tw ``}height:66px`;

export { TableHeading, Heading, HeadingWithDropDown, HeadingRow };
