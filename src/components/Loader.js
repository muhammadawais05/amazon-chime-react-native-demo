import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'


const Loader = ()=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    }
});


export default Loader;