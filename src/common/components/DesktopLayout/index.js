import React from 'react';
import DesktopHeader from '../DesktopHeader';
import { UserObservationsListContainer } from './styledComponent.js';
class DesktopLayout extends React.Component {

    render() {
        const { children, type } = this.props;

        return (
            <UserObservationsListContainer>
                <DesktopHeader type={type}/>
                {children}
            </UserObservationsListContainer>
        );
    }

}

export { DesktopLayout };
