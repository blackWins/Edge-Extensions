function code() {
	var nodes = document.getElementsByTagName('code');
	for (var i = nodes.length - 1; i >= 0; i--) {
		if (nodes[i].parentNode.localName == 'pre') {
			continue
		}
		var innerText = document.createTextNode(nodes[i].innerText);
		var title = document.createAttribute("title");
		title.value = nodes[i].innerText;
		var newCode = document.createElement("code");
		newCode.appendChild(innerText);
		newCode.setAttributeNode(title);
		var b = document.createElement("span");
		b.appendChild(newCode);
		nodes[i].replaceWith(b)
	}
}

function setClassNameByXpath(xpath) {
	var allPath = document.evaluate(xpath, document);
	var curr = allPath.iterateNext();
	var lst = [];
	while (curr) {
		lst.push(curr);
		curr = allPath.iterateNext()
	}
	for (let i = 0; i < lst.length; i++) {
		lst[i].classList.add("notranslate")
	}
}

function setClassName(elem) {
	if (!elem) {
		return
	}
	if (elem.length == undefined) {
		elem.classList.add("notranslate");
		return;
	}
	for (var i = 0; i < elem.length; i++) {
		elem[i].classList.add("notranslate")
	}
}

function executeSync(ignore_type) {
	var coll = ignore_type.split(/\n|,|\s/);
	for (var i in coll) {
		if (coll[i].indexOf('#') == 0) {
			var nodes = document.getElementById(coll[i].substr(1));
			setClassName(nodes)
		} else if (coll[i].indexOf('.') == 0) {
			var nodes = document.getElementsByClassName(coll[i].substr(1));
			setClassName(nodes)
		} else if (coll[i].indexOf('/') == 0) {
			setClassNameByXpath(coll[i])
		} else {
			var nodes = document.getElementsByTagName(coll[i]);
			setClassName(nodes)
		}
	}
	code();
}
/*content end*/
var tmp;
chrome.storage.sync.get("input", ({
	input
}) => {
	tmp = input
});
chrome.storage.sync.get("autoscan", async ({
	autoscan
}) => {
	if (autoscan) {
		setTimeout(function(){executeSync(tmp);console.debug('ready!');},1200);
	}
});
var styleTag = document.createElement("style");
var codeCss = document.createTextNode(
	'.code{font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;background-color: #666666;font-smooth: auto;word-wrap: break-word;border-radius: 3px;padding: .1em .2em;font-size: 85%;color: white;margin: 0px 4px;}'
	);
styleTag.appendChild(codeCss);
document.getElementsByTagName('head')[0].appendChild(styleTag);
/*
.code{
	background-color: var(--theme-inline-code);
    font-smooth: auto;
    word-wrap: break-word;
    border-radius: 3px;
    padding: .1em .2em;
    font-size: 85%;
}
*/
