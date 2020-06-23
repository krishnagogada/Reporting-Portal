import React from 'react';
import DesktopHeader from '../DesktopHeader';
import { UserObservationsListContainer } from './styledComponent';

type desktopLayoutProps={
    roleType:string
}
class DesktopLayout extends React.Component<desktopLayoutProps> {

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
