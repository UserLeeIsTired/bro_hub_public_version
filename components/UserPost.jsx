import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'


const UserButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity className="flex-row justify-center items-center" onPress={onPress}>
      <Image source={icon} resizeMode='contain' className="w-4 h-4 mr-1"/>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}


const UserPost = ({ post: { avatar, content, username }}) => {
  return (
    <View className="w-[97%] border-[1px] border-black bg-white rounded-lg mt-2">
      <View className="flex-row items-center mt-2">
        <Image source={{uri: avatar}} className="w-12 h-12 rounded-full ml-4 mr-3"/>
        <Text className= "font-bold">{username}</Text>
      </View>
      <Text className="mx-4 mt-3">{content}</Text>
      <View className="flex-row justify-between px-2 m-4">
        <UserButton title="Like" icon={icons.bookmark}/>
        <UserButton title="Comment" icon={icons.bookmark}/>
        <UserButton title="Share" icon={icons.bookmark}/>
      </View>
    </View>
  )
}

export default UserPost