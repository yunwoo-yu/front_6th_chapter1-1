import { CategoryLoader } from "../../../features/category/CategoryLoader";

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
            .map(
              (category) => /* HTML */ `
                <button
                  data-category1="${category}"
                  class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
      bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ${category}
                </button>
              `,
            )
            .join("")}
        `}
  </div>
  <!-- 2depth 카테고리 -->
`;
