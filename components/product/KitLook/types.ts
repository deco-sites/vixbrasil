export type KitProduct = {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl: string | null;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: string;
  clusterHighlights: Record<string, unknown>;
  productClusters: Record<string, string>;
  searchableClusters: Record<string, unknown>;
  categories: string[];
  categoriesIds: string[];
  link: string;
  Composição: string[];
  icone_categoria: string[];
  Cor: string[];
  Especificacao: string[];
  Tamanho: string[];
  Caracteristicas: string[];
  allSpecifications: string[];
  allSpecificationsGroups: string[];
  description: string;
  items: Item[];
  skuSpecifications: SkuSpecification[];
};

export type Item = {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  referenceId: ReferenceId[];
  measurementUnit: string;
  unitMultiplier: number;
  modalType: string | null;
  isKit: boolean;
  images: Image[];
  Tamanho: string[];
  variations: string[];
  sellers: Seller[];
  Videos: string[];
  estimatedDateArrival: string | null;
};

type ReferenceId = {
  Key: string;
  Value: string;
};

type Image = {
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
};

type Seller = {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
};

type CommertialOffer = {
  DeliverySlaSamplesPerRegion: Record<string, unknown>;
  Installments: string[];
  DiscountHighLight: string[];
  GiftSkuIds: string[];
  Teasers: string[];
  PromotionTeasers: string[];
  BuyTogether: string[];
  ItemMetadataAttachment: string[];
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  FullSellingPrice: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples: string[];
  GetInfoErrorMessage: string;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: PaymentOptions;
};

type PaymentOptions = {
  installmentOptions: string[];
  paymentSystems: string[];
  payments: string[];
  giftCards: string[];
  giftCardMessages: string[];
  availableAccounts: string[];
  availableTokens: string[];
};

type SkuSpecification = {
  field: SkuField;
  values: SkuValue[];
};

type SkuField = {
  id: number;
  name: string;
  isActive: boolean;
  position: number;
  type: string;
};

type SkuValue = {
  id: string;
  name: string;
  position: number;
};
