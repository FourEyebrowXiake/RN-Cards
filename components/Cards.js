import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { getDecks, removeItem } from "../utils/api";
import styled from "styled-components";

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

const StyledCard = styled.View`
    width: 90%;
    height: 200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-bottom-color: black;
    border-bottom-width: 3px;
`


class Cards extends Component {

    state = {
        decks: [],
        refreshing : false
    }

    componentDidMount() {
        
        getDecks().then((data) => {
            let res = Object.keys(data).map((key) => {
                if(key!="") {
                    return data[key]
                }
                return {
                    title: 'no title',
                    questions: []
                }
            })

            this.setState({
                decks: res
            })
        })
    }
  
    _onRefresh = () => {
        this.setState({ refreshing: true });
        getDecks().then((data) => {
            let res = Object.keys(data).map((key) => {
                if (key != "") {
                    return data[key]
                }
                return {
                    title: 'no title',
                    questions: []
                }
            })

            this.setState({
                decks: res,
                refreshing: false
            })
        })
    }


    render() {
        return (
            <FlatList 
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                data={this.state.decks}
                renderItem={({item}) => {
                   return (
                       <TouchableOpacity 
                           onPress={() => {
                               const { navigate } = this.props.navigation;
                                navigate(
                                   'Card',
                                   { entry: item }
                               )   
                           }}
                       >
                           <StyledCard>
                               <StyledTitle>{item.title}</StyledTitle>
                               <StyledSubtitle>{item.questions.length} 张卡片</StyledSubtitle>
                           </StyledCard>
                       </TouchableOpacity>
                   )
                } }
            />
        );
    }
}

export default Cards