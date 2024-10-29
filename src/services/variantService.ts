import * as request from '../utils/request'; // import all



export const postVariants = async (variants: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('variants', variants, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        // throw (error);
        console.log(error);
        return {
            status: 'CONFLICT'
        }
    }
};
