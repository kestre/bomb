window.onload = function() {
    var adiv = new Array;

    cont(1);
    adiv = contArray();
    randBomb(adiv);
    countBomb(adiv)
    click(adiv);

}

function cont(level) {
    //设置等级，创建界面
    var level_num = [0, 16, 30];
    var str = '<div>';
    var width_len = level_num[level];
    var height_len = parseInt(1.4 * width_len - Math.pow(width_len, 2) / 42);
    for (var j = 0; j < height_len; j++) {
        str += '<div style="position:absolute; top:' + j * 21 + 'px;">'
        for (var i = 0; i < width_len; i++) {
            str += '<div style="width:22px; height:20px; background:gray;border:1px solid beige; position:absolute; top:0px; left:' + i * 23 + 'px;"></div>';
        }
        str += '</div>'
    }
    str += '</div>'
    document.body.innerHTML = str;
}

function contArray() {
    //得到每个框的数组
    var div = this.document.getElementsByTagName('div');
    var adiv = new Array;
    for (i = 0; i < 16; i++) {
        adiv[i] = new Array;
    }
    var j = 0;
    for (var i = 1; i < div.length; i++) {
        if (i % 17 == 1)
            continue;
        if (adiv[j].length >= 16) {
            j++;
        }
        adiv[j].push(div[i]);
    }
    return adiv
}

function randBomb(adiv) {
    //随机初始化雷的位置
    var originalArray = new Array;
    var count = 256;
    var bomb_count = 30;

    for (var i = 0; i < count; i++) {
        originalArray[i] = i;
    }
    originalArray.sort(function() { return 0.5 - Math.random(); });
    for (var i = 0; i < bomb_count; i++) {
        var x = parseInt(originalArray[i] / 16);
        var y = parseInt(originalArray[i] % 16);
        adiv[x][y].value = '0';
    }
}

function countBomb(adiv) {
    //计算周围地雷数
    var addx = [-1, -1, -1, 0, 0, 1, 1, 1];
    var addy = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (var i = 0; i < adiv.length; i++)
        for (var j = 0; j < adiv[i].length; j++) {
            var count = 0;
            for (var k = 0; k < addx.length; k++) {
                if (adiv[i + addx[k]] != undefined && adiv[i + addx[k]][j + addy[k]] != undefined && adiv[i + addx[k]][j + addy[k]].value == '0') { count++ }
            }
            adiv[i][j].innerHTML = '<div style="display:none;text-align:center">' + count + '</div>';
            if (adiv[i][j].value == '0') {
                adiv[i][j].innerHTML = '<div style="display:none;text-align:center"></div>';
            }
        }

}

function click(adiv) {
    //点击反应
    for (var i = 0; i < 16; i++)
        for (var j = 0; j < 16; j++) {
            adiv[i][j].innerHTML += '<img src="1.png" height="100%" width="100%" />';
            adiv[i][j].onclick = function() {
                if (this.value == '0') {
                    this.getElementsByTagName('img')[0].src = 'bomb.png';
                    setTimeout(function() { alert('Game Over!'); }, 100);
                } else {
                    this.getElementsByTagName('img')[0].style.display = "none";
                    this.getElementsByTagName('div')[0].style.display = "block";
                }
            }
        }
}