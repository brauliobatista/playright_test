/**
 * Braulio Batista
 * 
 * December 2023
 */

import { test, expect } from '@playwright/test';
import { LocationPage } from './pages/location';
import { AvailableVehiclesPage } from './pages/availableVehicles';
import { SaveFilePage } from './pages/saveFile';


test.describe.parallel.only('QA Automation Assessment', () => {
  let locationPage: LocationPage;
  let vehiclesPage: AvailableVehiclesPage;
  let saveFile: SaveFilePage;
  // data
  const dataUser = require('../data-source/common.json');
  const dataYourLocation = require('../data-source/your-location.json');
  const dataVehicules = require('../data-source/vehicles.json');

  test.beforeEach(async ({ page }) => {
    locationPage = new LocationPage(page);
    vehiclesPage = new AvailableVehiclesPage(page);
    saveFile = new SaveFilePage();
  });
  test('Validate the negative path of enquiring the highest price at Mercedes-Benz', async ({ page }) => {
    await test.step('Open the Mercedes-Benz Shop used cars in Australian market, and fill your location', async () => {
      // Navigate to page
      await page.goto(dataUser.webSiteUrl);
      await locationPage.agreeToAll.click();
      expect(await locationPage.locationTitle.innerText()).toContain(dataYourLocation.title);
      // select location
      await locationPage.state.click();
      await locationPage.getStateOption();
      await locationPage.locationTitle.click();
      await locationPage.postalcode.click();
      await locationPage.postalcode.fill(dataYourLocation.postalCode);
      await locationPage.getPurposeOption(dataYourLocation.purposePrivate);
      await locationPage.continueButton.click();
      expect(await vehiclesPage.title.innerText()).toContain(dataVehicules.title);
    });
    await test.step('Click the filter button, and Under the “Pre-Owned” tab, apply the following choices : colour', async () => {
      await vehiclesPage.waiting();
      //filter button and colour
      await vehiclesPage.filterToggle.click();
      await vehiclesPage.getPreOwnedOption(dataVehicules.preOwned);
      await vehiclesPage.getColourOption(dataVehicules.colour);
      await vehiclesPage.clickColour.click();
      await vehiclesPage.selectColourOption(dataVehicules.selectColour);
    });
    await test.step('Navigate to the Vehicle Details of the most expensive car on the filtered results and save a file', async () => {
     // the most expensive car
      await vehiclesPage.clickItemMostExpensiveOption(await vehiclesPage.getMostExpensiveCars());
      const vin = await vehiclesPage.carVinValue.innerText();
      const year = await vehiclesPage.carYear.innerText();
      const text = "The year of the car is " + year + " and the " + vin;
      // save file
      await saveFile.syncWriteFile('./example.txt', text);
    });
    await test.step('click Enquire Now, Fill the “Contact Details and Account Creation” and lick "Proceed" and validate the error.', async () => {
      //Contact Details and Account Creation
      await vehiclesPage.enquireButton.click();
      await vehiclesPage.firstName.fill(dataVehicules.firstName);
      await vehiclesPage.LastName.fill(dataVehicules.LastName);
      await vehiclesPage.email.fill(dataVehicules.wrongEmail);
      await vehiclesPage.phone.fill(dataVehicules.phone);
      await vehiclesPage.postalCode.fill(dataVehicules.postalCode);
      await vehiclesPage.privacyCheck.click();
      await vehiclesPage.proceedButton.click();
      expect(await vehiclesPage.errorMessage).toBeVisible();
      expect(await vehiclesPage.errorMessage.innerText()).toContain(dataVehicules.errorMessage);
    });
  });
});