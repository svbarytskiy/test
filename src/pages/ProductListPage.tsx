import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ProductSlice";
import { AppDispatch, RootState } from "../store";
import ProductList from "../components/ProductList"; 

const ProductListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
            <section className="w-full">
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default ProductListPage;
