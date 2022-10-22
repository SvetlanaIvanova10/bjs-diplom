"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => { 
        if (response.success) {
            location.reload();
        }
    }); 
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function exchangeRate() {
    ApiConnector.getStocks(response => {
        console.log(response);
        if (response.success) {
            clearTable();
            fillTable(response.data);
        }
    });
}
exchangeRate();
setInterval(exchangeRate, 60000);


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Валюта успешно добавлена");
        } else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешная конвертация");
        } else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешная конвертация");
        } else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    console.log(response);
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback= data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Запрос успешен");
        } else{
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
};

favoritesWidget.removeUserCallback= data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Удалено успешно");
        } else{
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
};