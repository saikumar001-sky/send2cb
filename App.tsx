import axios from 'axios';
import React, {useState} from 'react';

import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NativeModules} from 'react-native';
const {ShuftiproReactNativeModule} = NativeModules;
import WebView, {WebViewMessageEvent} from 'react-native-webview'; // Import type

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [token, setToken] = useState();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    console.log('event', JSON.parse(event.nativeEvent.data));
    const data = JSON.parse(event.nativeEvent.data);
    setToken(data?.token);
    fetchekycCred();
  };

  const fetchekycCred = async () => {
    console.log('fetch');
    try {
      console.log('token', token);
      const response = await axios.get(
        'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-credentials',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct placement of headers
          },
        },
      );
      console.log('response', response.data); // Update state with API data
      fetchUserDetails();
    } catch (err: any) {
      console.log('error', err.message); // Handle error
    }
  };

  const fetchUserDetails = async () => {
    console.log('fetchdetails');
    try {
      console.log('token', token);
      const response = await axios.get(
        'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-profile',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct placement of headers
          },
        },
      );
      console.log('responseuserdetails', response.data); // Update state with API data
    } catch (err: any) {
      console.log('error', err.message); // Handle error
    }
  };

  const performVerification = async () => {
    let decodedClientId = Buffer.from(clientid, 'base64').toString('utf8');
    let decodedSecretKey = Buffer.from(secretkey, 'base64').toString('utf8');

    if (!decodedClientId || !decodedSecretKey) {
      console.error('Invalid input format!');
      return;
    }

    let dataDictionary = {
      reference: 'uniqueReference',
      country: '',
      language: 'EN',
      email: 'ad@example.com',
      callback_url:
        'https://qrateonline.qqpay.io/userservice/api/v1/user/ekyc-callback',
      redirect_url: 'https://www.mydummy.shuftipro.com/',
      verification_mode: 'image',
      show_consent: '1',
      show_privacy_policy: '1',
      show_results: '1',
      allow_online: '1',
      allow_offline: '0',
    };

    if (faceVerification) {
      dataDictionary.face = {
        proof: '',
        allow_online: '1',
        allow_offline: '0',
        document_number: '',
        expiry_date: '',
        issue_date: '',
      };
    }

    if (documentVerification) {
      dataDictionary.document = {
        supported_types: ['passport', 'id_card', 'driving_license'],
        name: {
          first_name: firstNameStr,
          middle_name: middileNameStr,
          last_name: lastNameStr,
        },
        backside_proof_required: '1',
        dob: dobStr,
        allow_online: '1',
        allow_offline: '0',
      };
    }

    let authKeys = {
      auth_type: 'basic_auth',
      client_id: decodedClientId,
      secret_key: decodedSecretKey,
    };

    try {
      const response = await axios.post(
        'https://qrateonline.qqpay.io/userservice/api/v1/user/ekyc-response-callback',
        JSON.stringify(dataDictionary),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const result = response.data;
      console.log('Response from SDK:', result);

      if (result.message === 'Success') {
        Alert.alert('Success!', 'eKYC verification completed.', [
          {
            text: 'Okay',
            onPress: () => navigation.popToTop(),
          },
        ]);
      } else {
        Alert.alert('Error', 'Verification failed. Please retry.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  const handleButtonPress = () => {
    if (startBtnTitle === 'Retry') {
      handleRetry();
    } else {
      performVerification();
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: 'https://cb.qqpay.my'}}
        onMessage={handleWebViewMessage} // Listen for messages
        originWhitelist={['*']}
        onError={error => console.log('WebView error: ', error.nativeEvent)}
        onHttpError={error => console.log('HTTP error: ', error.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
