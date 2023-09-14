let auto_scan = document.getElementById("auto_scan");
let save_btn = document.getElementById("save_btn");
let input_box = document.getElementById('skip-type')
let localElem = document.getElementsByClassName("tolocal");


function _local(msg) {
	return chrome.i18n.getMessage(msg);
}

for (var i = 0; i < localElem.length; i++) {
	localElem[i].innerText = chrome.i18n.getMessage(localElem[i].innerText.substr(6).replace('__', ''));
}

chrome.storage.sync.get("input", ({
	input
}) => {
	input_box.value = input || '';
});

chrome.storage.sync.get("autoscan", ({
	autoscan
}) => {
	auto_scan.checked = autoscan;
});

auto_scan.addEventListener("click", async () => {
	var autoscan = auto_scan.checked;
	chrome.storage.sync.set({
		autoscan
	});
})

save_btn.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true
	});

	let input = document.getElementById('skip-type').value.split(/\n|,|\s/).sort().join('\n');
	input_box.value = input;
	chrome.storage.sync.set({
		input
	});

	chrome.scripting.executeScript({
		target: {
			tabId: tab.id
		},
		files: ['js/content.js']
	});
});
