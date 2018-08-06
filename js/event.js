var eventUtil = {
	//添加句柄
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false); //设置为冒泡事件
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},

	//删除句柄
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},

	//获取事件
	getEvent: function(event) {
		return event ? event : window.event;
	},

	//获取事件类型
	getType: function(event) {
		return event.type;
	},

	//获取事件目标元素
	getElement: function(event) {
		return event.target || event.srcElement;
	},

	//阻止事件冒泡
	stopPrepagation: function(event) {
		if(event.stopPrepagation) {
			event.stopPrepagation();
		} else {
			event.cancelBubble = true;
		}
	},

	//阻止默认行为
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};