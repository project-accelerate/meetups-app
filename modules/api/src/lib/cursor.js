/**
 * Convert a list of result rows to a Relay-compatible cursor
 * (see: http://graphql.org/learn/pagination/#pagination-and-edges)
 */
export function encodeResultsPage({ limit, rows, getCursor }) {
  const nextRow = rows[limit];
  const returnedRows = rows.slice(0, limit);

  return {
    nextCursor: nextRow && encodeCursor(getCursor(nextRow)),
    edges: returnedRows.map(row => ({
      cursor: encodeCursor(getCursor(row)),
      node: row.id
    }))
  };
}

/**
 * Encode a JSON object representing a cursor as an opaque string
 * (see: http://graphql.org/learn/pagination/#pagination-and-edges)
 */
export function encodeCursor(cursor) {
  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64");
}

/**
 * Decode an opaque cursor string, returning the JSON object it represents
 * (see: http://graphql.org/learn/pagination/#pagination-and-edges)
 */
export function decodeCursor(cursor, { defaultValue } = {}) {
  return cursor
    ? JSON.parse(Buffer.from(cursor, "base64").toString("utf8"))
    : defaultValue;
}
