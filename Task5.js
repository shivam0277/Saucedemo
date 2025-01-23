//Checkout Workflow


const {Builder, By, until} = require('selenium-webdriver');
const { login } = require('./common');

(async function checkoutWorkflow() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
      // Valid credentials
      const validUsername = 'standard_user';
      const validPassword = 'secret_sauce';

      // Log in with valid credentials
      await login(driver, validUsername, validPassword);

      // Step 1: Change the filter to "Price (low to high)"
      const filterDropdown = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.product_sort_container'))), 5000);
      await filterDropdown.sendKeys('lohi');

      // Step 2: Locate and click the "Add to cart" buttons for "Sauce Labs Backpack" and "Sauce Labs Bike Light"
      const addBackpackButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-backpack'))), 5000);
      await addBackpackButton.click();

      const addBikeLightButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'))), 5000);
      await addBikeLightButton.click();

      // Verify cart count after adding items from the inventory page
      let cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      let itemCount = await cartIcon.getText();
      console.log('Cart count after adding from inventory page:', itemCount);
      
      // Ensure the cart icon shows 2 items before proceeding
      if (itemCount !== '2') {
          console.error('Expected 2 items in the cart, but found:', itemCount);
          return;
      }

      // Step 3: Navigate to the product details page for "Sauce Labs Onesie" by clicking the product name
      const productLink = await driver.wait(until.elementIsVisible(driver.findElement(By.linkText('Sauce Labs Onesie'))), 10000);
      await productLink.click();

      // Wait for the product details page to load and verify the URL
      await driver.wait(until.urlContains('inventory-item.html?id=2'), 10000);

      // Step 4: Click the "Add to cart" button on the product details page
      const addToCartButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Add to cart']")), 10000);
      await addToCartButton.click();

      // Verify cart count after adding the item from the product page
      cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      itemCount = await cartIcon.getText();
      console.log('Cart count after adding from product page:', itemCount);
      
      // Ensure the cart icon shows 3 items before proceeding
      if (itemCount !== '3') {
          console.error('Expected 3 items in the cart, but found:', itemCount);
          return;
      }

      // Step 5: Navigate to the cart page and click "Checkout"
      const cartLink = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_link'))), 5000);
      await cartLink.click();

      const checkoutButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkout'))), 5000);
      await checkoutButton.click();

      // Step 6: Fill out the checkout form with required information and click "Continue"
      const firstNameField = await driver.wait(until.elementLocated(By.id('first-name')), 5000);
      const lastNameField = await driver.wait(until.elementLocated(By.id('last-name')), 5000);
      const postalCodeField = await driver.wait(until.elementLocated(By.id('postal-code')), 5000);

      await firstNameField.sendKeys('John');
      await lastNameField.sendKeys('Doe');
      await postalCodeField.sendKeys('12345');

      const continueButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('continue'))), 5000);
      await continueButton.click();

      // Step 7: Verify the items on the checkout overview page and print the total amount
      const inventoryItems = await driver.findElements(By.css('.inventory_item_name'));
      for (let item of inventoryItems) {
          console.log('Checkout item:', await item.getText());
      }

      const totalAmount = await driver.findElement(By.css('.summary_total_label')).getText();
      console.log('Total amount:', totalAmount);

      // Step 8: Complete the purchase by clicking "Finish"
      const finishButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('finish'))), 5000);
      await finishButton.click();

      // Step 9: Verify that the success message "THANK YOU FOR YOUR ORDER" is displayed
      const successMessage = await driver.wait(until.elementLocated(By.css('.complete-header')), 5000).getText();
      if (successMessage === 'THANK YOU FOR YOUR ORDER') {
          console.log('Purchase completed successfully. Success message displayed.');
      } else {
          console.error('Unexpected success message:', successMessage);
      }

  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the browser
      await driver.quit();
  }
})();