import UserModel from '../models/UserModel';
import * as request from '../utils/request'; // import all

export const getUserDetail = async (): Promise<UserModel> => {
    const token = localStorage.getItem('token');
    try {
        const response = await request.get('users/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return {
            userId: response.data.id,
            lastName: response.data.last_name,
            firstName: response.data.first_name,
            phoneNumber: response.data.phone_number,
            email: response.data.email,

        };

    } catch (error) {
        throw (error);

    }
}