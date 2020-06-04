import React from 'react';
import DesktopHeader from '../DesktopHeader';
import { UserObservationsListContainer } from './styledComponent.js';
class DesktopLayout extends React.Component {

    render() {
        const { children, roleType } = this.props;
        return (
            <UserObservationsListContainer>
                <DesktopHeader roleType={roleType}/>
                {children}
            </UserObservationsListContainer>
        );
    }

}

export { DesktopLayout };
