(function () {
    'use strict';

    var sampleContacts = [{
        displayName: 'Mac OS X Lion',
        firstName: 'John',
        lastName: 'Doe',
        id: '112233',
    },{
        displayName: 'Windows 8.1',
        firstName: 'Array',
        lastName: 'Null',
        id: '999999',
    }], contactPickerUI;

    function activated(eventObject) {
        console.warn('actived');
        if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.contactPicker) {
            console.warn('actived from contactPicker');
            sampleContacts.forEach(createContactUI);
            contactPickerUI = eventObject.detail.contactPickerUI;
        }
    }

    function createContactUI(sampleContact, index) {
        var element = document.createElement('div');
        element.innerHTML = '<div class="contact"><label>' +
            '<input id="' + sampleContact.id + '" value="' + index + '" type="checkbox"/>' +
            sampleContact.displayName + '</label></div>';
        element.firstElementChild.addEventListener('change', function (evt) {
            if (evt.target.checked) {
                addContactToBasket(sampleContact);
            } else {
                removeContactFromBasket(sampleContact);
            }
        }, false);
        document.getElementById('contactList').appendChild(element);
        console.warn('actived');
    }

    function addContactToBasket(sampleContact) {
        var contact = new Windows.ApplicationModel.Contacts.Contact(),
            workEmail = new Windows.ApplicationModel.Contacts.ContactEmail(),
            workPhone = new Windows.ApplicationModel.Contacts.ContactPhone(),
            mobilePhone = new Windows.ApplicationModel.Contacts.ContactPhone(),
            workAddress = new Windows.ApplicationModel.Contacts.ContactAddress();

        workEmail.address = 'ceo@xxx.com';
        workEmail.kind = Windows.ApplicationModel.Contacts.ContactEmailKind.work;

        workPhone.number = '12345678';
        workPhone.kind = Windows.ApplicationModel.Contacts.ContactPhoneKind.work;

        mobilePhone.number = '13888888888';
        mobilePhone.kind = Windows.ApplicationModel.Contacts.ContactPhoneKind.home;

        workAddress.streetAddress = '1 Ave NE';
        workAddress.locality = "Beijing";
        workAddress.region = 'Haidian';
        workAddress.postalCode = '100000';
        workAddress.kind = Windows.ApplicationModel.Contacts.ContactAddressKind.work;

        contact.firstName = sampleContact.firstName;
        contact.lastName = sampleContact.lastName;
        contact.id = sampleContact.id;

        contact.emails.append(workEmail);
        contact.phones.append(workPhone);
        contact.phones.append(mobilePhone);
        contact.addresses.append(workAddress);

        contactPickerUI.addContact(contact);
    }

    function removeContactFromBasket(sampleContact) {
        if (contactPickerUI.containsContact(sampleContact.id)) {
            contactPickerUI.removeContact(sampleContact.id);
        }
    }

    WinJS.Application.addEventListener('activated', activated, false);
    WinJS.Application.start();
})();