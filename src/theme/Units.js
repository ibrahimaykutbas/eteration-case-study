import { defaultValues, units } from './Constants'
import { Dimensions } from 'react-native'

export const getRW = number => (number * units.width) / defaultValues.width
export const getRH = number => (number * units.height) / defaultValues.height

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}