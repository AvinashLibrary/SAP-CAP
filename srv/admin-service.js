const cds = require('@sap/cds');
class AdminService extends cds.ApplicationService {
    init() {
        const { Bonus, Authors, Books } = this.entities
        this.on('acceptBonus', async req =>  {
            // await UPDATE (Bonus,book) .with ({ stock: stock -= quantity })
            // UPDATE(req.target).with({ accepted: true })
            console.log(req)
            let val = await SELECT `ID` .from (Bonus);
            return val;
        })
        return super.init()
    }
}
module.exports = { AdminService }
  

