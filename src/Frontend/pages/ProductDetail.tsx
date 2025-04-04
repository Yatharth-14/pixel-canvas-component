
import { useParams } from "react-router-dom";
import ProductDetailView from "../../components/product/ProductDetailView";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {productId && <ProductDetailView productId={productId} />}
    </div>
  );
};

export default ProductDetail;
