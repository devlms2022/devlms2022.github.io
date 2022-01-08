import React from 'react'
import styled from 'styled-components';

const Tittle = (props) => {
    const {children, color} = props;
    return (
        <Typography6 {...props} color={color} >
            {children}
        </Typography6>
    )
}

const Typography6 = styled.h6`
    color : ${props => props.color ? `var(${props.color})` : 'var(--font-dark-color)'};
    font-weight : 300;
    font-size : 24px;
    span {
        font-weight : 600;
        font-size : 24px;
    }
`;

export default Tittle;
