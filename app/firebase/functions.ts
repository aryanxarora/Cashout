import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { BudgetState } from "@/types";

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const addNewUser = async (uid: string) => {
  const data: BudgetState = {
    allocation: {
      allowance: 20,
      savings: 40,
      investments: 40,
    },
    expenses: {},
    logs: [
      {
        date: new Timestamp(0, 0),
        income: 0,
        allowance: 0,
        savings: 0,
        investments: 0,
      },
      {
        date: Timestamp.now(),
        income: 1000.0,
        allowance: 0,
        savings: 0,
        investments: 0,
      },
    ],
  };
  await setDoc(doc(db, "users", uid), data);
};
