import React from 'react'
import styled from 'styled-components';

const Tittle = (props) => {
    const {text, color} = props;
    return (
        <Typography1 {...props} color={color} >
            {text}
        </Typography1>
    )
}

const Typography1 = styled.h1`
    color : ${props => props.color ? `var(${props.color})` : 'var(--font-dark-color)'};
    font-weight : 300;
`;

export default Tittle;
