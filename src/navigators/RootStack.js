import React, { useState, useEffect } from 'react'
import {  StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors, PageLogo } from './../components/styles'

import Login from '../screens/Login'
import Welcome from '../screens/Welcome'
import Profile from '../screens/Profile'
import Call from '../screens/Call'
import Question from '../screens/Question'

const {brandDark, tertiary} = Colors;

const Stack = createStackNavigator();

const RootStack =  ( ) => {
    const [ isLoading, setIsLoading ] = useState('Loading')

    const getSessionData = () => {
        try {
            AsyncStorage.getItem('user-session')
            .then( r => {
                if(r != null){
                    setTimeout( () => { setIsLoading('LoggedIn') }, 1500 )
                }else{
                    setIsLoading(2)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(getSessionData, [])

    if(isLoading == 'Loading'){
        return (
            <View style={[styles.container, styles.horizontal]}>
                <PageLogo source={require('../assets/Engage_SubmarkSQ.png')} />
                <Text style={{color:brandDark}}> Loading... </Text>
                {/* <ActivityIndicator size="large" color="#00ff00" /> */}
            </View>
        )
    }

    let default_page = 'Login'

    if(isLoading == 'LoggedIn'){
        default_page = 'Welcome'
    }

    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTintColor:tertiary,
                    headerTransparent:true,
                    headerTitle:"",
                    headerLeftContainerStyle:{
                        paddingLeft:20
                    }
                }}
                initialRouteName={default_page}
            >
                <Stack.Screen options={{ headerLeft: null }} name="Login" component={Login} />
                <Stack.Screen options={{ headerLeft: null }} name="Welcome" component={Welcome} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen options={{ headerLeft: null }} name="Call" component={Call} />
                <Stack.Screen name="Question" component={Question} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent: "center"
    }
})

export default RootStack;
