const {By, until} = require('selenium-webdriver');

async function login(driver, username, password) {
    // Open the SauceDemo website
    await driver.get('https://www.saucedemo.com/');

    // Locate the username and password fields
    const usernameField = await driver.wait(until.elementLocated(By.id('user-name')), 5000);
    const passwordField = await driver.wait(until.elementLocated(By.id('password')), 5000);

    // Enter credentials
    await usernameField.clear();
    await usernameField.sendKeys(username);
    await passwordField.clear();
    await passwordField.sendKeys(password);

    // Click the login button
    const loginButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('login-button'))), 5000);
    await loginButton.click();

    // Wait for inventory page to load
    await driver.wait(until.urlIs('https://www.saucedemo.com/inventory.html'), 5000);
}

module.exports = { login };
