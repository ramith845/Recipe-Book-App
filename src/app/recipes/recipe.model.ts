import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imgPath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, path: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imgPath = path;
        this.ingredients = ingredients;
    }
}