import React, {useState} from 'react'
import { Formik } from 'formik';
import { View, Text } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import Toast from 'react-native-toast-message';
import {CustomToast} from '../components/CustomToast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _fetch } from '../components/Fetch.js'
import Icon from 'react-native-vector-icons/Feather';

//import formik
import { 
    Colors,
    StyledContainer, 
    InnerContainer, 
    PageLogo,
    PageTitle, 
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    BrandButton,
    ButtonText,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles'





//destructure the imported colors
const { primary, brand, brandDark } = Colors;




const handleResendAuthPress = () => {
    Toast.show({
        style:'success',
        text1:'Done!',
        text2:'Check your inbox, you should recieve an email from account@engage-sop.com'
    })
}




const setSessionData = async (data) => {
    try{
        data = JSON.stringify(data)
        let x = await AsyncStorage.setItem('user-session', data)
    }catch(error){
        console.log(error)
    }
}


const removeData = () => {
    try {
        AsyncStorage.removeItem('user-session')
    } catch (error) {
        console.log(error)
    }
}




const MyTextInput = ({ label, icon, ...props }) => {
    return(
        <View>
            <LeftIcon>
                <Icon name={icon} size={25}  color={brandDark} />
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}








const Login = ( {navigation} ) => {


    const [ resendEmail, setResendEmail ] = useState('')
    const [ resend, setResent ] = useState(false)
    const [ processing, setProcessing ] = useState(false)
    removeData()


    let content;


    if(processing){
        return(
            <View style={[styles.loader, { backgroundColor:primary }]}>
                <PageLogo source={require('../assets/Engage_SubmarkSQ.png')} />
                <Text style={{color:brandDark}}> Logging you in... </Text>
            </View>
        )
    }

    if (resend) {
        return (
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                <Toast config={CustomToast} ref={ ref => Toast.setRef(ref) } />
                    <InnerContainer style={styles.container}>
                        <StyledFormArea>
                            <PageTitle textColor={brandDark}> Resend Auth Code </PageTitle>

                            <MyTextInput 
                                label="Email Address" 
                                icon="mail" 
                                placeholder="example@test.com" 
                                placeholderTextColor={brand}
                                onChangeText={setResendEmail}
                                value={resendEmail}
                                keyboardType="email-address"
                            />

                            <BrandButton onPress={handleResendAuthPress}>
                                <ButtonText textColor={brandDark}>
                                    Resend Auth Code
                                </ButtonText>
                            </BrandButton>

                            <Line/>

                            <ExtraView>
                                <TextLink>
                                    <TextLinkContent onPress={() => { Toast.hide(); setResent(!resend)} }> Back to Login </TextLinkContent>
                                </TextLink>
                            </ExtraView>

                        </StyledFormArea>
                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        )
    }
    
    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                    <Toast style={{zIndex:3}} config={ CustomToast } ref={ (ref) => Toast.setRef(ref) } />
                    <InnerContainer>    

                        <PageLogo style={{zIndex:1}} resizeMode="cover" source={require('./../assets/Engage_SubmarkSQ.png')}/>

                        <Formik
                            initialValues={{email:'', auth:''}}
                            onSubmit={(v) =>{

                                if(!v.auth || !v.email){
                                    Toast.show({
                                        type:'error',
                                        text1:'Error',
                                        text2:'Please enter both: your email and auth code.'
                                    })
                                    return
                                }


                                //conver email to lower case.
                                v.email = v.email.toLowerCase()
                                setProcessing(true)
                                _fetch(`https://api.engage-sop.com/v1/users/auth/${v.email}/${v.auth}`)
                                .then( r => {
                                    console.log(r)
                                    setTimeout( () => {
                                        setProcessing(false)
        
                                        if(r.status){ 
                                            setSessionData(r.data)
                                            navigation.navigate("Welcome") 
                                            return
                                        }
                                    
                                        
                                        Toast.show({
                                            type:'error',
                                            text1:'Ooops!',
                                            text2:r.msg
                                        })
                                        
                                    }, 1000)



                                }) 

                                
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values}) => (

                                <StyledFormArea>

                                    {/* Email Input */}
                                    <MyTextInput 
                                        label="Email Address" 
                                        icon="mail"
                                        inlineImageLeft="video"
                                        placeholder="example@test.com" 
                                        placeholderTextColor={brand}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />


                                    {/* AuthCode Input */}
                                    <MyTextInput 
                                        label="Authentication Code" 
                                        icon="lock" 
                                        placeholder="848484" 
                                        placeholderTextColor={brand}
                                        onChangeText={handleChange('auth')}
                                        onBlur={handleBlur('auth')}
                                        value={values.auth}
                                        keyboardType="numeric"
                                    />


                                    {/* Login Button */}
                                    <BrandButton onPress={handleSubmit}>
                                        <ButtonText textColor={brandDark}>
                                            Login
                                        </ButtonText>
                                    </BrandButton>


                                    {/* Separation Line */}
                                    <Line />
                                    
                                    <ExtraView>
                                        <ExtraText> Auth Code not Working? </ExtraText>
                                        <TextLink>
                                            <TextLinkContent onPress={() => { Toast.hide(); setResent(!resend) } }> Resend Auth Code! </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>

                                </StyledFormArea>
                            )}
                        </Formik>

                    </InnerContainer>
                </StyledContainer> 
        </KeyboardAvoidingWrapper>
    )  
}




const styles = {
    container:{
        marginTop:'50%',
        paddingBottom:'50%'
    },
    loader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
}



export default Login;
