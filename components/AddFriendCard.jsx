import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'  


const UserButton = ({ onPress }) => {
  const [clicked, setClicked] = useState(false);
  const request = () => {
    setClicked(!clicked);
    onPress();
  }
  return (
    <View>
      {
        clicked ? 
        <TouchableOpacity className="text-center bg-slate-500 h-8 w-[150px] items-center justify-center" onPress={request}>
          <Text className="text-sm font-semibold text-white">Pending</Text>
        </TouchableOpacity> 
        : 
        <TouchableOpacity className="text-center bg-green-600 h-8 w-[150px] items-center justify-center" onPress={request}>
          <Text className="text-sm font-semibold text-white">Add Friend +</Text>
        </TouchableOpacity>
      }
    </View>
  )
}


const AddFriendCard = ({ user : { $id, username, avatar} }) => {
  const {user} = useGlobalContext()
  if (user.username == username){
    return (
      <></>
    )
  }
  return (
    <View className="border-[1px] border-black bg-white rounded-lg mt-2 justify-center h-20">
      <View className="flex-row justify-between items-center w-[96%]">
        <View className="flex-row items-center">
          <Image source={{uri: avatar}} className="w-12 h-12 rounded-full ml-4 mr-3"/>
          <Text className="font-bold">{username}</Text>
        </View>
        <UserButton onPress={() => {}}/>
      </View>
    </View>
  )
}

export default AddFriendCard