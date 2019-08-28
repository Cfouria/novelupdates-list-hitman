// ==UserScript==
// @name         NU kill shit novel v2
// @version  1
// @match        https://www.novelupdates.com/*
// @grant    none
// ==/UserScript==


(function() {
    'use strict';

    // Your code here...
if (localStorage.getItem('name2kill') === null){
	localStorage.setItem('name2kill',JSON.stringify([]));
}
var names = JSON.parse(localStorage.getItem("name2kill"));
reloadKill();
var lister = document.getElementsByClassName('tablesorter');
for (var i = 0; i < lister.length; i++){
	for (var p = 0; p < lister[i].lastElementChild.childNodes.length; p++){
		lister[i].lastElementChild.childNodes[p].firstElementChild.prepend(
			lister[i].lastElementChild.childNodes[p].firstElementChild.className+' ');
	}
}

function addKill(){
	document.getElementById('inputEle').value =
		document.getElementById('inputEle').value.trim();
	names.push(document.getElementById('inputEle').value);
	names = names.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
	});
	localStorage.setItem('name2kill',JSON.stringify(names));
	updateKill('hidden');
}

function killStorage(){
	localStorage.clear();
	localStorage.setItem('name2kill',JSON.stringify([]));
	names = JSON.parse(localStorage.getItem("name2kill"));
}

function removeKill(){
	updateKill('visible');
	var index = names.indexOf(document.getElementById('inputEle').value);
	if (index > -1) {names.splice(index, 1);}
	localStorage.setItem('name2kill',JSON.stringify(names));
}

function updateKill(eee){
	for (var i = 0; i < names.length; i++){
		if (document.getElementsByClassName(names[i])[0]){
			for (var p = 0; p < document.getElementsByClassName(names[i]).length; p++){
				if (document.getElementById('inputEle')){
					if (document.getElementsByClassName(names[i])[p].className ===
							document.getElementById('inputEle').value){
						document.getElementsByClassName(names[i])[p]
							.parentElement.style.visibility = eee;
					}
				}
			}
		}
	}
}

function reloadKill(){
	for (var i = 0; i < names.length; i++){
		if (document.getElementsByClassName(names[i])[0]){
			for (var p = 0; p < document.getElementsByClassName(names[i]).length; p++){
				document.getElementsByClassName(names[i])[p]
					.parentElement.style.visibility = 'hidden';
			}
		}
	}
}

var formEle;
formEle = document.createElement("form");
	formEle.id = "formEle";
formEle.action = "";
formEle.setAttribute('style', "top: 0; right: 0; position: fixed; z-index: 2146;");

var addEle;
addEle = document.createElement('button');
		addEle.id = "addEle";
addEle.appendChild(document.createTextNode('kill-target'));
addEle.addEventListener("click", addKill);
addEle.type = "button";

var resetEle;
resetEle = document.createElement('button');
		resetEle.id = "resetEle";
resetEle.appendChild(document.createTextNode('kill-localstorage'));
resetEle.addEventListener("click", killStorage);
resetEle.type = "button";

var removeEle;
removeEle = document.createElement('button');
		removeEle.id = "removeEle";
removeEle.appendChild(document.createTextNode('unkill'));
removeEle.addEventListener("click", removeKill);
removeEle.type = "button";

var inputEle;
inputEle = document.createElement('input');
		inputEle.id = "inputEle";
inputEle.value = '';
inputEle.type = "text";
inputEle.setAttribute('style', 'width: initial;');
inputEle.ondrop = function(){inputEle.value = ''};

		var checkExist = setInterval(function() {
	if (document.body) { clearInterval(checkExist);
		formEle.appendChild(removeEle);
		formEle.appendChild(resetEle);
		formEle.appendChild(inputEle);
		formEle.appendChild(addEle);
		document.body.appendChild(formEle);
	}
}, 100);

})();