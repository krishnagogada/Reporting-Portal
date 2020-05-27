import React from 'react';
import { SelectComponent } from './styledComponent.js';

class Select extends React.Component {
    render() {
        const { styles, disable, options } = this.props;
        return (
            <SelectComponent className={styles} disable={disable}>
                {options.map((eachOption)=><option>{eachOption}</option>)}
            </SelectComponent>);
    }
}

export { Select };
