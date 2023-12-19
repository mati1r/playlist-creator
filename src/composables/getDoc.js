import { db } from '@/firebase/config';
import { onSnapshot, doc } from 'firebase/firestore';
import { ref, watchEffect } from 'vue';

function getDocument(collectionName, id){
    const document = ref(null)
    const error = ref(null)

    //const collectionRef = collection(db, collectionName)
    const documentRef = doc(db, collectionName, id)

    const unsub = onSnapshot(documentRef, (docSnap) =>{
        //If document have data then it exists
        if(docSnap.data())
        {
            document.value = {...docSnap.data(), id: docSnap.id}
            error.value = null
        }else
        {
            error.value = "Document doesn't exist"
        }     
    }, (err) => {
        console.log(err.message)
        document.value = null
        error = "Could not fetch data"
    })

    watchEffect((onInvalidate) => {
        //unsubscibe from previous collection when watcher is topped (unmounted)
        onInvalidate(() => unsub())
    })

    return {error, document}
}

export default getDocument