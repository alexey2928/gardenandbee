import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../common/firebase";
import { formatName } from "../components/Forms/FormFunctions";

export const submitForm = async (formName, fullFormData) => {
  try {
    const submittedFormsRef = collection(
      db,
      "forms",
      "allForms",
      "submittedForms"
    );

    const newForm = {
      id: crypto.randomUUID(),
      name: `${formatName(fullFormData.page1.firstName)} ${formatName(
        fullFormData.page1.lastName
      )}`,
      service: formName,
      formData: fullFormData,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(submittedFormsRef, newForm.id), newForm);

    console.log("✅ Form submitted successfully!");
  } catch (error) {
    console.error("❌ Error submitting form:", error);
  }
};
