import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { getDecks, removeItem } from "../utils/api";
import styled from "styled-components";
import Button from "./TextButton";


const StyledTitle = styled.Text`
    font-size: 64px; 
    text-align: center;
    color: black;
`
const StyledSubtitle = styled.Text`
    font-size: 16px; 
    text-align: center;
    color: gray;
`

const StyledContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`


class Cards extends Component {

    render() {
        const { navigation } = this.props
        const entry = navigation.state.params.entry
        return (
            <StyledContainer>
                <StyledTitle>
                    {entry.title}
                </StyledTitle>
                <StyledSubtitle>
                    {entry.questions.length} 张卡片
                </StyledSubtitle>
                <Button 
                    onPress={() => { 
                        const { navigate } = this.props.navigation;
                        navigate(
                            'AddCard',
                            { entryId: entry.title }
                        )
                    }}
                >添加卡片</Button>
                <Button 
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate(
                            'Test',
                            { questions : entry.questions }
                        )
                    }}
                >开始测验 </Button>
            </StyledContainer>
        );
    }
}

export default Cards