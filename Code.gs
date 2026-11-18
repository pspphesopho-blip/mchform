// Backend ទទួលទិន្នន័យពីគេហទំព័រ ហើយរក្សាទុកក្នុង Google Sheet នេះ (សន្លឹក "Data")
const SHEET_NAME = 'Data';
const ACCESS_CODE = '1234';   // <-- ប្តូរជាលេខកូដរបស់អ្នក ហើយចែកឲ្យមណ្ឌលសុខភាព
const FIXED = ['Key', 'មណ្ឌលសុខភាព', 'ឆ្នាំ', 'ខែ', 'Timestamp'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function key_(hc, y, m) { return [hc, y, m].join('|'); }

function doGet(e) {
  const p = e.parameter;
  if (p.code !== ACCESS_CODE) return out_({ error: 'លេខកូដមិនត្រឹមត្រូវ' });
  const d = sheet_().getDataRange().getValues();
  const k = key_(p.hc, p.year, p.month);
  for (let i = 1; i < d.length; i++) {
    if (d[i][0] === k) {
      const values = {};
      for (let c = FIXED.length; c < d[0].length; c++) if (d[i][c] !== '') values[d[0][c]] = d[i][c];
      return out_({ found: true, values });
    }
  }
  return out_({ found: false });
}

function doPost(e) {
  const b = JSON.parse(e.postData.contents);
  if (b.code !== ACCESS_CODE) return out_({ ok: false, error: 'លេខកូដមិនត្រឹមត្រូវ' });
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const s = sheet_();
    if (s.getLastRow() === 0) s.getRange(1, 1, 1, FIXED.length).setValues([FIXED]);
    let head = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
    Object.keys(b.values).forEach(id => { if (head.indexOf(id) < 0) head.push(id); });
    s.getRange(1, 1, 1, head.length).setValues([head]);
    const k = key_(b.hc, b.year, b.month);
    const keys = s.getLastRow() > 1 ? s.getRange(2, 1, s.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
    const idx = keys.indexOf(k), row = idx >= 0 ? idx + 2 : s.getLastRow() + 1;
    const line = head.map(h => {
      if (h === 'Key') return k; if (h === 'មណ្ឌលសុខភាព') return b.hc; if (h === 'ឆ្នាំ') return b.year;
      if (h === 'ខែ') return b.month; if (h === 'Timestamp') return new Date();
      const v = b.values[h]; return v === undefined || v === '' ? '' : Number(v);
    });
    s.getRange(row, 1, 1, head.length).setValues([line]);
    return out_({ ok: true, updated: idx >= 0 });
  } finally { lock.releaseLock(); }
}
