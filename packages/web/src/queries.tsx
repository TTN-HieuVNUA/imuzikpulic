/* tslint:disable */
/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Advertisement = {
  __typename?: 'Advertisement';
  id: Scalars['ID'];
  name: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  imageUrl: Scalars['String'];
  item?: Maybe<Node>;
};

export type ArticleArticleTranslationEdge = {
  __typename?: 'ArticleArticleTranslationEdge';
  node: ArticleTranslation;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type ArticleTranslation = {
  __typename?: 'ArticleTranslation';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  song?: Maybe<Song>;
  image_path?: Maybe<Scalars['String']>;
  published_time?: Maybe<Scalars['DateTime']>;
  articlesRelation: ArticleTranslationConnection;
};


export type ArticleTranslationArticlesRelationArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ArticleTranslationConnection = {
  __typename?: 'ArticleTranslationConnection';
  pageInfo: PageInfo;
  edges: Array<ArticleArticleTranslationEdge>;
  totalCount: Scalars['Float'];
};

export type AuthenticatePayload = Payload & {
  __typename?: 'AuthenticatePayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<AuthenticateResult>;
};

export type AuthenticateResult = {
  __typename?: 'AuthenticateResult';
  accessToken: Scalars['String'];
  accessTokenExpiry: Scalars['Float'];
  refreshToken: Scalars['String'];
  refreshTokenExpiry: Scalars['Float'];
};

export type Banner = {
  __typename?: 'Banner';
  id: Scalars['ID'];
  maxItems?: Maybe<Scalars['Float']>;
  fileUrl: Scalars['String'];
  itemId: Scalars['String'];
  items: Array<BannerItem>;
};

export type BannerItem = {
  __typename?: 'BannerItem';
  id: Scalars['ID'];
  publishedTime?: Maybe<Scalars['DateTime']>;
  wapLink?: Maybe<Scalars['String']>;
  itemType?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  alterText?: Maybe<Scalars['String']>;
  fileUrl: Scalars['String'];
  item?: Maybe<Node>;
};

export type BannerItemConnection = {
  __typename?: 'BannerItemConnection';
  pageInfo: PageInfo;
  edges: Array<BannerItemEdge>;
  totalCount: Scalars['Float'];
};

export type BannerItemEdge = {
  __typename?: 'BannerItemEdge';
  node: BannerItem;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type BannerPackage = {
  __typename?: 'BannerPackage';
  id: Scalars['ID'];
  packageId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  brandId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CallGroup = {
  __typename?: 'CallGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Chart = Node & {
  __typename?: 'Chart';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  songs: SongConnection;
};


export type ChartSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  content: Scalars['String'];
  replies: Array<Reply>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<PublicUser>;
  likes?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Boolean']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  pageInfo: PageInfo;
  edges: Array<CommentEdge>;
  totalCount: Scalars['Float'];
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  node: Comment;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type CommentOrderByInput = {
  updatedAt?: Maybe<OrderByDirection>;
  likesNumber?: Maybe<OrderByDirection>;
};

export type CommentPayload = Payload & {
  __typename?: 'CommentPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Comment>;
};

export type ContentProvider = Node & {
  __typename?: 'ContentProvider';
  id: Scalars['ID'];
  group?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  imageUrl?: Maybe<Scalars['String']>;
  songs: SongConnection;
};


export type ContentProviderSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};

export type ContentProviderConnection = {
  __typename?: 'ContentProviderConnection';
  pageInfo: PageInfo;
  edges: Array<ContentProviderEdge>;
  totalCount: Scalars['Float'];
};

export type ContentProviderDetail = Node & {
  __typename?: 'ContentProviderDetail';
  id: Scalars['ID'];
  cp_group: Scalars['String'];
  cp_code: Scalars['String'];
  status: Scalars['Float'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type ContentProviderEdge = {
  __typename?: 'ContentProviderEdge';
  node: ContentProvider;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};


export type GenerateCaptchaPayload = Payload & {
  __typename?: 'GenerateCaptchaPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<GenerateCaptchaResult>;
};

export type GenerateCaptchaResult = {
  __typename?: 'GenerateCaptchaResult';
  data: Scalars['String'];
};

export type Genre = Node & {
  __typename?: 'Genre';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  songs: SongConnection;
};


export type GenreSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};

export type GenreConnection = {
  __typename?: 'GenreConnection';
  pageInfo: PageInfo;
  edges: Array<GenreEdge>;
  totalCount: Scalars['Float'];
};

export type GenreEdge = {
  __typename?: 'GenreEdge';
  node: Genre;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type GroupInfo = {
  __typename?: 'GroupInfo';
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  members: Array<GroupMember>;
  usedTones?: Maybe<Array<UsedTone>>;
  timeSetting?: Maybe<GroupTimeSetting>;
};

export type GroupMember = {
  __typename?: 'GroupMember';
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['String'];
};

export type GroupPayload = Payload & {
  __typename?: 'GroupPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<CallGroup>;
};

export type GroupTimeSetting = {
  __typename?: 'GroupTimeSetting';
  id: Scalars['ID'];
  timeType: TimeType;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
};

export type HelpArticle = {
  __typename?: 'HelpArticle';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type HelpArticleCategory = {
  __typename?: 'HelpArticleCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  articles: Array<HelpArticle>;
};

export type Member = Node & {
  __typename?: 'Member';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  address?: Maybe<Scalars['String']>;
  displayMsisdn?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  sex?: Maybe<Sex>;
};

export type MemberPayload = Payload & {
  __typename?: 'MemberPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Member>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: AuthenticatePayload;
  refreshAccessToken: AuthenticatePayload;
  logout: StringPayload;
  generateCaptcha: GenerateCaptchaPayload;
  updateProfile: MemberPayload;
  updateAvatar: MemberPayload;
  updatePassword: StringPayload;
  markSpamAsSeen: SpamPayload;
  recordSpamClick: StringPayload;
  likeSong: SongPayload;
  createComment: CommentPayload;
  deleteComment: StringPayload;
  likeComment: CommentPayload;
  createReply: ReplyPayload;
  deleteReply: StringPayload;
  likeSinger: StringPayload;
  pauseRbt: StringPayload;
  activateRbt: StringPayload;
  cancelRbt: StringPayload;
  deleteRbt: StringPayload;
  registerRbt: StringPayload;
  downloadRbt: StringPayload;
  giftRbt: StringPayload;
  setReverseRbt: StringPayload;
  createRbtGroup: GroupPayload;
  deleteRbtGroup: StringPayload;
  addRbtGroupMember: StringPayload;
  removeRbtGroupMember: StringPayload;
  setRbtGroupTones: StringPayload;
  setRbtGroupTime: StringPayload;
  registerDevice: StringPayload;
  recordKeyword: StringPayload;
  createRbtAvailable: RbtCreationPayload;
  createRbtUnavailable: RbtCreationPayload;
};


export type MutationAuthenticateArgs = {
  captcha?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationGenerateCaptchaArgs = {
  username?: Maybe<Scalars['String']>;
};


export type MutationUpdateProfileArgs = {
  fullName: Scalars['String'];
  sex?: Maybe<Sex>;
  birthday?: Maybe<Scalars['DateTime']>;
  address: Scalars['String'];
};


export type MutationUpdateAvatarArgs = {
  extension: Scalars['String'];
  avatar: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String'];
  repeatPassword: Scalars['String'];
  newPassword: Scalars['String'];
  captcha: Scalars['String'];
};


export type MutationMarkSpamAsSeenArgs = {
  seen: Scalars['Boolean'];
  spamId: Scalars['ID'];
};


export type MutationRecordSpamClickArgs = {
  spamId: Scalars['ID'];
};


export type MutationLikeSongArgs = {
  like: Scalars['Boolean'];
  songId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  songId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationLikeCommentArgs = {
  like: Scalars['Boolean'];
  commentId: Scalars['ID'];
};


export type MutationCreateReplyArgs = {
  content: Scalars['String'];
  commentId: Scalars['ID'];
};


export type MutationDeleteReplyArgs = {
  replyId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationLikeSingerArgs = {
  like: Scalars['Boolean'];
  singerId: Scalars['ID'];
};


export type MutationDeleteRbtArgs = {
  rbtCode: Scalars['String'];
  personId: Scalars['String'];
};


export type MutationRegisterRbtArgs = {
  brandId: Scalars['ID'];
};


export type MutationDownloadRbtArgs = {
  brandId?: Maybe<Scalars['String']>;
  rbtCodes: Array<Scalars['String']>;
};


export type MutationGiftRbtArgs = {
  rbtCodes: Array<Scalars['String']>;
  msisdn: Scalars['String'];
};


export type MutationSetReverseRbtArgs = {
  active: Scalars['Boolean'];
};


export type MutationCreateRbtGroupArgs = {
  groupName: Scalars['String'];
};


export type MutationDeleteRbtGroupArgs = {
  groupId: Scalars['ID'];
};


export type MutationAddRbtGroupMemberArgs = {
  memberNumber: Scalars['String'];
  memberName: Scalars['String'];
  groupId: Scalars['ID'];
};


export type MutationRemoveRbtGroupMemberArgs = {
  memberNumber: Scalars['String'];
  groupId: Scalars['ID'];
};


export type MutationSetRbtGroupTonesArgs = {
  rbtCodes: Array<Scalars['String']>;
  groupId: Scalars['ID'];
};


export type MutationSetRbtGroupTimeArgs = {
  endTime?: Maybe<Scalars['DateTime']>;
  startTime?: Maybe<Scalars['DateTime']>;
  timeType: TimeType;
  groupId: Scalars['ID'];
};


export type MutationRegisterDeviceArgs = {
  deviceType: Scalars['String'];
  registerId: Scalars['String'];
};


export type MutationRecordKeywordArgs = {
  keyword: Scalars['String'];
};


export type MutationCreateRbtAvailableArgs = {
  song_slug: Scalars['String'];
  time_stop: Scalars['String'];
  time_start: Scalars['String'];
};


export type MutationCreateRbtUnavailableArgs = {
  composer: Scalars['String'];
  singerName: Scalars['String'];
  songName: Scalars['String'];
  file: Scalars['Upload'];
};

export type MyRbt = {
  __typename?: 'MyRbt';
  status: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  brandId: Scalars['String'];
  reverse?: Maybe<ReverseRbt>;
  packageName: Scalars['String'];
  popup?: Maybe<RbtPopup>;
  downloads?: Maybe<Array<RbtDownload>>;
  callGroups?: Maybe<Array<CallGroup>>;
};

export type Node = {
  id: Scalars['ID'];
};

export type NodeConnection = {
  __typename?: 'NodeConnection';
  totalCount: Scalars['Float'];
  pageInfo: PageInfo;
  edges: Array<NodeEdge>;
};

export type NodeEdge = {
  __typename?: 'NodeEdge';
  node?: Maybe<Node>;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export enum NodeType {
  User = 'USER',
  Cp = 'CP',
  Genre = 'GENRE',
  Rbt = 'RBT',
  Singer = 'SINGER',
  Song = 'SONG',
  Topic = 'TOPIC'
}

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Payload = {
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type PublicUser = Node & {
  __typename?: 'PublicUser';
  id: Scalars['ID'];
  fullName: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Member>;
  banner?: Maybe<Banner>;
  pageBanner?: Maybe<BannerItemConnection>;
  bannerPackages: Array<BannerPackage>;
  featuredList?: Maybe<BannerItemConnection>;
  spams: SpamConnection;
  activeHeadlines: Array<Advertisement>;
  activePopups: Array<Advertisement>;
  iCharts: Array<Chart>;
  iChart?: Maybe<Chart>;
  hotCps: Array<ContentProvider>;
  contentProvider?: Maybe<ContentProvider>;
  contentProviders: ContentProviderConnection;
  genre?: Maybe<Genre>;
  hotGenres: Array<Genre>;
  genres: GenreConnection;
  singer?: Maybe<Singer>;
  singers: SingerConnection;
  recommendedSongs: SongConnection;
  song?: Maybe<Song>;
  likedSongs: SongConnection;
  hotTopics: Array<Topic>;
  hotTop100: Array<Topic>;
  topic?: Maybe<Topic>;
  top100s: TopicConnection;
  topics: TopicConnection;
  comment?: Maybe<Comment>;
  myRbt?: Maybe<MyRbt>;
  rbtPackages?: Maybe<Array<RbtPackage>>;
  groupInfo?: Maybe<GroupInfo>;
  copyRbt?: Maybe<Array<RingBackTone>>;
  helpArticleCategories: Array<HelpArticleCategory>;
  helpArticleCategory?: Maybe<HelpArticleCategory>;
  serverSettings: ServerSettings;
  node?: Maybe<Node>;
  search: NodeConnection;
  hotKeywords: Array<Scalars['String']>;
  article?: Maybe<ArticleTranslation>;
  articles: ArticleTranslationConnection;
  getMyToneCreation?: Maybe<RingBackToneCreation>;
  getMyToneCreations: RingBackToneCreationConnection;
};


export type QueryBannerArgs = {
  id: Scalars['String'];
};


export type QueryPageBannerArgs = {
  slug?: Maybe<Scalars['String']>;
  page: Scalars['String'];
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryFeaturedListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySpamsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryIChartArgs = {
  slug: Scalars['String'];
};


export type QueryContentProviderArgs = {
  group: Scalars['String'];
};


export type QueryContentProvidersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGenreArgs = {
  slug: Scalars['String'];
};


export type QueryGenresArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySingerArgs = {
  slug: Scalars['String'];
};


export type QuerySingersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRecommendedSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};


export type QuerySongArgs = {
  slug: Scalars['String'];
};


export type QueryLikedSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};


export type QueryTopicArgs = {
  slug: Scalars['String'];
};


export type QueryTop100sArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTopicsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCommentArgs = {
  commentId: Scalars['ID'];
};


export type QueryGroupInfoArgs = {
  groupId: Scalars['ID'];
};


export type QueryCopyRbtArgs = {
  msisdn: Scalars['String'];
};


export type QueryHelpArticleCategoryArgs = {
  slug: Scalars['String'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type?: Maybe<NodeType>;
  query: Scalars['String'];
};


export type QueryArticleArgs = {
  slug: Scalars['String'];
};


export type QueryArticlesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetMyToneCreationArgs = {
  id: Scalars['String'];
};


export type QueryGetMyToneCreationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type RbtCreationPayload = Payload & {
  __typename?: 'RbtCreationPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<RingBackToneCreation>;
};

export type RbtDownload = {
  __typename?: 'RbtDownload';
  id: Scalars['String'];
  toneCode: Scalars['String'];
  toneName: Scalars['String'];
  singerName: Scalars['String'];
  price: Scalars['String'];
  personID?: Maybe<Scalars['String']>;
  availableDateTime: Scalars['String'];
  tone?: Maybe<RingBackTone>;
  fileUrl: Scalars['String'];
};

export type RbtPackage = Node & {
  __typename?: 'RbtPackage';
  id: Scalars['ID'];
  name: Scalars['String'];
  brandId: Scalars['String'];
  period: Scalars['String'];
  price: Scalars['String'];
  note: Scalars['String'];
};

export type RbtPopup = {
  __typename?: 'RbtPopup';
  id: Scalars['ID'];
  brandId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  note: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<PublicUser>;
};

export type ReplyEdge = {
  __typename?: 'ReplyEdge';
  node: Reply;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type ReplyPayload = Payload & {
  __typename?: 'ReplyPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Reply>;
};

export type ReverseRbt = {
  __typename?: 'ReverseRbt';
  id: Scalars['ID'];
  status: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type RingBackTone = Node & {
  __typename?: 'RingBackTone';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  toneCode: Scalars['String'];
  availableAt?: Maybe<Scalars['DateTime']>;
  orderTimes: Scalars['Float'];
  singerName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contentProvider?: Maybe<ContentProvider>;
  song?: Maybe<Song>;
  duration?: Maybe<Scalars['Float']>;
  fileUrl?: Maybe<Scalars['String']>;
};

export type RingBackToneCreation = Node & {
  __typename?: 'RingBackToneCreation';
  id: Scalars['ID'];
  type_creation?: Maybe<Scalars['Float']>;
  song_id: Scalars['Float'];
  tone_name?: Maybe<Scalars['String']>;
  tone_name_generation?: Maybe<Scalars['String']>;
  singer_name: Scalars['String'];
  composer: Scalars['String'];
  slug: Scalars['String'];
  cp_id: Scalars['Float'];
  msisdn: Scalars['String'];
  member_id: Scalars['String'];
  duration: Scalars['Float'];
  tone_price: Scalars['Float'];
  tone_code: Scalars['String'];
  tone_id: Scalars['Float'];
  available_datetime?: Maybe<Scalars['DateTime']>;
  tone_status: Scalars['Float'];
  local_file?: Maybe<Scalars['String']>;
  ftp_file: Scalars['String'];
  updated_at: Scalars['DateTime'];
  created_at: Scalars['DateTime'];
  song?: Maybe<Song>;
  contentProvider?: Maybe<ContentProvider>;
  tone?: Maybe<RingBackTone>;
};

export type RingBackToneCreationConnection = {
  __typename?: 'RingBackToneCreationConnection';
  pageInfo: PageInfo;
  edges: Array<RingBackToneCreationEdge>;
  totalCount: Scalars['Float'];
};

export type RingBackToneCreationEdge = {
  __typename?: 'RingBackToneCreationEdge';
  node: RingBackToneCreation;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type ServerSettings = {
  __typename?: 'ServerSettings';
  serviceNumber: Scalars['String'];
  isForceUpdate: Scalars['Boolean'];
  clientAutoPlay: Scalars['Boolean'];
  msisdnRegex: Scalars['String'];
  facebookUrl: Scalars['String'];
  contactEmail: Scalars['String'];
  vipBrandId: Scalars['String'];
};

export enum Sex {
  Unknown = 'UNKNOWN',
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Singer = Node & {
  __typename?: 'Singer';
  id: Scalars['ID'];
  alias: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  likes: SingerLikes;
  songs: SongConnection;
};


export type SingerSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};

export type SingerConnection = {
  __typename?: 'SingerConnection';
  pageInfo: PageInfo;
  edges: Array<SingerEdge>;
  totalCount: Scalars['Float'];
};

export type SingerEdge = {
  __typename?: 'SingerEdge';
  node: Singer;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type SingerLikes = {
  __typename?: 'SingerLikes';
  id: Scalars['ID'];
  totalCount: Scalars['Float'];
  liked?: Maybe<Scalars['Boolean']>;
};

export type Song = Node & {
  __typename?: 'Song';
  id: Scalars['ID'];
  name: Scalars['String'];
  downloadNumber?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  singers: Array<Singer>;
  genres: Array<Genre>;
  fileUrl: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  liked?: Maybe<Scalars['Boolean']>;
  toneFromList?: Maybe<RingBackTone>;
  songsFromSameSingers: SongConnection;
  tones: Array<RingBackTone>;
  comments: CommentConnection;
};


export type SongToneFromListArgs = {
  listId?: Maybe<Scalars['ID']>;
};


export type SongSongsFromSameSingersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};


export type SongCommentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
};

export type SongConnection = {
  __typename?: 'SongConnection';
  pageInfo: PageInfo;
  edges: Array<SongEdge>;
  totalCount: Scalars['Float'];
};

export type SongEdge = {
  __typename?: 'SongEdge';
  node: Song;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type SongOrderByInput = {
  updatedAt?: Maybe<OrderByDirection>;
  downloadNumber?: Maybe<OrderByDirection>;
};

export type SongPayload = Payload & {
  __typename?: 'SongPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Song>;
};

export type Spam = {
  __typename?: 'Spam';
  id: Scalars['ID'];
  name: Scalars['String'];
  content: Scalars['String'];
  sendTime?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  itemType?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  item?: Maybe<Node>;
  seen?: Maybe<Scalars['Boolean']>;
};

export type SpamConnection = {
  __typename?: 'SpamConnection';
  pageInfo: PageInfo;
  edges: Array<SpamEdge>;
  totalCount: Scalars['Float'];
};

export type SpamEdge = {
  __typename?: 'SpamEdge';
  node: Spam;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type SpamPayload = Payload & {
  __typename?: 'SpamPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Spam>;
};

export type StringPayload = Payload & {
  __typename?: 'StringPayload';
  success: Scalars['Boolean'];
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
};

export enum TimeType {
  Always = 'ALWAYS',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY',
  Range = 'RANGE'
}

export type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  songs: SongConnection;
};


export type TopicSongsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  pageInfo: PageInfo;
  edges: Array<TopicEdge>;
  totalCount: Scalars['Float'];
};

export type TopicEdge = {
  __typename?: 'TopicEdge';
  node: Topic;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};


export type UsedTone = {
  __typename?: 'UsedTone';
  id: Scalars['ID'];
  used: Scalars['Boolean'];
  tone: RbtDownload;
};

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ArticleQuery = (
  { __typename?: 'Query' }
  & {
    article?: Maybe<(
      { __typename?: 'ArticleTranslation' }
      & Pick<ArticleTranslation, 'id' | 'title' | 'image_path' | 'description' | 'body' | 'published_time'>
      & {
        song?: Maybe<(
          { __typename?: 'Song' }
          & Pick<Song, 'id'>
          & {
            genres: Array<(
              { __typename?: 'Genre' }
              & Pick<Genre, 'id' | 'name' | 'slug'>
            )>, tones: Array<(
              { __typename?: 'RingBackTone' }
              & Pick<RingBackTone, 'duration' | 'fileUrl'>
              & ToneBaseFragment
            )>
          }
          & SongBaseFragment
        )>, articlesRelation: (
          { __typename?: 'ArticleTranslationConnection' }
          & Pick<ArticleTranslationConnection, 'totalCount'>
          & {
            pageInfo: (
              { __typename?: 'PageInfo' }
              & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
            ), edges: Array<(
              { __typename?: 'ArticleArticleTranslationEdge' }
              & {
                node: (
                  { __typename?: 'ArticleTranslation' }
                  & Pick<ArticleTranslation, 'id' | 'title' | 'slug' | 'image_path' | 'description' | 'body' | 'published_time'>
                )
              }
            )>
          }
        )
      }
    )>
  }
);

export type ArticleListQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ArticleListQuery = (
  { __typename?: 'Query' }
  & {
    articles: (
      { __typename?: 'ArticleTranslationConnection' }
      & Pick<ArticleTranslationConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'ArticleArticleTranslationEdge' }
          & {
            node: (
              { __typename?: 'ArticleTranslation' }
              & Pick<ArticleTranslation, 'id' | 'title' | 'slug' | 'image_path' | 'description' | 'body' | 'published_time'>
            )
          }
        )>
      }
    )
  }
);

export type BannerPackagesQueryVariables = Exact<{ [key: string]: never; }>;


export type BannerPackagesQuery = (
  { __typename?: 'Query' }
  & {
    bannerPackages: Array<(
      { __typename?: 'BannerPackage' }
      & Pick<BannerPackage, 'id' | 'name' | 'note' | 'price' | 'period' | 'brandId'>
    )>
  }
);

export type FeaturedListQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FeaturedListQuery = (
  { __typename?: 'Query' }
  & {
    featuredList?: Maybe<(
      { __typename?: 'BannerItemConnection' }
      & Pick<BannerItemConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'BannerItemEdge' }
          & {
            node: (
              { __typename?: 'BannerItem' }
              & Pick<BannerItem, 'id' | 'name' | 'alterText' | 'fileUrl' | 'publishedTime' | 'itemType' | 'itemId'>
              & {
                item?: Maybe<{ __typename?: 'Chart' } | { __typename?: 'ContentProvider' } | { __typename?: 'ContentProviderDetail' } | (
                  { __typename?: 'Genre' }
                  & Pick<Genre, 'slug'>
                ) | { __typename?: 'Member' } | { __typename?: 'PublicUser' } | { __typename?: 'RbtPackage' } | { __typename?: 'RingBackTone' } | { __typename?: 'RingBackToneCreation' } | (
                    { __typename?: 'Singer' }
                    & Pick<Singer, 'slug'>
                  ) | (
                    { __typename?: 'Song' }
                    & Pick<Song, 'slug'>
                  ) | (
                    { __typename?: 'Topic' }
                    & Pick<Topic, 'slug'>
                  )>
              }
            )
          }
        )>
      }
    )>
  }
);

export type PageBannerQueryVariables = Exact<{
  page: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type PageBannerQuery = (
  { __typename?: 'Query' }
  & {
    pageBanner?: Maybe<(
      { __typename?: 'BannerItemConnection' }
      & Pick<BannerItemConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'BannerItemEdge' }
          & {
            node: (
              { __typename?: 'BannerItem' }
              & Pick<BannerItem, 'id' | 'name' | 'alterText' | 'fileUrl' | 'publishedTime' | 'itemType' | 'itemId'>
            )
          }
        )>
      }
    )>
  }
);

export type SongCommentsQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SongCommentsQuery = (
  { __typename?: 'Query' }
  & {
    song?: Maybe<(
      { __typename?: 'Song' }
      & Pick<Song, 'id'>
      & {
        comments: (
          { __typename?: 'CommentConnection' }
          & Pick<CommentConnection, 'totalCount'>
          & {
            pageInfo: (
              { __typename?: 'PageInfo' }
              & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
            ), edges: Array<(
              { __typename?: 'CommentEdge' }
              & {
                node: (
                  { __typename?: 'Comment' }
                  & Pick<Comment, 'id' | 'content' | 'likes' | 'liked' | 'createdAt' | 'updatedAt'>
                  & {
                    replies: Array<(
                      { __typename?: 'Reply' }
                      & Pick<Reply, 'id' | 'content' | 'createdAt' | 'updatedAt'>
                      & {
                        user?: Maybe<(
                          { __typename?: 'PublicUser' }
                          & Pick<PublicUser, 'id' | 'fullName' | 'imageUrl'>
                        )>
                      }
                    )>, user?: Maybe<(
                      { __typename?: 'PublicUser' }
                      & Pick<PublicUser, 'id' | 'fullName' | 'imageUrl'>
                    )>
                  }
                )
              }
            )>
          }
        )
      }
    )>
  }
);

export type CommentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & {
    comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'likes' | 'liked' | 'createdAt' | 'updatedAt'>
      & {
        replies: Array<(
          { __typename?: 'Reply' }
          & Pick<Reply, 'id' | 'content' | 'createdAt' | 'updatedAt'>
          & {
            user?: Maybe<(
              { __typename?: 'PublicUser' }
              & Pick<PublicUser, 'id' | 'fullName' | 'imageUrl'>
            )>
          }
        )>, user?: Maybe<(
          { __typename?: 'PublicUser' }
          & Pick<PublicUser, 'id' | 'fullName' | 'imageUrl'>
        )>
      }
    )>
  }
);

export type CreateCommentMutationVariables = Exact<{
  songId: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & {
    createComment: (
      { __typename?: 'CommentPayload' }
      & Pick<CommentPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'content'>
        )>
      }
    )
  }
);

export type LikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  like: Scalars['Boolean'];
}>;


export type LikeCommentMutation = (
  { __typename?: 'Mutation' }
  & {
    likeComment: (
      { __typename?: 'CommentPayload' }
      & Pick<CommentPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'likes' | 'liked'>
        )>
      }
    )
  }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & {
    deleteComment: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'errorCode' | 'success' | 'message' | 'result'>
    )
  }
);

export type CreateReplyMutationVariables = Exact<{
  commentId: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreateReplyMutation = (
  { __typename?: 'Mutation' }
  & {
    createReply: (
      { __typename?: 'ReplyPayload' }
      & Pick<ReplyPayload, 'errorCode' | 'success' | 'message'>
      & {
        result?: Maybe<(
          { __typename?: 'Reply' }
          & Pick<Reply, 'id' | 'content'>
        )>
      }
    )
  }
);

export type DeleteReplyMutationVariables = Exact<{
  commentId: Scalars['ID'];
  replyId: Scalars['ID'];
}>;


export type DeleteReplyMutation = (
  { __typename?: 'Mutation' }
  & {
    deleteReply: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'errorCode' | 'message' | 'result'>
    )
  }
);

export type SongConnectionBaseFragment = (
  { __typename?: 'SongConnection' }
  & Pick<SongConnection, 'totalCount'>
  & {
    pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    )
  }
);

export type ContentProviderQueryVariables = Exact<{
  group: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
}>;


export type ContentProviderQuery = (
  { __typename?: 'Query' }
  & {
    contentProvider?: Maybe<(
      { __typename?: 'ContentProvider' }
      & Pick<ContentProvider, 'id' | 'name' | 'group' | 'imageUrl'>
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
    )>
  }
);

export type ContentProvidersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ContentProvidersQuery = (
  { __typename?: 'Query' }
  & {
    contentProviders: (
      { __typename?: 'ContentProviderConnection' }
      & Pick<ContentProviderConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'ContentProviderEdge' }
          & {
            node: (
              { __typename?: 'ContentProvider' }
              & Pick<ContentProvider, 'id' | 'name' | 'group' | 'imageUrl'>
            )
          }
        )>
      }
    )
  }
);

export type GenreBaseFragment = (
  { __typename?: 'Genre' }
  & Pick<Genre, 'id' | 'slug' | 'name' | 'description' | 'imageUrl'>
);

export type HotGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type HotGenresQuery = (
  { __typename?: 'Query' }
  & {
    hotGenres: Array<(
      { __typename?: 'Genre' }
      & GenreBaseFragment
    )>
  }
);

export type GenresQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type GenresQuery = (
  { __typename?: 'Query' }
  & {
    genres: (
      { __typename?: 'GenreConnection' }
      & Pick<GenreConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'GenreEdge' }
          & {
            node: (
              { __typename?: 'Genre' }
              & GenreBaseFragment
            )
          }
        )>
      }
    )
  }
);

export type GenreQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
}>;


export type GenreQuery = (
  { __typename?: 'Query' }
  & {
    genre?: Maybe<(
      { __typename?: 'Genre' }
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
      & GenreBaseFragment
    )>
  }
);

export type HelpArticleCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type HelpArticleCategoriesQuery = (
  { __typename?: 'Query' }
  & {
    helpArticleCategories: Array<(
      { __typename?: 'HelpArticleCategory' }
      & Pick<HelpArticleCategory, 'id' | 'name' | 'slug'>
    )>
  }
);

export type HelpArticlesQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type HelpArticlesQuery = (
  { __typename?: 'Query' }
  & {
    helpArticleCategory?: Maybe<(
      { __typename?: 'HelpArticleCategory' }
      & Pick<HelpArticleCategory, 'id' | 'name' | 'slug'>
      & {
        articles: Array<(
          { __typename?: 'HelpArticle' }
          & Pick<HelpArticle, 'id' | 'title' | 'body'>
        )>
      }
    )>
  }
);

export type IChartsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
}>;


export type IChartsQuery = (
  { __typename?: 'Query' }
  & {
    iCharts: Array<(
      { __typename?: 'Chart' }
      & Pick<Chart, 'id' | 'name' | 'slug'>
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
    )>
  }
);

export type IChartQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type IChartQuery = (
  { __typename?: 'Query' }
  & {
    iCharts: Array<(
      { __typename?: 'Chart' }
      & Pick<Chart, 'id' | 'name' | 'slug'>
    )>, iChart?: Maybe<(
      { __typename?: 'Chart' }
      & Pick<Chart, 'id' | 'name' | 'slug'>
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
    )>
  }
);

export type AuthenticateMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  captcha?: Maybe<Scalars['String']>;
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & {
    authenticate: (
      { __typename?: 'AuthenticatePayload' }
      & Pick<AuthenticatePayload, 'success' | 'errorCode' | 'message'>
      & {
        result?: Maybe<(
          { __typename?: 'AuthenticateResult' }
          & Pick<AuthenticateResult, 'accessToken' | 'accessTokenExpiry' | 'refreshToken' | 'refreshTokenExpiry'>
        )>
      }
    )
  }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & {
    logout: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success'>
    )
  }
);

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken?: Maybe<Scalars['String']>;
}>;


export type RefreshAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & {
    refreshAccessToken: (
      { __typename?: 'AuthenticatePayload' }
      & Pick<AuthenticatePayload, 'success'>
      & {
        result?: Maybe<(
          { __typename?: 'AuthenticateResult' }
          & Pick<AuthenticateResult, 'accessToken' | 'accessTokenExpiry'>
        )>
      }
    )
  }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & {
    me?: Maybe<(
      { __typename?: 'Member' }
      & Pick<Member, 'id' | 'username' | 'fullName' | 'birthday' | 'address' | 'sex' | 'avatarUrl' | 'displayMsisdn'>
    )>
  }
);

export type GenerateCaptchaMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
}>;


export type GenerateCaptchaMutation = (
  { __typename?: 'Mutation' }
  & {
    generateCaptcha: (
      { __typename?: 'GenerateCaptchaPayload' }
      & {
        result?: Maybe<(
          { __typename?: 'GenerateCaptchaResult' }
          & Pick<GenerateCaptchaResult, 'data'>
        )>
      }
    )
  }
);

export type UpdateProfileMutationVariables = Exact<{
  fullName: Scalars['String'];
  sex?: Maybe<Sex>;
  birthday?: Maybe<Scalars['DateTime']>;
  address: Scalars['String'];
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & {
    updateProfile: (
      { __typename?: 'MemberPayload' }
      & Pick<MemberPayload, 'success' | 'errorCode' | 'message'>
      & {
        result?: Maybe<(
          { __typename?: 'Member' }
          & Pick<Member, 'id' | 'username' | 'fullName' | 'address' | 'birthday' | 'sex' | 'avatarUrl' | 'displayMsisdn'>
        )>
      }
    )
  }
);

export type UpdateAvatarMutationVariables = Exact<{
  avatar: Scalars['String'];
}>;


export type UpdateAvatarMutation = (
  { __typename?: 'Mutation' }
  & {
    updateAvatar: (
      { __typename?: 'MemberPayload' }
      & Pick<MemberPayload, 'success' | 'errorCode' | 'message'>
      & {
        result?: Maybe<(
          { __typename?: 'Member' }
          & Pick<Member, 'id' | 'username' | 'fullName' | 'address' | 'birthday' | 'sex' | 'avatarUrl' | 'displayMsisdn'>
        )>
      }
    )
  }
);

export type UpdatePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  repeatPassword: Scalars['String'];
  newPassword: Scalars['String'];
  captcha: Scalars['String'];
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & {
    updatePassword: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'result' | 'errorCode' | 'message' | 'success'>
    )
  }
);

export type NodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NodeQuery = (
  { __typename?: 'Query' }
  & {
    node?: Maybe<{ __typename?: 'Chart' } | { __typename?: 'ContentProvider' } | { __typename?: 'ContentProviderDetail' } | { __typename?: 'Genre' } | { __typename?: 'Member' } | { __typename?: 'PublicUser' } | { __typename?: 'RbtPackage' } | { __typename?: 'RingBackTone' } | { __typename?: 'RingBackToneCreation' } | { __typename?: 'Singer' } | (
      { __typename?: 'Song' }
      & {
        tones: Array<(
          { __typename?: 'RingBackTone' }
          & Pick<RingBackTone, 'duration' | 'fileUrl'>
          & ToneBaseFragment
        )>
      }
      & SongBaseFragment
    ) | { __typename?: 'Topic' }>
  }
);

export type RegisterDeviceMutationVariables = Exact<{
  registerId: Scalars['String'];
  deviceType: Scalars['String'];
}>;


export type RegisterDeviceMutation = (
  { __typename?: 'Mutation' }
  & {
    registerDevice: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type RbtGroupInfoQueryVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type RbtGroupInfoQuery = (
  { __typename?: 'Query' }
  & {
    groupInfo?: Maybe<(
      { __typename?: 'GroupInfo' }
      & Pick<GroupInfo, 'id' | 'note'>
      & {
        members: Array<(
          { __typename?: 'GroupMember' }
          & Pick<GroupMember, 'id' | 'name' | 'number'>
        )>, timeSetting?: Maybe<(
          { __typename?: 'GroupTimeSetting' }
          & Pick<GroupTimeSetting, 'id' | 'timeType' | 'startTime' | 'endTime'>
        )>, usedTones?: Maybe<Array<(
          { __typename?: 'UsedTone' }
          & Pick<UsedTone, 'id' | 'used'>
          & {
            tone: (
              { __typename?: 'RbtDownload' }
              & Pick<RbtDownload, 'id' | 'toneCode' | 'toneName' | 'singerName' | 'availableDateTime'>
            )
          }
        )>>
      }
    )>
  }
);

export type SetRbtGroupTonesMutationVariables = Exact<{
  rbtCodes: Array<Scalars['String']> | Scalars['String'];
  groupId: Scalars['ID'];
}>;


export type SetRbtGroupTonesMutation = (
  { __typename?: 'Mutation' }
  & {
    setRbtGroupTones: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type CreateRbtGroupMutationVariables = Exact<{
  groupName: Scalars['String'];
}>;


export type CreateRbtGroupMutation = (
  { __typename?: 'Mutation' }
  & {
    createRbtGroup: (
      { __typename?: 'GroupPayload' }
      & Pick<GroupPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'CallGroup' }
          & Pick<CallGroup, 'id' | 'name'>
        )>
      }
    )
  }
);

export type DeleteRbtGroupMutationVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type DeleteRbtGroupMutation = (
  { __typename?: 'Mutation' }
  & {
    deleteRbtGroup: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type RemoveRbtGroupMemberMutationVariables = Exact<{
  groupId: Scalars['ID'];
  memberNumber: Scalars['String'];
}>;


export type RemoveRbtGroupMemberMutation = (
  { __typename?: 'Mutation' }
  & {
    removeRbtGroupMember: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type AddRbtGroupMemberMutationVariables = Exact<{
  groupId: Scalars['ID'];
  memberNumber: Scalars['String'];
  memberName: Scalars['String'];
}>;


export type AddRbtGroupMemberMutation = (
  { __typename?: 'Mutation' }
  & {
    addRbtGroupMember: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type CallGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type CallGroupsQuery = (
  { __typename?: 'Query' }
  & {
    myRbt?: Maybe<(
      { __typename?: 'MyRbt' }
      & {
        callGroups?: Maybe<Array<(
          { __typename?: 'CallGroup' }
          & Pick<CallGroup, 'id' | 'name'>
        )>>
      }
    )>
  }
);

export type MyRbtQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRbtQuery = (
  { __typename?: 'Query' }
  & {
    myRbt?: Maybe<(
      { __typename?: 'MyRbt' }
      & Pick<MyRbt, 'brandId' | 'name' | 'packageName' | 'status' | 'note'>
      & {
        popup?: Maybe<(
          { __typename?: 'RbtPopup' }
          & Pick<RbtPopup, 'content' | 'brandId' | 'note'>
        )>
      }
    )>
  }
);

export type MyRbtDownloadsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRbtDownloadsQuery = (
  { __typename?: 'Query' }
  & {
    myRbt?: Maybe<(
      { __typename?: 'MyRbt' }
      & {
        downloads?: Maybe<Array<(
          { __typename?: 'RbtDownload' }
          & Pick<RbtDownload, 'id' | 'toneCode' | 'toneName' | 'singerName' | 'price' | 'availableDateTime' | 'personID'>
          & {
            tone?: Maybe<(
              { __typename?: 'RingBackTone' }
              & Pick<RingBackTone, 'fileUrl' | 'duration' | 'price'>
              & {
                song?: Maybe<(
                  { __typename?: 'Song' }
                  & SongBaseFragment
                )>
              }
              & ToneBaseFragment
            )>
          }
        )>>
      }
    )>
  }
);

export type MyRbtDownloadsWithGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRbtDownloadsWithGenresQuery = (
  { __typename?: 'Query' }
  & {
    myRbt?: Maybe<(
      { __typename?: 'MyRbt' }
      & {
        downloads?: Maybe<Array<(
          { __typename?: 'RbtDownload' }
          & Pick<RbtDownload, 'id' | 'toneCode' | 'toneName' | 'singerName' | 'price' | 'availableDateTime' | 'personID'>
          & {
            tone?: Maybe<(
              { __typename?: 'RingBackTone' }
              & Pick<RingBackTone, 'fileUrl' | 'duration' | 'price'>
              & {
                song?: Maybe<(
                  { __typename?: 'Song' }
                  & {
                    genres: Array<(
                      { __typename?: 'Genre' }
                      & Pick<Genre, 'id' | 'slug' | 'name'>
                    )>
                  }
                  & SongBaseFragment
                )>
              }
              & ToneBaseFragment
            )>
          }
        )>>
      }
    )>
  }
);

export type DeleteRbtMutationVariables = Exact<{
  rbtCode: Scalars['String'];
  personId: Scalars['String'];
}>;


export type DeleteRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    deleteRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type GiftRbtMutationVariables = Exact<{
  rbtCodes: Array<Scalars['String']> | Scalars['String'];
  msisdn: Scalars['String'];
}>;


export type GiftRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    giftRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type DownloadRbtMutationVariables = Exact<{
  rbtCodes: Array<Scalars['String']> | Scalars['String'];
}>;


export type DownloadRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    downloadRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type RbtPackagesQueryVariables = Exact<{ [key: string]: never; }>;


export type RbtPackagesQuery = (
  { __typename?: 'Query' }
  & {
    rbtPackages?: Maybe<Array<(
      { __typename?: 'RbtPackage' }
      & Pick<RbtPackage, 'id' | 'name' | 'brandId' | 'period' | 'price' | 'note'>
    )>>
  }
);

export type RegisterRbtMutationVariables = Exact<{
  brandId: Scalars['ID'];
}>;


export type RegisterRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    registerRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type ActivateRbtMutationVariables = Exact<{ [key: string]: never; }>;


export type ActivateRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    activateRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type CancelRbtMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    cancelRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type PauseRbtMutationVariables = Exact<{ [key: string]: never; }>;


export type PauseRbtMutation = (
  { __typename?: 'Mutation' }
  & {
    pauseRbt: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'message' | 'errorCode' | 'result'>
    )
  }
);

export type CreateRbtAvailableMutationVariables = Exact<{
  song_slug: Scalars['String'];
  time_start: Scalars['String'];
  time_stop: Scalars['String'];
}>;


export type CreateRbtAvailableMutation = (
  { __typename?: 'Mutation' }
  & {
    createRbtAvailable: (
      { __typename?: 'RbtCreationPayload' }
      & Pick<RbtCreationPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'RingBackToneCreation' }
          & Pick<RingBackToneCreation, 'id' | 'type_creation' | 'member_id' | 'duration' | 'available_datetime' | 'local_file' | 'updated_at' | 'created_at' | 'tone_code' | 'tone_name' | 'singer_name'>
        )>
      }
    )
  }
);

export type CreateRbtUnavailableMutationVariables = Exact<{
  composer: Scalars['String'];
  singerName: Scalars['String'];
  songName: Scalars['String'];
  time_start: Scalars['String'];
  time_stop: Scalars['String'];
  file: Scalars['Upload'];
}>;

export type CreateRbtUnavailableMutation = (
  { __typename?: 'Mutation' }
  & {
    createRbtUnavailable: (
      { __typename?: 'RbtCreationPayload' }
      & Pick<RbtCreationPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'RingBackToneCreation' }
          & Pick<RingBackToneCreation, 'id' | 'type_creation' | 'member_id' | 'duration' | 'available_datetime' | 'local_file' | 'updated_at' | 'created_at' | 'tone_code' | 'tone_name' | 'singer_name' | 'composer'>
        )>
      }
    )
  }
);

export type GetMyToneCreationsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type GetMyToneCreationsQuery = (
  { __typename?: 'Query' }
  & {
    getMyToneCreations: (
      { __typename?: 'RingBackToneCreationConnection' }
      & Pick<RingBackToneCreationConnection, 'totalCount'>
      & {
        edges: Array<(
          { __typename?: 'RingBackToneCreationEdge' }
          & {
            node: (
              { __typename: 'RingBackToneCreation' }
              & Pick<RingBackToneCreation, 'id' | 'duration' | 'tone_code' | 'tone_name_generation' | 'tone_name' | 'type_creation' | 'member_id' | 'created_at' | 'updated_at' | 'available_datetime' | 'local_file' | 'tone_status' | 'singer_name' | 'tone_price'>
              & {
                song?: Maybe<(
                  { __typename?: 'Song' }
                  & Pick<Song, 'id' | 'name' | 'fileUrl'>
                  & {
                    genres: Array<(
                      { __typename?: 'Genre' }
                      & Pick<Genre, 'name'>
                    )>
                  }
                )>, contentProvider?: Maybe<(
                  { __typename?: 'ContentProvider' }
                  & Pick<ContentProvider, 'name' | 'id'>
                )>, tone?: Maybe<(
                  { __typename?: 'RingBackTone' }
                  & Pick<RingBackTone, 'name' | 'fileUrl' | 'orderTimes'>
                )>
              }
            )
          }
        )>, pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
        )
      }
    )
  }
);

export type GetMyToneCreationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMyToneCreationQuery = (
  { __typename?: 'Query' }
  & {
    getMyToneCreation?: Maybe<(
      { __typename: 'RingBackToneCreation' }
      & Pick<RingBackToneCreation, 'id' | 'duration' | 'tone_code' | 'tone_name_generation' | 'tone_name' | 'type_creation' | 'member_id' | 'created_at' | 'updated_at' | 'available_datetime' | 'local_file' | 'tone_status' | 'singer_name' | 'tone_price'>
      & {
        song?: Maybe<(
          { __typename?: 'Song' }
          & Pick<Song, 'id' | 'name' | 'fileUrl'>
          & {
            genres: Array<(
              { __typename?: 'Genre' }
              & Pick<Genre, 'name'>
            )>
          }
        )>, contentProvider?: Maybe<(
          { __typename?: 'ContentProvider' }
          & Pick<ContentProvider, 'name' | 'id'>
        )>, tone?: Maybe<(
          { __typename?: 'RingBackTone' }
          & Pick<RingBackTone, 'name' | 'fileUrl' | 'orderTimes'>
        )>
      }
    )>
  }
);

export type GenreSearchFragment = (
  { __typename?: 'Genre' }
  & Pick<Genre, 'id' | 'slug' | 'name' | 'imageUrl'>
);

export type SingerSearchFragment = (
  { __typename?: 'Singer' }
  & Pick<Singer, 'id' | 'alias' | 'slug' | 'imageUrl'>
);

export type ContentProviderSearchFragment = (
  { __typename?: 'ContentProvider' }
  & Pick<ContentProvider, 'id' | 'name' | 'code' | 'imageUrl'>
);

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  type?: Maybe<NodeType>;
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & {
    search: (
      { __typename?: 'NodeConnection' }
      & Pick<NodeConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'NodeEdge' }
          & {
            node?: Maybe<(
              { __typename: 'Chart' }
              & Pick<Chart, 'id'>
            ) | (
                { __typename: 'ContentProvider' }
                & Pick<ContentProvider, 'id'>
                & ContentProviderSearchFragment
              ) | (
                { __typename: 'ContentProviderDetail' }
                & Pick<ContentProviderDetail, 'id'>
              ) | (
                { __typename: 'Genre' }
                & Pick<Genre, 'id'>
                & GenreSearchFragment
              ) | (
                { __typename: 'Member' }
                & Pick<Member, 'id'>
              ) | (
                { __typename: 'PublicUser' }
                & Pick<PublicUser, 'id'>
              ) | (
                { __typename: 'RbtPackage' }
                & Pick<RbtPackage, 'id'>
              ) | (
                { __typename: 'RingBackTone' }
                & Pick<RingBackTone, 'id'>
              ) | (
                { __typename: 'RingBackToneCreation' }
                & Pick<RingBackToneCreation, 'id'>
              ) | (
                { __typename: 'Singer' }
                & Pick<Singer, 'id'>
                & SingerSearchFragment
              ) | (
                { __typename: 'Song' }
                & Pick<Song, 'id'>
                & SongBaseFragment
              ) | (
                { __typename: 'Topic' }
                & Pick<Topic, 'id'>
              )>
          }
        )>
      }
    )
  }
);

export type HotKeywordsQueryVariables = Exact<{ [key: string]: never; }>;


export type HotKeywordsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hotKeywords'>
);

export type RecordKeywordMutationVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type RecordKeywordMutation = (
  { __typename?: 'Mutation' }
  & {
    recordKeyword: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'errorCode' | 'message' | 'result'>
    )
  }
);

export type ServerSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerSettingsQuery = (
  { __typename?: 'Query' }
  & {
    serverSettings: (
      { __typename?: 'ServerSettings' }
      & Pick<ServerSettings, 'serviceNumber' | 'isForceUpdate' | 'clientAutoPlay' | 'msisdnRegex' | 'facebookUrl' | 'contactEmail' | 'vipBrandId'>
    )
  }
);

export type SingerQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
}>;


export type SingerQuery = (
  { __typename?: 'Query' }
  & {
    singer?: Maybe<(
      { __typename?: 'Singer' }
      & Pick<Singer, 'id' | 'slug' | 'alias' | 'imageUrl' | 'description'>
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
    )>
  }
);

export type SingerLikesQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SingerLikesQuery = (
  { __typename?: 'Query' }
  & {
    singer?: Maybe<(
      { __typename?: 'Singer' }
      & Pick<Singer, 'id'>
      & {
        likes: (
          { __typename?: 'SingerLikes' }
          & Pick<SingerLikes, 'id' | 'totalCount' | 'liked'>
        )
      }
    )>
  }
);

export type LikeSingerMutationVariables = Exact<{
  singerId: Scalars['ID'];
  like: Scalars['Boolean'];
}>;


export type LikeSingerMutation = (
  { __typename?: 'Mutation' }
  & {
    likeSinger: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'errorCode' | 'success' | 'message' | 'result'>
    )
  }
);

export type SingersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SingersQuery = (
  { __typename?: 'Query' }
  & {
    singers: (
      { __typename?: 'SingerConnection' }
      & Pick<SingerConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'SingerEdge' }
          & {
            node: (
              { __typename?: 'Singer' }
              & Pick<Singer, 'id' | 'slug' | 'alias' | 'imageUrl'>
            )
          }
        )>
      }
    )
  }
);

export type SongBaseFragment = (
  { __typename?: 'Song' }
  & Pick<Song, 'id' | 'name' | 'slug' | 'imageUrl' | 'fileUrl' | 'downloadNumber' | 'liked'>
  & {
    singers: Array<(
      { __typename?: 'Singer' }
      & Pick<Singer, 'id' | 'alias' | 'slug'>
    )>
  }
);

export type SongQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SongQuery = (
  { __typename?: 'Query' }
  & {
    song?: Maybe<(
      { __typename?: 'Song' }
      & Pick<Song, 'id'>
      & {
        comments: (
          { __typename?: 'CommentConnection' }
          & Pick<CommentConnection, 'totalCount'>
        ), genres: Array<(
          { __typename?: 'Genre' }
          & Pick<Genre, 'id' | 'name' | 'slug'>
        )>, tones: Array<(
          { __typename?: 'RingBackTone' }
          & Pick<RingBackTone, 'duration' | 'fileUrl'>
          & ToneBaseFragment
        )>, songsFromSameSingers: (
          { __typename?: 'SongConnection' }
          & Pick<SongConnection, 'totalCount'>
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
      & SongBaseFragment
    )>
  }
);

export type RecommendedSongsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type RecommendedSongsQuery = (
  { __typename?: 'Query' }
  & {
    recommendedSongs: (
      { __typename?: 'SongConnection' }
      & {
        edges: Array<(
          { __typename?: 'SongEdge' }
          & {
            node: (
              { __typename?: 'Song' }
              & {
                toneFromList?: Maybe<(
                  { __typename?: 'RingBackTone' }
                  & ToneBaseFragment
                )>
              }
              & SongBaseFragment
            )
          }
        )>
      }
      & SongConnectionBaseFragment
    )
  }
);

export type LikeSongMutationVariables = Exact<{
  songId: Scalars['ID'];
  like: Scalars['Boolean'];
}>;


export type LikeSongMutation = (
  { __typename?: 'Mutation' }
  & {
    likeSong: (
      { __typename?: 'SongPayload' }
      & Pick<SongPayload, 'success' | 'message' | 'errorCode'>
      & {
        result?: Maybe<(
          { __typename?: 'Song' }
          & Pick<Song, 'id' | 'name' | 'liked'>
        )>
      }
    )
  }
);

export type LikedSongQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
}>;


export type LikedSongQuery = (
  { __typename?: 'Query' }
  & {
    likedSongs: (
      { __typename?: 'SongConnection' }
      & {
        edges: Array<(
          { __typename?: 'SongEdge' }
          & {
            node: (
              { __typename?: 'Song' }
              & SongBaseFragment
            )
          }
        )>
      }
      & SongConnectionBaseFragment
    )
  }
);

export type SpamBaseFragment = (
  { __typename?: 'Spam' }
  & Pick<Spam, 'id' | 'name' | 'content' | 'sendTime' | 'seen' | 'itemType' | 'itemId'>
  & {
    item?: Maybe<{ __typename: 'Chart' } | { __typename: 'ContentProvider' } | { __typename: 'ContentProviderDetail' } | { __typename: 'Genre' } | { __typename: 'Member' } | { __typename: 'PublicUser' } | { __typename: 'RbtPackage' } | (
      { __typename: 'RingBackTone' }
      & Pick<RingBackTone, 'id'>
      & {
        song?: Maybe<(
          { __typename?: 'Song' }
          & Pick<Song, 'id' | 'slug' | 'imageUrl'>
        )>
      }
    ) | { __typename: 'RingBackToneCreation' } | (
        { __typename: 'Singer' }
        & Pick<Singer, 'id' | 'slug' | 'imageUrl'>
      ) | (
        { __typename: 'Song' }
        & Pick<Song, 'id' | 'slug' | 'imageUrl'>
      ) | (
        { __typename: 'Topic' }
        & Pick<Topic, 'id' | 'slug' | 'imageUrl'>
      )>
  }
);

export type SpamsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
}>;


export type SpamsQuery = (
  { __typename?: 'Query' }
  & {
    spams: (
      { __typename?: 'SpamConnection' }
      & Pick<SpamConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'SpamEdge' }
          & {
            node: (
              { __typename?: 'Spam' }
              & SpamBaseFragment
            )
          }
        )>
      }
    )
  }
);

export type MarkSpamAsSeenMutationVariables = Exact<{
  spamId: Scalars['ID'];
  seen: Scalars['Boolean'];
}>;


export type MarkSpamAsSeenMutation = (
  { __typename?: 'Mutation' }
  & {
    markSpamAsSeen: (
      { __typename?: 'SpamPayload' }
      & Pick<SpamPayload, 'success' | 'errorCode' | 'message'>
      & {
        result?: Maybe<(
          { __typename?: 'Spam' }
          & SpamBaseFragment
        )>
      }
    )
  }
);

export type RecordSpamClickMutationVariables = Exact<{
  spamId: Scalars['ID'];
}>;


export type RecordSpamClickMutation = (
  { __typename?: 'Mutation' }
  & {
    recordSpamClick: (
      { __typename?: 'StringPayload' }
      & Pick<StringPayload, 'success' | 'errorCode' | 'message' | 'result'>
    )
  }
);

export type ToneBaseFragment = (
  { __typename?: 'RingBackTone' }
  & Pick<RingBackTone, 'name' | 'singerName' | 'price' | 'toneCode' | 'orderTimes' | 'availableAt' | 'createdAt'>
  & {
    contentProvider?: Maybe<(
      { __typename?: 'ContentProvider' }
      & Pick<ContentProvider, 'id' | 'name' | 'imageUrl' | 'group'>
    )>
  }
);

export type TopicBaseFragment = (
  { __typename?: 'Topic' }
  & Pick<Topic, 'id' | 'slug' | 'name' | 'imageUrl' | 'description'>
);

export type HotTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type HotTopicsQuery = (
  { __typename?: 'Query' }
  & {
    hotTopics: Array<(
      { __typename?: 'Topic' }
      & TopicBaseFragment
    )>
  }
);

export type HotTop100QueryVariables = Exact<{ [key: string]: never; }>;


export type HotTop100Query = (
  { __typename?: 'Query' }
  & {
    hotTop100: Array<(
      { __typename?: 'Topic' }
      & TopicBaseFragment
    )>
  }
);

export type TopicsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type TopicsQuery = (
  { __typename?: 'Query' }
  & {
    topics: (
      { __typename?: 'TopicConnection' }
      & Pick<TopicConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'TopicEdge' }
          & {
            node: (
              { __typename?: 'Topic' }
              & TopicBaseFragment
            )
          }
        )>
      }
    )
  }
);

export type Top100sQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type Top100sQuery = (
  { __typename?: 'Query' }
  & {
    top100s: (
      { __typename?: 'TopicConnection' }
      & Pick<TopicConnection, 'totalCount'>
      & {
        pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
        ), edges: Array<(
          { __typename?: 'TopicEdge' }
          & {
            node: (
              { __typename?: 'Topic' }
              & TopicBaseFragment
            )
          }
        )>
      }
    )
  }
);

export type TopicQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SongOrderByInput>;
}>;


export type TopicQuery = (
  { __typename?: 'Query' }
  & {
    topic?: Maybe<(
      { __typename?: 'Topic' }
      & {
        songs: (
          { __typename?: 'SongConnection' }
          & {
            edges: Array<(
              { __typename?: 'SongEdge' }
              & {
                node: (
                  { __typename?: 'Song' }
                  & {
                    toneFromList?: Maybe<(
                      { __typename?: 'RingBackTone' }
                      & ToneBaseFragment
                    )>
                  }
                  & SongBaseFragment
                )
              }
            )>
          }
          & SongConnectionBaseFragment
        )
      }
      & TopicBaseFragment
    )>
  }
);

export const SongConnectionBaseFragmentDoc = gql`
    fragment SongConnectionBase on SongConnection {
  totalCount
  pageInfo {
    endCursor
    hasNextPage
  }
}
    `;
export const GenreBaseFragmentDoc = gql`
    fragment GenreBase on Genre {
  id
  slug
  name
  description
  imageUrl
}
    `;
export const GenreSearchFragmentDoc = gql`
    fragment GenreSearch on Genre {
  id
  slug
  name
  imageUrl
}
    `;
export const SingerSearchFragmentDoc = gql`
    fragment SingerSearch on Singer {
  id
  alias
  slug
  imageUrl
}
    `;
export const ContentProviderSearchFragmentDoc = gql`
    fragment ContentProviderSearch on ContentProvider {
  id
  name
  code
  imageUrl
}
    `;
export const SongBaseFragmentDoc = gql`
    fragment SongBase on Song {
  id
  name
  slug
  imageUrl
  fileUrl
  downloadNumber
  liked
  singers {
    id
    alias
    slug
  }
}
    `;
export const SpamBaseFragmentDoc = gql`
    fragment SpamBase on Spam {
  id
  name
  content
  sendTime
  seen
  itemType
  itemId
  item {
    __typename
    ... on Song {
      id
      slug
      imageUrl
    }
    ... on Singer {
      id
      slug
      imageUrl
    }
    ... on Topic {
      id
      slug
      imageUrl
    }
    ... on RingBackTone {
      id
      song {
        id
        slug
        imageUrl
      }
    }
  }
}
    `;
export const ToneBaseFragmentDoc = gql`
    fragment ToneBase on RingBackTone {
  name
  singerName
  price
  toneCode
  orderTimes
  availableAt
  createdAt
  contentProvider {
    id
    name
    imageUrl
    group
  }
}
    `;
export const TopicBaseFragmentDoc = gql`
    fragment TopicBase on Topic {
  id
  slug
  name
  imageUrl
  description
}
    `;
export const ArticleDocument = gql`
    query Article($slug: String!, $after: String, $first: Int) {
  article(slug: $slug) {
    id
    title
    image_path
    description
    body
    published_time
    song {
      id
      ...SongBase
      genres {
        id
        name
        slug
      }
      tones {
        ...ToneBase
        duration
        fileUrl
      }
    }
    articlesRelation(after: $after, first: $first) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          slug
          image_path
          description
          body
          published_time
        }
      }
    }
  }
}
    ${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useArticleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
  return ApolloReactHooks.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
}
export function useArticleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
}
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = ApolloReactCommon.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const ArticleListDocument = gql`
    query ArticleList($after: String, $first: Int) {
  articles(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        slug
        image_path
        description
        body
        published_time
      }
    }
  }
}
    `;

/**
 * __useArticleListQuery__
 *
 * To run a query within a React component, call `useArticleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useArticleListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticleListQuery, ArticleListQueryVariables>) {
  return ApolloReactHooks.useQuery<ArticleListQuery, ArticleListQueryVariables>(ArticleListDocument, baseOptions);
}
export function useArticleListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticleListQuery, ArticleListQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<ArticleListQuery, ArticleListQueryVariables>(ArticleListDocument, baseOptions);
}
export type ArticleListQueryHookResult = ReturnType<typeof useArticleListQuery>;
export type ArticleListLazyQueryHookResult = ReturnType<typeof useArticleListLazyQuery>;
export type ArticleListQueryResult = ApolloReactCommon.QueryResult<ArticleListQuery, ArticleListQueryVariables>;
export const BannerPackagesDocument = gql`
    query BannerPackages {
  bannerPackages {
    id
    name
    note
    price
    period
    brandId
  }
}
    `;

/**
 * __useBannerPackagesQuery__
 *
 * To run a query within a React component, call `useBannerPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannerPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannerPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBannerPackagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BannerPackagesQuery, BannerPackagesQueryVariables>) {
  return ApolloReactHooks.useQuery<BannerPackagesQuery, BannerPackagesQueryVariables>(BannerPackagesDocument, baseOptions);
}
export function useBannerPackagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BannerPackagesQuery, BannerPackagesQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<BannerPackagesQuery, BannerPackagesQueryVariables>(BannerPackagesDocument, baseOptions);
}
export type BannerPackagesQueryHookResult = ReturnType<typeof useBannerPackagesQuery>;
export type BannerPackagesLazyQueryHookResult = ReturnType<typeof useBannerPackagesLazyQuery>;
export type BannerPackagesQueryResult = ApolloReactCommon.QueryResult<BannerPackagesQuery, BannerPackagesQueryVariables>;
export const FeaturedListDocument = gql`
    query FeaturedList($after: String, $first: Int) {
  featuredList(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        alterText
        fileUrl
        publishedTime
        itemType
        itemId
        item {
          ... on Song {
            slug
          }
          ... on Genre {
            slug
          }
          ... on Singer {
            slug
          }
          ... on Topic {
            slug
          }
        }
      }
    }
  }
}
    `;

/**
 * __useFeaturedListQuery__
 *
 * To run a query within a React component, call `useFeaturedListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useFeaturedListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeaturedListQuery, FeaturedListQueryVariables>) {
  return ApolloReactHooks.useQuery<FeaturedListQuery, FeaturedListQueryVariables>(FeaturedListDocument, baseOptions);
}
export function useFeaturedListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturedListQuery, FeaturedListQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<FeaturedListQuery, FeaturedListQueryVariables>(FeaturedListDocument, baseOptions);
}
export type FeaturedListQueryHookResult = ReturnType<typeof useFeaturedListQuery>;
export type FeaturedListLazyQueryHookResult = ReturnType<typeof useFeaturedListLazyQuery>;
export type FeaturedListQueryResult = ApolloReactCommon.QueryResult<FeaturedListQuery, FeaturedListQueryVariables>;
export const PageBannerDocument = gql`
    query PageBanner($page: String!, $slug: String, $after: String, $first: Int) {
  pageBanner(page: $page, slug: $slug, after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        alterText
        fileUrl
        publishedTime
        itemType
        itemId
      }
    }
  }
}
    `;

/**
 * __usePageBannerQuery__
 *
 * To run a query within a React component, call `usePageBannerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageBannerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageBannerQuery({
 *   variables: {
 *      page: // value for 'page'
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePageBannerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PageBannerQuery, PageBannerQueryVariables>) {
  return ApolloReactHooks.useQuery<PageBannerQuery, PageBannerQueryVariables>(PageBannerDocument, baseOptions);
}
export function usePageBannerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PageBannerQuery, PageBannerQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<PageBannerQuery, PageBannerQueryVariables>(PageBannerDocument, baseOptions);
}
export type PageBannerQueryHookResult = ReturnType<typeof usePageBannerQuery>;
export type PageBannerLazyQueryHookResult = ReturnType<typeof usePageBannerLazyQuery>;
export type PageBannerQueryResult = ApolloReactCommon.QueryResult<PageBannerQuery, PageBannerQueryVariables>;
export const SongCommentsDocument = gql`
    query SongComments($slug: String!, $after: String, $first: Int) {
  song(slug: $slug) {
    id
    comments(after: $after, first: $first) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          content
          likes
          liked
          createdAt
          updatedAt
          replies {
            id
            content
            createdAt
            updatedAt
            user {
              id
              fullName
              imageUrl
            }
          }
          user {
            id
            fullName
            imageUrl
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSongCommentsQuery__
 *
 * To run a query within a React component, call `useSongCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongCommentsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSongCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SongCommentsQuery, SongCommentsQueryVariables>) {
  return ApolloReactHooks.useQuery<SongCommentsQuery, SongCommentsQueryVariables>(SongCommentsDocument, baseOptions);
}
export function useSongCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SongCommentsQuery, SongCommentsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SongCommentsQuery, SongCommentsQueryVariables>(SongCommentsDocument, baseOptions);
}
export type SongCommentsQueryHookResult = ReturnType<typeof useSongCommentsQuery>;
export type SongCommentsLazyQueryHookResult = ReturnType<typeof useSongCommentsLazyQuery>;
export type SongCommentsQueryResult = ApolloReactCommon.QueryResult<SongCommentsQuery, SongCommentsQueryVariables>;
export const CommentDocument = gql`
    query Comment($id: ID!) {
  comment(commentId: $id) {
    id
    content
    likes
    liked
    createdAt
    updatedAt
    replies {
      id
      content
      createdAt
      updatedAt
      user {
        id
        fullName
        imageUrl
      }
    }
    user {
      id
      fullName
      imageUrl
    }
  }
}
    `;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
  return ApolloReactHooks.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
}
export function useCommentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
}
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = ApolloReactCommon.QueryResult<CommentQuery, CommentQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($songId: ID!, $content: String!) {
  createComment(songId: $songId, content: $content) {
    success
    message
    errorCode
    result {
      id
      content
    }
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const LikeCommentDocument = gql`
    mutation LikeComment($commentId: ID!, $like: Boolean!) {
  likeComment(commentId: $commentId, like: $like) {
    success
    message
    errorCode
    result {
      id
      likes
      liked
    }
  }
}
    `;
export type LikeCommentMutationFn = ApolloReactCommon.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;

/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentMutation, { data, loading, error }] = useLikeCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useLikeCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>) {
  return ApolloReactHooks.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(LikeCommentDocument, baseOptions);
}
export type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export type LikeCommentMutationResult = ApolloReactCommon.MutationResult<LikeCommentMutation>;
export type LikeCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    errorCode
    success
    message
    result
  }
}
    `;
export type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
  return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = ApolloReactCommon.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CreateReplyDocument = gql`
    mutation CreateReply($commentId: ID!, $content: String!) {
  createReply(commentId: $commentId, content: $content) {
    errorCode
    success
    message
    result {
      id
      content
    }
  }
}
    `;
export type CreateReplyMutationFn = ApolloReactCommon.MutationFunction<CreateReplyMutation, CreateReplyMutationVariables>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateReplyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReplyMutation, CreateReplyMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, baseOptions);
}
export type CreateReplyMutationHookResult = ReturnType<typeof useCreateReplyMutation>;
export type CreateReplyMutationResult = ApolloReactCommon.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReplyMutation, CreateReplyMutationVariables>;
export const DeleteReplyDocument = gql`
    mutation DeleteReply($commentId: ID!, $replyId: ID!) {
  deleteReply(commentId: $commentId, replyId: $replyId) {
    success
    errorCode
    message
    result
  }
}
    `;
export type DeleteReplyMutationFn = ApolloReactCommon.MutationFunction<DeleteReplyMutation, DeleteReplyMutationVariables>;

/**
 * __useDeleteReplyMutation__
 *
 * To run a mutation, you first call `useDeleteReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReplyMutation, { data, loading, error }] = useDeleteReplyMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useDeleteReplyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteReplyMutation, DeleteReplyMutationVariables>) {
  return ApolloReactHooks.useMutation<DeleteReplyMutation, DeleteReplyMutationVariables>(DeleteReplyDocument, baseOptions);
}
export type DeleteReplyMutationHookResult = ReturnType<typeof useDeleteReplyMutation>;
export type DeleteReplyMutationResult = ApolloReactCommon.MutationResult<DeleteReplyMutation>;
export type DeleteReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteReplyMutation, DeleteReplyMutationVariables>;
export const ContentProviderDocument = gql`
    query ContentProvider($group: String!, $after: String, $first: Int, $orderBy: SongOrderByInput) {
  contentProvider(group: $group) {
    id
    name
    group
    imageUrl
    songs(after: $after, first: $first, orderBy: $orderBy) @connection(key: "singerSongs", filter: ["orderBy"]) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useContentProviderQuery__
 *
 * To run a query within a React component, call `useContentProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentProviderQuery({
 *   variables: {
 *      group: // value for 'group'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useContentProviderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContentProviderQuery, ContentProviderQueryVariables>) {
  return ApolloReactHooks.useQuery<ContentProviderQuery, ContentProviderQueryVariables>(ContentProviderDocument, baseOptions);
}
export function useContentProviderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContentProviderQuery, ContentProviderQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<ContentProviderQuery, ContentProviderQueryVariables>(ContentProviderDocument, baseOptions);
}
export type ContentProviderQueryHookResult = ReturnType<typeof useContentProviderQuery>;
export type ContentProviderLazyQueryHookResult = ReturnType<typeof useContentProviderLazyQuery>;
export type ContentProviderQueryResult = ApolloReactCommon.QueryResult<ContentProviderQuery, ContentProviderQueryVariables>;
export const ContentProvidersDocument = gql`
    query ContentProviders($after: String, $first: Int) {
  contentProviders(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        group
        imageUrl
      }
    }
  }
}
    `;

/**
 * __useContentProvidersQuery__
 *
 * To run a query within a React component, call `useContentProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentProvidersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useContentProvidersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContentProvidersQuery, ContentProvidersQueryVariables>) {
  return ApolloReactHooks.useQuery<ContentProvidersQuery, ContentProvidersQueryVariables>(ContentProvidersDocument, baseOptions);
}
export function useContentProvidersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContentProvidersQuery, ContentProvidersQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<ContentProvidersQuery, ContentProvidersQueryVariables>(ContentProvidersDocument, baseOptions);
}
export type ContentProvidersQueryHookResult = ReturnType<typeof useContentProvidersQuery>;
export type ContentProvidersLazyQueryHookResult = ReturnType<typeof useContentProvidersLazyQuery>;
export type ContentProvidersQueryResult = ApolloReactCommon.QueryResult<ContentProvidersQuery, ContentProvidersQueryVariables>;
export const HotGenresDocument = gql`
    query HotGenres {
  hotGenres {
    ...GenreBase
  }
}
    ${GenreBaseFragmentDoc}`;

/**
 * __useHotGenresQuery__
 *
 * To run a query within a React component, call `useHotGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useHotGenresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HotGenresQuery, HotGenresQueryVariables>) {
  return ApolloReactHooks.useQuery<HotGenresQuery, HotGenresQueryVariables>(HotGenresDocument, baseOptions);
}
export function useHotGenresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HotGenresQuery, HotGenresQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HotGenresQuery, HotGenresQueryVariables>(HotGenresDocument, baseOptions);
}
export type HotGenresQueryHookResult = ReturnType<typeof useHotGenresQuery>;
export type HotGenresLazyQueryHookResult = ReturnType<typeof useHotGenresLazyQuery>;
export type HotGenresQueryResult = ApolloReactCommon.QueryResult<HotGenresQuery, HotGenresQueryVariables>;
export const GenresDocument = gql`
    query Genres($after: String, $first: Int) {
  genres(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...GenreBase
      }
    }
  }
}
    ${GenreBaseFragmentDoc}`;

/**
 * __useGenresQuery__
 *
 * To run a query within a React component, call `useGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenresQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGenresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GenresQuery, GenresQueryVariables>) {
  return ApolloReactHooks.useQuery<GenresQuery, GenresQueryVariables>(GenresDocument, baseOptions);
}
export function useGenresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GenresQuery, GenresQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GenresQuery, GenresQueryVariables>(GenresDocument, baseOptions);
}
export type GenresQueryHookResult = ReturnType<typeof useGenresQuery>;
export type GenresLazyQueryHookResult = ReturnType<typeof useGenresLazyQuery>;
export type GenresQueryResult = ApolloReactCommon.QueryResult<GenresQuery, GenresQueryVariables>;
export const GenreDocument = gql`
    query Genre($slug: String!, $after: String, $first: Int, $orderBy: SongOrderByInput) {
  genre(slug: $slug) {
    ...GenreBase
    songs(after: $after, first: $first, orderBy: $orderBy) @connection(key: "singerSongs", filter: ["orderBy"]) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${GenreBaseFragmentDoc}
${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useGenreQuery__
 *
 * To run a query within a React component, call `useGenreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenreQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGenreQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GenreQuery, GenreQueryVariables>) {
  return ApolloReactHooks.useQuery<GenreQuery, GenreQueryVariables>(GenreDocument, baseOptions);
}
export function useGenreLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GenreQuery, GenreQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GenreQuery, GenreQueryVariables>(GenreDocument, baseOptions);
}
export type GenreQueryHookResult = ReturnType<typeof useGenreQuery>;
export type GenreLazyQueryHookResult = ReturnType<typeof useGenreLazyQuery>;
export type GenreQueryResult = ApolloReactCommon.QueryResult<GenreQuery, GenreQueryVariables>;
export const HelpArticleCategoriesDocument = gql`
    query HelpArticleCategories {
  helpArticleCategories {
    id
    name
    slug
  }
}
    `;

/**
 * __useHelpArticleCategoriesQuery__
 *
 * To run a query within a React component, call `useHelpArticleCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpArticleCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpArticleCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelpArticleCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelpArticleCategoriesQuery, HelpArticleCategoriesQueryVariables>) {
  return ApolloReactHooks.useQuery<HelpArticleCategoriesQuery, HelpArticleCategoriesQueryVariables>(HelpArticleCategoriesDocument, baseOptions);
}
export function useHelpArticleCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelpArticleCategoriesQuery, HelpArticleCategoriesQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HelpArticleCategoriesQuery, HelpArticleCategoriesQueryVariables>(HelpArticleCategoriesDocument, baseOptions);
}
export type HelpArticleCategoriesQueryHookResult = ReturnType<typeof useHelpArticleCategoriesQuery>;
export type HelpArticleCategoriesLazyQueryHookResult = ReturnType<typeof useHelpArticleCategoriesLazyQuery>;
export type HelpArticleCategoriesQueryResult = ApolloReactCommon.QueryResult<HelpArticleCategoriesQuery, HelpArticleCategoriesQueryVariables>;
export const HelpArticlesDocument = gql`
    query HelpArticles($slug: String!) {
  helpArticleCategory(slug: $slug) {
    id
    name
    slug
    articles {
      id
      title
      body
    }
  }
}
    `;

/**
 * __useHelpArticlesQuery__
 *
 * To run a query within a React component, call `useHelpArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpArticlesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useHelpArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelpArticlesQuery, HelpArticlesQueryVariables>) {
  return ApolloReactHooks.useQuery<HelpArticlesQuery, HelpArticlesQueryVariables>(HelpArticlesDocument, baseOptions);
}
export function useHelpArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelpArticlesQuery, HelpArticlesQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HelpArticlesQuery, HelpArticlesQueryVariables>(HelpArticlesDocument, baseOptions);
}
export type HelpArticlesQueryHookResult = ReturnType<typeof useHelpArticlesQuery>;
export type HelpArticlesLazyQueryHookResult = ReturnType<typeof useHelpArticlesLazyQuery>;
export type HelpArticlesQueryResult = ApolloReactCommon.QueryResult<HelpArticlesQuery, HelpArticlesQueryVariables>;
export const IChartsDocument = gql`
    query ICharts($first: Int) {
  iCharts {
    id
    name
    slug
    songs(first: $first) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useIChartsQuery__
 *
 * To run a query within a React component, call `useIChartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIChartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIChartsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useIChartsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IChartsQuery, IChartsQueryVariables>) {
  return ApolloReactHooks.useQuery<IChartsQuery, IChartsQueryVariables>(IChartsDocument, baseOptions);
}
export function useIChartsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IChartsQuery, IChartsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<IChartsQuery, IChartsQueryVariables>(IChartsDocument, baseOptions);
}
export type IChartsQueryHookResult = ReturnType<typeof useIChartsQuery>;
export type IChartsLazyQueryHookResult = ReturnType<typeof useIChartsLazyQuery>;
export type IChartsQueryResult = ApolloReactCommon.QueryResult<IChartsQuery, IChartsQueryVariables>;
export const IChartDocument = gql`
    query IChart($slug: String!, $after: String, $first: Int) {
  iCharts {
    id
    name
    slug
  }
  iChart(slug: $slug) {
    id
    name
    slug
    songs(first: $first, after: $after) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useIChartQuery__
 *
 * To run a query within a React component, call `useIChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useIChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIChartQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useIChartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IChartQuery, IChartQueryVariables>) {
  return ApolloReactHooks.useQuery<IChartQuery, IChartQueryVariables>(IChartDocument, baseOptions);
}
export function useIChartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IChartQuery, IChartQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<IChartQuery, IChartQueryVariables>(IChartDocument, baseOptions);
}
export type IChartQueryHookResult = ReturnType<typeof useIChartQuery>;
export type IChartLazyQueryHookResult = ReturnType<typeof useIChartLazyQuery>;
export type IChartQueryResult = ApolloReactCommon.QueryResult<IChartQuery, IChartQueryVariables>;
export const AuthenticateDocument = gql`
    mutation Authenticate($username: String, $password: String, $captcha: String) {
  authenticate(username: $username, password: $password, captcha: $captcha) {
    success
    errorCode
    message
    result {
      accessToken
      accessTokenExpiry
      refreshToken
      refreshTokenExpiry
    }
  }
}
    `;
export type AuthenticateMutationFn = ApolloReactCommon.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      captcha: // value for 'captcha'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
  return ApolloReactHooks.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, baseOptions);
}
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = ApolloReactCommon.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken($refreshToken: String) {
  refreshAccessToken(refreshToken: $refreshToken) {
    success
    result {
      accessToken
      accessTokenExpiry
    }
  }
}
    `;
export type RefreshAccessTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
  return ApolloReactHooks.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, baseOptions);
}
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = ApolloReactCommon.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    fullName
    birthday
    address
    sex
    avatarUrl
    displayMsisdn
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const GenerateCaptchaDocument = gql`
    mutation GenerateCaptcha($username: String) {
  generateCaptcha(username: $username) {
    result {
      data
    }
  }
}
    `;
export type GenerateCaptchaMutationFn = ApolloReactCommon.MutationFunction<GenerateCaptchaMutation, GenerateCaptchaMutationVariables>;

/**
 * __useGenerateCaptchaMutation__
 *
 * To run a mutation, you first call `useGenerateCaptchaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCaptchaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCaptchaMutation, { data, loading, error }] = useGenerateCaptchaMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGenerateCaptchaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateCaptchaMutation, GenerateCaptchaMutationVariables>) {
  return ApolloReactHooks.useMutation<GenerateCaptchaMutation, GenerateCaptchaMutationVariables>(GenerateCaptchaDocument, baseOptions);
}
export type GenerateCaptchaMutationHookResult = ReturnType<typeof useGenerateCaptchaMutation>;
export type GenerateCaptchaMutationResult = ApolloReactCommon.MutationResult<GenerateCaptchaMutation>;
export type GenerateCaptchaMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateCaptchaMutation, GenerateCaptchaMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($fullName: String!, $sex: Sex, $birthday: DateTime, $address: String!) {
  updateProfile(
    fullName: $fullName
    sex: $sex
    birthday: $birthday
    address: $address
  ) {
    success
    errorCode
    message
    result {
      id
      username
      fullName
      address
      birthday
      sex
      avatarUrl
      displayMsisdn
    }
  }
}
    `;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      sex: // value for 'sex'
 *      birthday: // value for 'birthday'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($avatar: String!) {
  updateAvatar(avatar: $avatar, extension: "jpg") {
    success
    errorCode
    message
    result {
      id
      username
      fullName
      address
      birthday
      sex
      avatarUrl
      displayMsisdn
    }
  }
}
    `;
export type UpdateAvatarMutationFn = ApolloReactCommon.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, baseOptions);
}
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = ApolloReactCommon.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($currentPassword: String!, $repeatPassword: String!, $newPassword: String!, $captcha: String!) {
  updatePassword(
    currentPassword: $currentPassword
    repeatPassword: $repeatPassword
    newPassword: $newPassword
    captcha: $captcha
  ) {
    result
    errorCode
    message
    success
  }
}
    `;
export type UpdatePasswordMutationFn = ApolloReactCommon.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      repeatPassword: // value for 'repeatPassword'
 *      newPassword: // value for 'newPassword'
 *      captcha: // value for 'captcha'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, baseOptions);
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = ApolloReactCommon.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const NodeDocument = gql`
    query Node($id: ID!) {
  node(id: $id) {
    ... on Song {
      ...SongBase
      tones {
        ...ToneBase
        duration
        fileUrl
      }
    }
  }
}
    ${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useNodeQuery__
 *
 * To run a query within a React component, call `useNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNodeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NodeQuery, NodeQueryVariables>) {
  return ApolloReactHooks.useQuery<NodeQuery, NodeQueryVariables>(NodeDocument, baseOptions);
}
export function useNodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NodeQuery, NodeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<NodeQuery, NodeQueryVariables>(NodeDocument, baseOptions);
}
export type NodeQueryHookResult = ReturnType<typeof useNodeQuery>;
export type NodeLazyQueryHookResult = ReturnType<typeof useNodeLazyQuery>;
export type NodeQueryResult = ApolloReactCommon.QueryResult<NodeQuery, NodeQueryVariables>;
export const RegisterDeviceDocument = gql`
    mutation RegisterDevice($registerId: String!, $deviceType: String!) {
  registerDevice(registerId: $registerId, deviceType: $deviceType) {
    success
    message
    errorCode
    result
  }
}
    `;
export type RegisterDeviceMutationFn = ApolloReactCommon.MutationFunction<RegisterDeviceMutation, RegisterDeviceMutationVariables>;

/**
 * __useRegisterDeviceMutation__
 *
 * To run a mutation, you first call `useRegisterDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerDeviceMutation, { data, loading, error }] = useRegisterDeviceMutation({
 *   variables: {
 *      registerId: // value for 'registerId'
 *      deviceType: // value for 'deviceType'
 *   },
 * });
 */
export function useRegisterDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterDeviceMutation, RegisterDeviceMutationVariables>) {
  return ApolloReactHooks.useMutation<RegisterDeviceMutation, RegisterDeviceMutationVariables>(RegisterDeviceDocument, baseOptions);
}
export type RegisterDeviceMutationHookResult = ReturnType<typeof useRegisterDeviceMutation>;
export type RegisterDeviceMutationResult = ApolloReactCommon.MutationResult<RegisterDeviceMutation>;
export type RegisterDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterDeviceMutation, RegisterDeviceMutationVariables>;
export const RbtGroupInfoDocument = gql`
    query RbtGroupInfo($groupId: ID!) {
  groupInfo(groupId: $groupId) {
    id
    note
    members {
      id
      name
      number
    }
    timeSetting {
      id
      timeType
      startTime
      endTime
    }
    usedTones {
      id
      tone {
        id
        toneCode
        toneName
        singerName
        availableDateTime
      }
      used
    }
  }
}
    `;

/**
 * __useRbtGroupInfoQuery__
 *
 * To run a query within a React component, call `useRbtGroupInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRbtGroupInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRbtGroupInfoQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useRbtGroupInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RbtGroupInfoQuery, RbtGroupInfoQueryVariables>) {
  return ApolloReactHooks.useQuery<RbtGroupInfoQuery, RbtGroupInfoQueryVariables>(RbtGroupInfoDocument, baseOptions);
}
export function useRbtGroupInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RbtGroupInfoQuery, RbtGroupInfoQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<RbtGroupInfoQuery, RbtGroupInfoQueryVariables>(RbtGroupInfoDocument, baseOptions);
}
export type RbtGroupInfoQueryHookResult = ReturnType<typeof useRbtGroupInfoQuery>;
export type RbtGroupInfoLazyQueryHookResult = ReturnType<typeof useRbtGroupInfoLazyQuery>;
export type RbtGroupInfoQueryResult = ApolloReactCommon.QueryResult<RbtGroupInfoQuery, RbtGroupInfoQueryVariables>;
export const SetRbtGroupTonesDocument = gql`
    mutation SetRbtGroupTones($rbtCodes: [String!]!, $groupId: ID!) {
  setRbtGroupTones(rbtCodes: $rbtCodes, groupId: $groupId) {
    success
    message
    errorCode
    result
  }
}
    `;
export type SetRbtGroupTonesMutationFn = ApolloReactCommon.MutationFunction<SetRbtGroupTonesMutation, SetRbtGroupTonesMutationVariables>;

/**
 * __useSetRbtGroupTonesMutation__
 *
 * To run a mutation, you first call `useSetRbtGroupTonesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRbtGroupTonesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRbtGroupTonesMutation, { data, loading, error }] = useSetRbtGroupTonesMutation({
 *   variables: {
 *      rbtCodes: // value for 'rbtCodes'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useSetRbtGroupTonesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetRbtGroupTonesMutation, SetRbtGroupTonesMutationVariables>) {
  return ApolloReactHooks.useMutation<SetRbtGroupTonesMutation, SetRbtGroupTonesMutationVariables>(SetRbtGroupTonesDocument, baseOptions);
}
export type SetRbtGroupTonesMutationHookResult = ReturnType<typeof useSetRbtGroupTonesMutation>;
export type SetRbtGroupTonesMutationResult = ApolloReactCommon.MutationResult<SetRbtGroupTonesMutation>;
export type SetRbtGroupTonesMutationOptions = ApolloReactCommon.BaseMutationOptions<SetRbtGroupTonesMutation, SetRbtGroupTonesMutationVariables>;
export const CreateRbtGroupDocument = gql`
    mutation CreateRbtGroup($groupName: String!) {
  createRbtGroup(groupName: $groupName) {
    success
    message
    errorCode
    result {
      id
      name
    }
  }
}
    `;
export type CreateRbtGroupMutationFn = ApolloReactCommon.MutationFunction<CreateRbtGroupMutation, CreateRbtGroupMutationVariables>;

/**
 * __useCreateRbtGroupMutation__
 *
 * To run a mutation, you first call `useCreateRbtGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRbtGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRbtGroupMutation, { data, loading, error }] = useCreateRbtGroupMutation({
 *   variables: {
 *      groupName: // value for 'groupName'
 *   },
 * });
 */
export function useCreateRbtGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRbtGroupMutation, CreateRbtGroupMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateRbtGroupMutation, CreateRbtGroupMutationVariables>(CreateRbtGroupDocument, baseOptions);
}
export type CreateRbtGroupMutationHookResult = ReturnType<typeof useCreateRbtGroupMutation>;
export type CreateRbtGroupMutationResult = ApolloReactCommon.MutationResult<CreateRbtGroupMutation>;
export type CreateRbtGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRbtGroupMutation, CreateRbtGroupMutationVariables>;
export const DeleteRbtGroupDocument = gql`
    mutation DeleteRbtGroup($groupId: ID!) {
  deleteRbtGroup(groupId: $groupId) {
    success
    message
    errorCode
    result
  }
}
    `;
export type DeleteRbtGroupMutationFn = ApolloReactCommon.MutationFunction<DeleteRbtGroupMutation, DeleteRbtGroupMutationVariables>;

/**
 * __useDeleteRbtGroupMutation__
 *
 * To run a mutation, you first call `useDeleteRbtGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRbtGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRbtGroupMutation, { data, loading, error }] = useDeleteRbtGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeleteRbtGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRbtGroupMutation, DeleteRbtGroupMutationVariables>) {
  return ApolloReactHooks.useMutation<DeleteRbtGroupMutation, DeleteRbtGroupMutationVariables>(DeleteRbtGroupDocument, baseOptions);
}
export type DeleteRbtGroupMutationHookResult = ReturnType<typeof useDeleteRbtGroupMutation>;
export type DeleteRbtGroupMutationResult = ApolloReactCommon.MutationResult<DeleteRbtGroupMutation>;
export type DeleteRbtGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRbtGroupMutation, DeleteRbtGroupMutationVariables>;
export const RemoveRbtGroupMemberDocument = gql`
    mutation RemoveRbtGroupMember($groupId: ID!, $memberNumber: String!) {
  removeRbtGroupMember(groupId: $groupId, memberNumber: $memberNumber) {
    success
    message
    errorCode
    result
  }
}
    `;
export type RemoveRbtGroupMemberMutationFn = ApolloReactCommon.MutationFunction<RemoveRbtGroupMemberMutation, RemoveRbtGroupMemberMutationVariables>;

/**
 * __useRemoveRbtGroupMemberMutation__
 *
 * To run a mutation, you first call `useRemoveRbtGroupMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRbtGroupMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRbtGroupMemberMutation, { data, loading, error }] = useRemoveRbtGroupMemberMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      memberNumber: // value for 'memberNumber'
 *   },
 * });
 */
export function useRemoveRbtGroupMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveRbtGroupMemberMutation, RemoveRbtGroupMemberMutationVariables>) {
  return ApolloReactHooks.useMutation<RemoveRbtGroupMemberMutation, RemoveRbtGroupMemberMutationVariables>(RemoveRbtGroupMemberDocument, baseOptions);
}
export type RemoveRbtGroupMemberMutationHookResult = ReturnType<typeof useRemoveRbtGroupMemberMutation>;
export type RemoveRbtGroupMemberMutationResult = ApolloReactCommon.MutationResult<RemoveRbtGroupMemberMutation>;
export type RemoveRbtGroupMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveRbtGroupMemberMutation, RemoveRbtGroupMemberMutationVariables>;
export const AddRbtGroupMemberDocument = gql`
    mutation addRbtGroupMember($groupId: ID!, $memberNumber: String!, $memberName: String!) {
  addRbtGroupMember(
    groupId: $groupId
    memberNumber: $memberNumber
    memberName: $memberName
  ) {
    success
    message
    errorCode
    result
  }
}
    `;
export type AddRbtGroupMemberMutationFn = ApolloReactCommon.MutationFunction<AddRbtGroupMemberMutation, AddRbtGroupMemberMutationVariables>;

/**
 * __useAddRbtGroupMemberMutation__
 *
 * To run a mutation, you first call `useAddRbtGroupMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRbtGroupMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRbtGroupMemberMutation, { data, loading, error }] = useAddRbtGroupMemberMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      memberNumber: // value for 'memberNumber'
 *      memberName: // value for 'memberName'
 *   },
 * });
 */
export function useAddRbtGroupMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddRbtGroupMemberMutation, AddRbtGroupMemberMutationVariables>) {
  return ApolloReactHooks.useMutation<AddRbtGroupMemberMutation, AddRbtGroupMemberMutationVariables>(AddRbtGroupMemberDocument, baseOptions);
}
export type AddRbtGroupMemberMutationHookResult = ReturnType<typeof useAddRbtGroupMemberMutation>;
export type AddRbtGroupMemberMutationResult = ApolloReactCommon.MutationResult<AddRbtGroupMemberMutation>;
export type AddRbtGroupMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRbtGroupMemberMutation, AddRbtGroupMemberMutationVariables>;
export const CallGroupsDocument = gql`
    query CallGroups {
  myRbt {
    callGroups {
      id
      name
    }
  }
}
    `;

/**
 * __useCallGroupsQuery__
 *
 * To run a query within a React component, call `useCallGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCallGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCallGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCallGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CallGroupsQuery, CallGroupsQueryVariables>) {
  return ApolloReactHooks.useQuery<CallGroupsQuery, CallGroupsQueryVariables>(CallGroupsDocument, baseOptions);
}
export function useCallGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CallGroupsQuery, CallGroupsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<CallGroupsQuery, CallGroupsQueryVariables>(CallGroupsDocument, baseOptions);
}
export type CallGroupsQueryHookResult = ReturnType<typeof useCallGroupsQuery>;
export type CallGroupsLazyQueryHookResult = ReturnType<typeof useCallGroupsLazyQuery>;
export type CallGroupsQueryResult = ApolloReactCommon.QueryResult<CallGroupsQuery, CallGroupsQueryVariables>;
export const MyRbtDocument = gql`
    query MyRbt {
  myRbt {
    brandId
    name
    packageName
    status
    note
    popup {
      content
      brandId
      note
    }
  }
}
    `;

/**
 * __useMyRbtQuery__
 *
 * To run a query within a React component, call `useMyRbtQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRbtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRbtQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRbtQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyRbtQuery, MyRbtQueryVariables>) {
  return ApolloReactHooks.useQuery<MyRbtQuery, MyRbtQueryVariables>(MyRbtDocument, baseOptions);
}
export function useMyRbtLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyRbtQuery, MyRbtQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MyRbtQuery, MyRbtQueryVariables>(MyRbtDocument, baseOptions);
}
export type MyRbtQueryHookResult = ReturnType<typeof useMyRbtQuery>;
export type MyRbtLazyQueryHookResult = ReturnType<typeof useMyRbtLazyQuery>;
export type MyRbtQueryResult = ApolloReactCommon.QueryResult<MyRbtQuery, MyRbtQueryVariables>;
export const MyRbtDownloadsDocument = gql`
    query MyRbtDownloads {
  myRbt {
    downloads {
      id
      toneCode
      toneName
      singerName
      price
      availableDateTime
      personID
      tone {
        ...ToneBase
        fileUrl
        duration
        price
        song {
          ...SongBase
        }
      }
    }
  }
}
    ${ToneBaseFragmentDoc}
${SongBaseFragmentDoc}`;

/**
 * __useMyRbtDownloadsQuery__
 *
 * To run a query within a React component, call `useMyRbtDownloadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRbtDownloadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRbtDownloadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRbtDownloadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyRbtDownloadsQuery, MyRbtDownloadsQueryVariables>) {
  return ApolloReactHooks.useQuery<MyRbtDownloadsQuery, MyRbtDownloadsQueryVariables>(MyRbtDownloadsDocument, baseOptions);
}
export function useMyRbtDownloadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyRbtDownloadsQuery, MyRbtDownloadsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MyRbtDownloadsQuery, MyRbtDownloadsQueryVariables>(MyRbtDownloadsDocument, baseOptions);
}
export type MyRbtDownloadsQueryHookResult = ReturnType<typeof useMyRbtDownloadsQuery>;
export type MyRbtDownloadsLazyQueryHookResult = ReturnType<typeof useMyRbtDownloadsLazyQuery>;
export type MyRbtDownloadsQueryResult = ApolloReactCommon.QueryResult<MyRbtDownloadsQuery, MyRbtDownloadsQueryVariables>;
export const MyRbtDownloadsWithGenresDocument = gql`
    query MyRbtDownloadsWithGenres {
  myRbt {
    downloads {
      id
      toneCode
      toneName
      singerName
      price
      availableDateTime
      personID
      tone {
        ...ToneBase
        fileUrl
        duration
        price
        song {
          genres {
            id
            slug
            name
          }
          ...SongBase
        }
      }
    }
  }
}
    ${ToneBaseFragmentDoc}
${SongBaseFragmentDoc}`;

/**
 * __useMyRbtDownloadsWithGenresQuery__
 *
 * To run a query within a React component, call `useMyRbtDownloadsWithGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRbtDownloadsWithGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRbtDownloadsWithGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRbtDownloadsWithGenresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyRbtDownloadsWithGenresQuery, MyRbtDownloadsWithGenresQueryVariables>) {
  return ApolloReactHooks.useQuery<MyRbtDownloadsWithGenresQuery, MyRbtDownloadsWithGenresQueryVariables>(MyRbtDownloadsWithGenresDocument, baseOptions);
}
export function useMyRbtDownloadsWithGenresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyRbtDownloadsWithGenresQuery, MyRbtDownloadsWithGenresQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MyRbtDownloadsWithGenresQuery, MyRbtDownloadsWithGenresQueryVariables>(MyRbtDownloadsWithGenresDocument, baseOptions);
}
export type MyRbtDownloadsWithGenresQueryHookResult = ReturnType<typeof useMyRbtDownloadsWithGenresQuery>;
export type MyRbtDownloadsWithGenresLazyQueryHookResult = ReturnType<typeof useMyRbtDownloadsWithGenresLazyQuery>;
export type MyRbtDownloadsWithGenresQueryResult = ApolloReactCommon.QueryResult<MyRbtDownloadsWithGenresQuery, MyRbtDownloadsWithGenresQueryVariables>;
export const DeleteRbtDocument = gql`
    mutation DeleteRbt($rbtCode: String!, $personId: String!) {
  deleteRbt(rbtCode: $rbtCode, personId: $personId) {
    success
    message
    errorCode
    result
  }
}
    `;
export type DeleteRbtMutationFn = ApolloReactCommon.MutationFunction<DeleteRbtMutation, DeleteRbtMutationVariables>;

/**
 * __useDeleteRbtMutation__
 *
 * To run a mutation, you first call `useDeleteRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRbtMutation, { data, loading, error }] = useDeleteRbtMutation({
 *   variables: {
 *      rbtCode: // value for 'rbtCode'
 *      personId: // value for 'personId'
 *   },
 * });
 */
export function useDeleteRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRbtMutation, DeleteRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<DeleteRbtMutation, DeleteRbtMutationVariables>(DeleteRbtDocument, baseOptions);
}
export type DeleteRbtMutationHookResult = ReturnType<typeof useDeleteRbtMutation>;
export type DeleteRbtMutationResult = ApolloReactCommon.MutationResult<DeleteRbtMutation>;
export type DeleteRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRbtMutation, DeleteRbtMutationVariables>;
export const GiftRbtDocument = gql`
    mutation GiftRbt($rbtCodes: [String!]!, $msisdn: String!) {
  giftRbt(rbtCodes: $rbtCodes, msisdn: $msisdn) {
    success
    message
    errorCode
    result
  }
}
    `;
export type GiftRbtMutationFn = ApolloReactCommon.MutationFunction<GiftRbtMutation, GiftRbtMutationVariables>;

/**
 * __useGiftRbtMutation__
 *
 * To run a mutation, you first call `useGiftRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGiftRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [giftRbtMutation, { data, loading, error }] = useGiftRbtMutation({
 *   variables: {
 *      rbtCodes: // value for 'rbtCodes'
 *      msisdn: // value for 'msisdn'
 *   },
 * });
 */
export function useGiftRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GiftRbtMutation, GiftRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<GiftRbtMutation, GiftRbtMutationVariables>(GiftRbtDocument, baseOptions);
}
export type GiftRbtMutationHookResult = ReturnType<typeof useGiftRbtMutation>;
export type GiftRbtMutationResult = ApolloReactCommon.MutationResult<GiftRbtMutation>;
export type GiftRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<GiftRbtMutation, GiftRbtMutationVariables>;
export const DownloadRbtDocument = gql`
    mutation DownloadRbt($rbtCodes: [String!]!) {
  downloadRbt(rbtCodes: $rbtCodes) {
    success
    message
    errorCode
    result
  }
}
    `;
export type DownloadRbtMutationFn = ApolloReactCommon.MutationFunction<DownloadRbtMutation, DownloadRbtMutationVariables>;

/**
 * __useDownloadRbtMutation__
 *
 * To run a mutation, you first call `useDownloadRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadRbtMutation, { data, loading, error }] = useDownloadRbtMutation({
 *   variables: {
 *      rbtCodes: // value for 'rbtCodes'
 *   },
 * });
 */
export function useDownloadRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DownloadRbtMutation, DownloadRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<DownloadRbtMutation, DownloadRbtMutationVariables>(DownloadRbtDocument, baseOptions);
}
export type DownloadRbtMutationHookResult = ReturnType<typeof useDownloadRbtMutation>;
export type DownloadRbtMutationResult = ApolloReactCommon.MutationResult<DownloadRbtMutation>;
export type DownloadRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<DownloadRbtMutation, DownloadRbtMutationVariables>;
export const RbtPackagesDocument = gql`
    query RbtPackages {
  rbtPackages {
    id
    name
    brandId
    period
    price
    note
  }
}
    `;

/**
 * __useRbtPackagesQuery__
 *
 * To run a query within a React component, call `useRbtPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRbtPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRbtPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRbtPackagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RbtPackagesQuery, RbtPackagesQueryVariables>) {
  return ApolloReactHooks.useQuery<RbtPackagesQuery, RbtPackagesQueryVariables>(RbtPackagesDocument, baseOptions);
}
export function useRbtPackagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RbtPackagesQuery, RbtPackagesQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<RbtPackagesQuery, RbtPackagesQueryVariables>(RbtPackagesDocument, baseOptions);
}
export type RbtPackagesQueryHookResult = ReturnType<typeof useRbtPackagesQuery>;
export type RbtPackagesLazyQueryHookResult = ReturnType<typeof useRbtPackagesLazyQuery>;
export type RbtPackagesQueryResult = ApolloReactCommon.QueryResult<RbtPackagesQuery, RbtPackagesQueryVariables>;
export const RegisterRbtDocument = gql`
    mutation registerRbt($brandId: ID!) {
  registerRbt(brandId: $brandId) {
    success
    message
    errorCode
    result
  }
}
    `;
export type RegisterRbtMutationFn = ApolloReactCommon.MutationFunction<RegisterRbtMutation, RegisterRbtMutationVariables>;

/**
 * __useRegisterRbtMutation__
 *
 * To run a mutation, you first call `useRegisterRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerRbtMutation, { data, loading, error }] = useRegisterRbtMutation({
 *   variables: {
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useRegisterRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterRbtMutation, RegisterRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<RegisterRbtMutation, RegisterRbtMutationVariables>(RegisterRbtDocument, baseOptions);
}
export type RegisterRbtMutationHookResult = ReturnType<typeof useRegisterRbtMutation>;
export type RegisterRbtMutationResult = ApolloReactCommon.MutationResult<RegisterRbtMutation>;
export type RegisterRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterRbtMutation, RegisterRbtMutationVariables>;
export const ActivateRbtDocument = gql`
    mutation activateRbt {
  activateRbt {
    success
    message
    errorCode
    result
  }
}
    `;
export type ActivateRbtMutationFn = ApolloReactCommon.MutationFunction<ActivateRbtMutation, ActivateRbtMutationVariables>;

/**
 * __useActivateRbtMutation__
 *
 * To run a mutation, you first call `useActivateRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateRbtMutation, { data, loading, error }] = useActivateRbtMutation({
 *   variables: {
 *   },
 * });
 */
export function useActivateRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivateRbtMutation, ActivateRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<ActivateRbtMutation, ActivateRbtMutationVariables>(ActivateRbtDocument, baseOptions);
}
export type ActivateRbtMutationHookResult = ReturnType<typeof useActivateRbtMutation>;
export type ActivateRbtMutationResult = ApolloReactCommon.MutationResult<ActivateRbtMutation>;
export type ActivateRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<ActivateRbtMutation, ActivateRbtMutationVariables>;
export const CancelRbtDocument = gql`
    mutation cancelRbt {
  cancelRbt {
    success
    message
    errorCode
    result
  }
}
    `;
export type CancelRbtMutationFn = ApolloReactCommon.MutationFunction<CancelRbtMutation, CancelRbtMutationVariables>;

/**
 * __useCancelRbtMutation__
 *
 * To run a mutation, you first call `useCancelRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRbtMutation, { data, loading, error }] = useCancelRbtMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelRbtMutation, CancelRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<CancelRbtMutation, CancelRbtMutationVariables>(CancelRbtDocument, baseOptions);
}
export type CancelRbtMutationHookResult = ReturnType<typeof useCancelRbtMutation>;
export type CancelRbtMutationResult = ApolloReactCommon.MutationResult<CancelRbtMutation>;
export type CancelRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelRbtMutation, CancelRbtMutationVariables>;
export const PauseRbtDocument = gql`
    mutation pauseRbt {
  pauseRbt {
    success
    message
    errorCode
    result
  }
}
    `;
export type PauseRbtMutationFn = ApolloReactCommon.MutationFunction<PauseRbtMutation, PauseRbtMutationVariables>;

/**
 * __usePauseRbtMutation__
 *
 * To run a mutation, you first call `usePauseRbtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseRbtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseRbtMutation, { data, loading, error }] = usePauseRbtMutation({
 *   variables: {
 *   },
 * });
 */
export function usePauseRbtMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PauseRbtMutation, PauseRbtMutationVariables>) {
  return ApolloReactHooks.useMutation<PauseRbtMutation, PauseRbtMutationVariables>(PauseRbtDocument, baseOptions);
}
export type PauseRbtMutationHookResult = ReturnType<typeof usePauseRbtMutation>;
export type PauseRbtMutationResult = ApolloReactCommon.MutationResult<PauseRbtMutation>;
export type PauseRbtMutationOptions = ApolloReactCommon.BaseMutationOptions<PauseRbtMutation, PauseRbtMutationVariables>;
export const CreateRbtAvailableDocument = gql`
    mutation CreateRbtAvailable($song_slug: String!, $time_start: String!, $time_stop: String!) {
  createRbtAvailable(
    song_slug: $song_slug
    time_start: $time_start
    time_stop: $time_stop
  ) {
    success
    message
    errorCode
    result {
      id
      type_creation
      member_id
      duration
      available_datetime
      local_file
      updated_at
      created_at
      tone_code
      tone_name
      singer_name
    }
  }
}
    `;
/*TuViet*/
// type_creation
//       member_id
//       duration
//       available_datetime
//       local_file
//       updated_at
//       created_at
//       tone_name
//       singer_name


export const CreateRbtUnavailableDocument = gql`
    mutation CreateRbtUnavailable(
      $composer: String!,
      $singerName: String!,
      $songName: String!,
      $file: Upload!,
      $time_start: String!,
      $time_stop: String!
      ) {
  createRbtUnavailable(
    composer: $composer
    singerName: $singerName
    songName: $songName
    file: $file
    time_start: $time_start
    time_stop: $time_stop
  ) {
    success
    errorCode
    result {
      id


    }
  }
}
    `;
export type CreateRbtAvailableMutationFn = ApolloReactCommon.MutationFunction<CreateRbtAvailableMutation, CreateRbtAvailableMutationVariables>;

/**
 * __useCreateRbtAvailableMutation__
 *
 * To run a mutation, you first call `useCreateRbtAvailableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRbtAvailableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRbtAvailableMutation, { data, loading, error }] = useCreateRbtAvailableMutation({
 *   variables: {
 *      song_slug: // value for 'song_slug'
 *      time_start: // value for 'time_start'
 *      time_stop: // value for 'time_stop'
 *   },
 * });
 */
export function useCreateRbtAvailableMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRbtAvailableMutation, CreateRbtAvailableMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateRbtAvailableMutation, CreateRbtAvailableMutationVariables>(CreateRbtAvailableDocument, baseOptions);
}
export type CreateRbtAvailableMutationHookResult = ReturnType<typeof useCreateRbtAvailableMutation>;
export type CreateRbtAvailableMutationResult = ApolloReactCommon.MutationResult<CreateRbtAvailableMutation>;
export type CreateRbtAvailableMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRbtAvailableMutation, CreateRbtAvailableMutationVariables>;
export const GetMyToneCreationsDocument = gql`
    query GetMyToneCreations($after: String, $first: Int) {
  getMyToneCreations(first: $first, after: $after) {
    totalCount
    edges {
      node {
        __typename
        id
        duration
        tone_code
        tone_name_generation
        tone_name
        type_creation
        member_id
        created_at
        updated_at
        available_datetime
        local_file
        tone_status
        type_creation
        singer_name
        tone_price
        composer
        song {
          id
          name
          fileUrl
          genres {
            name
          }
        }
        contentProvider {
          name
          id
        }
        tone {
          name
          fileUrl
          orderTimes
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useGetMyToneCreationsQuery__
 *
 * To run a query within a React component, call `useGetMyToneCreationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyToneCreationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyToneCreationsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetMyToneCreationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyToneCreationsQuery, GetMyToneCreationsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyToneCreationsQuery, GetMyToneCreationsQueryVariables>(GetMyToneCreationsDocument, baseOptions);
}
export function useGetMyToneCreationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyToneCreationsQuery, GetMyToneCreationsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetMyToneCreationsQuery, GetMyToneCreationsQueryVariables>(GetMyToneCreationsDocument, baseOptions);
}
export type GetMyToneCreationsQueryHookResult = ReturnType<typeof useGetMyToneCreationsQuery>;
export type GetMyToneCreationsLazyQueryHookResult = ReturnType<typeof useGetMyToneCreationsLazyQuery>;
export type GetMyToneCreationsQueryResult = ApolloReactCommon.QueryResult<GetMyToneCreationsQuery, GetMyToneCreationsQueryVariables>;
export const GetMyToneCreationDocument = gql`
    query GetMyToneCreation($id: String!) {
  getMyToneCreation(id: $id) {
    __typename
    id
    duration
    tone_code
    tone_name_generation
    tone_name
    type_creation
    member_id
    created_at
    updated_at
    available_datetime
    local_file
    tone_status
    type_creation
    singer_name
    tone_price
    composer
    song {
      id
      name
      fileUrl
      genres {
        name
      }
    }
    contentProvider {
      name
      id
    }
    tone {
      name
      fileUrl
      orderTimes
    }
  }
}
    `;

/**
 * __useGetMyToneCreationQuery__
 *
 * To run a query within a React component, call `useGetMyToneCreationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyToneCreationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyToneCreationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMyToneCreationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyToneCreationQuery, GetMyToneCreationQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyToneCreationQuery, GetMyToneCreationQueryVariables>(GetMyToneCreationDocument, baseOptions);
}
export function useGetMyToneCreationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyToneCreationQuery, GetMyToneCreationQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetMyToneCreationQuery, GetMyToneCreationQueryVariables>(GetMyToneCreationDocument, baseOptions);
}
export type GetMyToneCreationQueryHookResult = ReturnType<typeof useGetMyToneCreationQuery>;
export type GetMyToneCreationLazyQueryHookResult = ReturnType<typeof useGetMyToneCreationLazyQuery>;
export type GetMyToneCreationQueryResult = ApolloReactCommon.QueryResult<GetMyToneCreationQuery, GetMyToneCreationQueryVariables>;
export const SearchDocument = gql`
    query Search($query: String!, $after: String, $first: Int!, $type: NodeType) {
  search(query: $query, after: $after, first: $first, type: $type) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        __typename
        id
        ... on Song {
          ...SongBase
        }
        ... on Genre {
          ...GenreSearch
        }
        ... on Singer {
          ...SingerSearch
        }
        ... on ContentProvider {
          ...ContentProviderSearch
        }
      }
    }
  }
}
    ${SongBaseFragmentDoc}
${GenreSearchFragmentDoc}
${SingerSearchFragmentDoc}
${ContentProviderSearchFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
  return ApolloReactHooks.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
}
export function useSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
}
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = ApolloReactCommon.QueryResult<SearchQuery, SearchQueryVariables>;
export const HotKeywordsDocument = gql`
    query HotKeywords {
  hotKeywords
}
    `;

/**
 * __useHotKeywordsQuery__
 *
 * To run a query within a React component, call `useHotKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotKeywordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHotKeywordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HotKeywordsQuery, HotKeywordsQueryVariables>) {
  return ApolloReactHooks.useQuery<HotKeywordsQuery, HotKeywordsQueryVariables>(HotKeywordsDocument, baseOptions);
}
export function useHotKeywordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HotKeywordsQuery, HotKeywordsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HotKeywordsQuery, HotKeywordsQueryVariables>(HotKeywordsDocument, baseOptions);
}
export type HotKeywordsQueryHookResult = ReturnType<typeof useHotKeywordsQuery>;
export type HotKeywordsLazyQueryHookResult = ReturnType<typeof useHotKeywordsLazyQuery>;
export type HotKeywordsQueryResult = ApolloReactCommon.QueryResult<HotKeywordsQuery, HotKeywordsQueryVariables>;
export const RecordKeywordDocument = gql`
    mutation RecordKeyword($keyword: String!) {
  recordKeyword(keyword: $keyword) {
    success
    errorCode
    message
    result
  }
}
    `;
export type RecordKeywordMutationFn = ApolloReactCommon.MutationFunction<RecordKeywordMutation, RecordKeywordMutationVariables>;

/**
 * __useRecordKeywordMutation__
 *
 * To run a mutation, you first call `useRecordKeywordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordKeywordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordKeywordMutation, { data, loading, error }] = useRecordKeywordMutation({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useRecordKeywordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordKeywordMutation, RecordKeywordMutationVariables>) {
  return ApolloReactHooks.useMutation<RecordKeywordMutation, RecordKeywordMutationVariables>(RecordKeywordDocument, baseOptions);
}
export type RecordKeywordMutationHookResult = ReturnType<typeof useRecordKeywordMutation>;
export type RecordKeywordMutationResult = ApolloReactCommon.MutationResult<RecordKeywordMutation>;
export type RecordKeywordMutationOptions = ApolloReactCommon.BaseMutationOptions<RecordKeywordMutation, RecordKeywordMutationVariables>;
export const ServerSettingsDocument = gql`
    query ServerSettings {
  serverSettings {
    serviceNumber
    isForceUpdate
    clientAutoPlay
    msisdnRegex
    facebookUrl
    contactEmail
    vipBrandId
  }
}
    `;

/**
 * __useServerSettingsQuery__
 *
 * To run a query within a React component, call `useServerSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServerSettingsQuery, ServerSettingsQueryVariables>) {
  return ApolloReactHooks.useQuery<ServerSettingsQuery, ServerSettingsQueryVariables>(ServerSettingsDocument, baseOptions);
}
export function useServerSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServerSettingsQuery, ServerSettingsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<ServerSettingsQuery, ServerSettingsQueryVariables>(ServerSettingsDocument, baseOptions);
}
export type ServerSettingsQueryHookResult = ReturnType<typeof useServerSettingsQuery>;
export type ServerSettingsLazyQueryHookResult = ReturnType<typeof useServerSettingsLazyQuery>;
export type ServerSettingsQueryResult = ApolloReactCommon.QueryResult<ServerSettingsQuery, ServerSettingsQueryVariables>;
export const SingerDocument = gql`
    query Singer($slug: String!, $after: String, $first: Int, $orderBy: SongOrderByInput) {
  singer(slug: $slug) {
    id
    slug
    alias
    imageUrl
    description
    songs(after: $after, first: $first, orderBy: $orderBy) @connection(key: "singerSongs", filter: ["orderBy"]) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useSingerQuery__
 *
 * To run a query within a React component, call `useSingerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingerQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSingerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingerQuery, SingerQueryVariables>) {
  return ApolloReactHooks.useQuery<SingerQuery, SingerQueryVariables>(SingerDocument, baseOptions);
}
export function useSingerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingerQuery, SingerQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SingerQuery, SingerQueryVariables>(SingerDocument, baseOptions);
}
export type SingerQueryHookResult = ReturnType<typeof useSingerQuery>;
export type SingerLazyQueryHookResult = ReturnType<typeof useSingerLazyQuery>;
export type SingerQueryResult = ApolloReactCommon.QueryResult<SingerQuery, SingerQueryVariables>;
export const SingerLikesDocument = gql`
    query SingerLikes($slug: String!) {
  singer(slug: $slug) {
    id
    likes {
      id
      totalCount
      liked
    }
  }
}
    `;

/**
 * __useSingerLikesQuery__
 *
 * To run a query within a React component, call `useSingerLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingerLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingerLikesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSingerLikesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingerLikesQuery, SingerLikesQueryVariables>) {
  return ApolloReactHooks.useQuery<SingerLikesQuery, SingerLikesQueryVariables>(SingerLikesDocument, baseOptions);
}
export function useSingerLikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingerLikesQuery, SingerLikesQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SingerLikesQuery, SingerLikesQueryVariables>(SingerLikesDocument, baseOptions);
}
export type SingerLikesQueryHookResult = ReturnType<typeof useSingerLikesQuery>;
export type SingerLikesLazyQueryHookResult = ReturnType<typeof useSingerLikesLazyQuery>;
export type SingerLikesQueryResult = ApolloReactCommon.QueryResult<SingerLikesQuery, SingerLikesQueryVariables>;
export const LikeSingerDocument = gql`
    mutation LikeSinger($singerId: ID!, $like: Boolean!) {
  likeSinger(singerId: $singerId, like: $like) {
    errorCode
    success
    message
    result
  }
}
    `;
export type LikeSingerMutationFn = ApolloReactCommon.MutationFunction<LikeSingerMutation, LikeSingerMutationVariables>;

/**
 * __useLikeSingerMutation__
 *
 * To run a mutation, you first call `useLikeSingerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeSingerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeSingerMutation, { data, loading, error }] = useLikeSingerMutation({
 *   variables: {
 *      singerId: // value for 'singerId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useLikeSingerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeSingerMutation, LikeSingerMutationVariables>) {
  return ApolloReactHooks.useMutation<LikeSingerMutation, LikeSingerMutationVariables>(LikeSingerDocument, baseOptions);
}
export type LikeSingerMutationHookResult = ReturnType<typeof useLikeSingerMutation>;
export type LikeSingerMutationResult = ApolloReactCommon.MutationResult<LikeSingerMutation>;
export type LikeSingerMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeSingerMutation, LikeSingerMutationVariables>;
export const SingersDocument = gql`
    query Singers($after: String, $first: Int) {
  singers(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        slug
        alias
        imageUrl
      }
    }
  }
}
    `;

/**
 * __useSingersQuery__
 *
 * To run a query within a React component, call `useSingersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSingersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SingersQuery, SingersQueryVariables>) {
  return ApolloReactHooks.useQuery<SingersQuery, SingersQueryVariables>(SingersDocument, baseOptions);
}
export function useSingersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SingersQuery, SingersQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SingersQuery, SingersQueryVariables>(SingersDocument, baseOptions);
}
export type SingersQueryHookResult = ReturnType<typeof useSingersQuery>;
export type SingersLazyQueryHookResult = ReturnType<typeof useSingersLazyQuery>;
export type SingersQueryResult = ApolloReactCommon.QueryResult<SingersQuery, SingersQueryVariables>;
export const SongDocument = gql`
    query Song($slug: String!, $after: String, $first: Int) {
  song(slug: $slug) {
    id
    comments {
      totalCount
    }
    ...SongBase
    genres {
      id
      name
      slug
    }
    tones {
      ...ToneBase
      duration
      fileUrl
    }
    songsFromSameSingers(after: $after, first: $first) {
      totalCount
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
        }
      }
    }
  }
}
    ${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}
${SongConnectionBaseFragmentDoc}`;

/**
 * __useSongQuery__
 *
 * To run a query within a React component, call `useSongQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSongQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SongQuery, SongQueryVariables>) {
  return ApolloReactHooks.useQuery<SongQuery, SongQueryVariables>(SongDocument, baseOptions);
}
export function useSongLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SongQuery, SongQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SongQuery, SongQueryVariables>(SongDocument, baseOptions);
}
export type SongQueryHookResult = ReturnType<typeof useSongQuery>;
export type SongLazyQueryHookResult = ReturnType<typeof useSongLazyQuery>;
export type SongQueryResult = ApolloReactCommon.QueryResult<SongQuery, SongQueryVariables>;
export const RecommendedSongsDocument = gql`
    query RecommendedSongs($after: String, $first: Int) {
  recommendedSongs(first: $first, after: $after) {
    ...SongConnectionBase
    edges {
      node {
        ...SongBase
        toneFromList {
          ...ToneBase
        }
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useRecommendedSongsQuery__
 *
 * To run a query within a React component, call `useRecommendedSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedSongsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useRecommendedSongsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecommendedSongsQuery, RecommendedSongsQueryVariables>) {
  return ApolloReactHooks.useQuery<RecommendedSongsQuery, RecommendedSongsQueryVariables>(RecommendedSongsDocument, baseOptions);
}
export function useRecommendedSongsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecommendedSongsQuery, RecommendedSongsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<RecommendedSongsQuery, RecommendedSongsQueryVariables>(RecommendedSongsDocument, baseOptions);
}
export type RecommendedSongsQueryHookResult = ReturnType<typeof useRecommendedSongsQuery>;
export type RecommendedSongsLazyQueryHookResult = ReturnType<typeof useRecommendedSongsLazyQuery>;
export type RecommendedSongsQueryResult = ApolloReactCommon.QueryResult<RecommendedSongsQuery, RecommendedSongsQueryVariables>;
export const LikeSongDocument = gql`
    mutation LikeSong($songId: ID!, $like: Boolean!) {
  likeSong(songId: $songId, like: $like) {
    success
    message
    errorCode
    result {
      id
      name
      liked
    }
  }
}
    `;
export type LikeSongMutationFn = ApolloReactCommon.MutationFunction<LikeSongMutation, LikeSongMutationVariables>;

/**
 * __useLikeSongMutation__
 *
 * To run a mutation, you first call `useLikeSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeSongMutation, { data, loading, error }] = useLikeSongMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useLikeSongMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeSongMutation, LikeSongMutationVariables>) {
  return ApolloReactHooks.useMutation<LikeSongMutation, LikeSongMutationVariables>(LikeSongDocument, baseOptions);
}
export type LikeSongMutationHookResult = ReturnType<typeof useLikeSongMutation>;
export type LikeSongMutationResult = ApolloReactCommon.MutationResult<LikeSongMutation>;
export type LikeSongMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeSongMutation, LikeSongMutationVariables>;
export const LikedSongDocument = gql`
    query LikedSong($after: String, $first: Int!) {
  likedSongs(after: $after, first: $first) {
    ...SongConnectionBase
    edges {
      node {
        ...SongBase
      }
    }
  }
}
    ${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}`;

/**
 * __useLikedSongQuery__
 *
 * To run a query within a React component, call `useLikedSongQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikedSongQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikedSongQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useLikedSongQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LikedSongQuery, LikedSongQueryVariables>) {
  return ApolloReactHooks.useQuery<LikedSongQuery, LikedSongQueryVariables>(LikedSongDocument, baseOptions);
}
export function useLikedSongLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LikedSongQuery, LikedSongQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<LikedSongQuery, LikedSongQueryVariables>(LikedSongDocument, baseOptions);
}
export type LikedSongQueryHookResult = ReturnType<typeof useLikedSongQuery>;
export type LikedSongLazyQueryHookResult = ReturnType<typeof useLikedSongLazyQuery>;
export type LikedSongQueryResult = ApolloReactCommon.QueryResult<LikedSongQuery, LikedSongQueryVariables>;
export const SpamsDocument = gql`
    query Spams($after: String, $first: Int!) {
  spams(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...SpamBase
      }
    }
  }
}
    ${SpamBaseFragmentDoc}`;

/**
 * __useSpamsQuery__
 *
 * To run a query within a React component, call `useSpamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpamsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSpamsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SpamsQuery, SpamsQueryVariables>) {
  return ApolloReactHooks.useQuery<SpamsQuery, SpamsQueryVariables>(SpamsDocument, baseOptions);
}
export function useSpamsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SpamsQuery, SpamsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SpamsQuery, SpamsQueryVariables>(SpamsDocument, baseOptions);
}
export type SpamsQueryHookResult = ReturnType<typeof useSpamsQuery>;
export type SpamsLazyQueryHookResult = ReturnType<typeof useSpamsLazyQuery>;
export type SpamsQueryResult = ApolloReactCommon.QueryResult<SpamsQuery, SpamsQueryVariables>;
export const MarkSpamAsSeenDocument = gql`
    mutation MarkSpamAsSeen($spamId: ID!, $seen: Boolean!) {
  markSpamAsSeen(spamId: $spamId, seen: $seen) {
    success
    errorCode
    message
    result {
      ...SpamBase
    }
  }
}
    ${SpamBaseFragmentDoc}`;
export type MarkSpamAsSeenMutationFn = ApolloReactCommon.MutationFunction<MarkSpamAsSeenMutation, MarkSpamAsSeenMutationVariables>;

/**
 * __useMarkSpamAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkSpamAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSpamAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSpamAsSeenMutation, { data, loading, error }] = useMarkSpamAsSeenMutation({
 *   variables: {
 *      spamId: // value for 'spamId'
 *      seen: // value for 'seen'
 *   },
 * });
 */
export function useMarkSpamAsSeenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkSpamAsSeenMutation, MarkSpamAsSeenMutationVariables>) {
  return ApolloReactHooks.useMutation<MarkSpamAsSeenMutation, MarkSpamAsSeenMutationVariables>(MarkSpamAsSeenDocument, baseOptions);
}
export type MarkSpamAsSeenMutationHookResult = ReturnType<typeof useMarkSpamAsSeenMutation>;
export type MarkSpamAsSeenMutationResult = ApolloReactCommon.MutationResult<MarkSpamAsSeenMutation>;
export type MarkSpamAsSeenMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkSpamAsSeenMutation, MarkSpamAsSeenMutationVariables>;
export const RecordSpamClickDocument = gql`
    mutation RecordSpamClick($spamId: ID!) {
  recordSpamClick(spamId: $spamId) {
    success
    errorCode
    message
    result
  }
}
    `;
export type RecordSpamClickMutationFn = ApolloReactCommon.MutationFunction<RecordSpamClickMutation, RecordSpamClickMutationVariables>;

/**
 * __useRecordSpamClickMutation__
 *
 * To run a mutation, you first call `useRecordSpamClickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordSpamClickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordSpamClickMutation, { data, loading, error }] = useRecordSpamClickMutation({
 *   variables: {
 *      spamId: // value for 'spamId'
 *   },
 * });
 */
export function useRecordSpamClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordSpamClickMutation, RecordSpamClickMutationVariables>) {
  return ApolloReactHooks.useMutation<RecordSpamClickMutation, RecordSpamClickMutationVariables>(RecordSpamClickDocument, baseOptions);
}
export type RecordSpamClickMutationHookResult = ReturnType<typeof useRecordSpamClickMutation>;
export type RecordSpamClickMutationResult = ApolloReactCommon.MutationResult<RecordSpamClickMutation>;
export type RecordSpamClickMutationOptions = ApolloReactCommon.BaseMutationOptions<RecordSpamClickMutation, RecordSpamClickMutationVariables>;
export const HotTopicsDocument = gql`
    query HotTopics {
  hotTopics {
    ...TopicBase
  }
}
    ${TopicBaseFragmentDoc}`;

/**
 * __useHotTopicsQuery__
 *
 * To run a query within a React component, call `useHotTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHotTopicsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HotTopicsQuery, HotTopicsQueryVariables>) {
  return ApolloReactHooks.useQuery<HotTopicsQuery, HotTopicsQueryVariables>(HotTopicsDocument, baseOptions);
}
export function useHotTopicsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HotTopicsQuery, HotTopicsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HotTopicsQuery, HotTopicsQueryVariables>(HotTopicsDocument, baseOptions);
}
export type HotTopicsQueryHookResult = ReturnType<typeof useHotTopicsQuery>;
export type HotTopicsLazyQueryHookResult = ReturnType<typeof useHotTopicsLazyQuery>;
export type HotTopicsQueryResult = ApolloReactCommon.QueryResult<HotTopicsQuery, HotTopicsQueryVariables>;
export const HotTop100Document = gql`
    query HotTop100 {
  hotTop100 {
    ...TopicBase
  }
}
    ${TopicBaseFragmentDoc}`;

/**
 * __useHotTop100Query__
 *
 * To run a query within a React component, call `useHotTop100Query` and pass it any options that fit your needs.
 * When your component renders, `useHotTop100Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotTop100Query({
 *   variables: {
 *   },
 * });
 */
export function useHotTop100Query(baseOptions?: ApolloReactHooks.QueryHookOptions<HotTop100Query, HotTop100QueryVariables>) {
  return ApolloReactHooks.useQuery<HotTop100Query, HotTop100QueryVariables>(HotTop100Document, baseOptions);
}
export function useHotTop100LazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HotTop100Query, HotTop100QueryVariables>) {
  return ApolloReactHooks.useLazyQuery<HotTop100Query, HotTop100QueryVariables>(HotTop100Document, baseOptions);
}
export type HotTop100QueryHookResult = ReturnType<typeof useHotTop100Query>;
export type HotTop100LazyQueryHookResult = ReturnType<typeof useHotTop100LazyQuery>;
export type HotTop100QueryResult = ApolloReactCommon.QueryResult<HotTop100Query, HotTop100QueryVariables>;
export const TopicsDocument = gql`
    query Topics($after: String, $first: Int) {
  topics(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...TopicBase
      }
    }
  }
}
    ${TopicBaseFragmentDoc}`;

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useTopicsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
  return ApolloReactHooks.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, baseOptions);
}
export function useTopicsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, baseOptions);
}
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>;
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>;
export type TopicsQueryResult = ApolloReactCommon.QueryResult<TopicsQuery, TopicsQueryVariables>;
export const Top100sDocument = gql`
    query Top100s($after: String, $first: Int) {
  top100s(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...TopicBase
      }
    }
  }
}
    ${TopicBaseFragmentDoc}`;

/**
 * __useTop100sQuery__
 *
 * To run a query within a React component, call `useTop100sQuery` and pass it any options that fit your needs.
 * When your component renders, `useTop100sQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTop100sQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useTop100sQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Top100sQuery, Top100sQueryVariables>) {
  return ApolloReactHooks.useQuery<Top100sQuery, Top100sQueryVariables>(Top100sDocument, baseOptions);
}
export function useTop100sLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Top100sQuery, Top100sQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<Top100sQuery, Top100sQueryVariables>(Top100sDocument, baseOptions);
}
export type Top100sQueryHookResult = ReturnType<typeof useTop100sQuery>;
export type Top100sLazyQueryHookResult = ReturnType<typeof useTop100sLazyQuery>;
export type Top100sQueryResult = ApolloReactCommon.QueryResult<Top100sQuery, Top100sQueryVariables>;
export const TopicDocument = gql`
    query topic($slug: String!, $after: String, $first: Int, $orderBy: SongOrderByInput) {
  topic(slug: $slug) {
    ...TopicBase
    songs(after: $after, first: $first, orderBy: $orderBy) @connection(key: "singerSongs", filter: ["orderBy"]) {
      ...SongConnectionBase
      edges {
        node {
          ...SongBase
          toneFromList {
            ...ToneBase
          }
        }
      }
    }
  }
}
    ${TopicBaseFragmentDoc}
${SongConnectionBaseFragmentDoc}
${SongBaseFragmentDoc}
${ToneBaseFragmentDoc}`;

/**
 * __useTopicQuery__
 *
 * To run a query within a React component, call `useTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTopicQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TopicQuery, TopicQueryVariables>) {
  return ApolloReactHooks.useQuery<TopicQuery, TopicQueryVariables>(TopicDocument, baseOptions);
}
export function useTopicLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TopicQuery, TopicQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<TopicQuery, TopicQueryVariables>(TopicDocument, baseOptions);
}
export type TopicQueryHookResult = ReturnType<typeof useTopicQuery>;
export type TopicLazyQueryHookResult = ReturnType<typeof useTopicLazyQuery>;
export type TopicQueryResult = ApolloReactCommon.QueryResult<TopicQuery, TopicQueryVariables>;

/* createRbtUnavaiable*/
export function useCreateRbtUnavailableMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRbtUnavailableMutation, CreateRbtUnavailableMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateRbtUnavailableMutation, CreateRbtUnavailableMutationVariables>(CreateRbtUnavailableDocument, baseOptions);
}
export type CreateRbtUnavailableMutationHookResult = ReturnType<typeof useCreateRbtUnavailableMutation>;
export type CreateRbtUnavailableMutationResult = ApolloReactCommon.MutationResult<CreateRbtUnavailableMutation>;
export type CreateRbtUnavailableMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRbtUnavailableMutation, CreateRbtUnavailableMutationVariables>;
export const GetMyToneCreationsDocument2 = gql`
query GetMyToneCreations2($after: String, $first: Int) {
getMyToneCreations(first: $first, after: $after) {
totalCount
edges {
node {
  __typename
  id
  duration
  tone_code
  tone_name_generation
  tone_name
  type_creation
  member_id
  created_at
  updated_at
  available_datetime
  local_file
  tone_status
  type_creation
  singer_name
  tone_price
  song {
    id
    name
    fileUrl
    genres {
      name
    }
  }
  contentProvider {
    name
    id
  }
  tone {
    name
    fileUrl
    orderTimes
  }
}
}
pageInfo {
hasNextPage
hasPreviousPage
startCursor
endCursor
}
}
}
`;
