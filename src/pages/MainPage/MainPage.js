import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Toast } from "../../components/layout/Toast";
import { navigate } from "../../core/router";
import { Cart } from "../../features/cart/Cart";
import { mainActions, mainStore } from "../../stores/mainStore";
import { addToCart } from "../../utils/carts";
import { CategorySection } from "./components/CategorySection";
import { FilterSection } from "./components/FilterSection";
import { ProductSection } from "./components/ProductSection";
import { SearchSection } from "./components/SearchSection";

export const MainPage = () => {
  const mainState = mainStore.getState();

  if (mainState.products.length === 0) {
    mainActions.getProducts();
  }

  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header()}
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          ${SearchSection()}
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">${CategorySection()}</div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">${FilterSection()}</div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>${ProductSection()}</div>
        </div>
      </main>
      ${Footer()} ${Toast()} ${Cart()}
    </div>
  `;
};

export const setupMainPageEvent = () => {
  const root = document.querySelector("#root");
  let isScrolling = false;

  if (!root) return;

  root.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "search-input" && e.key === "Enter") {
        const value = e.target.value;
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.set("search", value);
        searchParams.set("page", "1");

        navigate(`?${searchParams.toString()}`);

        await mainActions.getProducts();
      }
    }
  });

  root.addEventListener("change", async (e) => {
    if (e.target.id === "limit-select") {
      const value = e.target.value;
      const searchParams = new URLSearchParams(window.location.search);

      console.log("change", value);

      searchParams.set("limit", value);
      searchParams.set("page", "1");

      navigate(`?${searchParams.toString()}`);

      await mainActions.getProducts();
    }

    if (e.target.id === "sort-select") {
      const value = e.target.value;
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("sort", value);
      searchParams.set("page", "1");
      navigate(`?${searchParams.toString()}`);

      await mainActions.getProducts();
    }
  });

  root.addEventListener("click", async (e) => {
    const mainState = mainStore.getState();

    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.dataset.productId;
      const product = mainState.products.find((product) => product.productId === productId);

      if (product) {
        addToCart(product);
        mainStore.setState({ ...mainState, toastType: "success" });
      }
    }

    if (e.target.closest("#toast-close-btn")) {
      mainStore.setState({ ...mainState, toastType: null });
    }

    if (e.target.classList.contains("category1-filter-btn")) {
      const value = e.target.dataset.category1;
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("category1", value);
      searchParams.set("page", "1");
      navigate(`?${searchParams.toString()}`);

      await mainActions.getProducts();
    } else if (e.target.classList.contains("category2-filter-btn")) {
      const value = e.target.dataset.category2;
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("category2", value);
      searchParams.set("page", "1");
      navigate(`?${searchParams.toString()}`);

      await mainActions.getProducts();
    }

    if (e.target.dataset.breadcrumb) {
      const value = e.target.dataset.breadcrumb;
      const searchParams = new URLSearchParams(window.location.search);

      if (value === "reset") {
        searchParams.delete("category1");
        searchParams.delete("category2");
        navigate(`?${searchParams.toString()}`);

        await mainActions.getProducts();
      } else if (value === "category1") {
        searchParams.delete("category2");
        navigate(`?${searchParams.toString()}`);

        await mainActions.getProducts();
      }
    }

    if (e.target.closest("#cart-icon-btn")) {
      mainStore.setState({ ...mainState, isCartOpen: true });
    }

    if (e.target.closest("#cart-modal-close-btn")) {
      mainStore.setState({ ...mainState, isCartOpen: false });
    }
  });

  window.addEventListener("scroll", async (e) => {
    // 이미 로딩 중이거나 더 이상 데이터가 없으면 return
    if (isScrolling) return;

    const mainState = mainStore.getState();

    // 더 이상 가져올 데이터가 없으면 return
    if (!mainState.hasNext) return;

    const scrollingElement = e.target.scrollingElement || document.documentElement;
    const { scrollTop, scrollHeight, clientHeight } = scrollingElement;

    if (!scrollingElement) return;

    // 스크롤이 하단에 가까워졌을 때 (100px 여유)
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      console.log("무한스크롤 트리거 - 다음 페이지 로드");

      // 스크롤 중복 방지
      isScrolling = true;

      // 로딩 상태 설정
      mainStore.setState({
        ...mainState,
        isInfiniteLoading: true,
      });

      try {
        // 다음 페이지 번호 계산
        const searchParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(searchParams.get("page") || "1");
        const nextPage = currentPage + 1;

        console.log(`현재 페이지: ${currentPage}, 다음 페이지: ${nextPage}`);

        // URL 업데이트
        searchParams.set("page", nextPage.toString());
        navigate(`?${searchParams.toString()}`);

        // 다음 페이지 데이터 로드
        await mainActions.getNextProducts();
      } catch (error) {
        console.error("무한스크롤 에러:", error);
      } finally {
        // 로딩 상태 해제
        isScrolling = false;
        mainStore.setState({
          ...mainStore.getState(),
          isInfiniteLoading: false,
        });
      }
    }
  });
};
