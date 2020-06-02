import React from 'react';
import { Input } from '../Input/index.js';
import { RadioFieldContainer, LabelName } from './styledComponent.js';
import strings from '../../i18n/strings.json';
import './index.css';

class RadioField extends React.Component {

    renderRadioInputsWithLabel = () => {
        const { options, name, onChangeRadio } = this.props;
        return options.map((eachOption) => {
            return <RadioFieldContainer>
                        <input type={strings.radioType} value={eachOption} name={name} className={'radio-type-input'} onChange={onChangeRadio}/>
                        <LabelName>{eachOption}</LabelName>
                    </RadioFieldContainer>;
        });
    }
    render() {
        return (this.renderRadioInputsWithLabel());
    }
}

export { RadioField };
