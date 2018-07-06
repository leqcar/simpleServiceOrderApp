import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderItemComponentsPage, OrderItemUpdatePage } from './order-item.page-object';

describe('OrderItem e2e test', () => {
    let navBarPage: NavBarPage;
    let orderItemUpdatePage: OrderItemUpdatePage;
    let orderItemComponentsPage: OrderItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderItems', () => {
        navBarPage.goToEntity('order-item');
        orderItemComponentsPage = new OrderItemComponentsPage();
        expect(orderItemComponentsPage.getTitle()).toMatch(/Order Items/);
    });

    it('should load create OrderItem page', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemUpdatePage = new OrderItemUpdatePage();
        expect(orderItemUpdatePage.getPageTitle()).toMatch(/Create or edit a Order Item/);
        orderItemUpdatePage.cancel();
    });

    it('should create and save OrderItems', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemUpdatePage.setItemCodeInput('itemCode');
        expect(orderItemUpdatePage.getItemCodeInput()).toMatch('itemCode');
        orderItemUpdatePage.setItemNameInput('itemName');
        expect(orderItemUpdatePage.getItemNameInput()).toMatch('itemName');
        orderItemUpdatePage.setQuantityInput('5');
        expect(orderItemUpdatePage.getQuantityInput()).toMatch('5');
        orderItemUpdatePage.setUnitAmountInput('5');
        expect(orderItemUpdatePage.getUnitAmountInput()).toMatch('5');
        orderItemUpdatePage.orderEntrySelectLastOption();
        orderItemUpdatePage.save();
        expect(orderItemUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
