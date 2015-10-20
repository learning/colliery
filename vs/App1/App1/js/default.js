// 有关“空白”模板的简介，请参阅以下文档: 
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var Contacts = Windows.ApplicationModel.Contacts;
    var picker = Contacts.ContactPicker();
    var list = new WinJS.Binding.List([]);
    var filteredList = list.createFiltered(function (item) {
        return true;
    });

    WinJS.Namespace.define('DataExample', { itemList: filteredList });

    function getContactText(contact) {
        var txt = contact.displayName + '\n';
        txt += 'first name: ' + contact.firstName + '\n';
        txt += 'last name: ' + contact.lastName + '\n';
        if (contact.phones.length > 0) {
            contact.phones.forEach(function (phone) {
                switch (phone.kind) {
                    case Windows.ApplicationModel.Contacts.ContactPhoneKind.work:
                        txt += 'Work Phone:';
                        break;
                    case Windows.ApplicationModel.Contacts.ContactPhoneKind.mobile:
                        txt += 'Mobile';
                        break;
                    case Windows.ApplicationModel.Contacts.ContactPhoneKind.home:
                        txt += 'Home Telephone';
                        break;
                    case Windows.ApplicationModel.Contacts.ContactPhoneKind.other:
                        txt += 'Other TEL';
                        break;
                }
                txt += ' ' + phone.number + '\n';
            });
        }
        return txt;
    }

    function pickContact() {

        picker.commitButtonText = "选他（们）！";
        // picker.selectionMode = Contacts.ContactSelectionMode.fields;
        // picker.desiredFieldsWithContactFieldType.append(Contacts.ContactFieldType.phoneNumber);

        picker.pickContactAsync().done(function (contact) {
            if (contact) {
                list.push(getContactText(contact));
                // document.getElementById('txt').innerText = contact.displayName;
            }
        });
    }

    function pickContacts() {
        picker.commitButtonText = "选这些！！！";

        picker.pickContactsAsync().done(function (contacts) {
            if (contacts && contacts.length > 0) {
                /*var txt = "";
                contacts.filter(function (contact) {
                    return contact.displayName.length === 2;
                }).forEach(function (contact) {
                    txt += contact.displayName + "<br>";
                });
                document.getElementById('txt').innerHTML = txt;
                */
                contacts.forEach(function (contact) {
                    list.push(getContactText(contact));
                });
            }
        });
    }

    function searchHandler(evt) {
        console.log('searchHandler');
    }

    function suggestionHandler(evt) {
        var queryText = evt.detail.queryText,
            suggestionCollection = evt.detail.searchSuggestionCollection,
            imgUri = new Windows.Foundation.Uri('ms-appx:///images/logo.scale-100.png'),
            imgSrc = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(imgUri);

        suggestionCollection.appendResultSuggestion('text', 'detailText', 'tag', imgSrc, 'imageAlterText');
        suggestionCollection.appendSearchSeparator('--!');
        suggestionCollection.appendQuerySuggestion(queryText + ' ！！！');
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO:  此应用程序刚刚启动。在此处初始化
                //您的应用程序。
                document.getElementById('btn').addEventListener('click', pickContact);
                document.getElementById('btn2').addEventListener('click', pickContacts);
                document.getElementById('searchBox').addEventListener('querysubmitted', searchHandler);
                document.getElementById('searchBox').addEventListener('suggestionsrequested', suggestionHandler);
                // Windows.ApplicationModel.Search.SearchPane.getForCurrentView().onquerysubmitted = searchHandler;
            } else {
                // TODO:  此应用程序已从挂起状态重新激活。
                // 在此处恢复应用程序状态。
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO:  即将挂起此应用程序。在此处保存
        //需要在挂起中保留的任何状态。您可以使用
        // WinJS.Application.sessionState 对象，该对象将在
        //挂起中自动保存和恢复。如果您需要在
        //挂起应用程序之前完成异步操作，请调用
        // args.setPromise()。
    };

    app.start();
})();
