import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Cards from './components/Cards'
import AddCards from './components/AddCards'
import Card from './components/Card'
import { blue, white, orange } from './utils/colors'
import AddCard from './components/AddCard'
import Test from './components/Test'
import { setLocalNotification } from './utils/api'



function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Cards: {
    screen: Cards,
    navigationOptions: {
      tabBarLabel: 'Cards',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddCards: {
    screen: AddCards,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? orange : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : orange,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Card: {
    screen: Card,
  },
  AddCard: {
    screen: AddCard
  },
  Test: {
    screen: Test
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  
  render() {
      return (
        <View style={{ flex: 1 }} >
          <UdaciStatusBar backgroundColor={orange} barStyle="light-content" />
          <MainNavigator />
        </View>
    )
  }
}
