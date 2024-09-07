import CollectionModel from '../models/CollectionModel';
import * as request from '../utils/request'; // import all


export const getAllCollection = async (): Promise<CollectionModel[]> => {
    try {
        const result: CollectionModel[] = [];

        const res = await request.get('collections?page=0&limit=10');

        const responseData: any[] = res.data.collection_responses;

        responseData.forEach((item) => result.push({
            collectionId: item.id,
            name: item.name,

        }))

        return result;


    } catch (error) {
        throw (error)
    }
};