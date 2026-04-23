import React from 'react'
import {TouchableOpacity, Image, View} from 'react-native'
import styles from '../screens/Style';
import Icon from 'react-native-vector-icons/Feather';

export const MuteButton = ({muted, onPress}) => {
  return (  
    <View style={styles.meetingButtonWrap}>
      <TouchableOpacity

        onPress={() => {
          onPress();
      }}>
          <Icon name={muted ? "mic-off" : "mic"} size={25} color={muted ? "#900" : "#000"} />
      </TouchableOpacity>
    </View>
  ) 
}
