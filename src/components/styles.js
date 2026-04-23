import styled from 'styled-components/native'

// Set the statusBarHeight
const StatusBarHeight = 48;

//set the colors
export const Colors = {
    primary:"#FFFFFF",
    secondary:"#f0ecee",
    tertiary:"#1F2937",
    darkLight:"#a59ddd",
    brand:"#bebcf0",
    brandDark:"#9778c2",
    green:"#89ae64",
    red:"#EF4444",
    dark:"#1e2225"
}
const {primary, secondary, tertiary, darkLight, brand, brandDark, green, red, dark} = Colors;

// LOGIN PAGE STYLES
// ************************************************************************************

export const StyledContainer = styled.View`
    flex:1;
    padding:25px;
    padding-top:${StatusBarHeight + 30}px;
`
//background-color:${primary};

export const InnerContainer = styled.View`
    flex:1;
    width:100%;
    align-items:center;
`

export const PageLogo = styled.Image`
    width:250px;
    height:250px;
`

export const PageTitle = styled.Text`
    font-size:25px;
    text-align:center;
    font-weight:bold;
    color: ${brand};
    padding:10px;
    ${ (props) =>  props.textColor && 
        `
            color:${props.textColor};
        ` 
    }
`

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:20px;
    text-align:center;
    color:${tertiary};
    ${ (props) =>  props.textColor && 
        `
            color:${props.textColor};
        ` 
    }
`

export const StyledFormArea = styled.View`
    width:90%;
`

// background-color: ${secondary};
export const StyledTextInput = styled.TextInput`
    border:1px solid ${brand};
    padding:15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;
    font-size:16px;
    height:60px;
    margin-vertical:3px;
    margin-bottom:20px;
    color:${tertiary};
`

export const StyledInputLabel = styled.Text`
    color:${tertiary};
    font-size:13px;
    text-align:left;
`

export const LeftIcon = styled.View`
    left:15px;
    top:36px;
    position:absolute;
    z-index:1;
`

export const RightIcon = styled.TouchableOpacity`
    left:15px;
    top:38px;
    position:absolute;
    z-index:1;
`

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color:${brandDark};
    justify-content:center;
    align-items:center;
    border-radius:5px;
    margin-vertical:5px;
    height:60px;

    ${(props) => props.bgColor && `background-color:${props.bgColor};`}

`

export const BrandButton = styled(StyledButton)`
    background-color:transparent;
    border:2px solid ${brandDark};
    ${ (props) =>  props.borderColor && 
        `
            border:1px solid ${props.borderColor};
        ` 
    }
`

export const ButtonText = styled.Text`
    color:${primary};
    font-size:16px;
    ${ (props) =>  props.textColor && 
        `
            color:${props.textColor};
            font-weight:bold;
        ` 
    }
`

export const MsgBox = styled.Text`
    text-align:center;
    font-size:13px;
`

export const Line = styled.View`
    height:1px;
    width:100%;
    background-color:${darkLight};
    margin-vertical:10px;
`

export const ExtraView = styled.View`
    justify-content:center;
    flex-direction:row;
    align-items:center;
    padding:10px;
`

export const ExtraText = styled.Text`
    justify-content:center;
    align-content:center;
    color: ${tertiary};
    font-size:15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;

`

export const TextLinkContent = styled.Text`
    color:${brandDark};
    font-size:13px;
    font-weight:bold;
`

// LOGIN PAGE STYLES
// ************************************************************************************
export const MainPageContainer = styled(InnerContainer)`
    padding:25px;
    padding-top:10px;
    justify-content:center;
    ${ (props) =>  props.bgColor && 
        `
            background-color:${props.bgColor};
            font-weight:bold;
        ` 
    }
`

export const MainPageTop = styled.View`
    height:40%;
    min-width:100%;
`

export const MainPageBottom = styled.View`
    min-width:100%;
`

const avatarDimensions = 120
export const Avatar = styled.Image`
    width:${avatarDimensions*2}px;
    height:${avatarDimensions+30}px;
    margin:auto;
    border-radius:${avatarDimensions/2}px;
    margin-bottom: 10px;
    margin-top:10px;
`
