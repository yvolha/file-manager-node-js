export function getGreetingText(username){
    return `Welcome to the File Manager, ${username}!\n`;
}

export function getGoodbyeText(username){
    return `Thank you for using File Manager, ${username}, goodbye!\n`;
}

export function getCurrentDirText(directoryPath){
    return `You are currently in ${directoryPath}\n`;
}