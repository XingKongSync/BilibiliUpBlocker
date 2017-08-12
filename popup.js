bg = chrome.extension.getBackgroundPage();
BlackList = null;
tbAdd = null;

liTemplet = "<div><input id=\"block-item-{index}\" type=\"checkbox\" value=\"{upName}\"/>{upName}<br/></div>";

String.prototype.replaceAll = function(s1,s2){ 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

/**
 * 更新界面
 */
function updateView() {
    var ulBlackList = $("#ulBlackList");
    ulBlackList.empty();
    for (var i = 0; i < BlackList.length; i++) {
        var upName = BlackList[i];
        ulBlackList.append(liTemplet.replaceAll("{upName}", upName).replace("{index}", i));
    }
}

function saveData() {
    if (BlackList != null && BlackList != undefined) {
        bg.setBlackList(BlackList);
    }
}

/**
 * 用户点击了“删除”按钮
 */
function btDeleteClicked() {
    var ulBlackList = $("#ulBlackList");
    var items = ulBlackList.find("input");
    for (var i = 0; i < items.length; i++) {
        var cb = $(items[i]);
        if (cb.is(":checked")) {
            cb.parent().remove();
        }
    }
    BlackList = [];
    items = ulBlackList.find("input");
    for (var i = 0; i < items.length; i++) {
        var cb = $(items[i]);
        BlackList.push(cb.val());
    }
    saveData();
}

/**
 * 用户单击了“添加”按钮
 */
function btAddClicked() {
    if (tbAdd != null) {
        var str = tbAdd.val();
        if (str != null && str != undefined && str != "") {
            BlackList.push(tbAdd.val());
            updateView();
            saveData();
            tbAdd.val("");
        }
    }
}

$(
    function () {
        BlackList = bg.getBlackList();
        tbAdd = $("#tbAdd");
        $("#btAdd").click(btAddClicked);
        updateView();
        $("#btDelete").click(btDeleteClicked);
    }
);