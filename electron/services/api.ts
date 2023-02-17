import excel from "exceljs";

const workbook = new excel.Workbook();

const isDST = (d) => {
  const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(jan, jul) !== d.getTimezoneOffset();
};

const formatStart = (date) => {
  const temp = new Date(date);
  const dates = temp.toISOString().split("T")[0];
  if (isDST(temp)) {
    return `${dates} 04:00:01`;
  } else {
    return `${dates} 05:00:01`;
  }
};

const formatEnd = (date) => {
  const temp = new Date(date);
  const format = new Date(temp.setDate(temp.getDate() + 1));
  const dates = format.toISOString().split("T")[0];
  if (isDST(temp)) {
    return `${dates} 03:59:59`;
  } else {
    return `${dates} 04:59:59`;
  }
};

export const format = (path: string) => {
  workbook.xlsx.readFile(path).then(() => {
    const worksheet = workbook.getWorksheet("Sheet1");
    worksheet.eachRow((row, rowNum) => {
      const startDate = worksheet.getCell(`I${rowNum}`).value;
      const endDate = worksheet.getCell(`J${rowNum}`).value;
      if (startDate !== "validityFrom" && endDate !== "validityTo") {
        worksheet.getCell(`I${rowNum}`).value = formatStart(startDate);
        worksheet.getCell(`J${rowNum}`).value = formatEnd(endDate);
        row.commit();
      }
    });
    return workbook.xlsx.writeFile(path);
  });
};
export const formatEPP = (path: string, sites: string[]) => {
  workbook.xlsx.readFile(path).then(() => {
    const worksheet = workbook.getWorksheet("Sheet1");
    console.log(worksheet.rowCount);
    worksheet.eachRow((row, rowNum) => {
      const startDate = worksheet.getCell(`I${rowNum}`).value;
      const endDate = worksheet.getCell(`J${rowNum}`).value;
      if (startDate !== "validityFrom" && endDate !== "validityTo") {
        sites.forEach((site, index) => {
          if (index === 0) {
            worksheet.getCell(`H${rowNum}`).value = `${site}PriceGroup`;
            worksheet.getCell(`I${rowNum}`).value = formatStart(startDate);
            worksheet.getCell(`J${rowNum}`).value = formatEnd(endDate);
          } else {
            worksheet.getRow(rowNum + (worksheet.rowCount - 1) * index) =
              worksheet.getRow(rowNum);
            // worksheet.getCell(
            //   `H${rowNum + (worksheet.rowCount - 1) * index}`
            // ).value = `${site}PriceGroup`;
          }
        });
        row.commit();
      }
    });
    return workbook.xlsx.writeFile(path);
  });
};
