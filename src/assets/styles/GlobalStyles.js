import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root {
        --primary-color: #3F51B5;
        --danger-color: #3F51B5;
        --primary-color-light: #057FFF;
        --secondary-color: #6c757d;
        --background-dark-color: #10121A;
        --background-dark-grey: #191D2B;
        --border-color: #2e344e;
        --background-light-color: #F1F1F1;
        --background-light-color-2: rgba(3,127,255,.3);
        --white-color: #FFF;
        --font-light-color: #a4acc4;
        --font-dark-color: #000000;
        --font-dark-color-2: #151515;
        --sidebar-dark-color: #191D2B;
        --scrollbar-bg-color: #383838;
        --scrollbar-thump-color: #6b6b6b;
        --scrollbar-track-color: #383838;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 16px;
        list-style: none;
        line-height: 150%;
        letter-spacing: 0.15px;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
    }

    body {
        background-color: var(--background-light-colorr);
        color: var(--font-dark-color);
        /* transition: all .4s ease-in-out; */
    }

    a {
        font-family: inherit;
        color: inherit;
        font-size: inherit;
        font-size: 1rem;
    }

    h1 {
        font-size: 60px;
        span {
            font-size: 60px;
            color: var(--primary-color);
        }
    }

    h6 {
        color : var(--white-color);
        font-size: 1.2rem;
        padding-bottom: .6rem;
    }

    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
    }
`;

export default GlobalStyle;
