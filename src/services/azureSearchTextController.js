
import { createTextService } from "../api/azureService"
import { createContainerForTextSearching, sendCsvToAzure } from "./azureBlobController"


async function createIndexIndexerDatasource(appName, searchAttributes, containerName) {

    const body = {
        appName: appName,
        attributes: searchAttributes,
        containerName: containerName
    }
    return createTextService(body)

}

export async function createAzureSearchClient(appName, searchAttributes, csv) {

    const containerName = appName
    console.log('starting processing the text service')
    await createContainerForTextSearching(containerName)
    console.log('container for csv is created:', containerName)

    await sendCsvToAzure(csv.name, csv, containerName)
    console.log('csv is uploaded')

    return createIndexIndexerDatasource(appName, searchAttributes, containerName)


}
