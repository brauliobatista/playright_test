
/**
 * Braulio Batista
 * 
 * December, 2023
 * 
 */
import { Locator, Page } from '@playwright/test';

export class LocationPage {

    readonly page: Page;
    readonly state: Locator;
    readonly postalcode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly locationTitle: Locator;
    readonly agreeToAll: Locator;
    private yourStateOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.state = page.getByLabel('* Your state')
        this.postalcode = page.locator('[data-test-id="modal-popup__location"]').getByLabel('', { exact: true });
        this.cancelButton = page.locator('.wb-button');
        this.continueButton = page.locator('[data-test-id="state-selected-modal__close"]');
        this.locationTitle = page.locator('.wb-modal-dialog__headline');
        this.agreeToAll = page.getByRole('button', { name: 'Agree to all' });
    }

    /**
    * get state option
    *
    * @param value
    */
    async getStateOption() {
        await this.page.getByLabel('* Your state').selectOption('New South Wales');
    }

    /**
    * get purpose option
    *
    * @param value
    */
    async getPurposeOption(value: string) {
        this.yourStateOption = this.page.locator('label').filter({ hasText: value }).locator('div');
        await this.yourStateOption.click();
    }
}