import { FlatList, View, RefreshControl, Text, ScrollView } from 'react-native'
import { SafeAreaView, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'

import { images } from '../../constants';
import SearchBox from '../../components/SearchBox';
import NewPost from '../../components/NewPost';
import UserPost from '../../components/UserPost';

import getData from '../../lib/extract';
import { getPostList } from '../../lib/appwrite';

const Home = () => {
  const { data: postList, refetch: refetch } =  getData(getPostList);
  const [refreshing, setRefreshing] = useState(true);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-black flex-1">
      <ImageBackground source={images.greenbackground} className="h-full relative">
        <View className="mt-12 pr-2 rounded-xl">
          <View className="flex-row justify-center items-center">
            <Image source={images.transparentlogo} className='rounded-full'/>
            <SearchBox onPress={() => {}}/>
          </View>
        </View>
        <View className="justify-center items-center">
          <NewPost/>
          <FlatList
            data={postList}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => {
              return (
              <UserPost post={item}/>
              )
            }}
            className="w-full ml-3"
            scrollEnabled={true}
            ListEmptyComponent={() => 
              <View className="justify-center items-center px-4">
                <Text className="text-2xl font-semibold text-gray-100">{"No Posts?"}</Text>
                <Text className="font-medium text-sm text-gray-100 mb-2">{"Oops, looks like it is loading"}</Text>
              </View>
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Home;