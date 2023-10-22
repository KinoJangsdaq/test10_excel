const express = require('express');
const app = express();
const cors = require('cors');
const ExcelJS = require('exceljs');

app.use(cors());

app.get('/:name', async (req, res) => {
  const { name } = req.params;
  console.log('req params', name);

  let sound;
  if (name == "dog") {
    sound = 'mung mung';
  } else if (name == "cat") {
    sound = 'yaong';
  }

  // Create a new workbook and a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sounds");

  // Add column headers and define column keys and widths
  worksheet.columns = [
    { header: "Animal", key: "animal", width: 10 },
    { header: "Sound", key: "sound", width: 20 },
];

// Add row using keys
worksheet.addRow({ animal: name, sound });

// Write to file.
await workbook.xlsx.writeFile(`${name}_sound.xlsx`);

res.json({ 'sound': sound });
});

app.listen(5500);
