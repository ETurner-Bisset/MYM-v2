export const emailValidation = (email) => {
  let errors = [];
  if (!email || !email.includes('@')) {
    errors.push('Invalid email address.');
  }
  return errors;
};

export const passwordValidation = (password, passwordConfirm) => {
  let errors = [];
  if (!password) {
    errors.push('Password is required');
  }
  if (password.length < 8) {
    errors.push('Password must be 8 characters in length.');
  }
  if (!passwordConfirm) {
    errors.push('You must confirm your password.');
  }
  if (password !== passwordConfirm) {
    errors.push('Your passwords do not match.');
  }

  return errors;
};

export const passwordConfirmValidation = (password, passwordConfirm) => {
  let errors = [];
  if (!passwordConfirm) {
    errors.push('You must confirm your password.');
  }
  if (password !== passwordConfirm) {
    errors.push('Your passwords do not match.');
  }
};

export const signupValidation = (
  title,
  name,
  email,
  password,
  passwordConfirm
) => {
  let errors = [];
  if (!title || title === '') {
    errors.push('Title is required.');
  }
  if (!name || name === '') {
    errors.push('Name is required.');
  }
  if (!email || !email.includes('@')) {
    errors.push('Invalid email address.');
  }
  if (!password) {
    errors.push('Password is required');
  }
  if (password.length < 8) {
    errors.push('Password must be 8 characters in length.');
  }
  if (!passwordConfirm) {
    errors.push('You must confirm your password.');
  }
  if (password !== passwordConfirm) {
    errors.push('Your passwords do not match.');
  }

  return errors;
};

export const loginValidation = (email, password) => {
  let errors = [];
  if (!email || !email.includes('@')) {
    errors.push('Invalid email address.');
  }
  if (!password) {
    errors.push('Password is required');
  }
  if (password.length < 8) {
    errors.push('Password must be 8 characters in length.');
  }
  return errors;
};

export const detailsValidation = (title, name, email) => {
  let errors = [];
  if (!title || title === '') {
    errors.push('Title is required.');
  }
  if (!name || name === '') {
    errors.push('Name is required.');
  }
  if (!email || !email.includes('@')) {
    errors.push('Invalid email address.');
  }
  return errors;
};

export const updatePasswordValidation = (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  let errors = [];
  if (!passwordCurrent) {
    errors.push('Current password is required.');
  }
  if (!password) {
    errors.push('Password is required');
  }
  if (password.length < 8) {
    errors.push('Password must be 8 characters in length.');
  }
  if (!passwordConfirm) {
    errors.push('You must confirm your password.');
  }
  if (password !== passwordConfirm) {
    errors.push('Your passwords do not match.');
  }

  return errors;
};

export const messageValidation = (name, email, message) => {
  let errors = [];

  if (!name || name === '') {
    errors.push('Name is required.');
  }

  if (!email || !email.includes('@')) {
    errors.push('Invalid email address.');
  }

  if (!message || message === '') {
    errors.push('Message is required.');
  }

  return errors;
};

export const addMedValidation = (
  name,
  dose,
  initialOrderDate,
  pharmacy,
  instructions
) => {
  let errors = [];

  if (!name || name === '') {
    errors.push('Name is required.');
  }

  if (!dose || dose === '') {
    errors.push('Dose is required.');
  }

  if (!initialOrderDate || initialOrderDate === '') {
    errors.push('Initial order date is required.');
  }

  if (!pharmacy || pharmacy === '') {
    errors.push('Pharmacy details are required.');
  }

  if (!instructions || instructions === '') {
    errors.push('Instructions are required.');
  }

  return errors;
};
