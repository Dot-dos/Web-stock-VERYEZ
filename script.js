
const API = "https://script.google.com/macros/s/AKfycbwynBJ1cnI2qujT7jUtDJvnemsRY5DzNa1P5ouHJuJfJSoygeH9Ftrxnx4uJk_kzD7zTQ/exec";

async function init(){
  await loadItems();
  await loadSummary();
  await loadLogs();
}

async function loadItems(){
  const r = await fetch(API + "?action=items");
  const d = await r.json();
  item.innerHTML = d.map(x => `<option>${x}</option>`).join("");
}

async function saveLog(){
  await fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "log",
      item: item.value,
      type: type.value,
      qty: qty.value,
      user: user.value
    })
  });
  qty.value = "";
  loadSummary();
  loadLogs();
}

async function loadSummary(){
  const res = await fetch(API + "?action=summary");
  const data = await res.json();

  summary.innerHTML = Object.keys(data).map(item => {
    const qty = data[item];
    let color = "text-green-600";
    if (qty <= 5) color = "text-orange-500";
    if (qty <= 0) color = "text-red-600";

    return `<div class="${color}">📦 ${item} : <b>${qty}</b></div>`;
  }).join("");
}


async function loadLogs(){
  const res = await fetch(API + "?action=logs");
  const data = await res.json();

  logs.innerHTML = data.map(r => `
    <tr>
      <td>${r.date}</td>
      <td>${r.item}</td>
      <td>${r.type}</td>
      <td>${r.qty}</td>
      <td>${r.name}</td>
    </tr>
  `).join("");
}


function exportExcel(){ window.open(API + "?action=excel"); }
function exportPDF(){ window.open(API + "?action=pdf"); }

init();
