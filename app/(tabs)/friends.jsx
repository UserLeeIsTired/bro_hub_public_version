import { View, Text, FlatList, SafeAreaView, ImageBackground, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import getData from '../../lib/extract'
import { getUserList } from '../../lib/appwrite'
import { images } from '../../constants'
import SearchBox from '../../components/SearchBox'
import AddFriendCard from '../../components/AddFriendCard'

const friends = () => {
  const { data: userList, isLoading : isLoading,  refetch: refetch } =  getData(getUserList);

  const [refreshing, setRefreshing] = useState(true);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-black">
      <ImageBackground source={images.greenbackground} className="h-full relative">
        <View className="items-center">
          <View className="mt-12 pr-2 rounded-xl">
            <View className="flex-row justify-center items-center">
              <Image source={images.transparentlogo} className='rounded-full'/>
              <SearchBox onPress={() => {}}/>
            </View>
          </View>
          <FlatList
            data={userList}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <AddFriendCard user={item}/>
            )}
            ListEmptyComponent={() => 
              <View className="justify-center items-center px-4">
                <Text className="text-2xl font-semibold text-gray-100">{"No Friends?"}</Text>
                <Text className="font-medium text-sm text-gray-100 mb-2">{"Oops, looks like it is loading"}</Text>
              </View>
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View> 
      </ImageBackground>
    </SafeAreaView>
  )
}

export default friends