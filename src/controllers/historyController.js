import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMyHistory (req, res){
    try {
        const MyHistory = await prisma.history.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                recipe : true
            }
        });
        if (!MyHistory || MyHistory.length === 0) {
            res.status(204).json({
                message: "Historymu tidak ada"
            })
        } else {
            res.status(200).json({
                status:200,
                message:"History ada",
                data: MyHistory
            })
        }
    } catch (error) {
        console.error(error);
    }
}


export async function recordRecipeAccess(req, res, next) {
    try {
        const { id } = req.params;
        // Ambil resep untuk memeriksa apakah ada
        const recipe = await prisma.recipe.findUnique({
            where: { id: String(id) },
        });

        if (!recipe) {
            res.status(404).json({
                message: 'Resep tidak ditemukan',
            });
        } else {
            // Simpan riwayat pada tabel history
            await prisma.history.create({
                data: {
                    user_id: req.user.id, // Gantilah dengan cara Anda mendapatkan ID pengguna dari permintaan
                    recipe_id: recipe.id,
                    accessedAt: new Date(),
                },
            });

            // Lanjutkan ke fungsi getDetailsRecipe
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server',
        });
    }
}

export async function deleteHistory (req, res) {
    const {id} = req.params;

    try {
        const History = await prisma.history.delete({ where: { id: String(id)} });
        if (!History) {
          res.status(204).json({
            message: 'History id tidak benar',
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'Berhasil menghapus History',
          });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
          message: 'ada kesalahan',
        });
    }
}