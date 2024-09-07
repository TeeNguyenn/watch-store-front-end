import CategoryModel from '../models/CategoryModel';
import * as request from '../utils/request'; // import all


export const getAllCategory = async (): Promise<CategoryModel[]> => {
    try {
        const result: CategoryModel[] = [];

        const res = await request.get('categories');

        const responseData: any[] = res.data.category_responses;

        responseData.forEach((item) => result.push({
            categoryId: item.id,
            name: item.name,
            totalProduct: item.total_products,

        }))

        return result;


    } catch (error) {
        throw (error)
    }
};