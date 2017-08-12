imgSrc = chrome.extension.getURL("deadUp.png");
BlackList = null;

function getBlackList() {
    chrome.runtime.sendMessage({}, function (response) {
        BlackList = response;
    });
}

function Init() {
    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.code) {
                case 0:
                    //检查右侧排行榜
                    console.log("检查右侧排行榜");
                    setTimeout(function () {
                        eyeProtectCheck(0);
                    }, 1000);
                    break;
                case 1:
                    //检查左侧热门视频
                    console.log("检查左侧热门视频");
                    setTimeout(function () {
                        eyeProtectCheck(1);
                    }, 1000);
                    break;
                case 2:
                    //检查顶部推荐
                    console.log("检查顶部推荐");
                    setTimeout(function () {
                        eyeProtectCheck(2);
                    }, 1000);
                    break;
                default:
                    break;
            }
        }
    );

    getBlackList();
}

/**
 * 将div内的a标签href全部替换为alert
 * @param {div} videoDiv 
 */
function replaceLinkWithAlert(videoDiv, alertMessage) {
    var alertScript = "javascript:alert(\"私法制裁！\\r\\n黑名单关键词：" + alertMessage + "\")";
    var aTags = $(videoDiv).find("a");
    for (var i = 0; i < aTags.length; i++) {
        var a = aTags[i];
        $(a).attr("href", alertScript);
    }
}

/**
 * 将div内的图片标签全部替换为死刑封面
 * @param {div} videoDiv 
 */
function replaceImageWithDeath(videoDiv) {
    var imgTags = $(videoDiv).find("img");
    for (var i = 0; i < imgTags.length; i++) {
        var img = imgTags[i];
        $(img).attr("src", imgSrc);
    }
}

/**
 * 检查传入的文本中是否包含黑名单中的文字
 * @param {string} text 
 * @return {string} 黑名单字符串
 */
function checkBlackList(text) {
    if (!BlackList) {
        getBlackList();
    }
    for (var i = 0; i < BlackList.length; i++) {
        var t = BlackList[i];
        if (text.indexOf(t) >= 0) {
            return t;
        }
    }
    return null;
}

/**
 * 检查左侧热门推荐或顶部推荐
 * @param {int} place 
 */
function eyeProtectCheck(place) {
    var videoDivClass;
    var titleClass;
    switch (place) {
        case 0:
            videoDivClass = ".rank-item"
            titleClass = ".ri-title";
            break;
        case 1:
            videoDivClass = ".spread-module";
            titleClass = ".t";
            break;
        case 2:
            videoDivClass = ".groom-module";
            titleClass = ".title";
            break;
        default:
            break;
    }
    var videoDivs = $(videoDivClass);
    for (var i = 0; i < videoDivs.length; i++) {
        var videoDiv = videoDivs[i];
        var textElements = $(videoDiv).find(titleClass);
        for (var j = 0; j < textElements.length; j++) {
            var te = textElements[j];
            //获取到视频标题文本
            var text = te.innerText;
            var blackKeyword = checkBlackList(text);
            //如果该文本中包含黑名单中的关键词
            if (blackKeyword) {
                replaceImageWithDeath(videoDiv);
                replaceLinkWithAlert(videoDiv, blackKeyword);
                break;
            }
        }
    }
}

Init();