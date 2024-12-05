const fs = require("fs");
const path = require("path");

// Function to count lines in a file
const countLinesInFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent.split("\n").length;
};

// Function to recursively traverse directories and count lines of code
const countLinesInDirectory = (directory, extensions = []) => {
  let totalLines = 0;

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively count lines in subdirectories
      totalLines += countLinesInDirectory(fullPath, extensions);
    } else if (
      extensions.length === 0 || 
      extensions.includes(path.extname(file))
    ) {
      // Count lines if the file extension matches (or all files if no filter)
      totalLines += countLinesInFile(fullPath);
    }
  }

  return totalLines;
};

// Directory to count lines in
const directoryPath = "/path/to/your/project"; // Change this to your directory path

// Extensions to include (e.g., ['.js', '.ts'] for JavaScript/TypeScript files)
const extensions = [".js", ".ts", ".html", ".css"]; 

const totalLines = countLinesInDirectory(directoryPath, extensions);

console.log(`Total lines of code: ${totalLines}`);
