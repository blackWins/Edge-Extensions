function setCssNameByXpath(xpath) {
	var allPath = document.evaluate(xpath, document);
	var curr = allPath.iterateNext();
	var lst = [];
	while (curr) {
		//curr.classList.add("notranslate");
		lst.push(curr);
		curr = allPath.iterateNext();
	}
	for (let i = 0; i < lst.length; i++) {
		lst[i].classList.add("notranslate");
	}
}

function setCssName(elem) {
	if (!elem) {
		return;
	}
	if (elem.length == undefined) {
		elem.classList.add("notranslate");
		return;
	}
	for (var i = 0; i < elem.length; i++) {
		elem[i].classList.add("notranslate");
	}
}


function code() {
	var nodes = document.getElementsByTagName('code');
	for (var i = nodes.length - 1; i >= 0; i--) {
		if (nodes[i].parentNode.localName == 'pre') {
			continue;
		}

		var innerText = document.createTextNode(nodes[i].innerText);

		var title = document.createAttribute("title");
		title.value = nodes[i].innerText;

		var newCode = document.createElement("code");
		newCode.appendChild(innerText);
		newCode.setAttributeNode(title);

		var b = document.createElement("span");
		b.appendChild(newCode);

		nodes[i].replaceWith(b);
	}
}

function executeSync(ignore_type) {
	var coll = ignore_type.split(/\n|,|\s/);

	for (var i in coll) {
		if (coll[i].indexOf('#') == 0) {
			var nodes = document.getElementById(coll[i].substr(1));
			setCssName(nodes);
		} else if (coll[i].indexOf('.') == 0) {
			var nodes = document.getElementsByClassName(coll[i].substr(1));
			setCssName(nodes);
		} else if (coll[i].indexOf('/') == 0) {
			setCssNameByXpath(coll[i]);
		} else {
			var nodes = document.getElementsByTagName(coll[i]);
			setCssName(nodes);
		}
	}
	code();
}

chrome.storage.sync.get("input", ({
	input
}) => {
	executeSync(input)
});
