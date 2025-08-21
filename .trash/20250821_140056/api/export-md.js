module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).send("Method Not Allowed"); return; }
  try {
    const chunks=[]; for await (const c of req) chunks.push(c);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    const md = body.markdown || "# Plan2Fund Export\n(No content)";
    res.setHeader("Content-Type","text/markdown; charset=utf-8");
    res.status(200).send(md);
  } catch (e) { res.status(200).send("# Plan2Fund Export\n(Fallback)"); }
};