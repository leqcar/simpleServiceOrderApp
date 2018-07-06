import { element, by, promise, ElementFinder } from 'protractor';

export class OrderItemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-item div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class OrderItemUpdatePage {
    pageTitle = element(by.id('jhi-order-item-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    itemCodeInput = element(by.id('field_itemCode'));
    itemNameInput = element(by.id('field_itemName'));
    quantityInput = element(by.id('field_quantity'));
    unitAmountInput = element(by.id('field_unitAmount'));
    orderEntrySelect = element(by.id('field_orderEntry'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setItemCodeInput(itemCode): promise.Promise<void> {
        return this.itemCodeInput.sendKeys(itemCode);
    }

    getItemCodeInput() {
        return this.itemCodeInput.getAttribute('value');
    }

    setItemNameInput(itemName): promise.Promise<void> {
        return this.itemNameInput.sendKeys(itemName);
    }

    getItemNameInput() {
        return this.itemNameInput.getAttribute('value');
    }

    setQuantityInput(quantity): promise.Promise<void> {
        return this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    setUnitAmountInput(unitAmount): promise.Promise<void> {
        return this.unitAmountInput.sendKeys(unitAmount);
    }

    getUnitAmountInput() {
        return this.unitAmountInput.getAttribute('value');
    }

    orderEntrySelectLastOption(): promise.Promise<void> {
        return this.orderEntrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    orderEntrySelectOption(option): promise.Promise<void> {
        return this.orderEntrySelect.sendKeys(option);
    }

    getOrderEntrySelect(): ElementFinder {
        return this.orderEntrySelect;
    }

    getOrderEntrySelectedOption() {
        return this.orderEntrySelect.element(by.css('option:checked')).getText();
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
