// based on https://github.com/aleksandracodes/CI_PP2_SunshineGuessing/blob/main/assets/js/contact-form.js

/** 
 * Add an eventListener to listen for the submit.
 * Sends an email to site owner through emailJS if the submit is fired.
 * Script taken from the official EmailJS tutorial https://www.emailjs.com/docs/tutorial/creating-contact-form/ 
 * and Email Templates Playground environment.
 */

const sendFormButton = document.getElementById("bns-btn-send-form");
let reloadContactPage = document.getElementById('bns-reload-contact-page');

window.onload = function() {
reloadContactPage.style.display = "none";
document.getElementById("bns-contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    emailjs.init("4f0kXtGaMLsB341Z2");
    sendFormButton.value = "Sending..."; //changing value of the button when sending in progress

    emailjs.sendForm("service_bb9gt6r", "hackathon-oct-team6-user", this)
        .then(() => {
            sendFormButton.value = "Send";

            document.getElementById("bns-feedback-heading").classList.add('submitted');
            document.getElementById("bns-feedback-heading").innerHTML = "We are thrilled to receive your message!";  
            
            reloadContactPage.style.display = "block";
            reloadContactPage.classList.add('submitted');
            
            document.getElementById("bns-contact-menu-return").classList.add('submitted');
            document.getElementById("bns-contact-form").reset(); // reset form after submission https://stackoverflow.com/questions/14589193/clearing-my-form-inputs-after-submission
            
        }, (err) => {
            console.log(JSON.stringify(err));

            document.getElementById("bns-feedback-heading").classList.add('error');
            document.getElementById("bns-feedback-heading").innerHTML = "Ups...something went wrong, please reload the page and try again!"; 
            sendFormButton.value = "Error! Try again"; 

            reloadContactPage.style.display = "block";
        });
});
};