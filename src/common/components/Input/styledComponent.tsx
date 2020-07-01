import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index';

type InputComponentProps={
    showError:boolean | undefined
}

const InputComponent = styled.input<InputComponentProps> 
                        `${tw `text-sm rounded py-2 pl-4 outline-none h-10`} 
                        ${props=>({border:props.showError?'1px solid red':'1px solid black'})}
                        color:${Colors.darkBlue};
                        width:320px;`;

export { InputComponent };
