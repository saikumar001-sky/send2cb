import axios from 'axios';
import {getAPIResponse} from './getAPIResponse';

export const getfetchekycCred = async (token: any) => {
  try {
    const response = await axios.get(
      'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-credentials',
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
      'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-profile',
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
      'https://qrateonline-uat.qqpay.my/userservice/api/v1/user/ekyc-profile',
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
