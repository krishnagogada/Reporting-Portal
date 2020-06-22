import React from 'react';

class DateAndTimePicker extends React.Component {
    render() {
        const { onChangeDateAndTimePicker, value, isDisabled } = this.props;
        return (
            <input type='datetime-local' value={value} onChange={onChangeDateAndTimePicker} disabled={isDisabled}/>
        );
    }
}

export { DateAndTimePicker };
