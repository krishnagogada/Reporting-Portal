import React from 'react';
import SubCategoryModel from '../SubCategoryModel';

class CategoryModel {
    categoryName
    categoryId
    subCategories
    constructor(category) {
        this.categoryName = category.name;
        this.categoryId = category.category_id;
        this.subCategories = category.sub_categories.map((eachSubCategory) => new SubCategoryModel(eachSubCategory));
    }
}

export default CategoryModel
