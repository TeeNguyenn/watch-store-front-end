import FeedbackModel from '../models/FeedbackModel';
import * as request from '../utils/request'; // import all


export const getAllFeedbackByProductId = async (productId: number): Promise<FeedbackModel[]> => {
    try {
        const result: FeedbackModel[] = [];

        const res = await request.get(`feedbacks/product/${productId}`);

        const responseData = res.data;

        for (const key in responseData) {

            result.push({
                feedbackId: responseData[key].feedback_id,
                rate: responseData[key].rate,
                comment: responseData[key].comment,

            })
        }

        return result;


    } catch (error) {
        throw (error)
    }
};