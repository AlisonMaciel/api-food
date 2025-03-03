const knex = require("../database/knex/index.js")

class PaymentController {
  async create(req, res) {
    const {value} = req.body
    const user_id = req.user.id

    await knex("payment").insert({value, user_id})

    return res.json({message: "pagamento efetuado com sucesso!"})
  }
}

module.exports = PaymentController