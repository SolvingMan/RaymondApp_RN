import { Dimensions } from 'react-native'

const DEVICE_INFO = Dimensions.get('window');

export function getDevicePixel(val) {
    return Math.round(val * DEVICE_INFO.width / 100 );
  }