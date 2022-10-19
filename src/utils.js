export const splitName = (fullName) => {
    const splitOnSpace = fullName?.split(' ');
    const first = splitOnSpace[0];
    return first;
}

export const elipsis = (inputText, num) => {
    const truncate = inputText.length > num ? `${inputText.substring(0, num)}...` : inputText;
    return truncate;
}