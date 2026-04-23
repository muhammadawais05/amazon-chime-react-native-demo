import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native'
import styles from './Style';
import { _fetch } from '../components/Fetch.js'
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
} from '../components/styles'
import { NativeFunction, getSDKEventEmitter, MobileSDKEvent, MeetingError } from '../utils/Bridge';
import { RNVideoRenderView } from '../components/RNVideoRenderView';
import { MuteButton } from '../components/MuteButton';
import { CameraButton } from '../components/CameraButton';
import { HangOffButton } from '../components/HangOffButton';
import { AttendeeItem } from '../components/AttendeeItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { brand, brandDark, red, primary} = Colors;


const Call = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [attendees, setAttendees] = useState([])
  const [videoTiles, setVideoTiles] = useState([])
  const [mutedAttendee, setMutedAttendee] = useState([])
  const [selfVideoEnabled, setSelfVideoEnabled] = useState(false)
  const [meetingTitle, setMeetingTitle] = useState('')
  const [currentMuted, setCurrentMuted] = useState(false)
  const [meeting, setMeeting] = useState()
  const attendeeNameMap = useRef({})
  const [selfAttendeeId, setSelfAttendeeId] = useState()

  useEffect(() => {
    console.log(selfAttendeeId)
    if ( selfAttendeeId ) {
      if (mutedAttendee.includes(selfAttendeeId))
        setCurrentMuted(true)
      else
        setCurrentMuted(false)
    }
  }, [mutedAttendee])

  useEffect(() => {
    AsyncStorage.getItem('user-session')
      .then( u => {
          if(u != null){
            user = JSON.parse(u)
            console.log(`https://api.engage-sop.com/v1/chime/meeting/${user.id}`)
            if ( user.id ) {
              _fetch(`https://api.engage-sop.com/v1/chime/meeting/${user.id}`)
                .then( r => {
                  if ( r.data ) {
                    console.log(r.data)
                    let list = [...attendees]
                    list.push(r.data.attendee.Attendee.AttendeeId)
                    setAttendees(list)

                    setMeeting(r.data.meeting)
                    setSelfAttendeeId(r.data.attendee.Attendee.AttendeeId)
                    NativeFunction.startMeeting(r.data.meeting.Meeting, r.data.attendee.Attendee);
                    setIsLoading(false)
                  }
                })
                .catch( e => {
                  Alert.alert("Unable to connect the meeting");
                  navigation.navigate("Welcome")
                })
            }
          }
      })

    const onAttendeesJoinSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnAttendeesJoin, ({ attendeeId, externalUserId }) => {
      if (!(attendeeId in attendeeNameMap.current)) {
        attendeeNameMap.current[attendeeId] = externalUserId.split("#")[1];
      }

      setAttendees(attendeeId => [...attendeeId, attendeeId])
    });

    const onAttendeesLeaveSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnAttendeesLeave, ({ attendeeId }) => {
      setAttendees(attendees.filter((attendeeToCompare => attendeeId != attendeeToCompare)))
    });

    const onAttendeesMuteSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnAttendeesMute, attendeeId => {
      setMutedAttendee( mutedAttendee => [...mutedAttendee, attendeeId] )
    });

    const onAttendeesUnmuteSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnAttendeesUnmute, attendeeId => {
      setMutedAttendee(mutedAttendee.filter((attendeeToCompare => attendeeId != attendeeToCompare)))
    });

    const onAddVideoTileSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnAddVideoTile, (tileState) => {
      if (tileState.isLocal){
        setSelfVideoEnabled(tileState)
      }
      else if(!videoTiles.includes(tileState.tileId)){
        setVideoTiles( videoTiles => [...videoTiles, tileState] )
      }
    });

    const onRemoveVideoTileSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnRemoveVideoTile, (tileState) => {
      if (tileState.isLocal)
        setSelfVideoEnabled(false)

      else
        setVideoTiles(videoTiles.filter((tileIdToCompare => tileIdToCompare.tileId != tileState.tileId)))
    });

    const onErrorSubscription = getSDKEventEmitter().addListener(MobileSDKEvent.OnError, (errorType) => {
      switch(errorType) {
        case MeetingError.OnMaximumConcurrentVideoReached:
          Alert.alert("Failed to enable video", "maximum number of concurrent videos reached!");
          break;
        default:
          Alert.alert("Error", errorType);
          break;
      }
    });

    return () => {
      if (onAttendeesJoinSubscription)
        onAttendeesJoinSubscription.remove()

      if (onAttendeesLeaveSubscription)
        onAttendeesLeaveSubscription.remove()

      if (onAttendeesMuteSubscription)
        onAttendeesMuteSubscription.remove()

      if (onAttendeesUnmuteSubscription)
        onAttendeesUnmuteSubscription.remove()

      if (onAddVideoTileSubscription)
        onAddVideoTileSubscription.remove()

      if (onRemoveVideoTileSubscription)
        onRemoveVideoTileSubscription.remove()

      if (onErrorSubscription)
        onErrorSubscription.remove()

      NativeFunction.stopMeeting()
    }
  }, [])

  const closeCall = () => {
    NativeFunction.stopMeeting()
    navigation.navigate("Welcome")
  }

  const renderMeeting = () => {
    console.log(selfVideoEnabled)
    return (
        <View style={styles.callContainer}>
          <View style={styles.selfVideoContainer}>
            {
              selfVideoEnabled ?
                <RNVideoRenderView style={styles.selectedVideo} key={selfVideoEnabled.tileId} tileId={selfVideoEnabled.tileId}/>
              : null
            }
          </View>
          <View style={styles.videoContainer}>
            {
              videoTiles.length > 0 ? videoTiles.map(tile =>
                <RNVideoRenderView style={styles.unSelectedVideos} key={tile.tileId} tileId={tile.tileId}/>
              ) : null
            }
          </View>
          <View style={styles.callButtonContainer}>
            <HangOffButton onPress={closeCall} />
            <MuteButton muted={currentMuted} onPress={() => NativeFunction.setMute(!currentMuted) }/>
            <CameraButton disabled={!selfVideoEnabled} onPress={() => NativeFunction.setCameraOn(!selfVideoEnabled)}/>
          </View>
        </View>
    )
  }

  const renderLoading = () => {
    return (
      <View style={[styles.activtyContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Connecting...</Text>
      </View>
    )
  }

  return (
    <MainPageContainer bgColor={primary}>
      {
        isLoading ? renderLoading() : renderMeeting()
      }
    </MainPageContainer>
  );
}

export default Call;
