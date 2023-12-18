import { db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref } from 'vue';

function useCollection(collectionName){
    const error = ref(null)
    const isPending = ref(false)

    async function addToDoc(doc){
        error.value = null
        isPending.value = true

        try
        {
            await addDoc(collection (db, collectionName), doc)
            isPending.value = false
        }
        catch(err)
        {
            console.log(err.message)
            error.value = "Could not send the message"
            isPending.value = false
        }
    }

    return { error, isPending, addToDoc }
}

export default useCollection