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


    
})