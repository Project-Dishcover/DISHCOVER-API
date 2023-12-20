import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPantry (req, res){
    try {
        const Pantry = await prisma.pantry.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                bahan : true
            }
        });
        if (!Pantry || Pantry.length === 0) {
            res.status(204).json({
                message: "Pantrymu tidak ada"
            })
        } else {
            res.status(200).json({
                status:200,
                message:"Pantry ada",
                data: Pantry
            })
        }
    } catch (error) {
        console.error(error);
    }
}


export async function postBahan (req, res) {
    const {id} = req.params;

    try {
        const pantry = await prisma.pantry.create({
            data : {
                user_id : req.user.id,
                bahan_id: id
            }
        });
        res.status(201).json({
            status:201,
            message:"berhasil ditambahkan ke pantry",
            data: pantry
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Internal server error'
        });
    }
}

export async function deleteBahanPantry (req, res) {
    const {id} = req.params;

    try {
        const pantry = await prisma.pantry.delete({ where: { id: String(id)} });
        if (!pantry) {
          res.status(200).json({
            message: 'pantry id tidak benar',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'Berhasil menghapus pantry',
          });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
          message: 'ada kesalahan',
        });
    }
}

export async function deleteAllPantry (req, res) {
    const {user_id} = req.user;

    try {
        const pantry = await prisma.pantry.deleteMany({ where: { user_id } });
        if (!pantry) {
          res.status(200).json({
            message: 'user ini tidak ada dalam pantry',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'Berhasil menghapus seluruh pantry',
          });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
          message: 'ada kesalahan',
        });
    }
}