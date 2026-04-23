import React, {useState} from 'react'
import { View } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import Toast from 'react-native-toast-message';
import {CustomToast} from '../components/CustomToast'
import Icon from 'react-native-vector-icons/Feather';
import { 
    Colors,
    StyledContainer, 
    InnerContainer, 
    PageTitle, 
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    BrandButton,
    ButtonText
} from './../components/styles'

//destructure the imported colors
const { primary, brand, brandDark } = Colors;







const MyTextInput = ({ label, icon, ...props }) => {
    return(
        <View>
            <LeftIcon>
                <Icon name={icon} size={25}  />
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}



const Question = () => {


    const [ question, setQuestion ] = useState('')


    const handleSubmitQuestion = () => {
        
    }

    
    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <Toast config={CustomToast} ref={ ref => Toast.setRef(ref) } />
                <InnerContainer style={styles.container}>
                    <StyledFormArea>
                        <PageTitle textColor={brandDark}> My question is: </PageTitle>

                        <MyTextInput 
                            label="Your question here:" 
                            icon="question-circle-o" 
                            placeholder="example@test.com" 
                            placeholderTextColor={brand}
                            onChangeText={setQuestion}
                            value={question}
                            keyboardType="default"
                        />

                        <BrandButton onPress={handleSubmitQuestion}>
                            <ButtonText textColor={brandDark}>
                                Send my question
                            </ButtonText>
                        </BrandButton>

                    </StyledFormArea>
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


export default Question;
