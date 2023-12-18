
/**
 * Braulio Batista
 * 
 * December, 2023
 * 
 */
import { Locator, Page } from '@playwright/test';

export class OurTeamPage {

    readonly page: Page;
    private getTechStacks: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * get teck stack using role
     * 
     * @param value 
     * 
     */
    async getTeckStackByRole(value) {
        this.getTechStacks = this.page.getByRole('button', { name: value.label }).first();
        return this.getTechStacks.innerText();
    }

    /**
     *  scrollToBottom
     * 
     * @returns 
     */
    async scrollToBottom() {
        return await this.page.mouse.wheel(0, 400);
    }
}