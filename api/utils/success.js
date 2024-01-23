//middleware function for error msg
export const CreateSuccess =(statusCode,successMessage, data)=>{
    return {
        status: statusCode,
        message: successMessage,
        data: data
    };
}