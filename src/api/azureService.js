
export async function createImageService(body) {

    const urlService = process.env.REACT_APP_AZURE_IMAGE_SERVICE_URL
    const res = await fetch(urlService, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    console.log(res.status)
    if (res.status !== 200)
        return Promise.reject(new Error(400));


}


export async function createTextService(body) {

    const urlService = process.env.REACT_APP_AZURE_TEXT_SERVICE_URL
    const res = await fetch(urlService, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    console.log(res.status)
    if (res.status !== 200)
        return Promise.reject(new Error(400));

}