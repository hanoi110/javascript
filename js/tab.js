//获取目标元素
//1.获取Tab
var oTab = document.getElementById('tab');
//2.获取tHead
var tHead = oTab.tHead;
//3.获取tHead第一行所有元素
var oThs = tHead.rows[0].cells;
//4.获取第一个tBody
var tBody = oTab.tBodies[0];
//5.获取tBody中所有的行
var oRows = tBody.rows;
//6.存储数据
var data = null;
//->1.首先获取后台（data.txt）中的数据-》“JSON格式的数据”
//1）首先创建一个Ajax对象
var xhr = new XMLHttpRequest;

//2)打开我们需要请求数据的那个文件地址
xhr.open("get", "../data/tab.txt", false); //false:同步编程(1234完成后才能继续执行)

//3)监听请求状态
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
		var val = xhr.responseText;
		data = JSON.parse(val);
	}
}

//4)发送请求
xhr.send(null);
//->2.实现我们的数据绑定
function bindData() {
	var frg = document.createDocumentFragment();
	for(var i = 0; i < data.length; i++) {
		var cur = data[i]; //获取数据的每一列
		var oTr = document.createElement("tr"); //创建一行元素

		for(key in cur) {
			var oTd = document.createElement("td"); //创建一列元素
			//判断男女
			if(key === "sex") {
				oTd.innerHTML = cur[key] === 1 ? "男" : "女";
			} else {
				oTd.innerHTML = cur[key]; //将每行元素添加至oTd中
			}
			oTr.appendChild(oTd); //
		}
		frg.appendChild(oTr);
	}
	tBody.appendChild(frg);
	frg = null; //释放内存
}
bindData();

//->3.实现隔行变色
function changeBg() {
	//循环所有的行
	for(var i = 0; i < oRows.length; i++) {
		if(i % 2 == 1) {
			oRows[i].className = "bg";
		} else {
			oRows[i].className = " ";
		}
	}
}
changeBg();

//->4.点击年龄实现排序
function sort(n) {
	var _this = this;//this->oThs[1]
	//-》把存储所有行的类数组转换为数组
	var ary = utils.listToArray(oRows);
	//->优化：点击当前列，需要让其他列的flag存储的值回归到初始值-1，这样在返回头点击其他列，才是按照升序排列的
	for (var k = 0; k<oThs.length;k++) {
		if (oThs[k] !== this) {
			oThs[k].flag = -1;
		}
	}
	//->给数组进行排序
	_this.flag *= -1
	ary.sort(function(a,b){
		var curInn = a.cells[n].innerHTML,
			nexInn = b.cells[n].innerHTML,
			curInnNum = parseFloat(a.cells[n].innerHTML),
			nexInnNum = parseFloat(b.cells[n].innerHTML);
		if (isNaN(curInnNum) || isNaN(nexInnNum)) {
			return (curInn.localeCompare(nexInn))*_this.flag;//实现文本排序
		} else {
			return (curInnNum-nexInnNum)*_this.flag;//实现数字排序
		}	
	});
	//安装ary的最新顺序添加到tBody中
	var frg = document.createDocumentFragment();
	for (var i=0; i<ary.length; i++) {
		frg.appendChild(ary[i]);
	}
	tBody.appendChild(frg);
	frg = null;
	changeBg();
}

//->5.点击排序:所有具有class="cursor"这个样式的列都可以实现排序
for (var i=0; i<oThs.length;i++) {
	var curTh = oThs[i];
	if (curTh.className === "cursor") {
		curTh.index = i;//存储索引值
		curTh.flag = -1;//实现升降序
		curTh.onclick = function() {
			sort.call(this, this.index);
		}
	}
}
