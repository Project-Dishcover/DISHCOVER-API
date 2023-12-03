import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRecipes (req, res) {
    try {
        const allRecipe = await prisma.recipe.findMany({
            take: 100, // ngambil data hanya 100
            skip: 5 // kita skip 5
        });
        if(!allRecipe) {
            res.status(204).json({
                message: 'Recipe tidak ada'
            })
        } else {
            res.status(200).json({
                status: 200,
                message: 'Recipe ada',
                data : allRecipe
            })
        }
    } catch (error){
        console.error(error);
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