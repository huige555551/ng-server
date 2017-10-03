const tools = require('../common/tools')
module.exports = function (req, res, next) {
    res.tools = new tools(req, res)
    next()
}