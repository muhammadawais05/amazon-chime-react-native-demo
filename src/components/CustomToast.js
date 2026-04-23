import React from 'react'
import Toast, {BaseToast} from 'react-native-toast-message';
import { Colors } from './../components/styles'




//destructure the imported colors
const {green, red, dark} = Colors;

export const CustomToast = {
    success: ({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: green }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15
            }}
            text2Style={{
                fontSize: 12,
                color:dark
            }}
            activeOpacity={1}
            text1={text1}
            leadingIcon={ require( '../assets/success.png' ) }
            onTrailingIconPress={() => { Toast.hide() }}
        />
    ),
    error:({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: red }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
            }}
            text2Style={{
                fontSize: 12,
                color:dark
            }}
            text1={text1}
            leadingIcon={ require( '../assets/error.png' ) }
            onTrailingIconPress={() => { Toast.hide() }}
        />
    ),
    info:({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: 'steelblue' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
            }}
            text2Style={{
                fontSize: 12,
                color:dark
            }}
            text1={text1}
            leadingIcon={ require( '../assets/info.png' ) }
            onTrailingIconPress={() => { Toast.hide() }}
        />
    )
};
