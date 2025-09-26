import {collection, getDocs, query,where, and} from "firebase/firestore";
import {db} from "../firebase";

export async function fetchListings(){
    const productCol = collection(db, "MYCollection");
    const productSnapShot = await getDocs(productCol);
    const productList = productSnapShot.docs.map(doc => ({
        status: doc.data().STATUS || 'available',
        buyerId: doc.data().buyerId || '',
        categoryId: doc.data().categoryId || '',
        condition: doc.data().condition || '',
        dateCreated: doc.data().dateCreated || '',
        description:    doc.data().description || '',
        geohash: doc.data().geohash || '',
        images: doc.data().images || '',
        likes: doc.data().likes || 0,
        location: doc.data().location || { _latitude: 0, _longitude: 0 },
        points: doc.data().points || 0,
        price: Number(doc.data().price) || 0,
        searchKeywords: doc.data().searchKeywords || [],
        size: doc.data().size || '',
        tagname: doc.data().tagname || '',
        title: doc.data().title || 'No Title',
        userId: doc.data().userId || '',
    }));
    const filteredList = productList.filter(product => product.status !== 'SOLD');
    return filteredList;
}

export async function fetchSpecificListing(geohash: string) {
    const productCol = collection(db, "MYCollection");
    const qy = query(productCol, and(where("geohash", "==", geohash), where("STATUS", "==", "UNSOLD")));
    const productSnapShot = await getDocs(qy);
    const productList = productSnapShot.docs.map(doc => ({
        status: doc.data().STATUS || 'available',
        buyerId: doc.data().buyerId || '',
        categoryId: doc.data().categoryId || '',
        condition: doc.data().condition || '',
        dateCreated: doc.data().date || '',
        description:    doc.data().description || '',
        geohash: doc.data().geohash || '',
        images: doc.data().images || '',
        likes: doc.data().likes || 0,
        location: doc.data().location || { _latitude: 0, _longitude: 0 },
        points: doc.data().points || 0,
        price: Number(doc.data().price) || 0,
        searchKeywords: doc.data().searchKeywords || [],
        size: doc.data().size || '',
        tagname: doc.data().tagname || '',
        title: doc.data().title || 'No Title',
        userId: doc.data().userId || '',
    }));
    const product = productList.length > 0 ? productList[0] : null;
    return product;
}