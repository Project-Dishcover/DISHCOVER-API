import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBahans(req, res) {
    try {
        let bahans;

        // Jika ada parameter query, lakukan pencarian
        if (req.query.query) {
            bahans = await prisma.bahan.findMany({
                where: {
                    OR: [
                        { nama: { contains: req.query.query } },
                        // Tambahkan kolom-kolom lain yang ingin disertakan dalam pencarian di atas
                    ],
                },
            });
        } else {
            // Jika tidak ada parameter query atau keywords, ambil semua resep
            bahans = await prisma.bahan.findMany();
        }

        // Handle jika tidak ada resep yang ditemukan
        if (!bahans || bahans.length === 0) {
            res.status(204).json({
                message: 'bahan tidak ada',
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'bahan ditemukan',
                data: bahans,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server',
        });
    }
}

