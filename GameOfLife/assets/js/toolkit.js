/**
 * Created by Lu and Shaw on 2014/9/26.
 */

 /*Toolkit 小工具对象*/
var ToolKit = {
    //计算存活细胞数量
    calc_sur : function(board){
        var sur = 0;
        for(var i=0; i<board.length; i++){
            for(var j=0; j<board.width; j++){
                if(board.data[i][j] == 1) sur++;
            }
        }
        return sur;
    }
};

 /*Canvas绘制函数*/
var Draw = function(){
    god.step(god.board);
    var canvas=$('#checkboard')[0];
    var ctx=canvas.getContext('2d');

    ctx.fillStyle = '#EDE0C8';
    ctx.fillRect(0, 0, god.board.width * god.board.unit, god.board.length * god.board.unit);
    var u = god.board.unit;
    for(var i=0; i<god.board.length; i++){
        for(var j=0; j<god.board.width; j++){
            if(god.board.data[i][j] == 1){
//                ctx.fillStyle = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
                ctx.fillStyle = '#776e65';
                ctx.fillRect(j*u-0.5, i*u-0.5, u-0.5, u-0.5);
            }
        }
    }
    refresh_board();
};

 /*数据更新函数*/
var refresh_board = function () {
    //更新网页上时间参数
    var eval = $('.epochs');
    eval[0].innerHTML = '<b style="font-size: 20px; margin-left: 5px; margin-right: 5px">' + god.epoch +'</b>';

    //更新网页上存活细胞参数
    var survivor = $('.survivor');
    survivor[0].innerHTML = ToolKit.calc_sur(god.board)+'';

    //更新网页上死亡细胞参数
    var dead = $('.dead');
    dead[0].innerHTML = god.dead+'';
};

 /*重生函数(使细胞重生,实质为一份绘制函数)*/
var Anim = function(x , y){
    var canvas = $('#checkboard')[0];
    var ctx = canvas.getContext('2d');

    var u = god.board.unit;
    var x_u = Math.floor(x/u);
    var y_u = Math.floor(y/u);
    god.board.data[y_u][x_u] = 1;
    ctx.fillStyle = '#776e65';
    ctx.fillRect(x_u*u-0.5, y_u*u-0.5, u-0.5, u-0.5);
};

 /*添加事件监听函数*/
var add_listeners = function () {
    var play_button = $('.play-pause');
    var play_pause = $('.play-pause').children()[0];

    //点击"暂停/开始"按钮响应
    play_button.click(function () {
        if (god.paused) {
            god.start_pause = setInterval(Draw, god.speed);
            god.paused = false;
            play_pause.innerHTML = 'Pause';
        } else {
            clearInterval(god.start_pause);
            god.paused = true;
            play_pause.innerHTML = 'Play';
        }
        console.log("click");
    });

    //点击"变速"按钮响应
    var speed_button = $('.speed');
    speed_button.click(function(){
        god.changeSpeed();
        speed_button.children()[0].innerHTML = Math.pow(2, god.level) + '';
    })

    //点击"重制"按钮响应
    var reset = $('.reset');
    reset.click(function(){
        god.init();
    });

    //鼠标点击重生细胞函数响应
    var vitalize = $('#checkboard');
    vitalize.click(function(event){
        Anim(event.pageX - vitalize.offset().left, event.pageY - vitalize.offset().top);
        refresh_board();
    })
};
