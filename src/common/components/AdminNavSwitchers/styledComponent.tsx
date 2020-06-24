import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index';
import { Typo18BrightBlueHKGroteskBold } from '../../styleGuide/Typos/index';

type styledComponentProps={
    active:boolean
}

const AssignedToMeAndMyObservations = styled.div `${tw `flex justify-between items-center`}width:313px;
margin-left:525px`;

const ActiveandInactiveNav = styled(Typo18BrightBlueHKGroteskBold)<styledComponentProps>
`${tw `cursor-pointer`}${props=>({color:props.active?Colors.brightBlue:Colors.steel})}`;

export {
    AssignedToMeAndMyObservations,
    ActiveandInactiveNav
};
