import { db } from '@/firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, watchEffect } from 'vue';

function getCollection(collectionName){
    const documents = ref(null)
    const error = ref(null)

    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (docSnap) =>{
        let results = []
        docSnap.docs.forEach(doc => {
           doc.data().createdAt && results.push({ ...doc.data(), id: doc.id})
        });
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error = "Could not fetch data"
    })

    watchEffect((onInvalidate) => {
        //unsubscibe from previous collection when watcher is topped (unmounted)
        onInvalidate(() => unsub())
    })

    return {error, documents}
}

export default getCollection