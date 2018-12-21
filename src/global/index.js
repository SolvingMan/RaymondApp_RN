import { Dimensions } from 'react-native'

const DEVICE_INFO = Dimensions.get('window');

export function getDevicePixel(val) {
    return Math.round(val * DEVICE_INFO.width / 100 );
  }

export let g_UserData = {
  userID: '',
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  company_name: '',
  address: '',
  website_address: '',
};

export function setUser(response) {
  g_UserData.userID = response.data.id;
  g_UserData.first_name = response.data.first_name;
  g_UserData.last_name = response.data.last_name;
  g_UserData.username = response.data.username;
  g_UserData.email = response.data.email;
  g_UserData.company_name = response.data.company_name;
  g_UserData.website_address= response.data.website_address
  g_UserData.address= response.data.address
}

export function getUser() {
  return g_UserData;
}