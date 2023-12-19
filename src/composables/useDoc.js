import { db } from '@/firebase/config';
import { doc, deleteDoc , updateDoc} from 'firebase/firestore';
import { ref } from 'vue';


function useDocument(collectionName, id){
    const error = ref(null)
    const isPending = ref(false)

    let docRef = doc(db, collectionName, id)

    async function delDoc(){
        isPending.value = true
        error.value = null

        try{
            const res = await deleteDoc(docRef)
            isPending.value = false
            return res
        }
        catch(err)
        {
            error.value = "Could not delete the document"
            isPending.value = false
        }
    }

    async function upDoc(updates){
        isPending.value = true
        error.value = false

        try{
            const res = await updateDoc(docRef, updates)
            isPending.value = false
            return res
        }
        catch(err)
        {
            error.value = "Could not delete the document"
            isPending.value = false
        }
    }

    return { error, isPending, delDoc, upDoc }
}

export default useDocument