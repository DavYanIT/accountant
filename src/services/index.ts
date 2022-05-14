import firebase from "firebase";

export function test() {
    return firebase.firestore().collection("test").get();
}
