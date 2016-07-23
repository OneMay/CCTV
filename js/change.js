/*var curIndex=0;
//时间间隔 单位毫秒
var timeInterval=5000;
var arr=new Array();
arr[0]="banner.jpg";
arr[1]="banner2.jpg";
arr[2]="banner3.jpg";
arr[3]="banner4.jpg";
arr[4]="banner5.jpg";
arr[5]="banner6.jpg";
arr[6]="banner7.jpg";
arr[7]="banner8.jpg";
arr[8]="banner9.jpg";
setInterval(changeImg,timeInterval);
function changeImg()
{
var obj=document.getElementById("showpic");
if (curIndex==arr.length-1)
{
curIndex=0;
}
else
{
curIndex+=1;
}
obj.src="images/"+arr[curIndex];
}*/


//<![CDATA[
function $(id) {
 return document.getElementById(id);
};
function getByClass(className, context) {
/*
 * 功能说明：
 * 传入类名、节点名（默认document），获取context下类名为classNa的节点
 */
 context = context || document;
 if(context.getElementsByClassName) {
  return context.getElementsByClassName(className);
 } else {
  var nodes = [];
  var tags = context.getElementsByTagName('*');
  for(var i=0, len=tags.length; i<len; i++) {
   if(hasClass(tags[i], className)) {
    nodes.push(tags[i]);
   }
  }
  return nodes;
 }
}
function hasClass(node, className) {
/*
 * 功能说明：
 * 传入节点及一个类名，检查该节点是否含有传入的类名
 */
 var names = node.className.split(/\s+/);
 for(var i=0, len=names.length; i<len; i++) {
  if(names[i] == className) {
   return true;
  }
 }
 return false;
}
function animate(o,start,alter,dur,fx) {
/*
 * 功能说明：
 * 设置动画
 * o:要设置动画的对象
 * start:开始的对象
 * alter:总的对象
 * dur:动画持续多长时间
 * fx:动画类型
 */
 var curTime=0;
 var t=setInterval(function () {
  if (curTime>=dur) clearInterval(t);
  for (var i in start) {
   o.style[i]=fx(start[i],alter[i],curTime,dur)+"px";
  }
  curTime+=40;
 },40);
 return function () {
  clearInterval(t);
 };
}
var Tween = {
/*
 * 功能说明：
 * 加速运动
 * curTime:当前时间,即动画已经进行了多长时间,开始时间为0
 * start:开始值
 * alter:总的变化量
 * dur:动画持续多长时间
 */
 Linear:function (start,alter,curTime,dur) {return start+curTime/dur*alter;},//最简单的线性变化,即匀速运动
 Quad:{//二次方缓动
  easeIn:function (start,alter,curTime,dur) {
   return start+Math.pow(curTime/dur,2)*alter;
  },
  easeOut:function (start,alter,curTime,dur) {
   var progress =curTime/dur;
   return start-(Math.pow(progress,2)-2*progress)*alter;
  },
  easeInOut:function (start,alter,curTime,dur) {
   var progress =curTime/dur*2;
   return (progress<1?Math.pow(progress,2):-((--progress)*(progress-2) - 1))*alter/2+start;
  }
 },
};
function Player(btns, scrollContent, imgHeight, timeout, hoverClass) {
/*
 * btns:按钮，类型是数组
 * scrollContent:摇滚动的块，一个DOM对象，这里是ol
 * imgHeight:每一张图片的高度，当然，如果想改成左右滚动，这里传入每一张图片的宽，唯一需要注意的是每一张图片宽高必须相同，图片数量可调整
 * timeout:切换速度快慢，默认为1.5ms
 * hoverClass:每一个按钮激活时的类名
*/
 hoverClass = hoverClass || 'active';
 timeout = timeout || 1500;
 this.btns = btns;
 this.scrollContent = scrollContent;
 this.hoverClass = hoverClass;
 this.timeout = timeout;
 this.imgHeight = imgHeight;
 var _this = this;
 for(var i=0; i<btns.length; i++) {
  this.btns[i].index = i;
  btns[i].onmouseover = function() {
   _this.stop();
   _this.invoke(this.index);
  }
  btns[i].onmouseout = function() {
   _this.start();
  }
 }
 this.invoke(0);
}
Player.prototype = {
 constructor : Player,
 start : function() {
  var _this = this;
  this.stop();
  this.intervalId = setInterval(function() {
   _this.next();
  }, this.timeout);
 },
 stop: function() {
  clearInterval(this.intervalId);
 },
 invoke: function(n) {
  this.pointer = n;
  if(this.pointer >= this.btns.length) {
   this.pointer = 0;
  }
  this.clearHover();
  this.btns[this.pointer].className = this.hoverClass;
  //this.scrollContent.style.top = parseInt(-this.imgHeight * this.pointer) + 'px';
  var startVal = parseInt(this.scrollContent.style.top) || 0;
  var alterVal = (parseInt(-startVal - this.imgHeight * this.pointer));
  this.animateIterval && this.animateIterval();//修正快速切换时闪动
  this.animateIterval=animate(this.scrollContent, {top : startVal},{top : alterVal}, 2000, Tween.Quad.easeOut);
  //这里默认设置每张图滚动的总时间是1s
 },
 next: function() {
  this.invoke(this.pointer + 1);
 },
 clearHover: function() {
  for(var i=0; i<this.btns.length; i++) {
   this.btns[i].className = '';
  };
 }
}
window.onload = function() {
 var btns = getByClass('btns', $('slider'))[0].getElementsByTagName('li');
 var player = getByClass('player', $('slider'))[0];
 var player = new Player(btns, player, 290, 2500, undefined);
 player.start();
 //player.invoke(2);
}
//]]>

