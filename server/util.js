// to check arr1 contains the element in the arr2
const compareArray = (arr1, arr2) => {
    let flag = 0;
    let notFound = [];
    if ((arr2 === null || undefined) || (arr2.length === 0)) {
        return notFound = [...arr1];
    }
    for (i = 0; i < arr1.length; i++) {
        for (j = 0; j < arr2.length; j++) {   //check elements in array using 'in'
            if (arr1[i] == arr2[j]) {
                flag = 1;  // console.log('found', arr1[i]);
            }
            if (j === arr2.length - 1 && flag === 0) {
                notFound.push(arr1[i]);
            }
        }
        flag = 0;
    }
    return notFound;
}

const handleErrorMessage=(expectedProp,received)=>{
    const receivedProp = Object.keys(received);
    const missingProperties = compareArray(expectedProp, receivedProp);
    if (missingProperties.length !== 0) {

        return missingProperties;
    }
    return false;
}



module.exports = { compareArray, handleErrorMessage };