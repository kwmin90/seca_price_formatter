import excel from "exceljs";
import { ResponseData } from "../types/type";

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

export const format = (path: string): Promise<ResponseData> => {
  return workbook.xlsx
    .readFile(path)
    .then(() => {
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
      workbook.xlsx.writeFile(path);
      return {
        success: true,
        sites: 1,
        rows: worksheet.rowCount - 1,
      };
    })
    .catch(() => {
      return {
        success: false,
        sites: 0,
        rows: 0,
      };
    });
};
export const formatEPP = (
  path: string,
  sites: string[]
): Promise<ResponseData> => {
  return workbook.xlsx
    .readFile(path)
    .then(() => {
      const worksheet = workbook.getWorksheet("Sheet1");
      const validRows = worksheet.rowCount - 1;
      worksheet.eachRow((row, rowNum) => {
        const startDate = worksheet.getCell(`I${rowNum}`).value;
        const endDate = worksheet.getCell(`J${rowNum}`).value;
        if (startDate !== "validityFrom" && endDate !== "validityTo") {
          sites.forEach((site, index) => {
            if (index === 0) {
              worksheet.getCell(`H${rowNum}`).value = `${site}PriceGroup`;
              worksheet.getCell(`I${rowNum}`).value = formatStart(startDate);
              worksheet.getCell(`J${rowNum}`).value = formatEnd(endDate);
              row.commit();
            } else {
              const copyRow = rowNum + validRows * index;
              worksheet.getCell(`A${copyRow}`).value = worksheet.getCell(
                `A${rowNum}`
              ).value;
              worksheet.getCell(`B${copyRow}`).value = worksheet.getCell(
                `B${rowNum}`
              ).value;
              worksheet.getCell(`C${copyRow}`).value = worksheet.getCell(
                `C${rowNum}`
              ).value;
              worksheet.getCell(`D${copyRow}`).value = worksheet.getCell(
                `D${rowNum}`
              ).value;
              worksheet.getCell(`E${copyRow}`).value = worksheet.getCell(
                `E${rowNum}`
              ).value;
              worksheet.getCell(`F${copyRow}`).value = worksheet.getCell(
                `F${rowNum}`
              ).value;
              worksheet.getCell(
                `H${rowNum + validRows * index}`
              ).value = `${site}PriceGroup`;
              worksheet.getCell(`I${copyRow}`).value = worksheet.getCell(
                `I${rowNum}`
              ).value;
              worksheet.getCell(`J${copyRow}`).value = worksheet.getCell(
                `J${rowNum}`
              ).value;
              worksheet.getCell(`K${copyRow}`).value = worksheet.getCell(
                `K${rowNum}`
              ).value;
              row.commit();
            }
          });
        }
      });
      workbook.xlsx.writeFile(path);
      return {
        success: true,
        sites: sites.length + 1,
        rows: worksheet.rowCount - 1,
      };
    })
    .catch(() => {
      return {
        success: false,
        sites: sites.length + 1,
        rows: 0,
      };
    });
};
