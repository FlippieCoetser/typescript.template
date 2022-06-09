
let getSlice = (entryPoint, start, end) => 
    entryPoint.substring(entryPoint.lastIndexOf(start) +1 , entryPoint.lastIndexOf(end))

export let getModuleName = (entryPoint) => getSlice(entryPoint, '/','.js')
