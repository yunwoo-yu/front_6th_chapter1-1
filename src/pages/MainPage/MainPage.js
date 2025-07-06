import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { CategorySection } from "./components/CategorySection";
import { FilterSection } from "./components/FilterSection";
import { ProductSection } from "./components/ProductSection";
import { SearchSection } from "./components/SearchSection";

export const MainPage = ({ products, isLoading, total, categories }) => /* HTML */ `
  <div class="min-h-screen bg-gray-50">
    ${Header()}
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        ${SearchSection()}
        <!-- 필터 옵션 -->
        <div class="space-y-3">
          <!-- 카테고리 필터 -->
          <div class="space-y-2">${CategorySection({ isLoading, categories })}</div>
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">${FilterSection()}</div>
        </div>
      </div>
      <!-- 상품 목록 -->
      <div class="mb-6">
        <div>${ProductSection({ products, isLoading, total })}</div>
      </div>
    </main>
    ${Footer()}
  </div>
`;
