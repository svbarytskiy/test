import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../interfaces/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="border p-6 rounded-lg flex flex-col items-center space-y-4 bg-white shadow-lg hover:shadow-2xl transform transition-all hover:scale-105">
      <Link to={`/product/${product.id}`} className="w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={product.size.width}
          height={product.size.height}
          className="object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-center text-gray-800">{product.name}</h2>
      </Link>
      <p className="text-gray-600 text-sm">Count: <span className="font-medium">{product.count}</span></p>
      <p className="text-gray-600 text-sm">Weight: <span className="font-medium">{product.weight}</span></p>
    </div>
  );
};

export default ProductItem;
