import { FC } from 'react';
import ProductItem from './ProductItem'; 
import { Product } from '../interfaces/product';

interface ProductListProps {
    products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
