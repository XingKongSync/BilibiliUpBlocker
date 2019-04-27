chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("code:0");
        // chrome.tabs.sendRequest(details.tabId, { "code": 0, "message": "ranking Requested." });
        chrome.tabs.sendMessage(details.tabId, { "code": 0, "message": "ranking Requested." });
    },
    { urls: ["*://api.bilibili.com/x/web-interface/ranking/region*"] }
);

chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("code:1");
        // chrome.tabs.sendRequest(details.tabId, { "code": 1, "message": "index Requested." });
        chrome.tabs.sendMessage(details.tabId, { "code": 1, "message": "index Requested." });
    },
    { urls: ["*://api.bilibili.com/x/web-interface/dynamic/region*", "*://api.bilibili.com/x/web-interface/dynamic/index*"] }
);

chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("code:2");
        // chrome.tabs.sendRequest(details.tabId, { "code": 1, "message": "index Requested." });
        chrome.tabs.sendMessage(details.tabId, { "code": 1, "message": "index Requested." });
    },
    { urls: ["*://api.bilibili.com/x/web-interface/ranking/index*"] }
);

BlackList = null;

function getBlackList() {
    if (BlackList != null && BlackList != undefined) {
        return BlackList;
    } else {
        try {
            BlackList = JSON.parse(localStorage.getItem("BlackList")).blacklist;
        } catch (error) {
            BlackList = ["聚印象", "PDD", "起小点", "熊猫TV", "糖醋小鸡排", "王者", "主播真会", "吃鸡", "绝地求生", "giao"];
        }

        return BlackList;
    }
}

function setBlackList(list) {
    BlackList = list;
    var blacklist = { "blacklist": BlackList }
    localStorage.setItem("BlackList", JSON.stringify(blacklist));
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse(getBlackList());
    }
);   