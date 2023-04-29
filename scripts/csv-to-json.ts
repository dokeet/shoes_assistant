const fs = require("fs");
import Papaparse from "papaparse";

const csvFilePath = "/Users/jorge/code/pdf-gpt4/scripts/adidas_usa.csv";
const jsonFilePath = "/Users/jorge/code/pdf-gpt4/scripts/output.json";

// Read the CSV file content
const csvFileContent = fs.readFileSync(csvFilePath, "utf8");

// Parse the CSV content using Papa.parse
const parseOptions = {
  header: true,
  dynamicTyping: true, // Automatically convert values to their appropriate data types
  skipEmptyLines: true,
};
const parsedCsv = Papaparse.parse(csvFileContent, parseOptions);

// Convert the parsed CSV data to JSON
const jsonData = parsedCsv.data;

// Save JSON data to a file
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8");
console.log(`JSON data saved to ${jsonFilePath}`);
