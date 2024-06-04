import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, setDoc } from "./firebase";


export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        sendEmailVerification(userCredential.user);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {});
        return user.uid;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}



export const signIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (err) {
        return err.message;
    }
}



export const checkEmailAndPass = async (email, password) => {

    const r = await fetchSignInMethodsForEmail(auth, email);
    if (r.includes('google.com')) {
        return 'google.com';
    }
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (err) {
        return err.message;
    }
}
export const getCurrentUserId = async () => await auth.currentUser;
export const logout = async () => await signOut(auth);

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const u = await getUserById(user.uid);
    if (!u) {
        await setDoc(doc(db, 'users', user.uid), {});
    }
    return user.uid;
}

export const getUserById = async (id) => {
    const docRef = doc(db, 'users', id);
    const result = await getDoc(docRef);
    return result.data();
}

export const sendPass = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            return 'Email sent';
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
} 
