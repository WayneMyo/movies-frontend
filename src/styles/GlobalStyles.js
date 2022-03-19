import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

.light-theme {
    --primary-color: #FF9900;
    --primary-color-light: #FFAD33; 
    --primary-color-lighter: #FFCE85;
    --secondary-color: #11455B;
    --background-color-1: #FFFFFF;
    --background-color-2: #232F3D;
    --overlay-color: #FFFFFF;
    --font-color-1: #FFECD6;
    --font-color-2: #131A22;
    --font-color-3: #3B4F68;
    --font-color-4: #FFECD6;
    --shadow-color: #D7DFEA;
    --shadow-color-2: #AFBFD5;
    --shadow-color-3: #D7DFEA;
    --border-color: #51687B;
    --border-color-2: #11455B;
    --toggler-color: #FF9900;
    --toggler-svg-color: #FF9900;
    --toggler-background-color: #F5F5F5;
}
.dark-theme {
    --primary-color: #0078D4;
    --primary-color-light: #0080FF; 
    --primary-color-lighter: #89C4FF;
    --secondary-color: #7FBE4C;
    --background-color-1: #1A1A1F;
    --background-color-2: #041225;
    --overlay-color: #000000;
    --font-color-1: #B8B8B8;
    --font-color-2: #B8B8B8;
    --font-color-3: #F0FFFF;
    --font-color-4: #000000;
    --shadow-color: #243A5E;
    --shadow-color-2: #F4F5F6;
    --shadow-color-3: #212C45;
    --border-color: #40404F;
    --border-color-2: #75A051;
    --toggler-color: #FF9900;
    --toggler-svg-color: #0078D4;
    --toggler-background-color: #121216;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    
}

body {
    background-color: var(--background-color-1);
    color: var(--font-color-2);
    transition: all .6s ease-in-out;
}

// floating toggler
.light-dark-mode {
    position: absolute;
    right: 0;
    top: 50%;
    background-color: var(--toggler-background-color);
    width: 3rem;
    height: 2rem;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15% 0 0 15%;
    opacity: 0.6;
    transition: all .4s ease-in-out;
    &:hover {
        width: 5em;
        opacity: 1;
        transition: all .4s ease-in-out;
        .right-content {
            opacity: 1;
            height: auto;
            width: auto;
        }
    }
    .right-content {
        display: flex;
        opacity: 0;
        height: 0;
        width: 0;
        overflow: hidden;
        transition: opacity 0.8s ease-in-out;
    }
    svg {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
      font-size: 1.2rem;
      color: var(--toggler-svg-color);
    }
  }

  //Nav Toggler
  .ham-burger-menu {
      position: absolute;
      right: 1%;
      top: 5rem; 
      display: none;
      z-index: 15;
      opacity: 0.6;
      transition: opacity .5s ease-out;
      svg {
          font-size: 3rem;
          color: #ffffff;
      }
      &:hover {
          opacity: 1;
          svg {
            font-size: 3.5rem;
            color: var(--primary-color);
          }
      }
    }

    .nav-toggle {
        transform: translateY(0);
        z-index: 10;
    }
  @media screen and (max-width:1200px){
    .ham-burger-menu {
        display: block;
    }
  }
`;

export default GlobalStyle;