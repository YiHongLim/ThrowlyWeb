import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {DonationItem} from "../types";

export const fetchDonorNames = async (donations: DonationItem[]): Promise<DonationItem[]> => {
    const userIds = donations
        .map(d => d.userId)
        .filter((id, index, arr) => !!id && arr.indexOf(id) === index);
    const userPromises = userIds.map(uid => getDoc(doc(db, "Users", uid)));
    const userSnaps = await Promise.all(userPromises);
    const userMap: Record<string, { firstName?: string; lastName?: string }> = {};
    userSnaps.forEach(snap => {
        if (snap.exists()) {
            userMap[snap.id] = snap.data();
        }
    });
    // Now, enrich your items
    return donations.map(d => ({
        ...d,
        firstName: userMap[d.userId]?.firstName || "",
        lastName: userMap[d.userId]?.lastName || "",
    }));
};
