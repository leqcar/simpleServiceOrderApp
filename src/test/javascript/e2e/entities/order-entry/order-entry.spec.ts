import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderEntryComponentsPage, OrderEntryUpdatePage } from './order-entry.page-object';

describe('OrderEntry e2e test', () => {
    let navBarPage: NavBarPage;
    let orderEntryUpdatePage: OrderEntryUpdatePage;
    let orderEntryComponentsPage: OrderEntryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderEntries', () => {
        navBarPage.goToEntity('order-entry');
        orderEntryComponentsPage = new OrderEntryComponentsPage();
        expect(orderEntryComponentsPage.getTitle()).toMatch(/Order Entries/);
    });

    it('should load create OrderEntry page', () => {
        orderEntryComponentsPage.clickOnCreateButton();
        orderEntryUpdatePage = new OrderEntryUpdatePage();
        expect(orderEntryUpdatePage.getPageTitle()).toMatch(/Create or edit a Order Entry/);
        orderEntryUpdatePage.cancel();
    });

    it('should create and save OrderEntries', () => {
        orderEntryComponentsPage.clickOnCreateButton();
        orderEntryUpdatePage.serviceTypeSelectLastOption();
        orderEntryUpdatePage.setTransactionDateInput('2000-12-31');
        expect(orderEntryUpdatePage.getTransactionDateInput()).toMatch('2000-12-31');
        orderEntryUpdatePage.setTotalAmountInput('5');
        expect(orderEntryUpdatePage.getTotalAmountInput()).toMatch('5');
        orderEntryUpdatePage.paymentStatusSelectLastOption();
        orderEntryUpdatePage.customerSelectLastOption();
        orderEntryUpdatePage.save();
        expect(orderEntryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
