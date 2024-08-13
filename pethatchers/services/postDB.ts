import { db } from "@/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
interface PetInfo {
    imageUrl: string;
    name: string;
    variant: string;
    demand: string;
    stability: string;
    value: { date: string; value: string }[];
    category: string;
    rap: string;
    exist: string;
}

const PushPet  = async (Pet:PetInfo) => {
    try {
        const id = uuidv4();
        const docRef = await doc(db,"pethatchers",id)
        await setDoc(docRef,Pet)
    }
    catch (error){
        console.error("error is",error)
    }
}

export default PushPet