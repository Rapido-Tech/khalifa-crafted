const RESERVED_PARAMS = new Set(["_page", "_limit", "_sort", "_order", "id"]);
const RANGE_SUFFIXES = ["gte", "lte", "gt", "lt"] as const;

export interface FilterOptions {
  /** Fields searched (case-insensitive, partial match) by the `q` param. */
  searchFields?: string[];
  /** Fields that accept a direct equality match. */
  equalityFields?: string[];
  /** Fields that accept `<field>_gte`, `_lte`, `_gt`, `_lt` numeric/date range params. */
  rangeFields?: string[];
  /** Maps an incoming filter param name to the actual schema field name. */
  fieldMap?: Record<string, string>;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildFilterQuery(
  query: Record<string, unknown>,
  { searchFields = [], equalityFields = [], rangeFields = [], fieldMap = {} }: FilterOptions
): Record<string, any> {
  const filter: Record<string, any> = {};
  const rangeOps: Record<string, Record<string, any>> = {};

  for (const [key, rawValue] of Object.entries(query)) {
    if (RESERVED_PARAMS.has(key) || rawValue === undefined || rawValue === "") continue;

    if (key === "q") {
      if (searchFields.length === 0) continue;
      const escaped = escapeRegex(String(rawValue));
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: escaped, $options: "i" },
      }));
      continue;
    }

    const rangeMatch = RANGE_SUFFIXES.find((suffix) => key.endsWith(`_${suffix}`));
    if (rangeMatch) {
      const field = key.slice(0, -(rangeMatch.length + 1));
      if (rangeFields.includes(field)) {
        const mapped = fieldMap[field] ?? field;
        rangeOps[mapped] = rangeOps[mapped] || {};
        const numeric = Number(rawValue);
        rangeOps[mapped][`$${rangeMatch}`] = Number.isNaN(numeric) ? rawValue : numeric;
      }
      continue;
    }

    if (equalityFields.includes(key)) {
      const mapped = fieldMap[key] ?? key;
      filter[mapped] = rawValue === "true" ? true : rawValue === "false" ? false : rawValue;
    }
  }

  for (const [field, ops] of Object.entries(rangeOps)) {
    filter[field] = { ...(filter[field] || {}), ...ops };
  }

  return filter;
}
