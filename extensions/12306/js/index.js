/*********************
 *
 * @Author: O’lemon
 * @Date: 2023-03-13 17:15:44
 * @FilePath: /Drop_ChromeExtension/js/index.js
 * @Description: File Description
 *
 *********************/
switch (window.location.host) {
  case "kyfw.12306.cn":
    kyfw();
    break;
  default:
    break;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("content.js 接收", request);
});

async function getIssues() {
  var origin = window.location.origin;
  var pathname = window.location.pathname;
  var prefix = `${origin}${pathname.replace("/issues", "")}`;
  var url = `${prefix}/board.json`;

  var res = await window.XHRTool.get(url, {
    page: 1,
    issue_state_id: 3,
    issue_search: "",
    author_id: "",
    assignee_id: "",
    milestone_id: "",
    program_id: "",
    label_ids: "",
    sort: "",
    priority: "",
  });
  var sum = res.data.issues_count;
  var pages = Math.ceil(sum / 20);
  var data = [];
  for (var i = 1; i <= pages; i++) {
    var res = await window.XHRTool.get(url, {
      page: i,
      issue_state_id: 3,
      issue_search: "",
      author_id: "",
      assignee_id: "",
      milestone_id: "",
      program_id: "",
      label_ids: "",
      sort: "",
      priority: "",
    });
    var issues = res.data.issues;
    issues = issues.map((issue) => {
      return {
        title: issue.title,
        number: issue.number,
        path: `${prefix}/issues/${issue.number}`,
        level: issue?.priority?.text || "一般",
        status: "关闭",
        description: "",
        analysis: "",
      };
    });
    data = data.concat(issues);
  }
  data = data.map((issue, index) => {
    issue.sort = index + 1;
    return issue;
  });
  return data;
}

async function kyfw() {
  var id = "kyfw-extension";
  var hifiniMusicPlugin = document.createElement("div");
  hifiniMusicPlugin.setAttribute("class", id);
  hifiniMusicPlugin.setAttribute("id", id);
  var DOMID = `#${id}`;
  const hifiniMusicPluginHtml = `

  <div class="header-dom">
    <span :class="{'kyfw-extension-logo':true,isMargin:hide}" @click="toggle" >
    <svg t="1637264320553" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1868" width="40" height="40"><path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m254.8 753.5c-64.4 59.2-150 91.9-240.9 91.9h-0.2c-108.8-0.1-208.5-46.4-273.7-127-12.6-15.7-23.9-33.7-34.5-55.3l-4.8-9.8c-8.7-17.8-14.6-33.1-18.6-48l-0.1-0.3c-4-15.1-6.5-31.2-8-51l-0.2-2.8c-1.8-24.2-1.3-45.4 1.6-64.8 10.2-68.8 44.4-130 94-177-13.4-7.1-21.7-12.9-22.7-13.7l-11.9-8.4 7.6-12.4c2.1-3.4 52.1-83.1 132.7-99.5 76.5-15.5 149.7 32.2 159.7 39.1 4.9 0.3 9.9 0.6 14.7 1.1 22.8-22.1 54.9-45.4 94.5-53.4 80.6-16.4 157.7 37.6 160.9 39.9l11.9 8.4-7.6 12.4c-1.5 2.4-26.2 41.7-68.3 70.9 4.8 3.9 9.4 7.9 14 12.1 64.8 59.7 100.4 139.2 100.4 223.7 0.1 84.9-35.7 164.3-100.5 223.9z" fill="#FFE2D7" p-id="1869"></path><path d="M230.9 529.5c0-71 19.9-129.5 50.7-175.2-33.2 38.6-55.8 85.4-63.4 136.8-2.5 17.1-3 36.1-1.3 57.9l0.2 2.8c1.3 17.9 3.6 32.2 6.9 45l-14.9 4.5 15-4c3.4 13 8.7 26.4 16.5 42.4l4.8 9.8c9.5 19.4 19.6 35.6 30.7 49.4 1.3 1.6 2.7 3.1 4.1 4.7-29.8-46.4-49.4-105.3-49.3-174.1z" fill="#E2C1B0" p-id="1870"></path><path d="M785.8 219.5c-23.3-13.2-73.8-36.6-123.5-26.6-23.1 4.7-43.5 16.1-60.4 29.1 44.9 9.4 87.1 27.1 124.5 52.3 27.7-16.9 48.4-40.5 59.4-54.8z" fill="#91CC6A" p-id="1871"></path><path d="M601.9 222c16.9-13 37.3-24.4 60.4-29.1 49.7-10 100.2 13.5 123.5 26.6-11 14.4-31.7 37.9-59.3 54.8 9.2 6.2 18 12.8 26.6 19.8 42.1-29.2 66.8-68.6 68.3-70.9l7.6-12.4-11.9-8.4c-3.2-2.3-80.4-56.3-160.9-39.9-39.6 8-71.8 31.4-94.5 53.4 13.6 1.2 27 3.3 40.2 6.1z" fill="" p-id="1872"></path><path d="M393.3 206.1c-49.7 10.1-87 51.4-103.4 72.6 4.7 2.7 10.6 5.7 17.3 8.9 49.1-37.9 109.6-63.2 175.4-70.9-25.1-9.7-57.4-17.1-89.3-10.6z" fill="#91CC6A" p-id="1873"></path><path d="M307.2 287.6c-6.7-3.1-12.6-6.2-17.3-8.9 16.3-21.2 53.7-62.6 103.4-72.6 31.9-6.5 64.1 1 89.3 10.6 14.2-1.7 28.6-2.6 43.1-2.6h0.2c7 0 13.9 0.3 20.9 0.7-10-6.9-83.3-54.6-159.7-39.1-80.6 16.3-130.6 96.1-132.7 99.5l-7.6 12.4 11.9 8.4c1 0.7 9.4 6.5 22.7 13.7 8.2-7.9 16.9-15.2 25.8-22.1z" fill="" p-id="1874"></path><path d="M768.9 529.9c-0.1 145-111.8 257.9-260.3 283.9 5.6 0.3 11.3 0.5 17 0.5h0.2c83.1 0 161.2-29.7 219.8-83.7 58.4-53.7 90.5-125 90.6-200.7 0.1-75.8-32-147.1-90.4-200.8-58.7-54.1-136.8-83.9-220-83.9h-0.2c-5.8 0-11.5 0.2-17.2 0.5 148.9 26 260.6 139.1 260.5 284.2z" fill="#D15E00" p-id="1875"></path><path d="M280.3 703.6c55.1 65.2 139 105.6 228.4 110.2 148.5-26 260.2-138.9 260.3-283.9 0.1-145.1-111.7-258.2-260.3-284.3-91.1 4.6-173.1 45.9-227 108.7C250.9 400 231 458.5 231 529.5c-0.2 68.8 19.4 127.7 49.3 174.1z m105.6-96.1c-19.6 0-35.4-8.2-35.4-18.3 0-10.1 15.9-18.3 35.4-18.3s35.4 8.2 35.4 18.3c0.1 10-15.8 18.3-35.4 18.3z m74.9-48c-11.8 0-21.4-9.6-21.4-21.4 0-11.8 9.6-21.4 21.4-21.4 11.8 0 21.4 9.6 21.4 21.4 0 11.8-9.6 21.4-21.4 21.4z m90.5 43.8c0 16.8-13.7 30.5-30.5 30.5s-30.5-13.7-30.5-30.5V592c0-6.5 5.3-11.7 11.7-11.7h37.6c6.5 0 11.7 5.3 11.7 11.7v11.3z m30.7-43.8c-11.8 0-21.4-9.6-21.4-21.4 0-11.8 9.6-21.4 21.4-21.4s21.4 9.6 21.4 21.4c-0.1 11.8-9.6 21.4-21.4 21.4z m110.5 29.6c0 10.1-15.9 18.3-35.4 18.3-19.6 0-35.4-8.2-35.4-18.3 0-10.1 15.9-18.3 35.4-18.3 19.6 0 35.4 8.2 35.4 18.3z" fill="#FE7800" p-id="1876"></path><path d="M767 306.2c-4.5-4.2-9.2-8.2-14-12.1-8.5-7-17.4-13.7-26.6-19.8-37.4-25.2-79.6-42.9-124.5-52.3-13.2-2.8-26.7-4.9-40.3-6.2-4.9-0.5-9.8-0.8-14.7-1.1-6.9-0.4-13.9-0.7-20.9-0.7h-0.2c-14.6 0-29 0.9-43.1 2.6-65.8 7.8-126.3 33.1-175.4 70.9-9 6.9-17.6 14.2-25.8 22-49.7 46.9-83.9 108.2-94 177-2.9 19.4-3.4 40.6-1.6 64.8l0.2 2.8c1.5 19.8 4 35.9 8 51l0.1 0.3c4 14.9 9.9 30.2 18.6 48l4.8 9.8c10.6 21.5 21.8 39.6 34.5 55.3 65.2 80.6 164.9 126.9 273.6 126.9h0.2c90.9 0 176.5-32.6 240.9-91.9 64.8-59.6 100.6-139 100.6-223.6 0.1-84.5-35.6-164-100.4-223.7zM276.2 698.9c-11.2-13.8-21.2-30-30.7-49.4l-4.8-9.8c-7.8-16-13-29.4-16.5-42.4l-15 4 14.9-4.5c-3.4-12.8-5.6-27.2-6.9-45l-0.2-2.8c-1.7-21.8-1.2-40.8 1.3-57.9 7.6-51.4 30.2-98.2 63.4-136.8 54-62.8 135.9-104 227-108.7 5.7-0.3 11.4-0.5 17.2-0.5h0.2c83.2 0.1 161.3 29.8 220 83.9 58.3 53.7 90.4 125.1 90.4 200.8-0.1 75.8-32.2 147-90.6 200.7-58.7 54-136.8 83.7-219.8 83.7h-0.2c-5.7 0-11.3-0.2-17-0.5-89.4-4.6-173.3-45-228.4-110.2-1.6-1.5-3-3-4.3-4.6z" fill="#231815" p-id="1877"></path><path d="M460.8 538.1m-21.4 0a21.4 21.4 0 1 0 42.8 0 21.4 21.4 0 1 0-42.8 0Z" fill="" p-id="1878"></path><path d="M582 538.1m-21.4 0a21.4 21.4 0 1 0 42.8 0 21.4 21.4 0 1 0-42.8 0Z" fill="" p-id="1879"></path><path d="M541 592c0-0.7-0.6-1.4-1.4-1.4H502c-0.7 0-1.4 0.6-1.4 1.4v11.4c0 11.1 9 20.2 20.2 20.2 11.1 0 20.1-9 20.1-20.2V592z" fill="#F74376" p-id="1880"></path><path d="M539.6 580.2H502c-6.5 0-11.7 5.3-11.7 11.7v11.4c0 16.8 13.7 30.5 30.5 30.5s30.5-13.7 30.5-30.5V592c0-6.5-5.2-11.8-11.7-11.8z m-18.8 43.3c-11.1 0-20.2-9-20.2-20.2V592c0-0.7 0.6-1.4 1.4-1.4h37.6c0.7 0 1.4 0.6 1.4 1.4v11.4c0 11.1-9.1 20.1-20.2 20.1z" fill="#020202" p-id="1881"></path><path d="M350.5 589.1a35.4 18.3 0 1 0 70.8 0 35.4 18.3 0 1 0-70.8 0Z" fill="#B25204" p-id="1882"></path><path d="M621.7 589.1c0 10.1 15.9 18.3 35.4 18.3 19.6 0 35.4-8.2 35.4-18.3 0-10.1-15.9-18.3-35.4-18.3s-35.4 8.2-35.4 18.3z" fill="#B25204" p-id="1883"></path></svg>
    </span>

    <el-button type="danger" @click="startCollect(1000)" >重置数据且开始采集</el-button>

    &nbsp;&nbsp;
    <span>开始时间:</span>
    <el-time-picker
    popper-class="header-dom-start-time"
    v-model="value1"
    format="HH:mm"
    value-format="HH:mm"
    placeholder="开始时间">
    </el-time-picker>


    &nbsp;&nbsp;
    <span>
    站点数据采集间隔区间为[3,10]秒随机数，且每采集
    <el-input-number v-model="num2"  :min="1" :max="100" label="描述文字"></el-input-number>
    个站点之后，停顿
    <el-input-number v-model="num3"  :min="1" :max="1000" label="描述文字"></el-input-number>
    秒，防止12306检测到脚本
    </span>


    &nbsp;&nbsp;
    &nbsp;&nbsp;
    <el-statistic
              :value="deadline3"
              time-indices
              format="HH:mm:ss"
              title="下一轮采集"
            >
              <template slot="suffix">
              </template>
            </el-statistic>

  </div>


 
   
    <div :class="{result:true,'result-hide':hide}">
      <div class="item" v-for="train in ticketremind">
        <div class="no">
          <el-button size="mini" type="warning" round>{{train.no}}--{{train.start}}</el-button>
        </div>

        <div class="t-line">
          <el-timeline >
            <el-timeline-item
              v-for="(activity, index) in train.stations"
              :key="index"
              placement="top"
              :color="activity.color"
              :timestamp="activity.name">
                <el-card>
                  <h4 v-for="c in activity.counts">{{c.name}}:{{c.count}}</h4>
                </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>


 
`;
  hifiniMusicPlugin.innerHTML = hifiniMusicPluginHtml;
  document.body.appendChild(hifiniMusicPlugin);

  var app = new Vue({
    el: DOMID,
    data: {
      title: "ticket",
      messages: [],
      ticketremind: [],
      hide: true,
      value1: "11:40",
      num1: 5,
      num2: 50,
      num3: 350,
      deadline3: Date.now() + 0,
    },
    created() {},
    mounted() {
      this.initdata();
      this.autoAnalysis();
    },
    methods: {
      initdata() {
        var ticketremind = localStorage.getItem("ticketremind") || "[]";
        this.ticketremind = JSON.parse(ticketremind);
        this.value1 = localStorage.getItem("ticketremind-time") || "11:40";
        this.hide =
          (localStorage.getItem("ticketremind-hide") || "no") === "yes"
            ? true
            : false;
        document.querySelector("#kyfw-extension").style.left = this.hide
          ? "-100%"
          : "0";
      },
      toggle() {
        this.hide = !this.hide;
        localStorage.setItem("ticketremind-hide", this.hide ? "yes" : "no");
        document.querySelector("#kyfw-extension").style.left = this.hide
          ? "-100%"
          : "0";
      },
      update() {
        var ticketremind = localStorage.getItem("ticketremind") || "[]";
        this.ticketremind = JSON.parse(ticketremind);
      },
      async startCollect(interval = 1000) {
        localStorage.setItem("ticketremind", JSON.stringify([]));
        localStorage.setItem("ticketremind-time", this.value1);
        this.update();

        var hm = this.value1.split(":");
        // return false;
        var table = document.querySelector("#queryLeftTable");
        var trs = table.querySelectorAll("tr");

        var cars = [];
        trs.forEach((tr) => {
          if (tr.id.includes("ticket_")) {
            var ticket_info = tr.querySelector(".ticket-info");

            var a = ticket_info.querySelector(".train").querySelector("a");
            var c = a.attributes.onclick.textContent;
            var cc = c.split("(")[1].split(")")[0];
            var arr = cc.split(",");

            var start = tr.querySelector(".start-t");

            // cars.length < 2 &&

            var thm = start.innerText.split(":");
            if (thm[0] < hm[0] || (thm[0] == hm[0] && thm[1] < hm[1])) {
              //
            } else {
              cars.push({
                dom: ticket_info,
                no: a.innerText,
                start: start.innerText,
                index: arr[0].replaceAll("'", ""),
                from: arr[2].replaceAll("'", ""),
                to: arr[3].replaceAll("'", ""),
                stations: [],
              });
            }
          }
        });

        for (var i = 0; i < cars.length; i++) {
          var item = cars[i];
          // await this.gettimes(item.no, "2023-09-28", item.from, item.to);
          item.dom.querySelector(".train").querySelector("a").click(); //a click
          await window.XHRTool.sleep(500);
          var trs = item.dom
            .querySelector(".station")
            .querySelector(".station-bd")
            .querySelector("tbody")
            .querySelectorAll("tr");
          trs.forEach((tr) => {
            var to = tr.querySelectorAll("td")[1];

            // item.stations.length < 2 &&
            item.stations.push({
              name: to.innerText,
              counts: [],
            });
          });
        }

        var w = window.innerWidth - 100,
          h = window.innerHeight - 100;

        localStorage.setItem("ticketremind", JSON.stringify(cars));

        var search = window.location.search;
        var date = search.split("date=")[1].split("&")[0];

        console.log("解析列表数据结构---------");
        await window.XHRTool.sleep(1000);

        var step = 0;

        for (var i = 0; i < cars.length; i++) {
          var car = cars[i];
          for (var j = 0; j < car.stations.length; j++) {
            if (j > 0) {
              step++;
              var fromzh = car.stations[0].name;
              var tozh = car.stations[j].name;

              var fromcode = window.citycode[fromzh];
              var tocode = window.citycode[tozh];

              var targeturl = `https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=${fromzh},${fromcode}&ts=${tozh},${tocode}&date=${date}&flag=N,Y,Y`;
              var url =
                targeturl +
                `&needcollect=true&trainno=${car.no}&trainzh=${tozh}`;
              // console.log("open------", url);

              window.open(
                url,
                "_blank",
                `width=100,height=100,left=${w * Math.random()},top=${
                  h * Math.random()
                }`
              );
              this.update();
              //[3,10]
              await window.XHRTool.sleep(3000 + 7000 * Math.random());
              this.update();

              if (step % this.num2 == 0) {
                (this.deadline3 = Date.now() + 1000 * this.num3),
                  await window.XHRTool.sleep(this.num3 * 1000);
              }
              if (car.to == tocode) {
                break;
              }
            }
          }
        }
      },

      autoAnalysis() {
        console.log("autoAnalysis");
        var pathname = window.location.pathname;
        var search = window.location.search;
        //是issue的详情页，且需要采集数据
        if (search.includes("needcollect=true")) {
          console.log("needcollect");

          var ths = document
            .querySelector(".transfer-ticket-list")
            .querySelector("thead")
            .querySelectorAll("th");

          // .querySelectorAll("td");
          var counts = [
            {
              name: ths[4].innerText,
              count: 0,
            },
            {
              name: ths[5].innerText,
              count: 0,
            },
            {
              name: ths[6].innerText,
              count: 0,
            },
          ];

          var trs = document
            .querySelector("#queryLeftTable")
            .querySelectorAll("tr");

          var no = search.split("trainno=")[1].split("&")[0];

          var zh = search.split("trainzh=")[1];
          zh = decodeURI(zh);

          for (var i = 0; i < trs.length; i++) {
            var tr = trs[i];
            if (tr.id.includes("ticket_")) {
              var ticket_info = tr.querySelector(".ticket-info");
              var a = ticket_info.querySelector(".train").querySelector("a");
              if (a.innerText == no) {
                console.log("更新 count");
                var tds = tr.querySelectorAll("td");
                counts[0].count = tds[1].innerText;
                counts[1].count = tds[2].innerText;
                counts[2].count = tds[3].innerText;
                break;
              }
            }
          }

          var ticketremind = localStorage.getItem("ticketremind") || "[]";
          ticketremind = JSON.parse(ticketremind);

          var nonono = ticketremind.find((t) => t.no == no);
          var sn = nonono.stations.find((s) => s.name == zh);

          sn.counts = counts;
          var status = {
            A: ["有"],
            C: ["候补", "0", 0, "--"],
          };

          if (status.A.includes(counts[2].count)) {
            sn.color = "greenyellow";
          } else if (status.C.includes(counts[2].count)) {
            sn.color = "red";
          } else {
            sn.color = "orange";
          }

          localStorage.setItem("ticketremind", JSON.stringify(ticketremind));
          window.close();
        }
      },

      downloadSheet() {
        var columns = [
          {
            header: "序号",
            key: "sort",
            width: 10,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "阶段",
            key: "step",
            width: 20,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "任务ID",
            key: "number",
            width: 10,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "任务标题",
            key: "title",
            width: 50,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "任务状态",
            key: "status",
            width: 10,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "缺陷描述",
            key: "description",
            width: 50,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "缺陷分析",
            key: "analysis",
            width: 50,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "严重等级",
            key: "level",
            width: 10,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
          {
            header: "地址",
            key: "path",
            width: 50,
            style: {
              font: { size: 11, bold: true },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
            },
          },
        ];
        var dataSource = localStorage.getItem("issues") || "[]";
        dataSource = JSON.parse(dataSource);

        window.ExcelTool.jsonToExcel2(columns, dataSource, "采集");
      },
    },
  });

  console.log(window.location);
}
