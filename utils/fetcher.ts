export async function fetcher<T>(
  route: string,
  fallbackMessage: string = "Request failed, Please try again.",
): Promise<T> {
  const res = await fetch(route);
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    const message =
      error?.message || error?.error || `${res.status} - ${fallbackMessage}`;
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}
