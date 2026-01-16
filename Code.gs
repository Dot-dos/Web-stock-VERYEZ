function doGet(e) {
  const ss = SpreadsheetApp.getActive();

 // ดึงประวัติการเคลื่อนไหว
if (e.parameter.action === 'logs') {
  const rows = ss.getSheetByName('LOGS')
    .getDataRange()
    .getValues()
    .slice(1);

  const data = rows.reverse().map(r => ({
    date: r[0],
    item: r[1],
    type: r[2],
    qty: r[3],
    name: r[4]
  }));

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
}


  if(e.parameter.action == 'excel'){
    return ss.getAs('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  if(e.parameter.action == 'pdf'){
    return ss.getAs('application/pdf');
  }

function doPost(e){
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActive().getSheetByName('LOGS')
    .appendRow([new Date(), d.item, d.type, Number(d.qty), d.user]);
  return ContentService.createTextOutput('ok');
}

function json(o){
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
