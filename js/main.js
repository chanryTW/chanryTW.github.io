$(document).ready(function() {
    // ----------- Experience -----------
    // 顯示更多
    $('.accordion-control').on('click',function(e){
        e.preventDefault(); // 停止預設動作
        $(this)
        .children('.accordion-panel') // 選擇對應內容面板
        .not(':animated') // 若目前並未設定動畫展示
        .slideToggle(); // 使用slideToggle展開或隱藏內容面板

        $(this).find('.unfold svg').toggleClass('rotate'); // 切換箭頭圖示上下
    });

    // ----------- Works -----------
    // 分頁按鈕
    var $imgs = $('#posts .col'); // 儲存所有影像圖片
    var $buttons = $('#filter');
    var tagged = {}; // 建立標籤註記物件

    $imgs.each(function() {
        var img = this;
        var tags = $(this).data('tags'); // 取得元件的標籤
        if (tags) { // 如果元件有標籤
            tags.split(',').forEach(function(tagName) {
                if (tagged[tagName] == null) {
                    tagged[tagName] = [];
                }
                tagged[tagName].push(img);
            });
        }
    });

    $('<button/>', { // 建立空按鈕元件
        text: '全部',
        class: 'btn btn-primary active',
        click: function() {
            $(this)
            .addClass('active')
            .siblings()
            .removeClass('active'); // 移除兄弟元件的active
            $imgs.show(); // 顯示全部影像
        }
    }).appendTo($buttons); // 加入至按鈕組

    $.each(tagged, function(tagName) { // 巡訪每個標籤名稱
        $('<button/>', {
            text: tagName + ' (' + tagged[tagName].length + ')',
            class: 'btn btn-primary',
            click: function() {
                $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
                $imgs
                .hide() // 先全部隱藏
                .filter(tagged[tagName]) //找出標籤圖片
                .show();
            }
        }).appendTo($buttons);
    });


    // ----------- Contact -----------
    // 送出表單
    $('#submit').on('click', function(e) {
        e.preventDefault(); // 停止預設動作

        // 驗證
        if ($('#contact__mail').val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) != -1 
            && $('#contact__name').val() != null
            && $('#contact__type').val() != null 
            && $('#contact__content').val() != null) {     
            console.log("驗證成功");

            var contact__name = $('#contact__name').val() || '未填寫';
            var contact__mail = $('#contact__mail').val() || '未填寫';
            var contact__type = $('#contact__type').val() || '未填寫';
            var contact__content = $('#contact__content').val() || '未填寫';

            // 傳送至表單
            var data = {
                'entry.681131525': contact__name,
                'entry.1888045655': contact__mail,
                'entry.1372111573': contact__type,
                'entry.1154967890': contact__content
            };
            $.ajax({
                type: 'POST',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSf-xk_4wp6ZSXo0jyVovmw0uFM6crHb1f0pufsDwbskuolMZw/formResponse',
                data: data,
                contentType: 'application/json',
                dataType: 'jsonp',
                async:false,
                complete: function(data) {
                    console.log("表單傳送成功");

                    var yes = alert('訊息傳送成功');
                    if (yes) {
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                }
            });
        } else {
            console.log("驗證失敗");
        }
    });   
})