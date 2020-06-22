import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Typo32BrightBlueHKGroteskMedium } from '../../../../common/styleGuide/Typos/index.js';

const AdminObservationListHeading = styled(Typo32BrightBlueHKGroteskMedium)
`${tw `mt-12 mb-6`}width:1240px`;
const AdminObservationsListContainer = styled.div `${tw `flex flex-col justify-center items-center`}`;
const ObservationListFilters = styled.div `${tw `flex justify-between items-center mb-6`}width:1240px`;

const CategorySelects = styled.div `${tw `flex items-center`}`;
const Filter = styled.div `${tw `flex items-center`}`;

export { AdminObservationsListContainer, AdminObservationListHeading, ObservationListFilters, CategorySelects, Filter };
