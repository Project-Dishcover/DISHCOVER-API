import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMyFavourite (req, res){
    try {
        const MyFavourite = await prisma.favourite.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                recipe : true
            }
        });
        if (!MyFavourite || MyFavourite.length === 0) {
            res.status(204).json({
                message: "Favouritemu tidak ada"
            })
        } else {
            res.status(200).json({
                status:200,
                message:"Favourite ada",
                data: MyFavourite
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export async function postFavourite (req, res) {
    const {recipe_id} = req.body;

    try {
        const favourite = await prisma.favourite.create({
            data : {
                user_id : req.user.id,
                recipe_id
            }
        });
        res.status(201).json({
            status:201,
            message:"berhasil ditambahkan ke Favourite",
            data: favourite
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Internal server error'
        });
    }
}

export async function deleteFavourite (req, res) {
    const {id} = req.params;

    try {
        const favourite = await prisma.favourite.delete({ where: { id: String(id)} });
        if (!favourite) {
          res.status(200).json({
            message: 'favourite id tidak benar',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'Berhasil menghapus favourite',
          });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
          message: 'ada kesalahan',
        });
    }
}