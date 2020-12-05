'use strict';

let registrationBT = document.getElementById('registration'),
    autorizationBT = document.getElementById('authorization'),
    userList = document.getElementById('users-list');


function User(uName, uSecondName, uLogin, uPassword) {

    this.firstname = uName;
    this.secondName = uSecondName;
    this.login = uLogin;
    this.password = uPassword;
    this.date = this.getDate();

}

User.prototype.getDate = function () {


    const monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
        'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let date = new Date();

    let dateStr = 'Зарегистрирован  ' + date.getDate() + monthArr[date.getMonth()] + date.getFullYear() + 'года в ';

    return dateStr;
};

let userData = [];

function fieldsValidation(question, neededType) {

    let itemToValid;



    if (neededType === 'string' || neededType === 'nameSurName') {

        do {
            itemToValid = prompt(question[0], question[1]);
            
            if (itemToValid === null) { return; }
            itemToValid.trim();
        }
        while (typeof itemToValid !== typeof ("string") || !isNaN(itemToValid));



        if (neededType === 'nameSurName' && !itemToValid.includes(' ')) {
            alert('Поробуйте еще раз,не забывайте пробел между Именем и Фамилией');
            
            return fieldsValidation(question, neededType);

        } else { return itemToValid; }
    }


    if (neededType === 'stringOrNum') {

        do {
            itemToValid = prompt(question[0], question[1]);
            
            if (itemToValid === null) { return; }
            itemToValid.trim();
            if (itemToValid === '') {
                alert('Поле не может быть пустым!');
                fieldsValidation(question, neededType);
            }
        }
        while (typeof itemToValid !== typeof "string");

        return itemToValid;
    }

}

registrationBT.addEventListener('click', function () {

    let nameSurName = fieldsValidation(['Введите ваше имя и фамилию в формате указаном ниже', 'Имя Фамилия'], 'nameSurName');
    if(!nameSurName){return;}
    let login = fieldsValidation(['Введите логин', ''], 'string');
    if(!login){return;}
    let pswd = fieldsValidation(['Введите пароль', ''], 'stringOrNum');
    if(!pswd){return;}

    nameSurName = nameSurName.split(' ');

    let user = new User(nameSurName[0], nameSurName[1], login, pswd);
    userData.push(user);

});