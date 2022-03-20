import React from 'react';
import styled from 'styled-components';

const DropdownMenu = ({options, onChangeFunc, currentVal}) => {
    if (!currentVal) options = [{ label: 'Select', value: '' }, ...options];
    return (
        <DropdownMenuStyled>
            <select onChange={event => onChangeFunc(event.target.value)} value={currentVal}>
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select> 
        </DropdownMenuStyled>
    )
}

const DropdownMenuStyled = styled.div`
    width: 200px;
    padding: 1rem 0;
    text-align: left;

    select {
        border: 1px solid var(--font-color-2);
        border-radius: 10px;
        outline: none;
        background: transparent;
        height: 30px;
        padding:0 5px;
        width: 300px;
        color: inherit;
        text-align: left;
        font-size: large;

        @media screen and (max-width:1200px){
            font-size: medium;
        }
    }
`;

export default DropdownMenu;
