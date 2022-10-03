import React, { useRef, useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Col, Row, Grid } from "react-native-easy-grid";

import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';


const Chat = ({ agoraEngineRef, token, channelName, uid, remoteUid, isJoined, message, leaveGroup }: any) => {


    useEffect(() => {
        console.log(remoteUid)

    })

    useEffect(() => {
        
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });

            

        }
        catch (error) {
            console.log(error)
        }
    }, [])

    

    return (
        <View style={styles.container}>
            <View style={styles.chat}>
                {isJoined ?
                    <Grid>
                        <Row><RtcSurfaceView  style={styles.remote} canvas={{ uid: 0 }} /></Row>
                        {remoteUid.length >= 1 && 
                        
                        <Row>
                            {remoteUid.map((item: number, index: number) => (
                                <Col   key={index}><RtcSurfaceView   style={styles.remote} canvas={{uid: item}} /></Col> 
                            ))}
                        </Row>
                        }


                    </Grid>
                    : <Text style={{color: 'white', textAlign: 'center'}}>Joining...</Text>}

            <Pressable  style={styles.hang} onPress={() => leaveGroup() }>
             <Image  style={{height: '100%', width: '100%'}} source={require('./hang.png')}/>

            </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    chat: {
        display: 'flex',
        flex: 1,
    },
    remote: {
       flex: 1,

    },
    hang : {
        height: 40,
        width: 40,
        position: 'absolute',
        bottom: 30,
        left: '50%',
        marginLeft: -20,
    
    }
})


export default Chat;