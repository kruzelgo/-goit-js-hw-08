import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';

const defaultValue = localStorage.getItem(localStorageKey);

const isFormValid = () => {
  return email.value.trim() !== '' && message.value.trim() !== '';
};

form.addEventListener(
  'input',
  throttle(() => {
    if (isFormValid()) {
      const formStatus = {
        email: email.value.trim(),
        message: message.value.trim(),
      };
      localStorage.setItem(localStorageKey, JSON.stringify(formStatus));
    }
  }, 500)
);

const storedFormStatus = localStorage.getItem(localStorageKey);
if (storedFormStatus) {
  const parsedFormStatus = JSON.parse(storedFormStatus);
  email.value = parsedFormStatus.email;
  message.value = parsedFormStatus.message;
}

form.addEventListener('submit', event => {
  event.preventDefault();

  if (isFormValid()) {
    console.log('Data Form:', {
      email: email.value,
      message: message.value,
    });
    localStorage.removeItem(localStorageKey);
    form.reset();
  } else {
    alert('Please fill in all fields before submitting the form.');
  }
});
