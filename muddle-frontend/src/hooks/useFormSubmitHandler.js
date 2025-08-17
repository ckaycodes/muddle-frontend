import { useState } from 'react';
import { toast } from 'react-toastify';

export const useFormSubmitHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (callback, successMessage, errorMessage) => async (e) => {
    e.preventDefault(); //prevents default form submission behavior
    if (isSubmitting) return; //checks if there is already a submission underway

    try {
      setIsSubmitting(true);
      await callback();
      if (successMessage) toast.success(successMessage);
    } catch (error) {
      console.error(error);
      toast.error(errorMessage || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
