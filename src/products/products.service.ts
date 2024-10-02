import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    try {
      return this.productModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getSpecificProducts(userId: string): Promise<Product[]> {
    return this.productModel.find({ userId });
  }

  async getProductsById(userId: string, productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ userId, _id: productId });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(userId: string, productData: CreateProductDto): Promise<Product> {
    return  await this.productModel.create({ userId, ...productData });
    // return newProduct.save();
  }

  async updateProduct(userId: string, productId: string, updatedProductData: UpdateProductDto): Promise<Product> {
    const product = await this.productModel
      .findOneAndUpdate({ userId, _id: productId }, updatedProductData, { new: true })
      ;
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async deleteProduct(productId: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(productId);
    if (!result) throw new NotFoundException('Product not found');
  }
}
