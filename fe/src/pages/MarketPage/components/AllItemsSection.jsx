import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIconMobile } from "../../../assets/images/icons/ic_sort_mobile.svg";
import { ReactComponent as SortIconArrowDown } from "../../../assets/images/icons/ic_arrow_down.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import DropdownList from "../../../components/UI/DropdownList";
import PaginationBar from "../../../components/UI/PaginationBar";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/images/icons/img_default.svg";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 4;
  if (width < 1280) return 6;
  return 10;
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [keyword, setKeyword] = useState("");

  const fetchSortedData = async () => {
    try {
      const products = await getProducts({ orderBy, page, pageSize, keyword });
      console.log("받아온 상품 목록:", products);

      if (Array.isArray(products) && products.length > 0) {
        // 기본 이미지 적용
        const productsWithDefaultImages = products.map((product) => ({
          ...product,
          images: product.images.length > 0 ? product.images : [defaultImage],
        }));

        setItemList(productsWithDefaultImages);
        setTotalPageNum(Math.ceil(products.length / pageSize));
      } else {
        setItemList([]);
      }
    } catch (error) {
      console.error("상품 목록 불러오기 실패:", error);
      setItemList([]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchSortedData();
  };

  return (
    <div>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>

        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchSortedData()}
          />
        </div>
        <Link to="/registration" className="createItemButton button">
          상품 등록하기
        </Link>
        <div className="sortButtonWrapper">
          <button
            className="sortDropdownTriggerButton"
            onClick={toggleDropdown}
          >
            <div className="sortBtn">
              <span>{orderBy === "recent" ? "최신순" : "인기순"}</span>
              <SortIconArrowDown />
            </div>
            <SortIconMobile className="mobileSortBtn" />
          </button>
          {isDropdownVisible && <DropdownList onSortSelection={setOrderBy} />}
        </div>
      </div>

      <div className="allItemsCardSection">
        {itemList.length > 0 ? (
          itemList.map((item) => (
            <ItemCard item={item} key={`market-item-${item.id}`} />
          ))
        ) : (
          <p>현재 등록된 상품이 없습니다.</p>
        )}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllItemsSection;
