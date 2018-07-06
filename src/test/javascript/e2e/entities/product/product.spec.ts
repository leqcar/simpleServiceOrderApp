import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductComponentsPage, ProductUpdatePage } from './product.page-object';

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/Products/);
    });

    it('should load create Product page', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(productUpdatePage.getPageTitle()).toMatch(/Create or edit a Product/);
        productUpdatePage.cancel();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage.setCodeInput('code');
        expect(productUpdatePage.getCodeInput()).toMatch('code');
        productUpdatePage.setProductNameInput('productName');
        expect(productUpdatePage.getProductNameInput()).toMatch('productName');
        productUpdatePage.productCategorySelectLastOption();
        productUpdatePage.setUnitPriceInput('5');
        expect(productUpdatePage.getUnitPriceInput()).toMatch('5');
        productUpdatePage.setQuantityInput('5');
        expect(productUpdatePage.getQuantityInput()).toMatch('5');
        productUpdatePage.save();
        expect(productUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
