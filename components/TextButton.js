import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black } from '../utils/colors'
import styled from "styled-components";


const StyledTouchableOpacity = styled.TouchableOpacity`
    margin-top: 16px;
    border-radius: 7px;
    width: 30%;
    height: 45px;
    background-color: black;
     justify-content: center;
    alignItems: center;
`
const StyledSubmitText = styled.Text`
    color: white;
    fontSize: 22px;
    textAlign: center;
`

export default function TextButton({ children, onPress, }) {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
    >
      <StyledSubmitText>{children}</StyledSubmitText>
    </StyledTouchableOpacity>
  )
} 