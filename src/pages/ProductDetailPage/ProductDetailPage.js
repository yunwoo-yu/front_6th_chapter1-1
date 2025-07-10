import { Header } from "../../components/layout/Header.js";

export const ProductDetailPage = () => {
  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">${Header({ isBackButton: true, title: "상품 상세" })}</div>
  `;
};
