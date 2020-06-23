import React from 'react';
import { TextAreaComponent } from './styledComponent';

type textAreaFieldProps={
    value:string
    onChangeTextAreaField:(event:any)=>void
    testId?:string
}

class TextAreaField extends React.Component<textAreaFieldProps> {
    render() {
        const { value, children, onChangeTextAreaField,testId } = this.props;
        return (
            <TextAreaComponent value={value} onChange={onChangeTextAreaField} name="description" data-testid={testId} rows={8} cols={80}>{children}</TextAreaComponent>
        );
    }
}

export { TextAreaField };
