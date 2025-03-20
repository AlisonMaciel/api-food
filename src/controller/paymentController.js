const knex = require("../database/knex/index.js")
const AppError = require("../utils/AppError.js")

class PaymentController {
  async execute(req, res) {
    const {Card, MMAA, CVC, value} = req.body
    const user_id = req.user.id
    
    if(String(Card).length < 16) {
      throw new AppError("Os números do cartão são inferiores a 16 dígitos")
    }

    if(String(MMAA).length < 4) {
      throw new AppError("Os números de validade são inferiores a 4 dígitos")
    }

    if(String(CVC).length < 3) {
       throw new AppError("Os números do CVC são inferiores a 3 dígitos")
    }

    await knex("payment").insert({value, user_id})

    return res.json({message: `pagamento efetuado com sucesso no valor de R$ ${value}`})
  } 
}
 
module.exports = PaymentController