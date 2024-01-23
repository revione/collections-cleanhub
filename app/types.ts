export interface CollectionData {
  uuid: string;
  state: string;
  category: string;
  stage: string;
  name: string;
  displayName: string;
  slug: string | null;
  type: string | null;
  location: string | null;
  externalId: string | null;
  recoveredQuantity: number;
  recoveredQuantityUnit: string;
  totalRecoveredQuantity: number;
  collectionAndSortingParagraph: string | null;
  pageMode: string;
  hubUnassignedRecoveryList: HubUnassignedRecovery[];
  referenceQuantityUnit: string;
  parentHubName: string | null;
  logo: Logo | null;
  cardDescription: string;
  cardImage: CardImage;
  thankYouNote: string | null;
  portfolioAssignedQuantityPercentage: number | null;
  unassignedQuantityPercentage: number;
  unassignedQuantityTotal: number;
  assignable: boolean;
  formattedRecoveredQuantity: string;
  formattedTotalRecoveredQuantity: string;
}

interface CardImage {
  uuid: string;
  directLink: string;
  thumbnailDirectLink: string;
  processedDirectLink: string | null;
  processedThumbnailDirectLink: string | null;
  fileName: string;
  size: number;
}

export interface Logo {
  uuid: string;
  directLink: string;
  thumbnailDirectLink: string;
  processedDirectLink: string | null;
  processedThumbnailDirectLink: string | null;
  fileName: string;
  size: number;
}

export interface HubUnassignedRecovery {
  uuid: string;
  createdAt: string;
  state: string;
  unassignedQuantity: number;
  assignedQuantity: number;
  quantityUnit: string;
}

export enum State {
  DEMO = "DEMO",
  ACTIVE = "ACTIVE",
}

export enum Stage {
  FULLY_ONBOARDED = "FULLY_ONBOARDED",
  PILOT = "PILOT",
}
