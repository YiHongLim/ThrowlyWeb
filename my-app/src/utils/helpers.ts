import {categories} from "../data/categories";

export const getCategoryLabel = (id: string): string | undefined => {
    const found = categories.find(cat => cat.value === id);
    return found?.label;
}