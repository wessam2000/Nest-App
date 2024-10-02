import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
// @UsePipes(ValidationPipe)
export class ProductsController {
  constructor(private  productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':userId')
  getAllProducts(@Param('userId') userId: string) {
    return this.productsService.getSpecificProducts(userId);
  }

  @Get(':userId/:productId')
  getProductById(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.productsService.getProductsById(userId, productId);
  }

  @Post(':userId')
  createProduct(@Param('userId') userId: string, @Body() createProduct: CreateProductDto) {
    return this.productsService.createProduct(userId, createProduct);
  }

  @Patch(':userId/:productId')
  updateProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(userId, productId, updateProduct);
  }

  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return this.productsService.deleteProduct(productId);
  }
}
