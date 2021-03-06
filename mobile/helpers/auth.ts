import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface registerBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordCheck: string;
}
export const register = async (registerBody: registerBody) => {
    try {
        if (registerBody.password === registerBody.passwordCheck) {
            console.log(registerBody);
            const res = await axios.post(
                'http://10.0.2.2:3000/user/register',
                registerBody,
            );
            const data = await res.data;
            await AsyncStorage.setItem('auth-token', data.id);
        } else {
            throw "Passwords don't match";
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

interface loginBody {
    email: string;
    password: string;
}
export const login = async (loginBody: loginBody) => {
    console.log(loginBody);
    try {
        const res = await axios.post(
            'http://10.0.2.2:3000/user/login',
            loginBody,
        );
        const data = await res.data;
        await AsyncStorage.setItem('auth-token', data.user_id);
    } catch (err) {
        console.log('Login error');
        throw err;
    }
};

export const getProfile = async () => {
    // const userId = await getUserId();
    // if (userId) {
    //     const res = await axios.get('/profile', {headers: {auth-token: userId}});
    //     const data = res.data;
    //     return data;
    // }
    return {
        stars: 3,
        name: 'Billy Hawkes',
        bio: 'lorem afdf afd d fa faf add afaf ',
    };
};

export const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('auth-token');
        if (userId !== null) {
            return userId;
        }
    } catch (err) {
        console.log('Error getting userId');
        throw err;
    }
};
