import CategoryModel from "./CategoryModel";
import ColorModel from "./ColorModel";
import FeedbackModel from "./FeedbackModel";
import ProductImageModel from "./ProductImageModel";
import VariantModel from "./VariantModel";

class ProductModel {
    productId: number;
    title?: string;
    price: number;
    discount?: number;
    thumbnail: string;
    desc: string;
    averageRate: number;
    quantityStock: number;
    category: CategoryModel;
    colors: ColorModel[];
    productImages: ProductImageModel[];
    variants?: VariantModel[];
    // feedbacks: FeedbackModel[];



    constructor(productId: number,
        title: string,
        price: number,
        discount: number,
        thumbnail: string,
        desc: string,
        averageRate: number,
        quantityStock: number,
        category: CategoryModel,
        colors: ColorModel[],
        productImages: ProductImageModel[],
        variants: VariantModel[],

        // feedbacks: FeedbackModel[],
    ) {
        this.productId = productId;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.thumbnail = thumbnail;
        this.desc = desc;
        this.averageRate = averageRate;
        this.quantityStock = quantityStock;
        this.category = category;
        this.colors = colors;
        this.productImages = productImages;
        this.variants = variants;
        // this.feedbacks = feedbacks;
    }

}

export default ProductModel;