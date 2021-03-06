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

export let g_type;

export function setType(type) {
  g_type = type;
}

export function getType() {
  return g_type;
}

export let g_page;

export function setPage(page) {
  g_page = page;
}

export function getPage() {
  return g_page;
}

export let flag_pdf='';

export function set_flag_pdf(flag) {
  flag_pdf = flag;
}

export function get_flag_pdf() {
  return flag_pdf;
}