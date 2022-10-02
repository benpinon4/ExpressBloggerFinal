const validateBlogData = (data) => {
    if(data.title === undefined || data.title.length >= 30 || typeof(data.title) !== "string"){
        return {
            isValid:  false,
            message: "The title field must be defined, 30 characters or less and a string type value."
        }
    }
    if(data.text === undefined || typeof(data.text) !== "string"){
        return {
        isValid:  false,
        message: "The text field must be defined, and a string type value."
    }
}
    if(data.author === undefined || typeof(data.author) !== "string"){
        return {
            isValid:  false,
            message: "The author field must be defined, and a string type value."
        }
    }
    if(data.email === undefined || data.email.includes("@") !== true || data.email.split("@").length > 2 || typeof(data.email) !== "string"){
        return {
            isValid:  false,
            message: "The email field must be defined, a string and contain only 1 @ symbol."
        }
    }

  let count = 0
  data.categories.forEach(categories => {
    if(typeof(categories) !== "string"){
        count++
    }
  })

    if(data.categories === undefined ||  data.categories.length < 1 || Array.isArray(data.categories) !== true || count > 0){

        return {
            isValid:  false,
            message: "The categories field must be defined, an array of strings and must contain atleast one index."
        }
    }

    if(data.starRating === undefined || typeof(data.starRating) !== "number" || data.starRating > 10 ){
        return {
            isValid:  false,
            message: "The starRating field must be defined, a number and be less than or equal to 10"
        }            
    }
    return {
        isValid: true
    }
}



module.exports = {
    validateBlogData
}