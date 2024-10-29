import OrderDTO from '../dtos/OrderDTO';
import * as request from '../utils/request'; // import all



export const getOrderByOrderId = async (orderId: string = '') => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
};


interface ResultInterface {
    result: any,
    totalPage: number,
    totalOrders: number,
}

export const getAllOrderByUserId = async (currentUser: string, currentPage = 1, limit: number = 6, sort = 'latest'): Promise<ResultInterface> => {
    // const currentUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders/user/${currentUser}`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.data.total_pages;
        const totalOrders = response.data.total_orders;

        return {
            result: response.data.order_responses,
            totalPage,
            totalOrders
        };

    } catch (error) {
        throw (error);

    }
};

export const getAllOrder = async (currentPage = 1, limit: number = 8): Promise<ResultInterface> => {
    // const currentUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders`, {
            params: {
                page: currentPage - 1,
                limit,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.data.total_pages;
        const totalOrders = response.data.total_orders;

        return {
            result: response.data.order_responses,
            totalPage,
            totalOrders
        };

    } catch (error) {
        throw (error);

    }
};

export const postOrder = async (order: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('orders', order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};

export const deleteOrderItem = async (orderId: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.del(`orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};