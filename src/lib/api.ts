export type LambdaFunction =
  | "getAllGuests"
  | "getGuest"
  | "addGuest"
  | "deleteGuest";

const apiUrlLamda = import.meta.env.VITE_API_GUEST;
console.log("API URL Lambda:", apiUrlLamda);

export async function callLambda<T = any>(
  apiUrl: string,
  func: LambdaFunction,
  payload: Record<string, any> = {},
): Promise<T> {
  const res = await fetch(apiUrlLamda, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ function: func, ...payload }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error en la solicitud");
  }
  return res.json() as Promise<T>;
}

