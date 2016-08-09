#!/usr/bin
POST_PATH='./chatter/posts/';
title=$1;
path=$1;
if [ ! -z $2 ]; then
  echo '传了第二个参数'
  path=$2;
fi;
doPost () {
  echo 'write';
  cat > "$1" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name = 'viewport' content = 'width=device-width,initial-scale=1.0,user-scalable=no'>
  <link rel="stylesheet" href="../css/posts.css">
  <meta name="author" content="前端小虾蟹" />
  <meta name="keywords" content="前端小虾蟹, ${title}, 短文" />
  <meta name="description" content="${title}, 短文" />
</head>
<body>
  <div class="posts center">
    <h1>${title}</h1>
  </div>
</body>
</html>
EOF
}
filePath=${POST_PATH}${path}.html;
if [ -f $filePath ]; then
  read  -p "文件已存在， 是否替换？(Yes/No)" isReplace;
  case $isReplace in
    y|Y|yes|Yes|YES) doPost $filePath;;
  esac;
else
  doPost $filePath;
fi;
