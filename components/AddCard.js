import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styled from "styled-components";
import { addCardToDeck, getDecks } from "../utils/api";
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

class AddCard extends Component {
    state = {
        question: '',
        answer:''
    }

    submit = () => {
        const { navigation } = this.props
        const id = navigation.state.params.entryId
        addCardToDeck(id, this.state)
        this.setState({
            question: '',
            answer: ""
        })
    }
    render() {
        
        return (
            <StyledViewContainer behavior="padding" >
                <StyledText>请填写问题和答案</StyledText>
                <MyInput
                    placeholder="问题"
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                />
                <MyInput
                    placeholder="答案"
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={this.state.answer}
                />
                <TextButton onPress={this.submit} >提交</TextButton>
            </StyledViewContainer >
        );
    }
}



export default AddCard