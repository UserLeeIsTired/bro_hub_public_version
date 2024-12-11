import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { updateSignature } from '../../lib/appwrite'

const InputField = ({ placeholder }) => {
  const [form, setForm] = useState({
    signature: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!form.signature){
      Alert.alert('Error', 'Please fill in the signature first');
      return;
    }
    setIsLoading(true);
    try {
      const result = await updateSignature(form.signature);
      Alert.alert('Update', 'Your signature has been updated');
      return result;
    }catch (error){
      Alert.alert('Error', error.message);
    }finally{
      setForm({signature: ''});
      setIsLoading(false);
    }

  }

  return (
    <View>
      <Text className="text-gray-700 font-semibold text-xl my-3">Enter your signature: </Text>
      <View className="flex-row border-2 w-[90%] border-green-950 h-40 bg-black rounded-xl focus:border-green-600">
        <TextInput className="w-full text-white font-bold text-base px-2 align-text-top"
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={form.signature}
          onChangeText={(e) => setForm({...form, signature: e})}
          multiline={true}
          maxLength={2200}
        />
      </View>
      <View className="items-end">
        <TouchableOpacity
          onPress={submit}
          className={`rounded-xl min-h-[50px] justify-center content-center bg-green-600 w-[100px] my-3 ${isLoading ? 'opacity-50' : ''}`}
          >
          <Text className="font-semibold text-lg text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const Profile = () => {
  const {user} = useGlobalContext()
  return (
    <SafeAreaView>
      <ImageBackground source={images.greenbackground} className="h-full w-full" resizeMode='rounded-full'>
        <View className="w-full px-4 items-center mt-12">
          <View className="border-[1px] border-black bg-white rounded-lg mt-2 w-[98%] items-center justify-between">
            <Image source={{uri: user.avatar}} className="w-[120px] h-[120px] rounded-full mt-6"/>
            <Text className="font-semibold text-[45px]">{user.username}</Text>
            <Text className="text-gray-400 font-semibold mb-6">{user.email}</Text>
          </View>
          <View className="border-[1px] border-black bg-white rounded-lg mt-2 w-[98%] items-center">
            <InputField placeholder={user.signature || `${user.username}, How do you feel?`}/>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Profile