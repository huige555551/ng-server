class Tools {
    constructor (req, res) {
        Object.assign(this, {
            req,
            res
        })
    }

    setJson(code, message, data) {
        return this.res.json({
            status: {
                errCode: code || 0,
                message: message ||null
            },
            data: data || null
        })
    }
}
module.exports = Tools