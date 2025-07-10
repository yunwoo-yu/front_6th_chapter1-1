import { getCategories, getProducts } from "../api/productApi.js";
import { createStore } from "../core/store.js";
import { getSearchParams } from "../utils/store.js";

/**
 * 메인 페이지 상태 초기값
 */
const initialMainState = {
  isLoading: true,
  isInfiniteLoading: false,
  isCartOpen: false,
  products: [],
  total: 0,
  limit: getSearchParams().get("limit") || "20",
  sort: getSearchParams().get("sort") || "price_asc",
  search: getSearchParams().get("search") || "",
  category1: getSearchParams().get("category1") || "",
  category2: getSearchParams().get("category2") || "",
  page: 1,
  hasNext: null,
  toastType: null,
  categories: {},
};

/**
 * 메인 페이지 스토어 생성
 */
export const mainStore = createStore(initialMainState);

/**
 * 메인 페이지 액션들
 */
export const mainActions = {
  getProducts: async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(searchParams);
    const [productsData, categoriesData] = await Promise.all([getProducts(params), getCategories()]);

    mainStore.setState({
      products: productsData.products,
      total: productsData.pagination.total,
      hasNext: productsData.pagination.hasNext,
      limit: `${productsData.pagination.limit || "20"}`,
      category1: productsData.filters.category1 || "",
      category2: productsData.filters.category2 || "",
      sort: productsData.filters.sort || "price_asc",
      search: productsData.filters.search || "",
      page: productsData.pagination.page || 1,
      isLoading: false,
      categories: categoriesData,
    });
  },
  getCategories: async () => {
    const categoriesData = await getCategories();
    mainStore.setState({
      ...mainStore.getState(),
      categories: categoriesData,
    });
  },

  getNextProducts: async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(searchParams);

    mainStore.setState({
      isInfiniteLoading: true,
    });

    const productsData = await getProducts(params);

    mainStore.setState({
      isInfiniteLoading: false,
    });

    mainStore.setState({
      products: productsData, // 🔥 기존 상품에 추가
      total: productsData.pagination.total,
      hasNext: productsData.pagination.hasNext,
      page: parseInt(params.page || "1"),
      limit: params.limit || "20",
      sort: params.sort || "price_asc",
      search: params.search || "",
      category1: params.category1 || "",
      category2: params.category2 || "",
    });
  },
};
