import { Image, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
import { Col, Row, Grid } from "react-native-easy-grid";

import React, { useRef, useState, useEffect } from 'react';


const broadcast = ({ message, token, channelName, isJoined, agoraEngineRef, uid, remoteUid, leaveGroup }: any) => {


    const [isHost, setIsHost] = useState(false);

    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileLiveBroadcasting,
            );
            if (isHost) {
                agoraEngineRef.current?.startPreview();
                agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                    clientRoleType: ClientRoleType.ClientRoleBroadcaster
                });
            } else {
                agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                    clientRoleType: ClientRoleType.ClientRoleAudience
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log(isJoined, isHost, remoteUid)
    })
    return (
        <View style={styles.container}>

            {!isJoined && <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', paddingBottom: 20 }}>Choose Role To Start or Join the Live Broadcast</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '40%' }}>
                    <Text style={{ color: '#fff' }}>Audience</Text>
                    <Switch
                        onValueChange={switchValue => {
                            setIsHost(switchValue)
                        }}
                        value={isHost}
                    />
                    <Text style={{ color: '#fff' }}>Host</Text>
                </View>
                <Pressable onPress={() => join()} style={{ padding: 6, borderRadius: 3, backgroundColor: '#51c971', width: 288, marginTop: 40 }}>
                    {isHost && <Text style={{ color: 'white', textAlign: 'center' }}>Start Live Broadcast</Text>}
                    {!isHost && <Text style={{ color: 'white', textAlign: 'center' }}>Join Live Broadcast</Text>}
                </Pressable>
            </View>}
            {isJoined &&
                <View style={{ flex: 1 }}>
                    <Grid>
                        {(isJoined && isHost) &&
                            <Row><RtcSurfaceView style={styles.remote} canvas={{ uid: 0 }} /></Row>
                        }

                        {(isJoined && !isHost && remoteUid.length > 0) ?
                            <Row>
                                {remoteUid.map((item: any) => (
                                        <Col><RtcSurfaceView key={item} style={styles.remote} canvas={{ uid: item }} /></Col>
                                    ))}
                            </Row>
                            : (isJoined && !isHost) && <Row><Text style={{marginLeft: '25%', marginTop: '100%',color: 'white' }}>Waiting for a remote user to join</Text></Row>
                        }

                    </Grid>
                    <Pressable  style={styles.hang} onPress={() => leaveGroup() }>
                        <Text style={{textAlign: 'center', color: 'white'}}>Leave</Text>
                    </Pressable>
                    <Text style={styles.live}>Live</Text>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    remote: {
        flex: 1,

    },
    hang : {
        height: 22,
        width: 120,
        backgroundColor: '#58d1c9',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        marginLeft: -62,
        borderRadius: 4
    },
    live : {
        position: 'absolute',
        top : 10,
        right: 28,
        backgroundColor: 'red',
        width: 80,
        padding: 2,
        textAlign: 'center',
        color : 'white',
        borderRadius: 5,
        fontWeight: '500'
    }
})
export default broadcast