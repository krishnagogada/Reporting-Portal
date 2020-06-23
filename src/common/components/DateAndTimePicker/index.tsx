import React from 'react';

type dateAndTimePickerProps ={
    onChangeDateAndTimePicker:(event:any)=>void
    value:any
    isDisabled:boolean
}

class DateAndTimePicker extends React.Component<dateAndTimePickerProps> {
    render() {
        const { onChangeDateAndTimePicker, value, isDisabled } = this.props;
        return (
            <input type='datetime-local' value={value} onChange={onChangeDateAndTimePicker} disabled={isDisabled}/>
        );
    }
}

export { DateAndTimePicker };
