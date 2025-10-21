

// export const sendResponse = ({ data, message, success, statusCode }) => {

//     return { data, message, success, statusCode }
// }

export const sendResponse = ({ res, message, statusCode = 200, data = null }) => {

    return res.status(statusCode).json({
        success: statusCode < 300,
        message,
        data
    })

}