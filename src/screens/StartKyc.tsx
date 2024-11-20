import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeModules} from 'react-native';

const {ShuftiproReactNativeModule} = NativeModules;
import {Buffer} from 'buffer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {postEkycRes} from '../services/api';

type StartKycRouteParams = {
  ekycUserData: {
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    middle_name: string;
  };
  ekycCred: {
    client_id: string;
    secret_key: string;
    authorization: string;
  };
  tokenData:{
    token: string;
  }
};

const StartKyc = () => {
  const route = useRoute<RouteProp<{params: StartKycRouteParams}, 'params'>>();
  const {ekycUserData, ekycCred,tokenData} = route.params || {}; // Get the userData from navigation params

  const generateUniqueReference = (): string => {
    const timestamp = Date.now().toString(); // Unique timestamp
    const randomPart = Math.random().toString(36).substring(2, 5); // Random alphanumeric
    const uniqueReference = `${timestamp}${randomPart}`; // Combine both parts
    return uniqueReference.slice(0, 250); // Ensure it's within the maximum limit
  };

  const callBackEkycRes = async (body:any) => {
    try {
      const response = await postEkycRes(tokenData?.token,body);
      if (response?.data?.status_code == 200) {
        console.log('postResponse', response?.data?.data[0]);
      }
    } catch (err: any) {
      console.log('error22', err.message); // Handle error
    }
  };

  const performVerification = async () => {
    console.log('ekycUserData', ekycUserData);
    console.log('ekyc', ekycCred, ekycCred?.client_id);
    if (ekycCred && ekycCred?.client_id) {
      console.log('conditionekyc');
      let decodedClientId;
      try {
        decodedClientId = Buffer.from(ekycCred.client_id, 'base64').toString(
          'utf8',
        );
        console.log('ddd', decodedClientId);
      } catch (e) {
        console.log('errorsinbugger', e);
      }

      let decodedSecretKey = Buffer.from(
        ekycCred.secret_key,
        'base64',
      ).toString('utf8');
      console.log('ddddccc', decodedClientId, decodedSecretKey);

      if (!decodedClientId || !decodedSecretKey) {
        console.log('Invalid input format!');
        return;
      }
      let authKeys = {
        auth_type: 'basic_auth',
        client_id: decodedClientId,
        secret_key: decodedSecretKey,
      };
      console.log('authkeys', authKeys);
      const configObject = {
        open_webview: false,
        asyncRequest: false,
        captureEnabled: false,
      };
      const verificationObject = {
        reference: generateUniqueReference(), // Unique reference ID
        country: '', // Country of the user
        language: 'EN', // Language preference
        email: ekycUserData?.email, // User email
        callback_url:
          'https://qrateonline.qqpay.io/userservice/api/v1/user/ekyc-callback',
        redirect_url: 'https://www.mydummy.shuftipro.com/',
        show_consent: 1, // Show consent in the verification process (1 for yes)
        show_results: 1, // Show results in the process (1 for yes)
        verification_mode: 'image_only', // Mode of verification, e.g., "image_only"
        show_privacy_policy: 1, // Show privacy policy (1 for yes)
        allow_offline: 0,
        allow_online: 1,
        face: {
          proof: '', // Proof for face verification (e.g., photo or other identifiers)
          allow_offline: 0,
          allow_online: 1,
        },
        document: {
          supported_types: [
            'passport',
            'id_card',
            'driving_license',
            // 'credit_or_debit_card',
          ], // Supported document types
          name: {
            first_name: ekycUserData?.first_name || '',
            middle_name: ekycUserData?.middle_name || '',
            last_name: ekycUserData?.last_name || '',
          },
          dob: ekycUserData?.dob || '',
          document_number: '', // Document number (passport, id card, etc.)
          expiry_date: '', // Expiry date of the document
          issue_date: '', // Issue date of the document
          fetch_enhanced_data: '', // Additional data retrieval (if any)
          gender: '', // Gender of the user (M for male, F for female, etc.)
          backside_proof_required: '1', // 0 for no, 1 for yes (whether backside proof is required)
          allow_offline: 0,
          allow_online: 1,
        },
      };

      console.log('abovetrybock');

      console.log('conditionekyctryblock');

      ShuftiproReactNativeModule.verify(
        JSON.stringify(verificationObject),
        JSON.stringify(authKeys),
        JSON.stringify(configObject),
        (res: any) => {
          console.log('eeekkkk');
          const parsedResponse = JSON.parse(res); // Parse the JSON string into an object
          console.log('parsed', parsedResponse);
          const event = parsedResponse.event; // Access the value of the "event" property
          console.log('Event:', event);

          if (event === 'verification.accepted') {
            // Verification accepted callback
            callBackEkycRes(parsedResponse)
          }
          if (event === 'verification.declined') {
            console.log('verification Declined');
            // Verification declined callback
          }
          if (event === 'verification.cancelled') {
            // This callback is returned when verification is cancelled midway by the end user
            console.log('Verification cancelled');
          }
        },
      );
    }
  };
  const handleButtonPress = () => {
    console.log('handle');
    performVerification();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verify Your Identity</Text>

      <View style={styles.contentContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/customer.png')}
        />
        <ScrollView style={styles.scrollView}>
          <View style={{gap: 5}}>
            <Text>
              QQ Pay Group, its respective subsidiaries, affiliates, associated
              companies and jointly controlled entities (collectively QQpay , we
              , us or our) collect, use , process and dislose your Personal Data
              through the use of QQ Pay mobile applications and
              websites(respectively Apps and Websites). as well as products,
              features and other services globally, operated by QQ Pay
              (collectively, 'Services')
            </Text>
            <Text>
              This Privacy Notice applies to our customers, agents,
              partners(such as merchant partners), and service
              providers(collectively 'you, your or yours). Personal Data is any
              information which can be used to identiy you or from which you are
              identificable. This includes but is not limitted to your name,
              nationality, telephone number, bank and credit card details,email
              address, your image, government-issued identification numbers,
              biometric data, race date of birth, marital status, religion,
              employment information and financial information. We typically
              collect, use,disclose or otherewise process your Personal Data in
              accordance with this Privacy Notice with your consent , or in
              compliance with applicable laws, such as where:'
            </Text>
            <Text>
              * It is required for us to comply with legal reqyirements and
              applicable laws.
            </Text>
            <Text>
              * It is reqyired for us to enter into or perform a contract with
              you and /or
            </Text>
            <Text>
              * for our legitimate interests or the legitimate intersts or any
              other persons, including but not limited to
            </Text>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Start Verification</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent:"center",
          marginBlock:5
        }}>
        <Text>Powered By QQPay</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Distribute space between children
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Add margin to separate the image from text
  },
  scrollView: {
    // flexGrow: 1,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartKyc;
