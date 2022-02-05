export function success(
  res: {status: (arg0: number) => void; json: (arg0: any) => void},
  response: any,
) {
  res.status(200)
  res.json(response)
}