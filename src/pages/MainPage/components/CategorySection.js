import { CategoryLoader } from "../../../features/category/CategoryLoader";
import { CategoryItem } from "../../../features/category/CateogryItem";

export const CategorySection = ({ isLoading, categories }) => /* HTML */ `
  <div class="flex items-center gap-2">
    <label class="text-sm text-gray-600">카테고리:</label>
    <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
  </div>
  <!-- 1depth 카테고리 -->
  <div class="flex flex-wrap gap-2">
    ${isLoading
      ? CategoryLoader()
      : /* HTML */ `
          ${Object.keys(categories)
            .map((category) => CategoryItem({ category }))
            .join("")}
        `}
  </div>
  <!-- 2depth 카테고리 -->
`;
