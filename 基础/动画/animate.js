/*
* @Author: Administrator
* @Date:   2018-07-11 18:17:16
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-11 18:39:10
*/

'use strict';
function animate(ele,target) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var step = (target-ele.offsetTop)/10;
		step = step>0?Math.ceil(step):Math.floor(step);
		ele.style.left = ele.offsetTop + step + 'px';
		//检测
		console.log(1);
		if (Math.abs(target-ele.offsetTop)<Math.abs(step)) {
			ele.style.top = target + 'px';
			clearInterval(ele.timer);
		}
	},25);
}

function scroll() {
	if (window.pageYOffset != null) {
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else if (document.compatMode === "CSS1Compat") {
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return {
		left: document.body.scrollLeft,
		top: document.body.scrolltop
	}
}

function $(str) {
	var str1 = str.charAt(0);
	if (str1 === '#') {
		return document.getElementById(str.slice(1));
	} else if (str1 === '.') {
		return document.getElementByClassName(str.slice(1));
	} else {
		return document.getElementByTagName(str);
	}
}

function getFirstNode(ele) {
	return ele.firstElementChild || ele.firstChild;
}

function getLastNode(ele) {
	return ele.lastElementChild || ele.lastChild;
}

function getNextNode(ele) {
	return ele.nextElementSibling || ele.nextSibling;
}

function getPrevNode(ele) {
	return ele.previousElementSibling || ele.previousSibling;
}

function getEleOfIndex(ele, index) {
	return ele.parentNode.children[index];
}

function getAllSiblings(ele) {
	var newArr = [];
	var arr = ele.parentNode.children;
	for ( var i = 0; i< arr.length; i++) {
		if (arr[i] !== ele) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}