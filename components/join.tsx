import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


type Props = {
  step: number,
  setStep: Function
}
const Join = ({ step, setStep }: Props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.welcome}>React Native Group Chat Broadcasting using Agora.io</Text>
      <View style={styles.join}>
        <Text style={styles.joinText}>Click The Botton Bellow To Join the group call</Text>

        <View style={styles.buttons}>
          <Pressable style={{ padding: 6, borderRadius: 3, backgroundColor: '#58d1c9', marginBottom: 40 }} onPress={() => setStep(step + 1)}>
            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Join Group Call</Text>
          </Pressable>
          <Pressable style={{ padding: 6, borderRadius: 3, backgroundColor: '#51c971' }} onPress={() => setStep(step + 2)}>
            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Join Live Broadcast</Text>
          </Pressable>

        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    padding: 20,

  },

  welcome: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center'
  },

  join: {
    marginTop: 300,
    alignItems: 'center',
  },

  joinText: {
    fontSize: 15,
    color: '#ffffff',
  },

  input: {
    marginTop: 70,
    width: 200,
    height: 40,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 13,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#58d1c9',
    color: '#ffffff',
  },

  buttons: {
    marginTop: 80,
    width: 288,
  }

})


export default Join;