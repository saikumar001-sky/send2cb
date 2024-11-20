// NewPage.tsx
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {getfetchUserDetails, getfetchekycCred} from '../services/api';

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
export interface AppProps {
  navigation: any;
}

const Send2CB = (props: AppProps) => {
  const {navigation} = props;

  const [token, setToken] = useState();
  const [ekycCred, setekycCred] = useState<ekycType | null>(null);

  const [ekycUserData, setekycUserData] = useState<ekycUserDataType>();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    console.log('Raw event data:', event.nativeEvent.data);
    let parsedData;
    try {
      parsedData = JSON.parse(event.nativeEvent.data); // Attempt JSON parse
      console.log('Parsed data:', parsedData);
    } catch {
      console.log('Received non-JSON data:', event.nativeEvent.data);
      parsedData = {message: event.nativeEvent.data}; // Use plain text as fallback
    }

    // Handle parsed data or fallback
    if (parsedData?.token) {
      //   setToken(parsedData.token);
      fetchekycCred(parsedData.token);
    }
  };

  const fetchekycCred = async (token: string) => {
    console.log('tken', token);
    try {
      const response = await getfetchekycCred(token);

      if (response?.data?.status_code == 200) {
        console.log('responsedata[0]', response?.data?.data[0]);
        const ekycCred = response.data.data[0];

        // setekycCred(ekycCred);
        fetchUserDetails(token, ekycCred);
      }
    } catch (err: any) {
      console.log('error22', err.message); // Handle error
    }
  };

  const fetchUserDetails = async (token: string, ekycCred: any) => {
    try {
      const response = await getfetchUserDetails(token);

      if (response?.data?.status_code == 200) {
        const ekycUserData = response.data.data[0];
        // setekycUserData(ekycUserData);
        const tokenData={
          token,
        }
        navigation.navigate('StartKyc', {ekycUserData, ekycCred,tokenData});

        // handleButtonPress();
      }
    } catch (err: any) {
      console.log('error111', err.message); // Handle error
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
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Send2CB;
