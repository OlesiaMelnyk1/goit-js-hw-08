import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onInputChange, 500));
refs.form.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';

const savedInfo = localStorage.getItem(STORAGE_KEY);
const parsedInfo = JSON.parse(savedInfo);
const formData = { ...parsedInfo };

getSavedInfo();

function onInputChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (refs.email.value === '' || refs.textarea.value === '') {
    return alert('Please fill out the form!');
  }
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData.email = '';
  formData.message = '';
}

function getSavedInfo() {
  if (savedInfo) {
    if (parsedInfo.email === undefined) {
      refs.email.value = '';
    } else {
      refs.email.value = parsedInfo.email;
    }
    if (parsedInfo.message === undefined) {
      refs.textarea.value = '';
    } else {
      refs.textarea.value = parsedInfo.message;
    }
  }
}
