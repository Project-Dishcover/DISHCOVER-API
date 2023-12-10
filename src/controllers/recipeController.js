import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRecipes(req, res) {
    try {
        let recipes;

        // Jika ada parameter query, lakukan pencarian
        if (req.query.query) {
            recipes = await prisma.recipe.findMany({
                where: {
                    OR: [
                        { name: { contains: req.query.query } },
                        { ingredients: { contains: req.query.query } },
                        // Tambahkan kolom-kolom lain yang ingin disertakan dalam pencarian di atas
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    urlimage: true,
                },
                take: 100,
                skip: 5,
            });
        } else if (req.query.keywords) {
            // Pencarian berdasarkan array kata kunci dari query string
            const keywordArray = req.query.keywords.split(',');
            recipes = await prisma.recipe.findMany({
                where: {
                    OR: keywordArray.map((keyword) => ({
                        name: { contains: keyword },
                        ingredients: { contains: req.query.query }
                        // Tambahkan kolom-kolom lain yang ingin disertakan dalam pencarian di atas
                    })),
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    urlimage: true,
                },
                take: 100,
                skip: 5,
            });
        } else {
            // Jika tidak ada parameter query atau keywords, ambil semua resep
            recipes = await prisma.recipe.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    urlimage: true,
                },
                take: 100,
                skip: 5, // pagination
            });
        }

        // Handle jika tidak ada resep yang ditemukan
        if (!recipes || recipes.length === 0) {
            res.status(204).json({
                message: 'Recipe tidak ada',
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'Recipe ditemukan',
                data: recipes,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server',
        });
    }
}

export async function getDetailsRecipe (req, res) {
    const { id } = req.params;

    try {
        const recipe = await prisma.recipe.findUnique({
          where: { id: String(id) },
        });
        if(!recipe) {
            res.status(200).json({
                message: 'Tidak sesuai dengan request'
            })
        } else {
            res.status(200).json({
                status: 200,
                message :'Sesuai dengan request',
                data : recipe
            })
        }
    } catch (error){
        console.error(error);
    }
}