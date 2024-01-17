class Validator{

    constructor(){
        this.validations = {

        }
    }
    validate(form){

        let inputs = form.getElementByTagName('input');
        console.log(inputs);
        


    }


}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator


submit.addEventListener('click', function(e){

e.preventDefault();
validator.validate(form);

});
