var enTranslation = {
    "app": {
        "errorNoInternetConnection": "You are offline. Please check your internet connection"
    },
    "login": {
        "title": "Login",
        "passwordInput": {
            "label": "Password",
            "placeholder": "Enter your password here"
        },
        "loginButton": "Login",
        "errorNoTranslations": "No translations available",
        "errorNoConfig": "No configuration available",
        "errorIncorrectPassword": "Incorrect password"
    },
    "termsAndConditions": {
        "title": "General Terms and Conditions",
        "content": "<div>Lieber Testnutzer, <br><br>wir freuen uns sehr Ihnen die Testversion für den BCS Ersatz Teil Finder zu übergeben. Im Folgenden finden Sie die Einwilligungserklärung zur Nutzung des BCS Ersatz Teil Finder.<br><br>1. Verantwortlicher<br>Verantwortlich für die Verarbeitung der personenbezogenen und personenbeziehbaren Daten ist Bosch Cognitive Services (im Folgenden „Bosch“).<br><br>2. Zweck des BCS Ersatz Teil Finder<br>Der BCS Ersatz Teil Finder bietet die Möglichkeit ein Ersatzteil durch ein mit einem Tablet oder einem Smartphone generierten Bild zu identifizieren. Hierfür erstellt der Nutzer ein Bild mit dem BCS Ersatz Teil Finder und sendet das Bild gegen die BCS Plattform. Als Ergebnis erhält der Nutzer eine Ergebnisliste mit möglichen Ersatzteilen.<br><br>Im Rahmen der Nutzung des BCS Ersatz Teil Finders werden folgende Daten verarbeitet:<br>- Aufnahmen, die mit dem BCS Ersatz Teil Finder gemacht werden<br>- Feedback (Like-Button, richtiges Teil gefunden) der Nutzer<br>- Güte der Erkennung (wie gut hat der Algorithmus das Teil erkannt?)<br>- Uhrzeit wann ein Bild an die Cloud geschickt wird<br>- Wie viele Nutzer aktiv sind (wie viele Nutzer die APP benutzen pro Tag)<br><br>3. Persönlichkeitsrechte<br>Es ist nicht gestattet, Bilder von Personen zu machen, auf denen die Personen erkennbar sind. Es ist ebenso nicht gestattet, Bilder von Teilen einer Person, z.B. Hände, zu machen.<br><br>4. Nutzungsrechte<br>Mit dieser Einwilligungserklärung räumen Sie BCS das Nutzungsrecht an den im Rahmen des BCS Ersatz Teil Finders gemachten Aufnahmen ein. BCS ist außerdem berechtigt, die Aufnahmen auch nach Ihrer Versetzung innerhalb des Unternehmens oder nach Ausschei-den aus dem Unternehmen weiter im Rahmen des BCS Ersatz Teil Finders zu verwenden.<br><br>5. Einwilligungserklärung<br>Mit der Bestätigung der Einwilligungserklärung willigen Sie der Einwilligungserklärung ein. Insb. mit den oben genannten Regelungen zu Persönlichkeitsrechten in Ziffer 3 wie auch den Bedingungen zu Nutzungsrechten in Ziffer 4 sind Sie einverstanden.<br><br>Wenn während der Nutzung des BCS Ersatz Teil Finders Fragen entstehen, können Sie sich jederzeit bei BCS melden.</div>",
        "acceptButton": "Accept"
    },
    "home": {
        "title": "Ersatzteilfinder",
        "searchButton": "Text Search",
        "cameraButton": "Image Search",
        "sparePartNotification": {
            "title": "Now take a picture of the spare part, please",
            "okButton": "OK"
        },
        "typePlateDialog": {
            "title": "Does your spare part have a type plate?",
            "yesButton": "Yes",
            "noButton": "No"
        },
        "typePlateNotification": {
            "title": "Now take a picture of the type plate, please",
            "okButton": "OK"
        },
        "versionNotification": {
            "title": "There has been a version update",
            "openVersions": "See changes",
            "dismissButton": "Dismiss"
        }
    },
    "results": {
        "title": "Results",
        "materialId": "Part ID",
        "vendorId": "Vendor ID",
        "largeThumbs": "Large Thumbnails",
        "sparePartDialog": {
            "title": "What do you want to do?",
            "samePartButton": "Capture the same part",
            "newPartButton": "Capture a new part"
        },
        "sparePartNotification": {
            "title": "Now take a picture of the spare part, please",
            "okButton": "OK"
        },
        "typePlateDialog": {
            "title": "Does your spare part have a type plate?",
            "yesButton": "Yes",
            "noButton": "No"
        },
        "typePlateNotification": {
            "title": "Now take a picture of the type plate, please",
            "okButton": "OK"
        }
    },
    "partDetails": {
        "title": "Details",
        "materialId": "Mat.Nr.",
        "vendorId": "Stock Place",
        "name": "Part name",
        "bestand": "Stock",
        "lagerplatz": "Stock place",
        "lieferantname": "Vendor name",
        "lieferantmaterialnummer": "Stock Place",
        "warengruppe": "Material group",

        "actions": [
            { "actionText": "Copy to clipboard", "successMessage": "Part Id successful copied", "errorMessage": "Error during copying" },
            { "actionText": "Send e-mail: PS_Global@bizerba.com" },
            { "actionText": "Send feedback", "successMessage": "Thank you for your feedback", "errorMessage": "Error during sending feedback" },
            { "actionText": "Go to Shop" }
        ]
    },
    "menu": {
        "title": "Menu ten1",
        "home": "Home",
        "logout": "Logout",
        "update": "Update app",
        "versions": "Change log",
        "settings": "Settings"
    },
    "search": {
        "title": "Search",
        "searchInput": {
            "label": "Search",
            "placeholder": "Enter search terms here"
        },
        "noPartsFound": "No parts found",
        "searchHits": "Search hits",
        "materialId": "Part ID",
        "name": "name",
        "vendorId": "Stock Place",
        "exact": "Exact search",
        "largeThumbs": "Large Thumbnails"
    },

    "versions": {
        "title": "Versions"
    },
    "common": {
    },
    "settings": {
        "title": "Settings",
        "largeThumbs": "Large Thumbnails",
        "textSize": "Text size"
    }
}

export function addListCommonTranslationEN(items) {

    items.map(item => {
        enTranslation['common'] = {
            ...enTranslation['common'],
            ...item
        }
        return item
    })
    console.log(enTranslation)
}


export default enTranslation;