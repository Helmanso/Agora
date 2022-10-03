import React, {useRef, useState, useEffect} from 'react';
import Join from './components/join';
import Chat from './components/chat';
import Broadcast from './components/broadcast';
import { PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';


const appId = 'd75d210972674d3aa2911190db42d428';
const channelName = 'testing';
const token = '007eJxTYPjAtX/hnzzpbYUOGRnH3VascnZ8feuesci1RUuf+H47dlJRgSHF3DTFyNDA0tzIzNwkxTgx0cjS0NDQ0iAlycQoxcTIwuKcZfIOeetk62BHVkYGCATx2RlKUotLMvPSGRgAPLgieQ==';
const uid = 0;

const App = () => {
  
  const [step, setStep] = useState<number>(0);
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<Array<number>>([]);
  const [message, setMessage] = useState('');

   
  function showMessage(msg: string) {
    setMessage(msg);
}

  const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

  const setupVideo = async () => {
    try {
        await getPermission()
        agoraEngineRef.current = createAgoraRtcEngine();
        const agoraEngine = agoraEngineRef.current;
        
        agoraEngine.registerEventHandler({
            onJoinChannelSuccess: () => {
                showMessage('Join channel success' + channelName);
                setIsJoined(true);
            },
            onUserJoined: (_connection, Uid) => {
                setRemoteUid([...remoteUid, Uid]);
                showMessage('User joined' + JSON.stringify(remoteUid));
            },
            onUserOffline: (_connection, Uid) => {
                showMessage('User offline' + Uid);
                setRemoteUid(remoteUid.filter((uid) => uid !== Uid));
            }
        })

        agoraEngine.initialize({appId: appId})
        agoraEngine.enableVideo();

    }
    catch (error) {
        console.log(error)
    }
  }


  useEffect(() => {
    setupVideo()
  }, [isJoined])

  const leaveGroup = () => {
    try {
        agoraEngineRef.current?.leaveChannel();
        setIsJoined(false);
        setRemoteUid([]);
        setStep(0)
        showMessage('You left the channel');
    } catch (e) {
        console.log(e);
    }
};

  return (
    <View style={styles.container}>
      {step === 0 &&  <Join step={step} setStep={setStep}  />}
      {step === 1 && <Chat message={message} agoraEngineRef={agoraEngineRef} token={token} channelName={channelName} uid={uid} remoteUid={remoteUid} isJoined={isJoined} leaveGroup={leaveGroup} />}
      {step === 2 && <Broadcast message={message} agoraEngineRef={agoraEngineRef} token={token} channelName={channelName} uid={uid} remoteUid={remoteUid} isJoined={isJoined}  leaveGroup={leaveGroup} />}
    </View>
  )}



const styles = StyleSheet.create({
    container: {
      backgroundColor : '#282b2a',
      flex: 1,
    },

  
})





export default App;
