import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

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
  const currentYear = new Date().getFullYear();
  const data = {
    allocation: {
      allowance: 20,
      savings: 40,
      investments: 40,
    },
    expenes: {},
    [currentYear]: {
      1: {
        name: "Jan",
        income: 1611.9,
        allowance: 110.4,
        savings: 353.53,
        investments: 707.06,
      },
      2: {
        name: "Feb",
      },
      3: {
        name: "Mar",
      },
      4: {
        name: "Apr",
      },
      5: {
        name: "May",
      },
      6: {
        name: "Jun",
      },
      7: {
        name: "Jul",
      },
      8: {
        name: "Aug",
      },
      9: {
        name: "Sep",
      },
      10: {
        name: "Oct",
      },
      11: {
        name: "Nov",
      },
      12: {
        name: "Dec",
      },
    },
  };
  await setDoc(doc(db, "users", uid), data);
};
