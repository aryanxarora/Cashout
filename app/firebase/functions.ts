import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { BudgetState, Income } from "@/types";

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
    config: {
      expenses: [],
      allocation: {
        allowance: 30,
        savings: 30,
        investments: 40,
      },
    },
    income: [],
    history: [
      {
        date: new Timestamp(0, 0),
        income: [
          {
            source: "cashout_default",
            amount: 0,
            date: new Timestamp(0, 0),
          },
        ],
        allowance: 0,
        savings: 0,
        investments: 0,
      },
    ],
  };
  await setDoc(doc(db, "users", uid), data);
};

// export const logNewIncome = async (
//   log: IncomeLog,
//   uid: string,
//   key: number
// ) => {
//   const userRef = doc(db, "users", uid);
//   const userSnap = (await getDoc(userRef)).data();
//   const logsUpdate = userSnap?.logs;
//   logsUpdate[key].income.push(log);
//   await updateDoc(userRef, { logs: logsUpdate })
//     .then(() => {
//       console.log("Document successfully updated!");
//     })
//     .catch((error) => {
//       console.error("Error updating document: ", error);
//     });
// };

export const newIncomeLog = async (uid: string, log: Income) => {
  const userRef = doc(db, "users", uid);
  const userSnap = (await getDoc(userRef)).data();
  const logsUpdate = userSnap?.income;
  logsUpdate?.push(log);
  await updateDoc(userRef, { income: logsUpdate })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};
