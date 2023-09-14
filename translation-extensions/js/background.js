async function getCurrentTab() {
	let queryOptions = {
		active: true,
		lastFocusedWindow: true
	};
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

chrome.storage.sync.get("input", ({
	input
}) => {
	let ignore_type = input || '';
});

let tab = getCurrentTab();

chrome.contextMenus.onClicked.addListener(function(itemData) {
	console.debug(itemData);
});

// chrome.storage.sync.get("auto_scan", ({
// 	auto_scan
// }) => {
// 	console.debug(tab.id);
// 	// chrome.scripting.insertCSS({
// 	// 	target: {
// 	// 		tabId: tab.id
// 	// 	},
// 	// 	css: "css/focus-mode.css"
// 	// });
// 	if (!auto_scan) {
// 		return;
// 	}
// 	chrome.scripting.executeScript({
// 		target: {
// 			tabId: tab.id
// 		},
// 		files: ['js/content.js']
// 	});
// });
