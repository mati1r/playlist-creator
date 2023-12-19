import { storage } from '@/firebase/config';
import { ref as storageReference, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import { ref } from 'vue'
import getUser from './getUser';

const { user } = getUser()

function useStorage(){
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    async function uploadImage(file){
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = storageReference(storage, filePath.value)

        try
        {
            await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(storageRef)
        }
        catch(err) 
        {
            error.value = err.message
        }
    }

    async function deleteImage(path){
        const storageRef = storageReference(storage, path)

        try
        {
            await deleteObject(storageRef)
        }
        catch(err)
        {
            error.value = err.message
        }
    }

    return { error ,url, filePath, uploadImage, deleteImage }
}

export default useStorage