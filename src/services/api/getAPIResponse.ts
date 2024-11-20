import {AxiosResponse} from 'axios';

const getAPIResponse = (response: AxiosResponse) => {
  const status =
    response?.status === 200 ||
    response?.status === 201 ||
    response?.status === 204;

  return {
    status,
    messageType: status ? 'Sucess' : 'Danger',
    data: response?.data,
  };
};

export {getAPIResponse};
