import React from 'react'
import { TextInput,  } from 'react-native'
import styled from "styled-components";

const StyledTextInput = styled.TextInput`
    width: 80%;
    height: 40px;
    border-radius: 8px; 
    border-color: black;
    border-width: 3px;
    margin-top: 8px;
`


export default function TextButton({ value, onChangeText, placeholder }) {
    return (
        <StyledTextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
        />
    )
} 