import {collection, getDocs, getDoc,doc ,where,query} from "firebase/firestore";
import {db} from "../firebase";
import {ProductType} from "../types";

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

export async function fetchSpecificListing(id: string) {
    const docRef = doc(db, "MYCollection", id);
    const docSnap = await getDoc(docRef);

    const product = {
        id:docSnap.id,
      ...docSnap.data()
    };
    return product;
}