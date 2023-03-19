import throttle from 'lodash.throttle';

const STOREG_KEY = "feedback-form-state";

const formData = {};

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onButtonSubmit);
form.addEventListener('input', throttle(onValueInput, 750));

populateInputValue ();

function onValueInput (evt){
   
   formData[evt.target.name] = evt.target.value;
   localStorage.setItem(STOREG_KEY, JSON.stringify(formData));
}


function onButtonSubmit (evt){
    evt.preventDefault();

    console.log(JSON.parse(localStorage.getItem(STOREG_KEY)));
    formData.email = '';
    formData.message = '';
    evt.currentTarget.reset();
    localStorage.removeItem(STOREG_KEY)
}

function populateInputValue () {
     const savedMessage = localStorage.getItem(STOREG_KEY);

     if (savedMessage){
        const parsedMessage = JSON.parse(savedMessage);
        formData.email = parsedMessage.email;
        formData.message = parsedMessage.message;
        Object.keys(parsedMessage).map(element => {
            document.querySelector(`[name='${element}']`).value = parsedMessage[element];
        });
    }
     
}