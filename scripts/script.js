'use strict';
let userData = [];

if (localStorage.getItem('users')) {
    userData = JSON.parse(localStorage.getItem('users'));
} else {

    userData = [];
}

let registrationBT = document.getElementById('registration'),
    autorizationBT = document.getElementById('authorization'),
    userList = document.getElementById('users-list');




function User(uName, uSecondName, uLogin, uPassword) {

    this.firstname = uName;
    this.secondName = uSecondName;
    this.login = uLogin;
    this.password = uPassword;
    this.date = this.getDate();
    this.autorized = false;

}

User.prototype.getDate = function () {


    const monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
        'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    if (hour >= 0 && hour < 9) {
        hour = '0' + hour;
    }
    if (min >= 0 && min < 9) {
        min = '0' + min;
    }
    if (sec >= 0 && sec < 9) {
        sec = '0' + sec;
    }


    let dateStr = 'Зарегистрирован: ' + date.getDate() + ' ' + monthArr[date.getMonth()] +
        ' ' + date.getFullYear() + ' года в ' + hour + ':' + min + ':' + sec;

    return dateStr;
};

function fieldsValidation(question, neededType) {

    let itemToValid;

    if (neededType === 'string' || neededType === 'nameSurName') {

        do {
            itemToValid = prompt(question[0], question[1]);

            if (itemToValid === null) { return; }
            itemToValid = itemToValid.trim();
        }
        while (typeof itemToValid !== typeof ("string") || !isNaN(itemToValid));

        let pattern = /^[а-яА-ЯA-Za-z]{3,} [а-яА-Яa-zA-z]{3,}$/;

        if (neededType === 'nameSurName' && !pattern.test(itemToValid)) {
            alert('Имя и Фамилия должны быть не короче 3х букв.А также разделяйте их пробелом');

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

let render = function () {
    userList.innerHTML = '';

    userData.forEach(function (item) {

        if (item) {

            let li = document.createElement('li');

            li.innerHTML = '<p>Имя: ' + item.firstname + ' Фамилия: ' + item.secondName +
                ' , ' + item.date + '</p>' + '<button  class = "delete-user">Удалить </button> ';

            if (item.autorized) {
                document.getElementById('UserGreating').innerHTML = 'Привет ' + item.firstname;
            }


            li.querySelector('.delete-user').addEventListener('click', function () {

                let ind = userData.indexOf(item);
                if (userData[ind].autorized) {
                    document.getElementById('UserGreating').innerHTML = 'Привет Аноним';

                };

                userData.splice(ind, 1);
                render();

            });

            userList.append(li);
        }


    });

    let dataJson = JSON.stringify(userData);

    localStorage.setItem('users', dataJson);

};

function includeLogin(login) {

    

    for (let users of userData) {

        if (users.login === login) {

            return true;

        } 

    }
    return false;
}

registrationBT.addEventListener('click', function () {
    let login, pswd, nameSurName;

    nameSurName = fieldsValidation(['Введите ваше имя и фамилию в формате указаном ниже', 'Имя Фамилия'], 'nameSurName');
    if (!nameSurName) { return; }


    do {

        login = fieldsValidation(['Введите логин', ''], 'string');
        if (!login) { return; }
        if(includeLogin(login)){
            alert('Такой логин уже есть в базе');
        }

    }
    while (includeLogin(login));




    pswd = fieldsValidation(['Введите пароль', ''], 'stringOrNum');
    if (!pswd) { return; }

    nameSurName = nameSurName.split(' ');

    let user = new User(nameSurName[0], nameSurName[1], login, pswd);
    userData.push(user);

    render();

});

autorizationBT.addEventListener('click', function () {


    if (userData.length === 0) {
        alert('База данных пуста');
        return;
    }

    let userLogin = fieldsValidation(['Введите свой логин', ''], 'stringOrNum');
    if (!userLogin) { return; }
    let userPaswd = fieldsValidation(['Введите пароль', ''], 'stringOrNum');
    if (!userPaswd) { return; }

    let got = false;

    userData.forEach(function (item) {

        if (item) {

            if (item.login === userLogin && item.password === userPaswd) {

                for (let users of userData) {
                    users.autorized = false;
                }

                item.autorized = true;

                got = true;
                render();
                return;

            }


            if (userData[userData.length - 1] === item && !got) {

                alert('Пользователь с такими данными не найден!');
            }

        }





    });

});

render();