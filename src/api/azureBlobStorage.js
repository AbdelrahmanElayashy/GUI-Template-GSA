import { BlobServiceClient } from '@azure/storage-blob';
import { BlobService } from 'azure-storage';


function getContainerClient(connectionString, containerName) {


    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient
}

export async function uploadDateAppToAzure(blobName, data, connectionString, containerName) {
    const containerClient = getContainerClient(connectionString, containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(data, data.length);

}


export async function uploadFileToAzure(blobName, file, connectionString, containerName) {

    try {
        const containerClient = getContainerClient(connectionString, containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(file);

    } catch (err) {
        console.log('error uploading image to azure:', err)
    }
}

export async function doContainerExsits(connectionString, containerName) {
    const blobServiceClient = new BlobServiceClient(connectionString);

    //get a BlobContainerClient
    const container = blobServiceClient.GetBlobContainerClient(containerName);

    //you can check if the container exists or not, then determine to create it or not
    const isExist = container.Exists();

    return isExist

}

export function listBlobsInFolder(containerName, folderName, connectionString) {

    return new Promise((resolve, reject) => {
        const folderWithSlash = folderName + '/'
        const blobService = new BlobService(connectionString);
        blobService.listBlobsSegmentedWithPrefix(containerName, folderWithSlash, null, { delimiter: "", maxResults: 10 }, function (err, result) {
            if (err || !result.entries.length) {
                console.log("Couldn't list blobs for container %s", containerName);

                return reject('App is not found!')
            } else {
                console.log('Successfully listed blobs for container %s', containerName);
                //console.log(result.entries);
                return resolve('App is found')
            }
        });


    })

}


export function createContainer(connectionString, containerName) {


    return new Promise((resolve, reject) => {


        // Create the BlobServiceClient object which will be used to create a container client
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        console.log('\nCreating container...');
        console.log('\t', containerName);

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // Create the container
        const createContainerResponse = containerClient.createIfNotExists();
        if (!createContainerResponse) {
            console.log('container does not created')
            reject('container does not created')
        }
        else {
            console.log('container is created')
            resolve('container is created!')

        }
    })
}


export async function getBlobContent(connectionString, containerName, blobName) {
    return new Promise((resolve, reject) => {
        const blobService = new BlobService(connectionString);
        blobService.getBlobToText(containerName, blobName, function (err, blobContent) {
            if (err) {
                reject(err);
            } else {
                resolve(blobContent);
            }
        });
    });
}
