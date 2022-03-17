import { ApolloError } from 'apollo-server-express';

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
export const KEYWORD_MAX_LENGTH = '700006';
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
export const RBT_GROUP_INFO_DEFAULT = '400019';
export const RBT_REGISTER_FAIL = '400020';
export const BRAND_NOT_EXIST = '400021';
export const RBT_SERVICE_PAUSE = '400022';
export const RBT_GROUP_ID_NOT_SETTING_MUSIC = '400023';
export const RBT_GROUP_SETTING_MUSIC_NO_SELECT = '400024';
export const RBT_GROUP_SETTING_PHONE_ACTION_INVALID = '400025';
export const VCRBT_REVERSE_IS_ON = '400026';
export const VCRBT_REVERSE_IS_OFF = '400027';

//RBT Creation return
export const RBTC_ORIGIN_SONG_NOT_EXITS = '400028';
export const RBTC_DURATION_NOT_INVALID = '400029';
export const RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL = '400030';
export const RBTC_GET_BY_ID_NOT_EXITS = '400031';
export const RBTC_EXTENSION_AUDIO = '400032';
export const RBTC_PATH_FALSE = '400033';
export const RBTC_TYPE_FALSE = '400034';
export const RBTC_CONVERT_WAV_FALSE = '400035';
export const RBTC_CANNOT_DOWNLOAD_FILE = '400036';
export const RBTC_GEN_TONE_CODE_FALSE = '400037';
export const RBTC_UPLOAD_WAV_FALSE = '400038';
export const RBTC_UPLOAD_FALSE = '400039';
export const RBTC_NOT_EXIST_RBT_TO_CREATION = '400040';
export const RBTC_NOT_EXIST_CP = '400041';

//RBT Creation validate

export const RBTC_VALIDATE_SONG_NAME_VALID = '400050';
export const RBTC_VALIDATE_SINGER_NAME_VALID = '400051';
export const RBTC_VALIDATE_COMPOSER_NAME_VALID = '400052';
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

/**
 * End OTP
 */
const ALL_MESSAGES: { [c: string]: string } = {
  [SUCCESS]: 'Thực hiện thành công',
  [SYSTEM_ERROR]: 'Hệ thống đang bận, vui lòng thử lại sau.',
  [UNKNOWN_METHOD]: 'Unknown method',
  [UNKNOWN]: 'Unknown Error',
  [AUTHORIZATION_CODE_REQUIRED]: 'Authorization code is required',
  [LOGIN_IS_REQUIRED]: 'You are not authorized to perform this action',
  [REQUIRE_LOGIN]: 'Bạn chưa đăng nhập',
  // Register VIP
  [VIP_SUCCESS]: 'Chúc mừng bạn đã đăng ký thành công gói VIP dịch vụ.',
  [VIP_EXIST]: 'Bạn đã đăng ký gói cước VIP trước đó.',
  [VIP_NOT_FOUND]: 'Gói cước Quý khách yêu cầu không tồn tại.',
  [VIP_NOT_ENOUGH_MONEY]: 'Đăng ký không thành công do thuê bao của Quý khách không đủ tiền.',
  [VIP_SWITCH]: 'Chuyển gói VIP thành công',
  [VIP_NOT_EXIST]: 'Hủy không thành công do Quý khách chưa đăng ký gói VIP',
  // Authenticate & Authorization
  [AUTH_INVALID_ID]: 'Wrong client id and client secret',
  [AUTH_INVALID_AUTHORIZATION_CODE]: 'Invalid authorization code',
  [AUTH_INVALID_USERNAME_PASSWORD]: 'Số điện thoại hoặc mật khẩu không đúng',
  [AUTH_REQUIRE_VIETTEL]: 'Bạn phải nhập vào số điện thoại Viettel',
  [AUTH_USER_NOT_ACTIVE]: 'Your account is not active',
  [AUTH_USER_IS_LOCKED]: 'Tài khoản của bạn đang bị khóa trong vòng ít phút.',
  [AUTH_USER_IS_OVER]:
    'Nhập sai thông tin quá số lần cho phép. Tài khoản của quý khách bị khóa trong 10 phút!',
  //[AUTH_USER_PASS_IS_REQUIRED]: 'Username and Password is required',
  [AUTH_CLIENT_ID_SECRET_IS_REQUIRED]: 'Client id and Client secret is required',
  [FULL_NAME_INVALID]: 'Tên không được để trống',
  [FULL_NAME_SO_LONG]: 'Tên không được dài quá 32 ký tự',
  [AUTH_USER_CAPTCHA_INVALID]: 'Mã xác thực không hợp lệ',
  // RBT
  [RBT_REGISTERED]: 'Quý khách đã đăng ký nhạc chờ',
  [RBT_UNREGISTERED]: 'Quý khách chưa đăng ký dịch vụ nhạc chờ',
  [RBT_SERVICE_PAUSE]:
    'Quý khách đang tạm ngưng dịch vụ Nhạc chờ Imuzik. Hãy kích hoạt để sử dụng!',
  [RBT_NOT_SELECTED]: 'Bạn chưa chọn bài nhạc chờ nào!',
  [RBT_NOT_DELETED]: 'Xóa nhạc chờ không thành công. Xin Quý khách vui lòng thử lại sau!',
  [RBT_EMPTY_GNAME]: 'Tên nhóm không được để trống',
  [RBT_LIMIT_GNAME]: 'Tên nhóm không được quá 250 ký tự',
  [RBT_ILLEGAL_GNAME]: 'Tên nhóm chỉ chứa chữ, số và ký tự dấu cách!',
  [RBT_EXIST_GNAME]: 'Tên nhóm đã tồn tại!',
  [RBT_CREATE_GROUP_ERROR]: 'Tạo nhóm không thành công, vui lòng thử lại sau!',
  [RBT_WRONG_GROUP_CODE]: 'Nhóm không tồn tại!',
  [RBT_DEL_GROUP_UNSUCCESS]: 'Xóa nhóm không thành công, vui lòng thử lại sau!',
  [RBT_GROUP_ID_ILLEGAL]: 'Thông tin nhóm không chính xác, vui lòng thử lại!',
  [RBT_GROUP_MEMBER_NUMBER_ILLEGAL]:
    'Số điện thoại chỉ chứa các ký tự số và nằm trong khoảng [7-15] ký tự!',
  [RBT_GROUP_MEMBER_NAME_ILLEGAL]: 'Tên thành viên chỉ tối đa 30 ký tự!',
  [RBT_SETTING_TONES_ILLEGAL]: 'Thông tin nhạc chờ không chính xác, vui lòng chọn lại!',
  [RBT_SETTING_TONES_FAIL]: 'Cài nhạc chờ chưa thành công, vui lòng chọn lại!',
  [RBT_SETTING_TIME_ILLEGAL]: 'Bạn phải chọn thời điểm bắt đầu và kết thúc!',
  [RBT_SETTING_TIME_TYPE_ILLEGAL]: 'Kiểu thời gian không hợp lệ, xin vui lòng thử lại!',
  [RBT_GROUP_INFO_DEFAULT]: 'Nhóm mặc định không có thành viên!',
  [SEARCH_CHEK_KEYWORD]: 'Bạn cần nhập ít nhất 2 ký tự để tìm kiếm!',
  [MAX_LENGTH_TEXT]: 'Bạn chỉ có thể nhập tối đa 255 ký tự.',
  [CHECK_BIRTHDAY]: 'Ngày sinh không được lớn hơn hoặc bằng ngày hiện tại.',
  [NOT_FOUND_CATEGORY]: 'Thể loại không tồn tại.',
  [NOT_FOUND_HELPER]: 'Helper không tồn tại.',
  [NOT_FOUND_FILM]: 'Film không tồn tại.',
  [KEYWORD_IS_NULL]: 'Bạn chưa nhập từ khóa tìm kiếm.',
  [NOT_FOUND_TOPIC]: 'Chủ đề không tồn tại.',
  [NOT_ENOUGH_PARAM]: 'Thiếu tham số.',
  [VALIDATE_TOKEN]: 'Token không hợp lệ.',
  [KEYWORD_MAX_LENGTH]: 'Bạn chỉ có thể nhập tối đa 255 ký tự.',
  [SONG_NOT_EXIST]: 'Bài hát không tồn tại.',
  [RBT_NOT_EXIST]: 'Nhạc chờ không tồn tại.',
  [SONG_LIKE_SUCCESS]: 'Like bài hát thành công',
  [SONG_UNLIKE_SUCCESS]: 'Bỏ like bài hát thành công',
  [RBT_LIKE_SUCCESS]: 'Like nhạc chờ thành công',
  [RBT_UNLIKE_SUCCESS]: 'Bỏ like nhạc chờ thành công',
  [REGISTER_NOT_HOME_PHONE]:
    'Đăng ký gói cước Homephone thất bại do thuê bao không phải thuê bao Homephone!',
  [REGISTER_NOT_HIGHSCHOOL]:
    'Đăng ký gói cước highschool thất bại do thuê bao không phải thuê bao highschool!',
  [AUTH_USER_IS_REQUIRE]: 'Số điện thoại không được để trống!',
  [AUTH_PASS_IS_REQUIRE]: 'Mật khẩu không được để trống!',
  [BRAND_NOT_EXIST]: 'Bạn chưa chọn gói cước!',
  [AUTH_USER_CAPTCHA_REQUIRE]: 'Mã xác thực không được để trống!',
  [RBT_GROUP_ID_NOT_SETTING_MUSIC]: 'Bạn phải cài đặt nhạc chờ cho nhóm!',
  [NOTIFICATION_NOT_EXIST]: 'Notification không tồn tại!',
  [RBT_GROUP_SETTING_MUSIC_NO_SELECT]: 'Bạn chưa chọn bài nhạc chờ nào!',
  [RBT_GROUP_SETTING_PHONE_ACTION_INVALID]: 'Action không hợp lệ!',
  [LIVE_NOT_EXIST]: 'Live show không tồn tại!',
  [IP_NO_ACCESS]: 'Bạn không có quyền truy cập!',
  [DOWNLOAD_NOT_EXIST]: 'Có lỗi trong quá trình cài đặt nhac chờ, vui lòng thử lại sau!',
  [VCRBT_REVERSE_IS_ON]: 'Bạn đang sử dụng tính năng nhạc chờ các nhân!',
  [VCRBT_REVERSE_IS_OFF]: 'Bạn chưa bật tính năng nhạc chờ các nhân!',
  [VCRBT_PLUS_UPGRADE]:
    'Quy khach da nang cap thanh cong goi cuoc nhac cho nang cao ImuzikPlus (phi nang cap 1.000d). Cuoc DV 10.000d/thang, gia han hang thang. De tai bai hat, soan BH Tenbaihat hoac BH MasoBaiHat gui 1221. Tham khao cac bai hat HOT nhat, soan HOT gui 1221. De huy DV, soan HUY gui 1221. Goi 1221 (300d/p) lam theo huong dan. LH 198 (mien phi). Tran trong!',
  [VCRBT_PLUS_REGISTER]:
    'Quy khach da dang ky thanh cong goi cuoc nhac cho nang cao ImuzikPlus (10.000d/thang, gia han hang thang). De tai bai hat, soan BH Tenbaihat hoac BH MasoBaiHat gui 1221. Tham khao cac bai hat HOT nhat, soan HOT gui 1221. De huy DV, soan HUY gui 1221. Goi 1221 (300d/p) de lam theo huong dan. LH 198 (mien phi). Tran trong!',
  [OTP_INVALID]: 'Mã xác thực không đúng hoặc hết hạn!',
  [OTP_OVER_DAY]: 'Bạn đã hết lượt lấy mã xác thực trong ngày!',
  [PARAM_INVALID]: 'Tham số không hợp lệ!',
  [RBTC_ORIGIN_SONG_NOT_EXITS]: 'Bài hát bạn chọn không tồn tại!',
  [RBTC_DURATION_NOT_INVALID]:
    'Đoạn nhạc chờ phải đảm bảo thời lượng tối thiểu là 30s và tối đa là 43s, vui lòng chọn lại đoạn nhạc',
  [RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL]: 'Cắt nhạc không thành công, vui lòng thử lại',
  [RBTC_GET_BY_ID_NOT_EXITS]: 'Id đã chọn không tồn tại trong cơ sở dữ liệu, vui lòng chọn lại',
  [RBTC_EXTENSION_AUDIO]: 'File nhạc sai định dạng, vui lòng chọn file mp3',
  [RBTC_PATH_FALSE]: 'Đường dẫn không đúng',
  [RBTC_TYPE_FALSE]: 'Tham số typeSong không hợp lệ',

  [RBTC_NOT_EXIST_RBT_TO_CREATION]: 'Bài hát chưa được cho phép sáng tạo',
  [RBTC_NOT_EXIST_CP]: 'Bài hát chưa được cho phép sáng tạo',

  // [RBTC_VALIDATE_SONG_NAME_VALID]:"Tên bài nhạc phải từ 10 - 255 ký tự và không được chứa ký tự đặc biệt",
  // [RBTC_VALIDATE_SINGER_NAME_VALID]:"Tên ca sĩ phải từ 10 - 255 ký tự và không được chứa ký tự đặc biệt",
  // [RBTC_VALIDATE_COMPOSER_NAME_VALID]:"Tên nhạc sĩ phải từ 10 - 255 ký tự và không được chứa ký tự đặc biệt",

  [RBTC_VALIDATE_SONG_NAME_VALID]:
    'Tên bài nhạc phải từ 6 - 100 ký tự và không được chứa ký tự đặc biệt',
  [RBTC_VALIDATE_SINGER_NAME_VALID]:
    'Tên ca sĩ phải từ 6 - 100 ký tự và không được chứa ký tự đặc biệt',
  [RBTC_VALIDATE_COMPOSER_NAME_VALID]:
    'Tên nhạc sĩ phải từ 6 - 100 ký tự và không được chứa ký tự đặc biệt',
};

export const SUCCESS_MESSAGE = ALL_MESSAGES[SUCCESS];
export const DEFAULT_GROUP_NOTE = ALL_MESSAGES[RBT_GROUP_INFO_DEFAULT];

export class ReturnError extends ApolloError {
  constructor(public errorCode?: string, message?: string, public result?: any) {
    super(message || ALL_MESSAGES[errorCode ?? UNKNOWN], errorCode);
  }
}
