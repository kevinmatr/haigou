import ExportJsonExcel from "js-export-excel";

function getexcel(fileName = "表格", datas = {}) {
  var option = {};

  option.fileName = fileName;
  option.datas = datas;
  var toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
}

export default getexcel;
