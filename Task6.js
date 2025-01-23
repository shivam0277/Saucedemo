//Logout Functionality


const {Builder, By, until} = require('selenium-webdriver');
const { login } = require('./common');

(async function logoutFunctionality() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
      // Valid credentials
      const validUsername = 'standard_user';
      const validPassword = 'secret_sauce';

      // Log in with valid credentials
      await login(driver, validUsername, validPassword);

      // Step 1: Click the menu icon (burger menu on the top-left)
      const menuIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.id('react-burger-menu-btn'))), 5000);
      await menuIcon.click();

      // Step 2: Select "Logout"
      const logoutLink = await driver.wait(until.elementIsVisible(driver.findElement(By.id('logout_sidebar_link'))), 5000);
      await logoutLink.click();

      // Step 3: Verify redirection back to the login page
      await driver.wait(until.urlIs('https://www.saucedemo.com/'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      if (currentUrl === 'https://www.saucedemo.com/') {
          console.log('Logout successful. Redirected back to the login page.');
      } else {
          console.error('Logout failed. Current URL:', currentUrl);
      }
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the browser
      await driver.quit();
  }
})();