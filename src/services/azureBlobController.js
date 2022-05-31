import {
    listBlobsInFolder, uploadDateAppToAzure,
    uploadFileToAzure, createContainer,
    getBlobContent
} from '../api/azureBlobStorage.js'
import enTranslation from '../translation/en.js';
import deTranslation from '../translation/de.js'


const gstenantConnectionString = process.env.REACT_APP_GSA_TENANT_connectionString
const gsatexttingaConnectionString = process.env.REACT_APP_GSA_TEXTTINGA_connectionString
const gstenantWebAppContainer = '$web'


export function doAppExists(folderName) {

    return listBlobsInFolder(gstenantWebAppContainer, folderName, gstenantConnectionString)
}

export async function doFolderExistsInDataFileSync(folderName) {
    //TODO:
}

async function sendConfigAppToAzure(blobName, configObj) {
    await uploadDateAppToAzure(
        blobName,
        JSON.stringify(configObj),
        gstenantConnectionString,
        gstenantWebAppContainer
    )

}

async function sendImageToAzure(blobName, file) {
    await uploadFileToAzure(
        blobName,
        file,
        gstenantConnectionString,
        gstenantWebAppContainer
    )
}

export function sendCsvToAzure(blobName, file, containerName) {
    uploadFileToAzure(
        blobName,
        file,
        gsatexttingaConnectionString,
        containerName
    )
}

export async function createContainerForTextSearching(containerName) {

    return await createContainer(gsatexttingaConnectionString, containerName)
}

export default function handleAppDateInputFromClient(companyName, configObj) {

    const containerUrl = process.env.REACT_APP_Image_base + '/' + companyName

    // upload logo image 
    var imageFile = configObj.home.image
    sendImageToAzure(`${companyName}/${imageFile.name}`, imageFile)
    configObj.home.image = `${containerUrl}/${imageFile.name}`

    // logo image 
    var loginFile = configObj.login.image
    sendImageToAzure(`${companyName}/${loginFile.name}`, loginFile)
    configObj.login.image = `${containerUrl}/${loginFile.name}`

    // logo theme  
    var themesFile = configObj.theme.image
    sendImageToAzure(`${companyName}/${themesFile.name}`, themesFile)
    configObj.theme.image = `${containerUrl}/${themesFile.name}`



    // upload config file
    sendConfigAppToAzure(`${companyName}/config.json`, configObj)
    sendConfigAppToAzure(`${companyName}/de.json`, deTranslation)
    sendConfigAppToAzure(`${companyName}/en.json`, enTranslation)

}


export async function updateConfigFileWithKey(searchConfig, appName, key) {
    const blobName = `${appName}/config.json`
    const blob = await getBlobContent(gstenantConnectionString, gstenantWebAppContainer, blobName)
    var blobJson = JSON.parse(blob)
    blobJson[key] = searchConfig
    await sendConfigAppToAzure(blobName, blobJson)
}
