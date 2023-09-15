/*********************
 *
 * @Author: O’lemon
 * @Date: 2023-03-13 17:15:44
 * @FilePath: /Drop_ChromeExtension/localsite/index.js
 * @Description: File Description
 *
 *********************/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("插件页面 接收", request);

  var wrap = document.createElement("div");
  wrap.className = "block";
  wrap.innerHTML = request.html;
  document.body.appendChild(wrap);
});
