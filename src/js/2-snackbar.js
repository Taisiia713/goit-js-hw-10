import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const selectedCheckbox = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  const promise = new Promise((resolve, reject) => {
    if (selectedCheckbox === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });
  promise
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  form.reset();
}
