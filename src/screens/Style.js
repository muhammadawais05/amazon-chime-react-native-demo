/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 150,
    right: 2,
    borderRadius: 7,
    zIndex: 99999,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
  subtitle: {
    marginBottom: 25,
    marginTop: 10,
    color: 'grey' 
  },
  selectedVideo: {
    width: '100%',
    height: '100%',
  },
  unSelectedVideos: {
    width: '60%',
    margin: '1%',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 50,
    aspectRatio: 4 / 7,
  },
  screenShare: {
    width: '90%',
    margin: '1%',
    aspectRatio: 16 / 9,
  },
  attendeeList: {
    flex: 1,
    width: '80%'
  },
  attendeeContainer: {
    fontSize: 20,
    margin: 5,
    padding: 5,
    height: 30,
    backgroundColor: '#eee',
    justifyContent: 'space-between', 
    flexDirection: 'row',  
  },
  attendeeMuteImage: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  },
  inputBox: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: '50%',
    padding: 10,
    color: 'black'
  },
  meetingButtonWrap:{
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  meetingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
  callContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '115%',
    width: '115%',
    marginTop: '20%',
    backgroundColor: 'black'
  },
  selfVideoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '50%',
    overflow: 'hidden',
    backgroundColor: '#3c3e42'
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '86%',
    height: '50%',
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  activtyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  horizontal: {
    flexDirection: "column",
    padding: 10
  },
  loadingText: {
    color: 'black'
  }
});

export default styles;
