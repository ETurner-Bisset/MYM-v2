'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import { addMedValidation } from '@/utils/inputValidation';
import Med from '@/models/medsModel';

export const editMed = async (medId, formData) => {
  const session = await getSession();

  if (!session) {
    return { errors: ['You must be logged in to perform that action.'] };
  }

  const name = formData.get('name');
  const dose = formData.get('dose');
  const orderDate = formData.get('orderDate');
  const frequency = formData.get('frequency');
  const pharmacy = formData.get('pharmacy');
  const firstDose = formData.get('firstDose');
  const secondDose = formData.get('secondDose');
  const thirdDose = formData.get('thirdDose');
  const fourthDose = formData.get('fourthDose');
  const instructions = formData.get('instructions');

  const errors = addMedValidation(
    name,
    dose,
    orderDate,
    pharmacy,
    instructions
  );

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  const result = await connectDB();

  if (!result) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  // const existingMeds = await Med.find({ userId: session.user.id });

  // const existingName = existingMeds.filter((med) => med.name === name);

  // if (existingName.length > 0) {
  //   return {
  //     errors: ['Please use an unique medication name.'],
  //   };
  // }

  let updatedMed;
  try {
    updatedMed = await Med.findByIdAndUpdate(
      medId,
      {
        name,
        slug: slugify(name),
        dose,
        orderDate,
        frequency,
        pharmacy,
        firstDose,
        secondDose,
        thirdDose,
        fourthDose,
        instructions,
      },
      { new: true }
    );
  } catch (error) {
    return {
      errors: ['Could not edit medication.'],
    };
  }

  revalidatePath(`/meds/${updatedMed.slug}`);
  redirect(`/meds/${updatedMed.slug}`);
};
