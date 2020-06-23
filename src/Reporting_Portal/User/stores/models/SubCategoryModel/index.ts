import React from 'react';

class SubCategoryModel {
    subCategoryName
    subCategoryId
    rpUsername
    rpUserId
    constructor(subCategory) {
        this.subCategoryName = subCategory.name;
        this.subCategoryId = subCategory.sub_category_id;
        this.rpUserId = subCategory.rp.user_id;
        this.rpUsername = subCategory.rp.name;
    }
}

export default SubCategoryModel;
