

export default function runPiplineToDeployApp(appName) {

    const url = process.env.REACT_APP_URL_HTTPTRIGGER_PIPLINE + `&appName=${appName}`
    return fetch(url)
}
