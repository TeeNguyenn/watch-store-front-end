import ProductImageModel from '../models/ProductImageModel';
import * as request from '../utils/request';

export const getMainProductImageListByProductId = async (productId: number): Promise<ProductImageModel[]> => {

    const result: ProductImageModel[] = [];

    const res = await request.get(`products/${productId}`)

    const responseData: any[] = res.data.product_images;

    responseData.forEach(item => {
        if (item.is_main_image) {
            result.push(
                {
                    productImageId: item.id,
                    productId: item.product_id,
                    imageName: item.image_name,
                    imageUrl: item.image_url,
                    colorId: item.color_id,

                }
            )
        }
    })

    return result;

}