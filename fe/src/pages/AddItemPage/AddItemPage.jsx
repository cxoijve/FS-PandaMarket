import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import { addProduct } from "../../api/itemApi";
import defaultImage from "../../assets/images/icons/img_default.svg"; // 기본 이미지 import

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]); // 기본 이미지 적용할 것
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateName = (value) => {
    setErrors((prev) =>
      value.length < 2 || value.length > 10
        ? { ...prev, name: "2자 이상 10자 이내로 입력해주세요" }
        : { ...prev, name: undefined }
    );
  };

  const validateDescription = (value) => {
    setErrors((prev) =>
      value.length < 10
        ? { ...prev, description: "10자 이상 입력해주세요." }
        : { ...prev, description: undefined }
    );
  };

  const validatePrice = (value) => {
    setErrors((prev) =>
      !/^\d+$/.test(value)
        ? { ...prev, price: "숫자로 입력해주세요." }
        : { ...prev, price: undefined }
    );
  };

  /**
   * 상품 등록 후 해당 상품의 상세 페이지로 이동
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) {
      return;
    }

    // 이미지가 없으면 기본 이미지 적용
    const finalImages = images.length > 0 ? images : [defaultImage];

    const productData = {
      name,
      description,
      price: Number(price),
      tags,
      images: finalImages,
    };

    try {
      const productId = await addProduct(productData); //  상품 등록 후 ID 반환
      console.log(" 등록된 상품 ID:", productId);

      // 상품 등록 후 해당 상품의 상세 페이지(`/items/:id`)로 이동
      navigate(`/items/${productId}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button
            type="submit"
            disabled={!name || !description || !price || !tags.length}
          >
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateDescription(e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description}
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validatePrice(e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;
