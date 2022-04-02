import { db } from "../utils/init-firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const coursCollectionRef = collection(db, "courses");
class CalculatorService {
  addCourse = (newCourse) => {
    return addDoc(coursCollectionRef, newCourse);
  };

  updateCourses = (id, updateCourses) => {
    const coursDoc = doc(db, "courses", id);
    return updateDoc(coursDoc, updateCourses);
  };

  deleteCourses = (id) => {
    const coursDoc = doc(db, "courses", id);

    return deleteDoc(coursDoc);
  };

  getAllCourses = () => {
    return getDocs(coursCollectionRef);
  };

  getCourses = (id) => {
    const coursesDoc = doc(db, "courses", id);
    return getDoc(coursesDoc);
  };
}

export default new CalculatorService();
