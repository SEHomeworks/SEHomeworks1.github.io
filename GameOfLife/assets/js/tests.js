var test1, test2, test3;
QUnit.module("游戏基类测试",
{
   setup:function() {
       //test1
       god.init();
       clearInterval(god.start_pause);
       god.paused = true;

       test1 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 0, 0],
               [1, 0, 0, 1, 0],
               [0, 1, 1, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };

       //test2
       test2 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 0, 0],
               [0, 1, 1, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };

       //test3
       test3 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 1, 0],
               [0, 1, 1, 1, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };
   }
}
);
test("游戏渐进过程验证", 3, function() {

   deepEqual(jQuery.extend(true, {}, test1), god.step(test1), "测试结果与预期符合!");
   deepEqual(jQuery.extend(true, {}, test2), god.step(test2), "测试结果与预期符合!");
   notDeepEqual(jQuery.extend(true, {}, test3), god.step(test3), "测试结果与预期符合!");
}
);

test("游戏变速验证", 4, function() {
       var speed = god.speed;
       var level = god.level;

       god.changeSpeed();
       ok(god.level == level + 1 && god.speed == speed/2, "结果满足变速要求" );

       god.changeSpeed();
       ok(god.level == level + 2 && god.speed == speed/4, "结果满足变速要求" );

       god.changeSpeed();
       ok(god.level != level && god.speed != speed, "试错结果满足变速要求" );

       god.changeSpeed();
       ok(god.level == level && god.speed == speed, "结果满足变速要求" );
   }
)

QUnit.module("工具类模块测试", {
   setup:function() {
       //test1
       test1 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 0, 0],
               [1, 0, 0, 1, 0],
               [0, 1, 1, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };

       //test2
       test2 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 0, 0],
               [0, 1, 1, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };

       //test3
       test3 = {
           length: 5,
           width: 5,
           data: [
               [0, 0, 0, 0, 0],
               [0, 1, 1, 1, 0],
               [0, 1, 1, 1, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]
           ]
       };
   }
});
test("统计函数验证", 3, function(){

   ok(ToolKit.calc_sur(test1) == 6, "统计结果正确" );
   ok(ToolKit.calc_sur(test2) == 4, "统计结果正确" );
   ok(ToolKit.calc_sur(test3) != 5, "试错统计结果正确" );
});
