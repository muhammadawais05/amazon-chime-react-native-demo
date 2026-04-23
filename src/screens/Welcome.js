import React, {useState, useEffect} from 'react'
import { Linking, Alert, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _fetch } from '../components/Fetch.js'
import Icon from 'react-native-vector-icons/Feather';
import { 
    Colors,
    MainPageContainer,
    MainPageTop,
    MainPageBottom,
    Avatar,
    PageTitle,
    SubTitle,
    StyledButton,
    BrandButton,
    ButtonText,
    Line 
} from './../components/styles'



//destructure the imported colors
const { brand, brandDark, red, primary} = Colors;





const Welcome = ({navigation}) => {

    const [ userInfo, setUserInfo ] = useState('')
    const [ presence, setPresence ] = useState( 0 )
    const [ processing, setProcessing ] = useState(false)

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "If you log out, you will need to re enter your email and Auth code.",
            [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                    removeData()
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "No",
            },
            ]
        );
    };


    const showAlert = (title, msg) => {
        return Alert.alert( title, msg, [{ text: "OK", }] );
    };

    
    const getSessionData = () => {
        try {
            AsyncStorage.getItem('user-session')
            .then( r => {
                if(r != null){
                    setUserInfo(JSON.parse(r))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    const removeData = () => {
        try {
            AsyncStorage.removeItem('user-session')
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }



    const goToCall = ()=>{
      navigation.navigate("Call")
        // _fetch(`https://api.engage-sop.com/v1/groups/find/${userInfo.id}`)
        // .then(r => {
        //     if(r.code){
        //         Linking.openURL(`https://call.engage-sop.com/group/${r.data.room_id}/${userInfo.id}`)
        //         return
        //     }
        //     showAlert( 'Oooops!', r.msg )
        // })
        
    }


    const confirmPresence = () => {

        setProcessing(true)
        
        _fetch(`https://api.engage-sop.com/v1/sessions/read`)
        .then( r => {
            console.log('Loaded data from sessions:', r)
            const active = r.data.find( x => x.active == 2 )
            if(active){
                _fetch(`https://api.engage-sop.com/v1/users/confirm/${userInfo.id}`)
                .then( r => {
                    console.log('Confirmed user:', r)
                    setProcessing(false)
                    if(r.code){
                        userInfo.presence = 1;
                        setPresence(1);
                        showAlert( 'Yay!', 'Confirmed presence in the session!' )
                        return;
                    }
                    showAlert( 'Oooops!', 'There are no session ready to start yet, wait for the host to ask for your confirmation!' )
                })
            }else{
                setProcessing(false)
                showAlert( 'Oooops!', 'There are no session ready to start yet, wait for the host to ask for your confirmation!' )
            }
        })

    }



    useEffect( ()=> { 
        getSessionData() 
        _fetch( `https://api.engage-sop.com/v1/users/read/id/${userInfo.id}` )
        .then( r => {
          if(r.data)
            setPresence(r.data.presence)
        }) 
    }, [])



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
        <MainPageContainer bgColor={primary}>
            <MainPageTop>
                <Avatar source={require('./../assets/Engage_SubmarkSQ.png')}></Avatar>
                <PageTitle> Welcome Back! </PageTitle>
                <SubTitle textColor={brandDark}> {(userInfo?.fullname) ? userInfo.fullname : 'User'} </SubTitle>
            </MainPageTop>
            <MainPageBottom>


                <BrandButton onPress={ () => navigation.navigate("Profile")} borderColor={brandDark}>
                    <Icon name="settings" size={10}  color={brandDark} />
                    <ButtonText textColor={brandDark}> Settings </ButtonText>
                </BrandButton>


                <BrandButton borderColor={brandDark} onPress={ () => goToCall() }>
                    <Icon name="video" size={10}  color={brandDark} />
                    <ButtonText textColor={brandDark}>  Group Call  </ButtonText>
                </BrandButton>


                { ( presence == 0 ) && <BrandButton borderColor={brandDark} onPress={ () => confirmPresence() }>
                    <Icon name="check" size={10}  color={brandDark} />
                    <ButtonText textColor={brandDark}>  Confirm presence in session </ButtonText>
                </BrandButton> }


                {/* <BrandButton borderColor={brandDark} onPress={ () => navigation.navigate('Question') }>
                    <ButtonText textColor={brandDark}>  I have a Question  </ButtonText>
                </BrandButton> */}


                <Line/><Line/>

                <StyledButton onPress={ () => showConfirmDialog() } bgColor={red}>
                    <ButtonText textColor={primary}>  Logout  </ButtonText>
                </StyledButton>



            </MainPageBottom>
        </MainPageContainer>
    )
}



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




export default Welcome;



