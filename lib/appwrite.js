import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: '',
    projectId: '',
    databaseId: '',
    userCollectionId: '',
    postCollectionId: ''
}

const client = new Client();

client
    .setEndpoint(Config.endpoint)
    .setProject(Config.projectId)
    .setPlatform(Config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            Config.databaseId,
            Config.userCollectionId,
            ID.unique(),
            {   
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    
    }catch (error){
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    }catch (error){
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    }catch (error){
        console.log(error);
    }
}

export const logout = async () => {
    try {
        await account.get();
        await account.deleteSession('current');
    } catch (error) {
        console.log('Error during logout:', error);
    }
}

export const getUserList = async () => {
    try{
        const users = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
        );
        return users.documents;
    }catch (error){
        throw new Error(error);
    }
}

export const getPostList = async () => {
    try{
        const posts = await databases.listDocuments(
            Config.databaseId,
            Config.postCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(20))]
        );
        return posts.documents;
    }catch (error){
        throw new Error(error);
    }
}

export const sendRecoveryEmail = async (email) => {
    try {
      const response = await account.createRecovery(email, "http://localhost:8081");
      console.log('Recovery email sent:', response);
      return response;
    } catch (error) {
      console.error('Error sending recovery email:', error);
    }
};

export const updateSignature = async (newSignature) => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        const response = await databases.updateDocument(
            Config.databaseId,
            Config.userCollectionId,
            currentUser.documents[0].$id,
            {signature : newSignature}
        )
        return response;
    } catch (error) {
        console.error('Error updating signature:', error);
    }
}

export const createPost = async (postContent) => {
    try{
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        const newPost = await databases.createDocument(
            Config.databaseId,
            Config.postCollectionId,
            ID.unique(),
            {   
                accountId: currentUser.documents[0].$id,
                content: postContent,
                avatar: currentUser.documents[0].avatar,
                username: currentUser.documents[0].username,
            }
        );

        return newPost;
    
    }catch (error){
        console.log(error);
        throw new Error(error);
    }
}