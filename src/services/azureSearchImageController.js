
import { createImageService } from "../api/azureService"


export async function createAzureImageSearchClient(appName, containerName, folderName = '') {

    const body = {
        "appName": appName,
        "containerName": containerName,
        "blobFolder": folderName
    }
    return createImageService(body)

}



