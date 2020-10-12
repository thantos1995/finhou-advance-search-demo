Ta cần tải project về từ github sử dụng câu lệnh:

```shell
$git clone https://github.com/thantos1995/finhou-advance-search-demo.git
```
**Lưu ý:** để có thể tải repo này về cần thỏa mãn 2 điều kiên
+ Có một tài khoản của website 


Tiếp theo đó để cài đặt các dependencies cần thiết cho project để chạy ta chạy câu lệnh dưới tại thư mục root của project (thư mục chứa file **package.json**)
```shell 
$npm install 
```

Bây giờ ta có thể chạy test tại port 9000 với:
```shell
$npm start
```

Hoặc đóng gói để deploy lên môi trường production:
```shell
$npm run build
```