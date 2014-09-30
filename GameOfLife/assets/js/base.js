/**
 * Created by Lu and Shaw on 2014/9/26.
 */

//设置游戏基类
var god = {
    divisor : 1.5, //设置参数控制初始细胞存活比例

    dead : 0, //记录死亡细胞数量

    epoch : 0, //记录细胞存活时间

    speed : 200, //设置间隔速度

    level : 0, //设置速度档位

    start_pause : null, //设置状态停止与继续

    paused : false, //记录当前细胞是否停止

    //细胞表格对象
    board : {
        length : 45, //水平方向细胞数量
        width : 45, //垂直方向细胞数量
        unit : 10, //细胞单位大小
        data : [] //二维数组记录细胞状态
    },

    /*初始化函数*/
    init : function(){
        /*初始化参数*/
        this.speed = 200;
        this.epoch = 0;
        this.level = 0;
        this.dead = 0;
        this.paused = false;


        if (this.start_pause != null) {
            clearInterval(this.start_pause);
        }
        this.start_pause = setInterval(Draw, this.speed); //设置循环

        for(var i=0; i<this.board.length; i++){
            this.board.data[i] = new Array();
            for(var j=0; j<this.board.width; j++){
                //随机化每个细胞状态
                this.board.data[i][j] = Math.round(Math.random()/this.divisor);
            }
        }
    },


    /*每一步细胞状态处理函数*/
    step : function(board){
        var data_backup = new Array();
        for(var i=0; i<board.length; i++) {
            data_backup[i] = new Array();
            for (var j = 0; j < board.width; j++) {
                data_backup[i][j] = board.data[i][j];
            }
        }

        //根据每个细胞周围八个细胞的状态决定该细胞下一步的状态
        for(var i=0; i<board.length; i++){
            for(var j=0; j<board.width; j++){
                var check = 0;
                for(var k=(i-1); k<(i+2); k++){
                    for(var m=(j-1); m<(j+2); m++){
                        var aa = k, bb = m;
                        if(k == i && m == j) continue;
                        if(k == -1){
                            aa = board.length-1;
                        } else if (k == board.length) {
                            aa = 0;
                        }
                        if(m == -1){
                            bb = board.width-1;
                        } else if (m == board.width) {
                            bb = 0;
                        }
                        if(data_backup[aa][bb] == 1) check++;
                    }
                }
                if(check == 3){
                    board.data[i][j] = 1;
                }
                else if(check != 2){
                    if(board.data[i][j] != 0) this.dead++;
                    board.data[i][j] = 0;
                }
            }
        }

        this.epoch++; //时间记录
        return board;
    },


    /*变速函数*/
    changeSpeed : function(){
        //档位变化同时速度变化
        this.level++;
        this.level = this.level%4;
        this.speed = Math.pow(2, -this.level) * 200;

        if (!this.paused) {
            clearInterval(this.start_pause);
            this.start_pause = setInterval(Draw, this.speed);
        }
    }

}
