export const handleResponseSuccess = (res, statusCode, message, data) => {
    res.status(statusCode)
    res.json({message, data});
}

export const handleResponseError = (res, statusCode, message) => {
    res.status(statusCode)
    res.json({message});
}