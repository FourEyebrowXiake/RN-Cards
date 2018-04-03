import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { getDecks, removeItem } from "../utils/api";
import styled from "styled-components";
import Button from "./TextButton";
import { clearLocalNotification, setLocalNotification } from '../utils/api'

const StyledTitle = styled.Text`
    font-size: 32px; 
    text-align: center;
    color: black;
`
const StyledSubtitle = styled.Text`
    font-size: 16px; 
    text-align: center;
    margin-top: 8px;
`

const StyledContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
`
const StyledTouchableOpacity = styled.TouchableOpacity`
    width: 80%;
     justify-content: center;
    alignItems: center;
`

class Cards extends Component {

    state = {
        questions: [],
        position: 0,
        status: true,
        grade: 0,
        gradeShow: false
    }
    componentDidMount() {
        this.setState({
            questions: this.props.navigation.state.params.questions
        })
    }

    onClick = (value) => {
        const { position, questions, grade } = this.state
        let regxp = new RegExp(value,"i")
        if (position < questions.length) {
            this.setState({
                grade: questions[position].answer.match(regxp) ? grade + 1 : grade,
                position: position + 1,
            })
        }

        if (position == questions.length - 1) {
            this.setState({
                gradeShow: true
            })
        }
    }

    render() {
        const { questions, status, position } = this.state
        return (
            <StyledContainer>
                <StyledSubtitle>
                    { position < questions.length ? position + 1: questions.length }/ {questions.length }
                </StyledSubtitle>
                <StyledTouchableOpacity
                    onPress={() => {
                        this.setState({ status: !status})
                    }}
                >
                {
                    this.state.status ? <View>
                            <StyledTitle>
                                {(questions && questions.length > 0 && position < questions.length)? questions[position].question : '测试完毕'}
                            </StyledTitle>
                            <StyledSubtitle
                                style={{
                                    color: 'red'
                                }}
                            >
                                问题
                            </StyledSubtitle>
                    </View> : <View>
                                <StyledTitle
                                    style={{
                                        color: 'red'
                                    }}
                                >
                                    {(questions && questions.length > 0 && position < questions.length) ? questions[position].answer : '测试完毕'}
                                </StyledTitle>
                                <StyledSubtitle>
                                    回答
                            </StyledSubtitle>
                    </View>
                }
                </StyledTouchableOpacity>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onPress={() => {
                            this.onClick('Yes')
                        }}
                    >正确</Button>
                    <Button  
                        onPress={() => {
                            this.onClick('No')
                        }}
                    >错误 </Button>
                    {
                        this.state.gradeShow ? <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    grade: 0,
                                    position: 0,
                                    gradeShow: false
                                })
                                clearLocalNotification().then(setLocalNotification)
                            }}
                        > 
                            <StyledSubtitle>
                                得分：{this.state.grade}
                            </StyledSubtitle>
                        </TouchableOpacity> : ''
                    }
                </View>
            </StyledContainer>
        );
    }
}

export default Cards