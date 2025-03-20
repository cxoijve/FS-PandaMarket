import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Common/Layout"; // ✅ Layout 추가
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/LoginPage/SignupPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 & 회원가입 페이지는 `Layout` 없이 개별적으로 렌더링 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* `Layout` 적용하여 헤더 & 푸터 자동 포함 */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="community" element={<CommunityFeedPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="items/:id" element={<ItemDetailPage />} />
          <Route path="registration" element={<AddItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
