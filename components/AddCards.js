import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import styled from "styled-components";
import { saveDeckTitle, getDecks } from "../utils/api";
import TextButton from "./TextButton";
import MyInput from "./TextInput"

const StyledViewContainer = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    alignItems: center;
`

const StyledText = styled.Text`
    margin-bottom: 16px;
    font-size: 64px; 
    text-align: center;
`

class AddCards extends Component {
    state = {
        title: ''
    }

    submit = () => {
        saveDeckTitle(this.state.title)
        this.setState({
            title: ''
        })
    }
    render() {
        return (
            <StyledViewContainer behavior="padding" >
                <StyledText>请填写卡片集的标题</StyledText>
                <MyInput 
                    placeholder="标题"
                    onChangeText ={(text) => this.setState({title: text})}
                    value={this.state.title}
                />
                <TextButton onPress={this.submit} >提交</TextButton>
            </StyledViewContainer >
        );
    }
}



export default AddCards