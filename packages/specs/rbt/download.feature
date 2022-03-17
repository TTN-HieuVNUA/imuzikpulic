# language: vi
Tính năng: Tải nhạc chờ
  Kịch bản: Đã đăng nhập|Lấy trạng thái không thành công
    Cho Đã đăng nhập
      Và Lấy trạng thái không thành công
    Khi Tải nhạc chờ
    Thì Thông báo không lấy được trạng thái

  Khung tình huống: Đã đăng nhập|Chưa đăng ký dịch vụ|Đăng ký thất bại
    Cho Đã đăng nhập
      Và Chưa đăng ký dịch vụ và có <count> dữ liệu
      Và Đăng ký thất bại
    Khi Tải nhạc chờ
    Thì Thông báo không tải được do chưa đăng kí

    Dữ liệu:
      | count |
      |     0 |
      |     1 |

  Kịch bản: Tải nhạc chờ lúc đang tạm dừng dịch vụ và kích hoạt không thành công
    Cho Đã đăng nhập
      Và Đang tạm dừng dịch vụ
      Và Kích hoạt dịch vụ thất bại
    Khi Tải nhạc chờ
    Thì Thông báo không tải được do chưa đăng kí

  Kịch bản: Đã đăng nhập|Chưa đăng ký dịch vụ|Đăng ký thành công|Tải nhạc chờ thành công
    Cho Đã đăng nhập
      Và Chưa đăng ký dịch vụ
      Và Đăng ký thành công
      Và Tải nhạc chờ thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải thành công

  Kịch bản: Tải nhạc chờ lúc đang tạm dừng dịch vụ
    Cho Đã đăng nhập
      Và Chưa đăng ký dịch vụ
      Và Đăng ký thành công
      Và Tải không thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải không thành công

  Kịch bản: Đã đăng nhập|Đang tạm dừng dịch vụ|Kích hoạt dịch vụ thành công|Tải nhạc chờ thành công
    Cho Đã đăng nhập
      Và Đang tạm dừng dịch vụ
      Và Kích hoạt dịch vụ thành công
      Và Tải nhạc chờ thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải thành công

  Kịch bản: Đã đăng nhập|Đang tạm dừng dịch vụ|Kích hoạt dịch vụ thành công|Tải không thành công
    Cho Đã đăng nhập
      Và Đang tạm dừng dịch vụ
      Và Kích hoạt dịch vụ thành công
      Và Tải không thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải không thành công

  Kịch bản: Đã đăng nhập|Dịch vụ đang active|Tải nhạc chờ thành công
    Cho Đã đăng nhập
      Và Dịch vụ đang active
      Và Tải nhạc chờ thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải thành công

  Kịch bản: Đã đăng nhập|Dịch vụ đang active|Tải không thành công
    Cho Đã đăng nhập
      Và Dịch vụ đang active
      Và Tải không thành công
    Khi Tải nhạc chờ
    Thì Thông báo tải không thành công

  Kịch bản: Tải nhạc chờ lúc chưa đăng nhập
    Cho Chưa đăng nhập
    Khi Tải nhạc chờ
    Thì Yêu cầu đăng nhập