import { CategoryLoader } from "../../../features/category/CategoryLoader";
import { CategoryItem } from "../../../features/category/CateogryItem";
import { mainState } from "../../../main";

export const CategorySection = () => /* HTML */ `
  <div class="flex items-center gap-2">
    <label class="text-sm text-gray-600">카테고리:</label>
    <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
  </div>
  <!-- 1depth 카테고리 -->
  <div class="flex flex-wrap gap-2">
    ${mainState.isLoading
      ? CategoryLoader()
      : /* HTML */ `
          ${Object.keys(mainState.categories)
            .map((category) => CategoryItem({ category }))
            .join("")}
        `}
  </div>
  <!-- 2depth 카테고리 -->
`;
