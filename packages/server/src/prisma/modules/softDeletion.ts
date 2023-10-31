export const softDeletion = async <T>(context: T, where: any) => {
  try {
    const deleteRes = await (context as any).update({
      where,
      data: {
        deletedAt: new Date()
      }
    })
    return deleteRes.id
  } catch (e) {
    return null
  }
}
