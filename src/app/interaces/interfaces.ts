export type Subcategory = {
    name: string,
    image: string,
};

export type Category = {
    name: string,
    image: string
    subCategories: Subcategory[]
};


export type Branch = {
    branch_id: string,
    name: string,
    categories: Category[]
};


export type Dealer = {
    dealers_id: string,
    name: string,
    opco: string,
    branches: Branch[]
};

export type MenuItem = {
    name: string, dealers_id: string,
    branches: { branch_id: string, name: string }[]
};
