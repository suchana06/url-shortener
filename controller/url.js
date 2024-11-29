const shortid = require("shortid");
const URL = require("../model/url")
async function handleGenerateUrl(req, res) {
    if (!req.body.url) return res.status(400).json({ msg: 'url is required' });
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitHistory: []
    })

    return res.json({ id: shortId });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const url = await URL.findOne({shortId})
    return res.json({
        totalClicks: url.visitHistory.length,
        analytics: url.visitHistory
    })
}
module.exports = {
    handleGenerateUrl,
    handleGetAnalytics
}