import React from 'react'
import {TouchableOpacity, Image, View} from 'react-native'
import styles from '../screens/Style';
import Icon from 'react-native-vector-icons/Feather';

export const CameraButton = ({disabled, onPress}) => {
  return (  
    <View style={styles.meetingButtonWrap}>
      <TouchableOpacity

        onPress={() => {
          onPress();
      }}>
          <Icon name={disabled ? "video-off" : "video"} size={25} color={disabled ? "#900" : "#000"} />
      </TouchableOpacity>
    </View>
  ) 
}
