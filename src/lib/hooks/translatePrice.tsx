export default function translatePrice(price?: string | null): string {
  if (price === "€") {
    return "Cheap";
  } else if (price === "€€") {
    return "Accessible";
  } else if (price === "€€€") {
    return "Premium";
  }
  return "Unknown";
}
