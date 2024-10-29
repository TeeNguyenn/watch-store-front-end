import UserModel from '../models/UserModel';
import * as request from '../utils/request'; // import all

interface IRole {
    id: number;
    name: string;
}

export const getUserDetail = async (): Promise<UserModel> => {
    const token = localStorage.getItem('token');
    try {
        const response = await request.get('users/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const role: IRole[] = [];

        response.data.roles.forEach((roleItem: any) => role.push({
            id: roleItem.id,
            name: roleItem.name
        }))

        return {
            userId: response.data.id,
            lastName: response.data.last_name,
            firstName: response.data.first_name,
            phoneNumber: response.data.phone_number,
            email: response.data.email,
            role

        };

    } catch (error) {
        throw (error);

    }
}

interface IResult {
    result: UserModel[];
    totalPage: number;
}

export const getAllUser = async (): Promise<IResult> => {
    const token = localStorage.getItem('token');
    try {
        const response = await request.get('users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.total_pages;

        const result: UserModel[] = [];

        response.user_responses.forEach((item: any) => result.push(
            {
                userId: item.id,
                lastName: item.last_name,
                firstName: item.first_name,
                phoneNumber: item.phone_number,
                email: item.email,

            }
        ))

        return {
            result,
            totalPage
        };

    } catch (error) {
        throw (error);

    }
}