import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/itemApi";

function ItemDetailPage() {
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 상품 상세 정보 가져오기
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("상품 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>상품 정보를 불러오는 중...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images[0]} alt={product.name} width="300" />
      <p>{product.description}</p>
      <strong>{product.price}원</strong>
      <p>태그: {product.tags.join(", ")}</p>
    </div>
  );
}

export default ItemDetailPage;
