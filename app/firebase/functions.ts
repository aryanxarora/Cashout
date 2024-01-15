import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const currentYear = new Date().getFullYear();

export const checkDocExists = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    addNewUser(uid);
    return null;
  }
};

export const addNewUser = async (uid: string) => {
  const currentMonth = new Date().getMonth() + 1;
  const data = {
    allocation: {
      allowance: 20,
      savings: 40,
      investments: 40,
    },
    expenes: {},
    [currentYear]: {
      0: {
        name: "",
        income: 0,
        allowance: 0,
        savings: 0,
        investments: 0,
      },
      [currentMonth]: {
        name: "Jan",
        income: 0,
        allowance: 0,
        savings: 0,
        investments: 0,
      },
    },
  };
  await setDoc(doc(db, "users", uid), data);
};
