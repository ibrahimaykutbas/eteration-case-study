import { defaultValues, units } from './Constants'

const size = punto => units.height / (defaultValues.height / punto)

export default {
  size
}