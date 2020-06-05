import React from 'react';
import { TextAreaComponent } from './styledComponent.js';
class TextAreaField extends React.Component {
    render() {
        const { value, children, onChangeTextAreaField } = this.props;
        return (
            <TextAreaComponent value={value} rows='8' cols='80' onChange={onChangeTextAreaField} name="description">{children}</TextAreaComponent>
        );
    }
}

export { TextAreaField };
