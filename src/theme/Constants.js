import { Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { initialWindowMetrics } from 'react-native-safe-area-context'

export const units = {
  width: Dimensions.get('window').width,
  height:
    Dimensions.get('window').height -
    initialWindowMetrics?.insets?.top -
    (DeviceInfo.hasNotch() || DeviceInfo.getDeviceType() == 'Tablet'
      ? initialWindowMetrics?.insets?.bottom
      : 0)
}

export const defaultValues = {
  width: 393,
  height: 852
}