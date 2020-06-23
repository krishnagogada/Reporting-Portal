import React from 'react';

import { RadioFieldContainer, LabelName } from './styledComponent';
import strings from '../../i18n/strings.json';
import './index.css';

type radioFieldProps={
    options:Array<string>
    name:string
    onChangeRadio:(event:any)=>void
}

class RadioField extends React.Component<radioFieldProps> {

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
