/*
* @Author: Administrator
* @Date:   2018-07-12 09:52:24
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-12 20:48:55
*/

function show(ele) {
	ele.style.disblock = "block";
}

/*
获取元素样式的兼容性写法
 */
function getStyle(ele,attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele,null)[attr];
	}
	return ele.currentStyle[attr];
}

function animate(ele,json,fn) {
	//清除定时器
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		//开闭原则
		var bool = true;

		//遍历属性和值，分别单独处理json
		//attr == k(键)  target == json[k](值)
		 for (var k in json ) {
		 	//四步
		 	var leader = parseInt(getStyle(ele,k)) || 0;
		 	//1.获取步长
		 	var step = (json[k] - leader)/10;
		 	//2.二次处理步长
		 	step = step > 0 ? Math.ceil(step) : Math.floor(step);
		 	leader = leader + step;
		 	//3.赋值
		 	ele.style[k] = leader +"px";
		 	//4.清除定时器
		 	//判断：目标值和当前值的差大于步长，就不能跳出循环
		 	//不考虑小数的情况：目标位置和当前位置不想等，就不能清除定时器
		 	if (json[k] !== leader) {
		 		bool = false;
		 	} 
		 	//检查
		 	console.log(1);
		 	//只有所有的属性都到了指定的位置，bool值菜不会变成false;
		 	if (bool) {
		 		clearInterval(ele.timer);
		 		//只有传递了回调函数，才能执行
		 		if (fn) {fn();}
		 	}
		 }
	},10);
}

//获取屏幕可视宽高
function client() {
	if (window.innerHeight !== undefined) {
		return {
			"width": window.innerWidth,
			"height": window.innerHeight
		}
	} else if (document.compatMode === "CSS1Compat") {
		return {
			"width": document.documentElement.clientWidth,
			"height": document.documentElement.clientHeight
		}
	} else {
		return {
			"width": document.body.clientWidth,
			"height": document.body.clientHeight
		}
	}
}