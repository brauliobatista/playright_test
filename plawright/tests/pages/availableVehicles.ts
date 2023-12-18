
/**
 * Braulio Batista
 * 
 * December, 2023
 * 
 */
import { Locator, Page } from '@playwright/test';

export class AvailableVehiclesPage {

    readonly page: Page;
    readonly title: Locator;
    readonly filterToggle: Locator;
    readonly clickColour: Locator;
    readonly exploreButton: Locator;
    readonly enquireButton: Locator;
    readonly firstName: Locator;
    readonly LastName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly postalCode: Locator;
    readonly privacyCheck: Locator;
    readonly proceedButton: Locator;
    readonly errorMessage: Locator;
    readonly carVinValue: Locator;
    readonly carYear: Locator;
    private preOwnedButton: Locator;
    private colour: Locator;
    private selectColour: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.dcp-stage__headline');
        this.filterToggle = page.locator('.filter-toggle .show');
        this.clickColour = page.getByText('Colour 0');
        this.exploreButton = page.locator('.dcp-cars-srp-results__tile').first().getByText('Explore');
        this.enquireButton = page.locator('[data-test-id="dcp-buy-box__contact-seller"]');
        this.firstName = page.getByLabel('First Name');
        this.LastName = page.getByLabel('Last Name');
        this.email = page.getByLabel('E-Mail');
        this.phone = page.locator('[data-test-id="rfq-contact__phone"]').getByLabel('Phone');
        this.postalCode = page.getByLabel('Postal Code');
        this.privacyCheck = page.locator('label').filter({ hasText: 'I have read and understood' }).locator('wb-icon');
        this.proceedButton = page.locator('[data-test-id="dcp-rfq-contact-button-container__button-next"]');
        this.errorMessage = page.locator('.dcp-error-message');
        this.carVinValue = page.locator('[data-test-id="dcp-vehicle-details-list-item-11"]');
        this.carYear = page.locator('[data-test-id="dcp-cars-buy-box-vehicle-characteristics-model-year"]');
    }

    /**
    * get pre owned option
    *
    * @param value
    */
    async getPreOwnedOption(value: string) {
        this.preOwnedButton = this.page.getByRole('button', { name: value });
        await this.preOwnedButton.click();
    }

    /**
     * wait for selection
     */
    async waitForSelection() {
        await this.page.waitForSelector(".filter-toggle .show");
    }

    /**
    * waiting
    *
    */
    async waiting() {
        await this.page.waitForTimeout(5000);
    }

    /**
    * get colour option
    *
    * @param value
    */
    async getColourOption(value: string) {
        this.colour = this.page.locator('.category-filter-row-headline .category-filter-row-headline__text >> text=' + value);
        await this.colour.click();
    }

    /**
    * get selected colour option
    *
    * @param value
     */
    async selectColourOption(value: string) {
        this.selectColour = this.page.getByText(value, { exact: true });
        await this.selectColour.click();
    }

    /**
     * 
     * @param value click by most expensive item
     */
    async clickItemMostExpensiveOption(value) {
        await value.click();
    }

    /**
     * get the most expensive car
     */
    async getMostExpensiveCars() {
        const carList = this.page.locator('[data-test-id="dcp-cars-product-tile-price"]');
        const count = await carList.count();
        let convertedBiggestPrice = Number(0);
        let index = 0;
        for (let i = 0; i < count; i++) {
            let price = await carList.nth(i).innerText();
            price = price.replace("A$", "").replace(",", "");
            let convertedPrice = Number(price);
            if (convertedBiggestPrice < convertedPrice) {
                index = i;
                convertedBiggestPrice = convertedPrice;
            }
        }
        return carList.nth(index);
    }
}