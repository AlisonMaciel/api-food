const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");
const DiskStorege = require("../providers/diskStorege");

class AvatarDishController {
    async avatarDish(request, response) {
        const { id } = request.params
        const avatarFileName = request.file.filename
        const diskSotorege = new DiskStorege()

        const dish = await knex("dish").where({ id }).first()

        if (!request.file) {
            throw new AppError("Nenhuma imagem foi enviada.")
        }

        if (!dish) {
            throw new AppError(
                "Necessário estar autenticado para mudar a foto do prato"
            );
        }

        if (dish.avatar_dish) {
            await diskSotorege.deleteFile(dish.avatar_dish)
        }

        const fileName = await diskSotorege.saveFile(avatarFileName)
        dish.avatar_dish = fileName;

        await knex("dish").where({ id }).update({ avatar_dish: fileName })

        return response.json({ avatar_dish: fileName })
    }
}

module.exports = AvatarDishController
