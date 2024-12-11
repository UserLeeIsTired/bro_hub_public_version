import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { icons } from '../constants'
import { createPost } from '../lib/appwrite'


const UserButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity className="flex-row justify-center items-center" onPress={onPress}>
      <Image source={icon} resizeMode='contain' className="w-4 h-4 mr-1"/>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const NewPost = () => {
  const {user} = useGlobalContext()
  const [form, setForm] = useState({
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async() => {
    if (!form.content){
      Alert.alert('Error', 'Write something first!');
      return;
    }
    setIsLoading(true);
    try {
      const result = await createPost(form.content);
      Alert.alert('Sent', 'Your post has been created');
      return result;
    }catch (error){
      Alert.alert('Error', error.message);
    }finally{
      setForm({...form, content: ''});
      setIsLoading(false);
    }
  }
  return (
    <View className="w-[97%] border-[1px] border-black bg-white rounded-lg mt-2">
      <View className="flex-row justify-center items-center mt-2">
        <Image source={{uri: user.avatar}} className="w-12 h-12 rounded-full mr-3"/>
        <View className="border-2 border-gray-500 h-8 w-[75%] rounded-xl focus:border-green-600 flex-row items-center justify-center">
          <TextInput
            className="flex-1 font-bold text-base px-2 w-full"
            value={form.content}
            onChangeText={(e) => setForm({...form, content: e})}
            placeholder={`${user.username}, what is in your mind? `}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={submit}
            className={`rounded-xl h-8 justify-center content-center bg-green-600 w-[40px] my-3 ${isLoading ? 'opacity-50' : ''}`}
            >
          <Text className="font-semibold text-center text-white">{'Send'}</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between px-2 m-4">
        <UserButton title="Live Video" icon={icons.bookmark}/>
        <UserButton title="Photo/ Video" icon={icons.bookmark}/>
        <UserButton title="Feeling/ Activity" icon={icons.bookmark}/>
      </View>
    </View>
  )
}

export default NewPost