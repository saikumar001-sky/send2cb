import axios from 'axios';
import {getAPIResponse} from './getAPIResponse';
// UAT Base URL
// const baseUrl = 'https://qrateonline-uat.qqpay.my/userservice/api/v1';
//Prod Base URL
const baseUrl = 'https://qrateonline.qqpay.io/userservice/api/v1';

export const getfetchekycCred = async (token: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/user/ekyc-credentials`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correct placement of headers
        },
      },
    );
    return getAPIResponse(response);
  } catch (err: any) {
    console.log('fetchekycCred', err.message); // Handle error
  }
};

export const getfetchUserDetails = async (token: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/user/ekyc-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correct placement of headers
        },
      },
    );
    return getAPIResponse(response);
  } catch (err: any) {
    console.log('fetchekycCred', err.message); // Handle error
  }
};

export const postEkycRes = async (token: any, body: any) => {
  try {
    const response = await axios.post(
       `${baseUrl}/user/ekyc-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correct placement of headers
        },
      },
      body,
    );
    return getAPIResponse(response);
  } catch (err: any) {
    console.log('fetchekycCred', err.message); // Handle error
  }
};
