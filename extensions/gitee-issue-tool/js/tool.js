window.XHRTool = {
  get: async (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
        })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  sleep: async (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  },
};

function jsonToExcel(column, bodyData, sheetName = "Excle表格", headData) {
  // 组装表头
  let theadHtml = "";
  if (headData) {
    headData.map((list) => {
      let th = "";
      list.map((item) => {
        th += `
          <th colspan="${item.colspan || 1}" rowspan="${item.rowspan || 1}">
            ${item.header + "\t"}
          </th>
        `;
      });
      theadHtml += `<tr>${th}</tr>`;
    });
  } else {
    let th = "";
    column.map((item) => {
      th += `
          <th colspan="${item.colspan || 1}" rowspan="${item.rowspan || 1}">
            ${item.header + "\t"}
          </th>
        `;
    });
    theadHtml += `<tr>${th}</tr>`;
  }

  // 组装表体
  let tbodyHtml = "";
  bodyData.map((item) => {
    let td = "";
    column.map((n) => {
      const val = item[n.key] || "";
      td += `<td style="text-align: center;background:red;">${val + "\t"}</td>`;
    });
    tbodyHtml += `<tr>${td}</tr>`;
  });

  // 将table添加到html中，在html中加入excel和sheet元素
  let template = `
    <html lang="" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <title></title>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
              <x:Name>${sheetName}</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
      </head>
      <body>
        <table>
          <thead>${theadHtml}</thead>
          <tbody>${tbodyHtml}</tbody>
        </table>
      </body>
    </html>
  `;

  // encodeURIComponent 解决中文乱码
  const uri =
    "data:text/xlsx;charset=utf-8,\ufeff" + encodeURIComponent(template);

  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  link.download = `${sheetName + ".xlsx"}`; // 设置文件名
  link.click();
}

function jsonToExcel2(column, bodyData, sheetName = "Excle表格", headData) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  worksheet.columns = column || [
    {
      header: "姓名",
      key: "name",
      width: 15,
      style: { font: { size: 11, weight: 900 } },
    },
    { header: "性别", key: "gender", width: 10 },
    { header: "年龄", key: "age", width: 10 },
    { header: "电话号码", key: "phoneNumber", width: 20 },
  ];

  // worksheet.getColumn("H").dataValidation = {
  //   type: "list",
  //   allowBlank: false,
  //   showDropDown: true,
  //   showInputMessage: true,
  //   prompt: "Please select an option",
  //   inputMessage: "Please select an option",
  //   error: {
  //     type: "dataValidationError",
  //     message: "Please select an option",
  //   },
  //   missingDataLabel: "Missing Option",
  //   list: { values: ["主要", "次要"] },
  // };
  // const options = ["Option 1", "Option 2", "Option 3"];
  // worksheet.getRow(1).getCell("H").options = {
  //   insertData: true,
  //   data: options,
  // };

  // 添加数据行
  const data = bodyData || [
    { name: "小明", gender: "男", age: 18, phoneNumber: "13333333333" },
    { name: "小红", gender: "女", age: 20, phoneNumber: "14444444444" },
    { name: "小李", gender: "男", age: 25, phoneNumber: "15555555555" },
  ];

  // worksheet.getColumn("D").alignment = { wrapText: true, horizontal: "left" };
  // worksheet.getColumn("F").alignment = { wrapText: true, horizontal: "left" };
  // worksheet.getColumn("G").alignment = { wrapText: true, horizontal: "left" };

  worksheet.getRow(1).alignment = {
    wrapText: true,
    horizontal: "center",
    vertical: "center",
  };
  worksheet.getRow(1).font = { size: 14, bold: true };

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  workbook.xlsx
    .writeBuffer()
    .then((buffer) => window.saveAs(new Blob([buffer]), `${sheetName}.xlsx`))
    .catch((err) => console.log("Error writing excel export", err));
}

window.ExcelTool = {
  jsonToExcel: jsonToExcel,
  jsonToExcel2: jsonToExcel2,
};
