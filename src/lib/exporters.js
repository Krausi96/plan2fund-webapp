/* CSV + HTML-lite exporters and a simple download helper */
function csvEscape(v) {
  const s = (v === null || v === undefined) ? '' : String(v);
  const needs = /[",\r\n]/.test(s);
  return needs ? '"' + s.replace(/"/g,'""') + '"' : s;
}

export function buildCsv(rows) {
  const header = ['Rank','Program','Score','Fit','Readiness','Effort','Confidence','Rationale'];
  const lines = [header.join(',')];
  (rows || []).forEach((r, idx) => {
    const name = r.program && r.program.name ? r.program.name : '';
    const d = r.details || {};
    const line = [
      idx + 1,
      name,
      r.score ?? '',
      d.fit ?? '',
      d.readiness ?? '',
      d.effort ?? '',
      d.confidence ?? '',
      r.rationale || ''
    ].map(csvEscape).join(',');
    lines.push(line);
  });
  return lines.join('\r\n');
}

export function buildHtmlLite(rows) {
  const items = (rows || []).map((r, idx) => {
    const name = r.program && r.program.name ? r.program.name : 'Program';
    const d = r.details || {};
    return '<tr>' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + name + '</td>' +
      '<td>' + (r.score ?? '') + '</td>' +
      '<td>' + (d.fit ?? '') + '</td>' +
      '<td>' + (d.readiness ?? '') + '</td>' +
      '<td>' + (d.effort ?? '') + '</td>' +
      '<td>' + (d.confidence ?? '') + '</td>' +
      '</tr>';
  }).join('');
  const html =
'<!doctype html>\r\n<html>\r\n<head>\r\n<meta charset="utf-8">\r\n<title>Plan2Fund Results</title>\r\n<style>\r\nbody{font-family:Arial,Helvetica,sans-serif;margin:24px;}\r\nh1{margin:0 0 12px 0;font-size:20px;}\r\ntable{border-collapse:collapse;width:100%;}\r\nth,td{border:1px solid #ccc;padding:6px;text-align:left;}\r\nth{background:#f4f4f4;}\r\n</style>\r\n</head>\r\n<body>\r\n<h1>Plan2Fund - Ranked Programs</h1>\r\n<table>\r\n<thead><tr><th>#</th><th>Program</th><th>Score</th><th>Fit</th><th>Readiness</th><th>Effort</th><th>Confidence</th></tr></thead>\r\n<tbody>' + items + '</tbody>\r\n</table>\r\n</body>\r\n</html>';
  return html;
}

export function downloadBlob(filename, mime, text) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
