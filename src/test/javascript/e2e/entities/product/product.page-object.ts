import { element, by, promise, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    productNameInput = element(by.id('field_productName'));
    productCategorySelect = element(by.id('field_productCategory'));
    unitPriceInput = element(by.id('field_unitPrice'));
    quantityInput = element(by.id('field_quantity'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setCodeInput(code): promise.Promise<void> {
        return this.codeInput.sendKeys(code);
    }

    getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    setProductNameInput(productName): promise.Promise<void> {
        return this.productNameInput.sendKeys(productName);
    }

    getProductNameInput() {
        return this.productNameInput.getAttribute('value');
    }

    setProductCategorySelect(productCategory): promise.Promise<void> {
        return this.productCategorySelect.sendKeys(productCategory);
    }

    getProductCategorySelect() {
        return this.productCategorySelect.element(by.css('option:checked')).getText();
    }

    productCategorySelectLastOption(): promise.Promise<void> {
        return this.productCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setUnitPriceInput(unitPrice): promise.Promise<void> {
        return this.unitPriceInput.sendKeys(unitPrice);
    }

    getUnitPriceInput() {
        return this.unitPriceInput.getAttribute('value');
    }

    setQuantityInput(quantity): promise.Promise<void> {
        return this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
