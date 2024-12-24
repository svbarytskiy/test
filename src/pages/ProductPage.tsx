import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, deleteProduct } from "../features/ProductSlice";
import { AppDispatch, RootState } from "../store";
import CommentItem from "../components/CommentItem";

const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { product, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, dispatch]);

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed && product) {
            try {
                await dispatch(deleteProduct(product.id));
                navigate("/");
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="border p-6 rounded-lg flex flex-col items-center space-y-4 bg-white shadow-lg hover:shadow-2xl transform transition-all hover:scale-105">
            <img
                src={product.imageUrl}
                alt={product.name}
                width={product.size.width}
                height={product.size.height}
                className="object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-center text-gray-800">{product.name}</h2>
            <p className="text-gray-600 text-sm">
                Count: <span className="font-medium">{product.count}</span>
            </p>
            <p className="text-gray-600 text-sm">
                Weight: <span className="font-medium">{product.weight}</span>
            </p>
            <div className="text-gray-600 text-sm">
                Size: <span className="font-medium">{product.size.width} x {product.size.height}</span>
            </div>
            <div className="text-gray-600 text-sm">
                Comments: <span className="font-medium">{product.comments.length}</span>
            </div>

            <div className="mt-4 w-full">
                {product.comments.length > 0 ? (
                    product.comments.map((comment, index) => (
                        <CommentItem
                            key={index}
                            description={comment.description}
                            date={comment.date}
                        />
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>

            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
            >
                Delete Product
            </button>
        </div>
    );
};

export default ProductPage;
