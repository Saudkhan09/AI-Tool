// helper.js

export function checkHeading(str) {
  return (
    /^#{1,6}\s+/.test(str) ||     // ### Heading
    /^\d+\.\s+/.test(str)         // 1. Heading
  )
}

export function cleanText(str) {
  return str
    .replace(/^#{1,6}\s+/, "")    // remove ###
    .replace(/^\d+\.\s+/, "")     // remove 1.
    .replace(/\*\*/g, "")         // remove **
    .replace(/^\*\s+/, "")        // remove bullet *
    .replace(/"/g, "")             // remove quotes
    .trim()
}