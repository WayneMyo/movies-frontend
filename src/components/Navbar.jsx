import React from 'react'
import styled from 'styled-components';

const Navbar = ({navToggle, theme}) => {
    return (
        <NavbarStyled className={`${navToggle ? 'nav-toggle' : ''}`}>
            
        </NavbarStyled>
    )
}

const NavbarStyled = styled.div`
    width: 100vw;
    position: fixed;
    height: 4rem;
    background-color: var(--background-color-2);
    overflow: hidden;
    z-index: 10;
    transition: all .4s ease-in-out;
    @media screen and (max-width:1200px){
        transform: translateX(-100%);
    }
`;

export default Navbar;
