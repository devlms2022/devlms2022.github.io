import { TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
    const {width, height} = props;
    return (
       <InputStyled {...props} width={width} height={height}/>
    )
};


const InputStyled = styled(TextField)`
    /* min-width : 320px; */
    width: ${props => (props.width ? props.width : '200px')};

`;

export default Input;
