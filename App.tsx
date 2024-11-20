import axios from 'axios';
import React, {useState} from 'react';

import {
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NativeModules} from 'react-native';
const {ShuftiproReactNativeModule} = NativeModules;
import WebView, {WebViewMessageEvent} from 'react-native-webview'; // Import type
import {Buffer} from 'buffer';
import Navigation from './src/navigation';

interface ekycType {
  client_id: string;
  secret_key: string;
  authorization: string;
}

interface ekycUserDataType {
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: string;
  email: string;
}

export default function App({navigation}: {navigation: any}) {
  // const isDarkMode = useColorScheme() === 'dark';
  // const [token, setToken] = useState();
  // const [ekycCred, setekycCred] = useState<ekycType | null>(null);

  // const [ekycUserData, setekycUserData] = useState<ekycUserDataType>();
  // const [faceVerification, setfaceVerification] = useState(true);
  // const [documentVerification, setdocumentVerification] = useState(true);

  // const handleWebViewMessage = (event: WebViewMessageEvent) => {
  //   console.log('Raw event data:', event.nativeEvent.data);
  //   let parsedData;
  //   try {
  //     parsedData = JSON.parse(event.nativeEvent.data); // Attempt JSON parse
  //     console.log('Parsed data:', parsedData);
  //   } catch {
  //     console.log('Received non-JSON data:', event.nativeEvent.data);
  //     parsedData = {message: event.nativeEvent.data}; // Use plain text as fallback
  //   }

  //   // Handle parsed data or fallback
  //   if (parsedData?.token) {
  //     setToken(parsedData.token);
  //     fetchekycCred();
  //   }
  //   // navigation.navigate('StartKyc');
  // };

  // const generateUniqueReference = (): string => {
  //   const timestamp = Date.now().toString(); // Unique timestamp
  //   const randomPart = Math.random().toString(36).substring(2, 10); // Random alphanumeric
  //   const uniqueReference = `${timestamp}${randomPart}`; // Combine both parts
  //   return uniqueReference.slice(0, 250); // Ensure it's within the maximum limit
  // };

  // const fetchekycCred = async () => {
  //   console.log('fetch');
  //   try {
  //     const response = await axios.get(
  //       'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-credentials',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Correct placement of headers
  //         },
  //       },
  //     );
  //     console.log('response', JSON.stringify(response)); // Update state with API data

  //     if (response?.data?.status_code == 200) {
  //       console.log('responsedata[0]', response.data.data[0]);
  //       setekycCred(response.data.data[0]);
  //       fetchUserDetails();
  //     }
  //   } catch (err: any) {
  //     console.log('error22', err.message); // Handle error
  //   }
  // };

  // const fetchUserDetails = async () => {
  //   console.log('fetchdetails');
  //   try {
  //     console.log('token', token);
  //     const response = await axios.get(
  //       'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-profile',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Correct placement of headers
  //         },
  //       },
  //     );
  //     if (response?.data?.status_code == 200) {
  //       setekycUserData(response.data.data[0]);
  //       console.log('responseuserdetails', response.data); // Update state with API data
  //       handleButtonPress();
  //     }
  //   } catch (err: any) {
  //     console.log('error111', err.message); // Handle error
  //   }
  // };

  // const performVerification = async () => {
  //   console.log('perrrr');
  //   console.log('condition1', ekycCred);
  //   console.log('condition2', ekycCred?.client_id);

  //   if (ekycCred && ekycCred?.client_id) {
  //     console.log('conditionekyc');
  //     let decodedClientId;
  //     try {
  //       decodedClientId = Buffer.from(ekycCred.client_id, 'base64').toString(
  //         'utf8',
  //       );
  //       console.log('ddd', decodedClientId);
  //     } catch (e) {
  //       console.log('errorsinbugger', e);
  //     }

  //     let decodedSecretKey = Buffer.from(
  //       ekycCred.secret_key,
  //       'base64',
  //     ).toString('utf8');
  //     console.log('ddddccc', decodedClientId, decodedSecretKey);

  //     if (!decodedClientId || !decodedSecretKey) {
  //       console.log('Invalid input format!');
  //       return;
  //     }
  //     let authKeys = {
  //       auth_type: 'basic_auth',
  //       client_id: decodedClientId,
  //       secret_key: decodedSecretKey,
  //     };
  //     console.log('authkeys', authKeys);
  //     // const configObject = {
  //     //   base_url: 'api.shuftipro.com',
  //     //   consent_age: 16,
  //     // };
  //     const configObject = {
  //       open_webview: false,
  //       asyncRequest: false,
  //       captureEnabled: false,
  //     };
  //     console.log('configObject', configObject);
  //     const verificationObject = {
  //       reference: '1290127', // Unique reference ID
  //       country: '', // Country of the user
  //       language: '', // Language preference
  //       email: ekycUserData?.email, // User email
  //       callback_url:
  //         'https://qrateonline.qqpay.io/userservice/api/v1/user/ekyc-callback',
  //       redirect_url: 'https://www.mydummy.shuftipro.com/',
  //       show_consent: 1, // Show consent in the verification process (1 for yes)
  //       show_results: 1, // Show results in the process (1 for yes)
  //       verification_mode: 'image_only', // Mode of verification, e.g., "image_only"
  //       show_privacy_policy: 1, // Show privacy policy (1 for yes)
  //       face: {
  //         proof: '', // Proof for face verification (e.g., photo or other identifiers)
  //       },
  //       document: {
  //         supported_types: [
  //           'passport',
  //           'id_card',
  //           'driving_license',
  //           'credit_or_debit_card',
  //         ], // Supported document types
  //         name: {
  //           first_name: ekycUserData?.first_name || '',
  //           middle_name: ekycUserData?.middle_name || '',
  //           last_name: ekycUserData?.last_name || '',
  //         },
  //         dob: ekycUserData?.dob || '',
  //         document_number: '', // Document number (passport, id card, etc.)
  //         expiry_date: '', // Expiry date of the document
  //         issue_date: '', // Issue date of the document
  //         fetch_enhanced_data: '', // Additional data retrieval (if any)
  //         gender: '', // Gender of the user (M for male, F for female, etc.)
  //         backside_proof_required: '0', // 0 for no, 1 for yes (whether backside proof is required)
  //       },
  //     };

  //     console.log('abovetrybock');

  //     console.log('conditionekyctryblock');

  //     ShuftiproReactNativeModule.verify(
  //       JSON.stringify(verificationObject),
  //       JSON.stringify(authKeys),
  //       JSON.stringify(configObject),
  //       (res: any) => {
  //         console.log('eeekkkk');
  //         const parsedResponse = JSON.parse(res); // Parse the JSON string into an object
  //         console.log('parsed', parsedResponse);
  //         const event = parsedResponse.event; // Access the value of the "event" property
  //         console.log('Event:', event);

  //         if (event === 'verification.accepted') {
  //           // Verification accepted callback
  //           console.log('event1veri');
  //         }
  //         if (event === 'verification.declined') {
  //           console.log('2222');
  //           // Verification declined callback
  //         }
  //         if (event === 'verification.cancelled') {
  //           // This callback is returned when verification is cancelled midway by the end user
  //           console.log('3333');
  //         }
  //       },
  //     );
  //   }
  // };

  // const handleButtonPress = () => {
  //   performVerification();
  // };

  return (
    // <View style={{flex: 1}}>
    //    <WebView
    //     source={{uri: 'https://cb.qqpay.my'}}
    //     onMessage={handleWebViewMessage} // Listen for messages
    //     originWhitelist={['*']}
    //     onError={error => console.log('WebView error: ', error.nativeEvent)}
    //     onHttpError={error => console.log('HTTP error: ', error.nativeEvent)}
    //   />
    // </View>
    <>
      <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Navigation />
    </>
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
