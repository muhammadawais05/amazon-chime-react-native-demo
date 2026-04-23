import React from 'react'
import {TouchableOpacity, Image, View} from 'react-native'
import styles from '../screens/Style';
import Icon from 'react-native-vector-icons/Feather';

export const HangOffButton = ({onPress}) => {
  return (  
    <View style={styles.meetingButtonWrap}>
      <TouchableOpacity

        onPress={() => {
          onPress();
      }}>
          <Icon name="phone-off" size={25} color="#900" />
      </TouchableOpacity>
    </View>
  ) 
}
