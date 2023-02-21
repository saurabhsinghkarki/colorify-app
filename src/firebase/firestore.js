import { getFirestore, doc, collection, query, where, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

import fireApp from "./app";
const db = getFirestore(fireApp);
const colors = collection(db, "colors");

export async function getColors(activeUser) {
    const q = query(colors, where("activeUser", "==", activeUser));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
        let obj = {};
        obj['id'] = doc.id;
        obj['value'] = doc.data().color;
        data.push(obj);
    });
    return data;
}

export async function addColor(activeUser, color) {
    try {
        const data = { activeUser, color }
        await setDoc(doc(colors), data);

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateColor(id, color) {
    try {
        const docRef = doc(db, 'colors', id);
        await updateDoc(docRef, { color });
        return true;
    }
    catch (e) {
        console.log(e);
    }
}

export async function deleteColor(id) {
    try {
        await deleteDoc(doc(db, "colors", id));
        return true;
    }
    catch (e) {
        console.log(e);
    }
}
