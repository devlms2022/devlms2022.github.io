import { TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
    const {width, height, mr, mb, ml, mt} = props;
    return (
       <InputStyled ml={ml} mt={mt} mr={mr} mb={mb}  {...props} width={width} height={height}/>
    )
};

const InputStyled = styled(TextField)`
    /* min-width : 320px; */
    width: ${props => (props.width ? props.width : '200px')};
    margin-left : ${props => (props.ml ? props.ml+"px" : 0)};
    margin-right : ${props => (props.mr ? props.mr+"px" : 0)};
    margin-top : ${props => (props.mt ? props.mt+"px" : 0)};
    margin-bottom : ${props => (props.mb ? props.mb+"px" : 0)};

`;

export default Input;
