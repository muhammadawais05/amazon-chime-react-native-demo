import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import SelectDropdown from 'react-native-select-dropdown'
import { _fetch } from '../components/Fetch.js'
import Icon from 'react-native-vector-icons/Feather';
import { 
    Colors,
    StyledContainer, 
    InnerContainer, 
    PageTitle,
    PageLogo, 
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    BrandButton,
    ButtonText,
    Line
} from '../components/styles'

const {primary, brand, brandDark } = Colors;






const showMessage = () => {
    alert('Clicked the button')
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



const showConfirmDialog = (title, msg) => {
    return Alert.alert( title, msg, [{text: "Ok"}] );
};




const Profile = ({navigation})=>{

    const [ userInfo, setUserInfo ] = useState('')
    const [ lang, setLang ] = useState('')
    const [ fullname, setFullname ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ processing, setProcessing ] = useState(false)


    const getSessionData = async () => {
        try {
            let x = await AsyncStorage.getItem('user-session')
            .then( r => {
                if(r != null){
                    const data = JSON.parse(r)
                    setUserInfo(data)
                    setFullname(data.fullname)
                    setEmail(data.email)
                    setLang(data.translation)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }




    const setSessionData = async (data) => {
        try{
            data = JSON.stringify(data)
            let x = await AsyncStorage.setItem('user-session', data)
        }catch(error){
            console.log(error)
        }
    }





    const saveChanges = () => {

        userInfo.email = email
        userInfo.fullname = fullname
        userInfo.translation = lang
        console.log( userInfo )
        setProcessing(true)
        _fetch(`https://api.engage-sop.com/v1/users/update`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            mode:'cors',
            body: JSON.stringify( userInfo )
        })
        .then( r =>{
            setTimeout( ()=>{
                setProcessing(false)
                if(r.code){
                    showConfirmDialog( 'Success!', 'Your profile was updated' )
                    setSessionData( userInfo )
                    return
                }
                showConfirmDialog( 'Error!', 'There was an error updating your profile, please try again later.' )
            }, 1500 )
        }) 


    }




    useEffect( ()=> { getSessionData() }, [] )


    const langs = [
        {"text":"Amharic","code":"am"},
        {"text":"Arabic","code":"ar"},
        {"text":"Basque","code":"eu"},
        {"text":"Bengali","code":"bn"},
        {"text":"English (UK)","code":"en-GB"},
        {"text":"Portuguese (Brazil)","code":"pt-BR"},
        {"text":"Bulgarian","code":"bg"},
        {"text":"Catalan","code":"ca"},
        {"text":"Cherokee","code":"chr"},
        {"text":"Croatian","code":"hr"},
        {"text":"Czech","code":"cs"},
        {"text":"Danish","code":"da"},
        {"text":"Dutch","code":"nl"},
        {"text":"English (US)","code":"en"},
        {"text":"Estonian","code":"et"},
        {"text":"Filipino","code":"fil"},
        {"text":"Finnish","code":"fi"},
        {"text":"French","code":"fr"},
        {"text":"German","code":"de"},
        {"text":"Greek","code":"el"},
        {"text":"Gujarati","code":"gu"},
        {"text":"Hebrew","code":"iw"},
        {"text":"Hindi","code":"hi"},
        {"text":"Hungarian","code":"hu"},
        {"text":"Icelandic","code":"is"},
        {"text":"Indonesian","code":"id"},
        {"text":"Italian","code":"it"},
        {"text":"Japanese","code":"ja"},
        {"text":"Kannada","code":"kn"},
        {"text":"Korean","code":"ko"},
        {"text":"Latvian","code":"lv"},
        {"text":"Lithuanian","code":"lt"},
        {"text":"Malay","code":"ms"},
        {"text":"Malayalam","code":"ml"},
        {"text":"Marathi","code":"mr"},
        {"text":"Norwegian","code":"no"},
        {"text":"Polish","code":"pl"},
        {"text":"Portuguese (Portugal)","code":"pt-PT"},
        {"text":"Romanian","code":"ro"},
        {"text":"Russian","code":"ru"},
        {"text":"Serbian","code":"sr"},
        {"text":"Chinese (PRC)","code":"zh-CN"},
        {"text":"Slovak","code":"sk"},
        {"text":"Slovenian","code":"sl"},
        {"text":"Spanish","code":"es"},
        {"text":"Swahili","code":"sw"},
        {"text":"Swedish","code":"sv"},
        {"text":"Tamil","code":"ta"},
        {"text":"Telugu","code":"te"},
        {"text":"Thai","code":"th"},
        {"text":"Chinese (Taiwan)","code":"zh-TW"},
        {"text":"Turkish","code":"tr"},
        {"text":"Urdu","code":"ur"},
        {"text":"Ukrainian","code":"uk"},
        {"text":"Vietnamese","code":"vi"},
        {"text":"Welsh","code":"cy"}
    ]



    if(processing){
        return(
            <View style={[styles.container, { backgroundColor:primary }]}>
                {/* <PageLogo source={require('../assets/Engage_Submark.png')} />
                <Text style={{color:brandDark}}> Updating Profile... </Text> */}
                <ActivityIndicator size="large" color={brandDark} />
            </View>
        )
    }



    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer bgColor={primary}>
                <InnerContainer>
                    <PageTitle textColor={brandDark}>
                        Settings
                    </PageTitle>
                    <Text>
                        Here you can update your preferences.
                    </Text>
                    <Line style={{marginBottom:20, marginTop:20}}/>
                    <StyledFormArea>

                        {/* Name Input */}
                        <MyTextInput 
                            label="Fullname" 
                            icon="user"
                            placeholder="John Doe" 
                            placeholderTextColor={brand}
                            onChangeText={setFullname}
                            value={fullname}
                            keyboardType="default"
                        />


                        {/* Email Input */}
                        <MyTextInput 
                            label="Email Address" 
                            icon="mail" 
                            placeholder="example@test.com" 
                            placeholderTextColor={brand}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                        />



                        <View style={{marginBottom:20}}>

                            <LeftIcon>
                                <Icon name="globe" size={25}  color={brandDark} />
                            </LeftIcon>
                            <StyledInputLabel>
                                Select your translation language
                            </StyledInputLabel>

                            <SelectDropdown
                                defaultValue={ langs.find( l => l.code == lang ) }
                                buttonStyle={styles.picker}
                                data={langs}
                                onSelect={(item, index) => {
                                    setLang(item.code)
                                }}
                                buttonTextAfterSelection={(item, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return item.text
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.text
                                }}
                            />

                        </View>




                        {/* Login Button */}
                        <BrandButton onPress={ saveChanges }>
                            <ButtonText textColor={brandDark}>
                                Save Changes
                            </ButtonText>
                        </BrandButton>


                        
                    </StyledFormArea>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

export default Profile;



const styles = StyleSheet.create({
    picker:{
        backgroundColor:'transparent',
        width:'100%',
        color:brandDark,
        height:60,
        borderWidth:1,
        borderColor:brand,
        borderRadius:5
    },
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: "center"
    }
})
