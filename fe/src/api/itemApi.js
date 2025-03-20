import defaultImage from "../assets/images/icons/img_default.svg";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5050";

/**
 * 상품 목록 조회 API (`GET /items`)
 */
export async function getProducts({ orderBy, page, pageSize, keyword } = {}) {
  const params = new URLSearchParams();

  if (orderBy) params.append("orderBy", orderBy);
  if (pageSize) params.append("take", pageSize.toString());
  if (page) params.append("skip", ((page - 1) * (pageSize || 10)).toString());
  if (keyword) params.append("word", keyword);

  const query = params.toString();
  console.log("📌 상품 목록 조회 요청:", `${API_BASE_URL}/items?${query}`);

  try {
    const response = await fetch(`${API_BASE_URL}/items?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("🚨 상품 목록 가져오기 실패:", error);
    throw error;
  }
}

/**
 * 상품 등록 API (`/items/registration`)
 */
export async function addProduct(productData) {
  try {
    // images 필드가 없거나 빈 배열이면 기본 이미지 적용
    if (!productData.images || productData.images.length === 0) {
      productData.images = [defaultImage];
    }

    console.log("📌 상품 등록 요청 데이터:", productData); // 디버깅용

    const response = await fetch(`${API_BASE_URL}/items/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();
    console.log("상품 등록 성공:", result); // 응답 확인

    if (!result.id) {
      throw new Error("상품 등록 응답에 ID가 없습니다.");
    }

    return result.id; // 상품 ID 반환
  } catch (error) {
    console.error("상품 등록 실패:", error);
    throw error;
  }
}

/**
 * 특정 상품 상세 조회 API
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("상품 상세 정보 가져오기 실패:", error);
    throw error;
  }
}
