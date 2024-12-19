import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Colors from '../theme/Colors'
import { getRH } from '../theme/Units'

import routes from './routes'

import Home from '../screens/Home'
import Basket from '../screens/Basket'
import Favorites from '../screens/Favorites'
import Profile from '../screens/Profile'

import HomeIcon from '../assets/icons/home.svg'
import HomeFillIcon from '../assets/icons/home-fill.svg'
import BasketIcon from '../assets/icons/basket.svg'
import BasketFillIcon from '../assets/icons/basket-fill.svg'
import FavoritesIcon from '../assets/icons/favorite.svg'
import FavoritesFillIcon from '../assets/icons/favorite-fill.svg'
import ProfileIcon from '../assets/icons/profile.svg'
import ProfileFillIcon from '../assets/icons/profile-fill.svg'

const AppNavigator = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          height: getRH(85),
          paddingTop: getRH(5)
        },

        tabBarIcon: ({ focused }) => {
          let Icon

          if (route.name === routes.HOME) {
            Icon = focused ? HomeFillIcon : HomeIcon
          } else if (route.name === routes.BASKET) {
            Icon = focused ? BasketFillIcon : BasketIcon
          } else if (route.name === routes.FAVORITES) {
            Icon = focused ? FavoritesFillIcon : FavoritesIcon
          } else if (route.name === routes.PROFILE) {
            Icon = focused ? ProfileFillIcon : ProfileIcon
          }

          return <Icon width={getRH(32)} height={getRH(32)} />
        }
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.BASKET} component={Basket} />
      <Tab.Screen name={routes.FAVORITES} component={Favorites} />
      <Tab.Screen name={routes.PROFILE} component={Profile} />
    </Tab.Navigator>
  )
}

export default AppNavigator
