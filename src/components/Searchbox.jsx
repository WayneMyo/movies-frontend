import React from 'react';
import styled from 'styled-components';

const Searchbox = ({title, onChangeFunc}) => {
    return (
        <SearchboxStyled>
            <input type="text" placeholder={title} name="search" onChange={onChangeFunc}/>
        </SearchboxStyled>
    )
}

const SearchboxStyled = styled.div`
    width: 200px;
    padding: 1rem 0;
    
    input {
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

export default Searchbox;
