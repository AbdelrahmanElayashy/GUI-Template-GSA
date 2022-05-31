

export default function CSVImportGetHeaders(file) {

    return new Promise(
        (resolve, reject) => {

            // Instantiate a new FileReader
            var reader = new FileReader();

            // Read our file to an ArrayBuffer
            reader.readAsArrayBuffer(file);
            // Handler for onloadend event.  Triggered each time the reading operation is completed (success or failure) 
            reader.onloadend = function (evt) {
                // Get the Array Buffer
                var data = evt.target.result;

                // Grab our byte length
                var byteLength = data.byteLength;

                // Convert to conventional array, so we can iterate though it
                var ui8a = new Uint8Array(data, 0);

                // Used to store each character that makes up CSV header
                var headerString = '';

                // Iterate through each character in our Array
                for (var i = 0; i < byteLength; i++) {
                    // Get the character for the current iteration
                    var char = String.fromCharCode(ui8a[i]);

                    // Check if the char is a new line
                    if (char.match(/[^\r\n]+/g) !== null) {

                        // Not a new line so lets append it to our header string and keep processing
                        headerString += char;
                    } else {
                        // We found a new line character, stop processing
                        break;
                    }
                }


                resolve(headerString.split(','))


                // Convert entire ArrayBuffer to string --avoided so not all of ArrayBuffer would have to come into memory
                //var arrayToStream = String.fromCharCode.apply(null, new Uint8Array(data));
                // Splits on any new line characters and grabs first row, assuming it is headers
                //var firstLine = arrayToStream.match(/[^\r\n]+/g)[0];
                // Splits on a delimiter
                //var delimiterSplit = firstLine.split(',');

            }
        }
    )


};
