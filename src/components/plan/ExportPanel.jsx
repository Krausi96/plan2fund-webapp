
export default function ExportPanel({onExportDocx,onExportPdf,flags={}}){
  return (
    <div className="card">
      <div className="section-title">Export</div>
      <div style={{display:'flex',gap:8}}>
        {flags.EXPORT_DOCX && <button className="btn" onClick={onExportDocx}>Export DOCX</button>}
        {flags.EXPORT_PDF && <button className="btn" onClick={onExportPdf}>Export PDF</button>}
      </div>
    </div>
  )
}
