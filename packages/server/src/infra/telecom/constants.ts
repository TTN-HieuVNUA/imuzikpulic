/**
 *  define const default
 */
// export const media_link = 'http://192.168.146.252:8963/uploads';
// export const media_member_link = 'http://192.168.146.252:8963/uploads';
// export const media_rbt_film_link = 'http://192.168.146.252:8963/uploads';
// export const media_image_link = 'http://192.168.146.252:8963/uploads';
// export const media_root = $_SERVER['DOCUMENT_ROOT'];
// export const media_root_image_member = '/images/member/';
// export const media_root_image_rank = '/images/rank/';
// export const is_active = 1;
// export const song_active = 3;
// export const huawei_status = 1;
// export const singer_active = 1;
// export const news_active = 3;
// export const song_page_limit = 15;
// export const category_regions_limit = 5;
// export const number_limit = 8;
export const CACHE_TIMEOUT = 600;
export const CACHE_LONG_TIMEOUT = 1800;

// export const img_4_3 = '/images/4x3.png';
// export const img_4_4 = '/images/4x4.png';
// export const img_news_detail = '/images/01.jpg';
// export const img_banner = '/images/banner-default.jpg';
// export const img_film = '/images/landscape.png';
// export const film_rbt_list_limit = 12;
// export const article_list_limit = 11;
// export const category_vn = 1;
// export const category_am = 2;
// export const category_ca = 3;
// export const img_topic = '/images/onbox_02.jpg';

//RBT Define
export const RBT_BUY = 1;
export const RBT_PRESENT = 2;
export const RBT_DELETE = 3;
export const PORTAL_TYPE = '12';
export const SMS_TYPE = '4';
//type ung dung
export const WAP_TYPE = 2;
export const CLIENT = 3;
// export const topic_page_limit = 12;

export const SYSTEM_TONE = '1';
export const DEFAULT_TONE = '2';
export const GROUP_TONE = '3';
export const PERSONAL_TONE = '4';

export const REGISTERED = '2';
export const UN_REGISTERED = '4';
export const SUSPENDING = '5';
export const BEING_REGISTERED = '6';
export const BEING_DELETE_REGISTERED = '7';

export type RbtStatus = '2' | 'unregistered' | '5' | 'error';
export interface UserInfo {
  status: string;
  serviceOrders: string;
  brand: string;
}

export const USER_STATUS_TO_RBT_STATUS: { [key: string]: RbtStatus } = {
  [REGISTERED]: '2', //active
  [UN_REGISTERED]: 'unregistered',
  [SUSPENDING]: '5', //paused
  [BEING_REGISTERED]: '2', //active
  [BEING_DELETE_REGISTERED]: 'unregistered',
};
//rbt service action
export const ACTION_REGISTER = '1';
export const ACTION_UNREGISTER = '2';
export const ACTION_SUSPENDING = '3';
export const ACTION_REVERSE_ON = '8';
export const ACTION_REVERSE_OFF = '9';
export const ACTION_UPGRADE_TO_PLUS = '10';
// end
export const UNIDENTIFIED = 'N/A';
export const LOGIN_TIMEOUT = 360000;
export const AUTHORIZATION_TIMEOUT = 360000;
// export const search_page_limit = 10;
// export const search_webservice_page_limit = 30;
// export const client_page_number = 50;
//vCRBT brand ID
export const DAILY_BRAND_ID = '75';
export const DAILY_DOWN_FREE_BRAND_ID = '321';
export const MONTHLY_FREE_BRAND_ID = '69';
export const MONTHLY_BRAND_ID = '1';
export const WEEKLY_BRAND_ID = '86';
export const PLUS_BRAND_ID = '470';
export const VIP_BRAND_ID = '472';
//  confirm popup on leadingpage
export const POPUP_CONFIRM = 1;

//ring back tone creation
export const MIN_DURATION_RBTC = 30;
export const MAX_DURATION_RBTC = 45;
//rbtc service action
export const ACTION_CREATION_RBCT_AVAILABLE = 1;
export const ACTION_CREATION_RBCT_UNAVAILABLE = 2;
export const ACTION_CREATION_RBCT_CREATIVE = 3;
