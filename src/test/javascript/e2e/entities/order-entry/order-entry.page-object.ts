import { element, by, promise, ElementFinder } from 'protractor';

export class OrderEntryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-entry div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class OrderEntryUpdatePage {
    pageTitle = element(by.id('jhi-order-entry-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    serviceTypeSelect = element(by.id('field_serviceType'));
    transactionDateInput = element(by.id('field_transactionDate'));
    totalAmountInput = element(by.id('field_totalAmount'));
    paymentStatusSelect = element(by.id('field_paymentStatus'));
    customerSelect = element(by.id('field_customer'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setServiceTypeSelect(serviceType): promise.Promise<void> {
        return this.serviceTypeSelect.sendKeys(serviceType);
    }

    getServiceTypeSelect() {
        return this.serviceTypeSelect.element(by.css('option:checked')).getText();
    }

    serviceTypeSelectLastOption(): promise.Promise<void> {
        return this.serviceTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setTransactionDateInput(transactionDate): promise.Promise<void> {
        return this.transactionDateInput.sendKeys(transactionDate);
    }

    getTransactionDateInput() {
        return this.transactionDateInput.getAttribute('value');
    }

    setTotalAmountInput(totalAmount): promise.Promise<void> {
        return this.totalAmountInput.sendKeys(totalAmount);
    }

    getTotalAmountInput() {
        return this.totalAmountInput.getAttribute('value');
    }

    setPaymentStatusSelect(paymentStatus): promise.Promise<void> {
        return this.paymentStatusSelect.sendKeys(paymentStatus);
    }

    getPaymentStatusSelect() {
        return this.paymentStatusSelect.element(by.css('option:checked')).getText();
    }

    paymentStatusSelectLastOption(): promise.Promise<void> {
        return this.paymentStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    customerSelectLastOption(): promise.Promise<void> {
        return this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerSelectOption(option): promise.Promise<void> {
        return this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
