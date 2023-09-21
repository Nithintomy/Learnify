import { Request, Response } from 'express';
import categoryModel, { Category } from '../../model/categoryModel'; // Import the Category type

const addCategory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // Check if a category with the same title exists 
    const categoryExist: Category | null = await categoryModel.findOne({
      title: { $regex: new RegExp(title, 'i') },
    });

    if (categoryExist) {
      console.log('Category already exists');
      return res.status(400).json({ message: 'Category already exists' });
    }

    // If the category doesn't exist,  creating New
    const newCategory = await categoryModel.create({
      title,
      description,
    });

    if (newCategory) {
        console.log(title, 'new Title');
        res.status(201).json({
          title,
          description,
        });
      } else {
        res.status(400).json({ message: 'Invalid category data' });
      }

  } catch (error) {
    console.error('Error while adding category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default addCategory;
