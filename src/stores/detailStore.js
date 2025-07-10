import { createStore } from "../core/store.js";

/**
 * 디테일 페이지 상태 초기값
 */
const initialDetailState = {
  product: null,
  relatedProducts: [],
  reviews: [],
  selectedImage: 0,
  quantity: 1,
  selectedOptions: {},
  isAddingToCart: false,
  isFavorite: false,
  viewHistory: [],
};

/**
 * 디테일 페이지 스토어 생성
 */
export const detailStore = createStore(initialDetailState);

/**
 * 디테일 페이지 액션들
 */
export const detailActions = {
  // 상품 정보 설정
  setProduct: (product) => {
    detailStore.setState({ product });
  },

  // 관련 상품 설정
  setRelatedProducts: (products) => {
    detailStore.setState({ relatedProducts: products });
  },

  // 리뷰 설정
  setReviews: (reviews) => {
    detailStore.setState({ reviews });
  },

  // 리뷰 추가
  addReview: (review) => {
    const { reviews } = detailStore.getState();
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString(),
    };
    detailStore.setState({ reviews: [...reviews, newReview] });
  },

  // 선택된 이미지 변경
  setSelectedImage: (index) => {
    detailStore.setState({ selectedImage: index });
  },

  // 수량 변경
  setQuantity: (quantity) => {
    if (quantity < 1) return;
    detailStore.setState({ quantity });
  },

  // 수량 증가
  increaseQuantity: () => {
    const { quantity } = detailStore.getState();
    detailStore.setState({ quantity: quantity + 1 });
  },

  // 수량 감소
  decreaseQuantity: () => {
    const { quantity } = detailStore.getState();
    if (quantity > 1) {
      detailStore.setState({ quantity: quantity - 1 });
    }
  },

  // 옵션 선택
  setSelectedOption: (optionKey, value) => {
    const { selectedOptions } = detailStore.getState();
    detailStore.setState({
      selectedOptions: {
        ...selectedOptions,
        [optionKey]: value,
      },
    });
  },

  // 장바구니 추가 상태 설정
  setAddingToCart: (isAddingToCart) => {
    detailStore.setState({ isAddingToCart });
  },

  // 즐겨찾기 토글
  toggleFavorite: () => {
    const { isFavorite } = detailStore.getState();
    detailStore.setState({ isFavorite: !isFavorite });
  },

  // 조회 기록 추가
  addToViewHistory: (productId) => {
    const { viewHistory } = detailStore.getState();
    const updatedHistory = [productId, ...viewHistory.filter((id) => id !== productId)].slice(0, 10); // 최대 10개까지 유지
    detailStore.setState({ viewHistory: updatedHistory });
  },

  // 상태 초기화 (페이지 이동 시 사용)
  resetDetailState: () => {
    detailStore.setState({
      product: null,
      relatedProducts: [],
      reviews: [],
      selectedImage: 0,
      quantity: 1,
      selectedOptions: {},
      isAddingToCart: false,
      isFavorite: false,
    });
  },

  // 상품 데이터 로드 (API 호출 시뮬레이션)
  loadProduct: async (productId) => {
    try {
      detailStore.setState({ isLoading: true });

      // 실제로는 API 호출
      const mockProduct = {
        id: productId,
        name: `상품 ${productId}`,
        price: 29900,
        description: "멋진 상품입니다.",
        images: [
          "https://via.placeholder.com/400x400/ff6b6b/fff?text=Image1",
          "https://via.placeholder.com/400x400/4ecdc4/fff?text=Image2",
          "https://via.placeholder.com/400x400/45b7d1/fff?text=Image3",
        ],
        options: {
          color: ["Red", "Blue", "Green"],
          size: ["S", "M", "L", "XL"],
        },
        rating: 4.5,
        reviewCount: 128,
      };

      const mockRelatedProducts = [
        { id: "related1", name: "관련 상품 1", price: 19900 },
        { id: "related2", name: "관련 상품 2", price: 39900 },
      ];

      const mockReviews = [
        {
          id: 1,
          author: "사용자1",
          rating: 5,
          content: "정말 좋은 상품입니다!",
          createdAt: "2024-01-01",
        },
        {
          id: 2,
          author: "사용자2",
          rating: 4,
          content: "가성비 좋아요.",
          createdAt: "2024-01-02",
        },
      ];

      // 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500));

      detailStore.setState({
        product: mockProduct,
        relatedProducts: mockRelatedProducts,
        reviews: mockReviews,
        isLoading: false,
      });

      // 조회 기록에 추가
      detailActions.addToViewHistory(productId);
    } catch (error) {
      detailStore.setState({ isLoading: false });
      console.error("상품 로드 실패:", error);
    }
  },
};
