/*********************
 *
 * @Author: O’lemon
 * @Date: 2023-03-13 17:15:44
 * @FilePath: /Drop_ChromeExtension/background.js
 * @Description: File Description
 *
 *********************/
var menuItem = {
  id: "1",
  title: "打开百度",
  contexts: ["all"],
  onclick: function (params) {
    chrome.tabs.getSelected(null, function (tab) {
      window.open("http://www.baidu.com/");
    });
  },
};
chrome.contextMenus.create(menuItem);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);

  console.log("backgroudn.js 接收");

  // window.tabs.forEach(function (tab) {
  //   chrome.tabs.sendMessage(
  //     tab.id,
  //     { msg: request.html, to: tab },
  //     (res) => {}
  //   );
  // });

  chrome.tabs.query({ active: true }, (tabs) => {
    //获取活动页
    // tabs.forEach((tab) => {
    //   chrome.tabs.sendMessage(
    //     tab.id, //给活动页发消息
    //     { msg: request.html, to: tabs },
    //     (res) => {}
    //   );
    // });
  });

  // chrome.tabs.query({}, (tabs2) => {
  //   tabs2.forEach((tab2) => {
  //     chrome.tabs.sendMessage(tab2.id, { msg: request.html, to: tabs });
  //   });
  // });

  // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  //   port = chrome.tabs.connect(tabs[0].id, { name: "channelName" });
  //   port.postMessage({ msg: request.html, to: tabs });
  // });

  // chrome.tabs.query({}, (tabs) => {
  //   tabs.forEach((tab) => {
  //     chrome.tabs.sendMessage(
  //       tab.id,
  //       {
  //         action: "postImage",
  //         base64: url,
  //         currentTab:currentTab
  //       },
  //       (response) =>{
  //           chrome.tabs.query({}, (tabs2) => {
  //             tabs2.forEach((tab2) => {
  //               chrome.tabs.sendMessage(tab2.id, {
  //                 action: "returnTrans",
  //                 a:1,
  //                 res: response,
  //               });
  //             });
  //           });
  //       }
  //     );
  //   });
  // });

  return true;
});
