import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./app";

export const auth = getAuth(app);

export async function createAccount(email, password) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.uid;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        if(errorCode==='auth/email-already-in-use'){
            window.alert("Email already Exists");
        }
        else if(errorCode==='auth/invalid-email'){
            window.alert("Please enter a Valid Email Address");
        }
        else{
            window.alert("Please enter a Strong Password");
        }
    }
}

export async function login(email, password) {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.uid;
    }
    catch (error) {
        const errorCode = error.code;
      //   const errorMessage = error.message;
        if(errorCode==='auth/user-not-found'){
            window.alert("No account exists for this email address");
        }
        else {
            window.alert("Invalid Password");
        }
    }
}


export async function logout() {
    try {
        await signOut(auth);
        return true;
    }
    catch (error) {
        console.log(error);
    };
}