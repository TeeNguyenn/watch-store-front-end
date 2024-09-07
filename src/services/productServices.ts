import ColorModel from '../models/ColorModel';
import ProductImageModel from '../models/ProductImageModel';
import ProductModel from '../models/ProductModel';
import VariantModel from '../models/VariantModel';
import * as request from '../utils/request'; // import all

interface ResultInterface {
    result: ProductModel[],
    totalPage: number,
}

export const getProduct = async (path: string): Promise<ResultInterface> => {
    try {
        const result: ProductModel[] = [];

        const res = await request.get(path);

        const responseData = res.data.product_responses;

        const totalPage = res.data.total_pages;

        for (const key in responseData) {

            const variants = responseData[key].variants;

            const colors: ColorModel[] = [];

            for (const key in variants) {

                colors.push({
                    colorId: variants[key].color.id,
                    name: variants[key].color.name,
                    red: variants[key].color.red,
                    green: variants[key].color.green,
                    blue: variants[key].color.blue,
                    alpha: variants[key].color.alpha,
                    totalProduct: variants[key].color.total_products,
                })
            }


            result.push({
                productId: responseData[key].id,
                title: responseData[key].title,
                price: responseData[key].price,
                desc: responseData[key].description,
                discount: responseData[key].discount,
                thumbnail: responseData[key].thumbnail,
                averageRate: responseData[key].average_rate,
                quantityStock: responseData[key].quantity_stock,
                category: responseData[key].category,
                colors: colors,
                productImages: responseData[key].product_images,
            })
        }

        return {
            result,
            totalPage
        };


    } catch (error) {
        throw (error);
    }
};

export const getAllProduct = async (currentPage: number, limit: number = 12, collectionId?: string, categoryId?: string, colorId?: string, materialId?: string): Promise<ResultInterface> => {

    const path = `products?page=${currentPage}&limit=${limit}&collection-ids=${collectionId || ''}&category-ids=${categoryId || ''}&color-ids=${colorId || ''}&material-ids=${materialId || ''}`;
    return getProduct(path);
};

export const get3ProductBestSeller = async (): Promise<ResultInterface> => {
    // temp
    const path = `products?page=1&limit=3`;
    return getProduct(path);
};

export const getProductById = async (productId: number): Promise<ProductModel> => {
    try {
        const res = await request.get(`/products/${productId}`);

        const responseData = res.data;

        const variants: any[] = responseData.variants;

        const colors: ColorModel[] = [];

        variants.forEach(variant => colors.push({
            colorId: variant.color.id,
            name: variant.color.name,
            red: variant.color.red,
            green: variant.color.green,
            blue: variant.color.blue,
            alpha: variant.color.alpha,
            totalProduct: variant.color.total_products,
        }))

        const productImages: ProductImageModel[] = [];

        responseData.product_images.forEach((productImage: any) => productImages.push({
            productImageId: productImage.id,
            productId: productImage.product_id,
            imageName: productImage.image_name,
            imageUrl: productImage.image_url,
            isMainImage: productImage.is_main_image,
            colorId: productImage.color_id,
        }))

        const variantList: VariantModel[] = [];

        responseData.variants.forEach((variant: any) => variantList.push({
            color: {
                colorId: variant.color.id,
                name: variant.color.name,
                red: variant.color.red,
                green: variant.color.green,
                blue: variant.color.blue,
                alpha: variant.color.alpha,
            },
            screenSize: {
                sizeId: variant.screen_size.id,
                size: variant.screen_size.size,
            },
            material: {
                materialId: variant.material.id,
                name: variant.material.name,
            },
            quantity: variant.quantity,
        }))

        return {
            productId: responseData.id,
            title: responseData.title,
            price: responseData.price,
            desc: responseData.description,
            discount: responseData.discount,
            thumbnail: responseData.thumbnail,
            averageRate: responseData.average_rate,
            quantityStock: responseData.quantity_stock,
            category: responseData.category,
            colors: colors,
            productImages: productImages,
            variants: variantList,

        };


    } catch (error) {
        throw (error);
    }
};