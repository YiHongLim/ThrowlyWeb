import {collection, getDocs, getDoc,doc ,where,query} from "firebase/firestore";
import {db} from "../firebase";
import {ProductType,CategoryType} from "../types";

export async function fetchListings(){
    const productCol = collection(db, "MYCollection");
    const q = query(productCol, where("STATUS", "!=", "UNSOLD"));
    const productSnapShot = await getDocs(productCol);
    const productList = productSnapShot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }as ProductType));
    return productList;
}

export async function fetchSpecificListing(id: string): Promise<ProductType | null> {
    const docRef = doc(db, "MYCollection", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const product = {
            id: docSnap.id,
            ...docSnap.data()
        } as ProductType;
        return product;
    } else {
        return null;
    }
}

export async function fetchCategories(){
    const categoriesCol = collection(db, "Categories");
    const categorySnapShot = await getDocs(categoriesCol);
    const categoryList = categorySnapShot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    } as CategoryType));
    return categoryList;
}