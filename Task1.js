//Login Validation

const {Builder, By, until} = require('selenium-webdriver');

(async function loginValidation() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
      // Valid credentials
      const validUsername = 'standard_user';
      const validPassword = 'secret_sauce';

      // Invalid credentials
      const invalidUsername = 'invalid_user';
      const invalidPassword = 'wrong_password';

      // Function to log in with given credentials
      async function login(username, password) {
          // Step 1: Open the SauceDemo website
          await driver.get('https://www.saucedemo.com/');

          // Step 2: Locate the username and password fields
          const usernameField = await driver.wait(until.elementLocated(By.id('user-name')), 5000);
          const passwordField = await driver.wait(until.elementLocated(By.id('password')), 5000);

          // Step 3: Enter credentials
          await usernameField.clear();
          await usernameField.sendKeys(username);
          await passwordField.clear();
          await passwordField.sendKeys(password);

          // Step 4: Click the login button
          const loginButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('login-button'))), 5000);
          await loginButton.click();
      }

      // Test valid credentials
      await login(validUsername, validPassword);

      // Step 5: Verify redirection to the inventory page
      await driver.wait(until.urlIs('https://www.saucedemo.com/inventory.html'), 5000);
      console.log('Login successful and redirected to the inventory page.');

      // Step 6: Log out
      const menuButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('react-burger-menu-btn'))), 5000);
      await menuButton.click();
      const logoutLink = await driver.wait(until.elementIsVisible(driver.findElement(By.id('logout_sidebar_link'))), 5000);
      await logoutLink.click();
      await driver.wait(until.urlIs('https://www.saucedemo.com/'), 5000);

      // Test invalid credentials
      await login(invalidUsername, invalidPassword);

      // Step 7: Verify the error message
      const errorMessage = await driver.wait(until.elementLocated(By.css('.error-message-container')), 5000).getText();
      if (errorMessage === 'Epic sadface: Username and password do not match any user in this service.') {
          console.log('Error message displayed correctly for invalid credentials.');
      } else {
          console.log('Unexpected error message:', errorMessage);
      }
  } finally {
      // Close the browser
      await driver.quit();
  }
})();
