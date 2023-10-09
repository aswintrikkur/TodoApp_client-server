// /**
//  * for checking whether a document is present in the collection
//  * @param {Object} res 
//  * @param {*} modelName 
//  * @param {object} document The Object
//  */

// const isExist = async (res, modelName, document) => {
//     console.log('inside isExist function');
//     const dBresponse = await modelName.findOne( document )

//     if (dBresponse) {
//         console.log('document already exist');
//        return res.status(400).json({
//             message: `${document} already exist`
//         })
//     }
// }

// module.exports = { isExist }
