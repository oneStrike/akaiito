export const filePath = (path: string) => {
  console.log(process.env,path)
  return `${process.env.VITE_BASE_URL}/${path}`
}
