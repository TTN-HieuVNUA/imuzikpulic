// xxyyzz: xx: function; yy: action; zz: error code in action
export const SUCCESS = '000000';
export const SYSTEM_ERROR = '000001';
export const REQUIRE_LOGIN = '000002';
export const UNKNOWN_METHOD = '000003';
export const AUTHORIZATION_CODE_REQUIRED = '000004';
export const LOGIN_IS_REQUIRED = '000005'; // zz = 08 // need to login
export const SEARCH_CHEK_KEYWORD = '000006'; // zz = 08 // need to login
export const NOT_ENOUGH_PARAM = '000007';
export const VALIDATE_TOKEN = '000008';
export const UNKNOWN = '999999';
//Register VIP
export const VIP_SUCCESS = '200000';
export const VIP_EXIST = '200001';
export const VIP_NOT_FOUND = '200002';
export const VIP_NOT_ENOUGH_MONEY = '200003';
export const VIP_SWITCH = '200004';
export const VIP_NOT_EXIST = '200005';
// xxyyzz: xx = 30: Authenticate & Authorization; yy = 00: GetAuthorizationCode
export const AUTH_INVALID_ID = '300001'; // zz = 01 // invalid client (wrong id and secret)
export const AUTH_INVALID_AUTHORIZATION_CODE = '300002'; // zz = 02 // invalid authorization code
export const AUTH_INVALID_USERNAME_PASSWORD = '300003'; // zz = 03 // invalid username password
export const AUTH_USER_NOT_ACTIVE = '300004'; // zz = 04 // user is not active
export const AUTH_USER_IS_LOCKED = '300005'; // zz = 05 // user is locked
export const AUTH_USER_IS_OVER = '300006'; // zz = 05 // user is locked
//export const AUTH_USER_PASS_IS_REQUIRED = '300006';  // zz = 06 // username and password is required
export const AUTH_CLIENT_ID_SECRET_IS_REQUIRED = '300007'; // zz = 07 // client id and client secret is required
export const AUTH_USER_CAPTCHA_INVALID = '300008'; // zz = 08 // captcha invalid
export const AUTH_USER_OVER_TIME = '300009'; // zz = 08 // captcha invalid
export const AUTH_USER_IS_REQUIRE = '300010'; // zz = 08 // captcha invalid
export const AUTH_PASS_IS_REQUIRE = '300011'; // zz = 08 // captcha invalid
export const AUTH_REQUIRE_VIETTEL = '300012'; // zz = 08 // captcha invalid
export const AUTH_USER_CAPTCHA_REQUIRE = '300013'; // zz = 08 // captcha invalid
export const IP_NO_ACCESS = '300014'; // no access ip form api webservice
//Profile
export const FULL_NAME_INVALID = '500001';
export const FULL_NAME_SO_LONG = '500002';
export const MAX_LENGTH_TEXT = '500003';
export const CHECK_FULL_NAME = '500004';
export const CHECK_ADDRESS = '500005';
export const CHECK_BIRTHDAY = '500006';
//    export const VALIDATE_PASSWORD = '500007';
export const EXTENSION_IMAGE = '500008';
export const CHECK_PASSWORD = '500010';
export const VALIDATE_PASSWORD = '500011';
export const VALIDATE_NEW_PASSWORD = '500012';
export const VALIDATE_REPEAT_PASSWORD = '500013';
// Feed-back
export const VALIDATE_TITLE = '600001';
export const VALIDATE_EMAIL = '600002';
export const VALIDATE_BODY = '600003';
//  Category, helper,film,search
export const NOT_FOUND_CATEGORY = '700001';
export const NOT_FOUND_HELPER = '700002';
export const NOT_FOUND_FILM = '700003';
export const KEYWORD_IS_NULL = '700004';
export const NOT_FOUND_TOPIC = '700005';
export const KEYWORD_MAXLENGTH = '700006';
//RBT return
export const RBT_REGISTERED = '400001';
export const RBT_UNREGISTERED = '400002';
export const RBT_NOT_SELECTED = '400003';
export const RBT_NOT_DELETED = '400004';
export const RBT_EMPTY_GNAME = '400005';
export const RBT_LIMIT_GNAME = '400006';
export const RBT_ILLEGAL_GNAME = '400007';
export const RBT_EXIST_GNAME = '400008';
export const RBT_CREATE_GROUP_ERROR = '400009';
export const RBT_WRONG_GROUP_CODE = '400010';
export const RBT_DEL_GROUP_UNSUCCESS = '400011';
export const RBT_GROUP_ID_ILLEGAL = '400012';
export const RBT_GROUP_MEMBER_NUMBER_ILLEGAL = '400013';
export const RBT_GROUP_MEMBER_NAME_ILLEGAL = '400014';
export const RBT_SETTING_TONES_ILLEGAL = '400015';
export const RBT_SETTING_TONES_FAIL = '400016';
export const RBT_SETTING_TIME_ILLEGAL = '400017';
export const RBT_SETTING_TIME_TYPE_ILLEGAL = '400018';
export const RBT_GROUP_INFO_DEFAUL = '400019';
export const RBT_REGISTER_FAIL = '400020';
export const BRAND_NOT_EXIST = '400021';
export const RBT_SERVICE_PAUSE = '400022';
export const RBT_GROUP_ID_NOT_SETTING_MUSIC = '400023';
export const RBT_GROUP_SETTING_MUSIC_NO_SELECT = '400024';
export const RBT_GROUP_SETTING_PHONE_ACTION_INVALID = '400025';
export const VCRBT_REVERSE_IS_ON = '400026';
export const VCRBT_REVERSE_IS_OFF = '400027';

/**
 * start song
 */
export const SONG_NOT_EXIST = '800001';
export const RBT_NOT_EXIST = '800002';
export const SONG_LIKE_SUCCESS = '800003';
export const SONG_UNLIKE_SUCCESS = '800004';
export const RBT_LIKE_SUCCESS = '800005';
export const RBT_UNLIKE_SUCCESS = '800006';

/**
 * end song
 */

/**
 * Begin member
 */
export const REGISTER_NOT_HOME_PHONE = '900000';
export const REGISTER_NOT_HIGHSCHOOL = '900001';

/**
 * End member
 */

/**
 * begin notification
 */
export const NOTIFICATION_NOT_EXIST = '100001';
export const LIVE_NOT_EXIST = '100002';
export const DOWNLOAD_NOT_EXIST = '100003';
export const VCRBT_PLUS_UPGRADE = '110000';
export const VCRBT_PLUS_REGISTER = '110001';

/**
 * end notification
 */

/**
 * Begin OTP
 */
export const OTP_INVALID = '120001';
export const OTP_OVER_DAY = '120002';
export const PARAM_INVALID = '120003';
