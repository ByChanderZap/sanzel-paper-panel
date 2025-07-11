"use server";

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getOrdersReport } from '@/lib/reports/charts';
import fs from 'fs/promises';
import path from 'path';

export async function generateOrdersReport({ month, year }: { month: string, year: string }) {
  // 1. Parse input and calculate date range
  const startYear = parseInt(year, 10);
  const startMonth = parseInt(month, 10) - 1; // JS months are 0-based
  const startDate = new Date(startYear, startMonth, 1);

  // 2. Fetch orders data
  const orders = await getOrdersReport(startDate);
  // 3. Generate PDF
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4

  // Colors
  const bgColor = rgb(0.09, 0.11, 0.15); // #161D26
  const accentColor = rgb(0.933, 0.384, 0.122); // #EE621F
  const headerBg = rgb(0.14, 0.15, 0.18); // #23272F
  const rowAlt = rgb(0.12, 0.13, 0.16); // slightly lighter than bg
  const textColor = rgb(0.95, 0.95, 0.95);

  // Fonts
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Logo
  let logoImage;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-fullcolor.png');
    const logoBytes = await fs.readFile(logoPath);
    logoImage = await pdfDoc.embedPng(logoBytes);
  } catch {
    logoImage = undefined;
  }

  // Margins and layout
  const margin = 40;
  const pageWidth = 595;
  const pageHeight = 842;
  const contentWidth = pageWidth - margin * 2;
  let y = pageHeight - margin;

  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: bgColor,
  });

  // Logo
  if (logoImage) {
    page.drawImage(logoImage, {
      x: margin,
      y: y - 40,
      width: 80,
      height: 40,
    });
  }

  // Title
  page.drawText('Orders Report', {
    x: margin + 90,
    y: y - 10,
    size: 24,
    font: titleFont,
    color: accentColor,
  });

  // Date range
  const endDate = new Date();
  page.drawText(
    `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
    {
      x: margin + 90,
      y: y - 35,
      size: 12,
      font: bodyFont,
      color: textColor,
    }
  );

  y -= 60;

  // Recalculated widths to fit within contentWidth (415px):
  // Order ID: 110, Client: 90, Products: 210, Total: 70
  const columns = [
    { title: 'Order ID', width: 110 },
    { title: 'Client', width: 90 },
    { title: 'Products', width: 210 },
    { title: 'Total', width: 70 },
  ];
  const colPadding = 12;
  const headerHeight = 28;
  const rowHeight = 22;
  let x = margin;

  // Draw table header (function for reuse)
  function drawTableHeader(page: import('pdf-lib').PDFPage, y: number) {
    let x = margin;
    page.drawRectangle({
      x,
      y: y - headerHeight,
      width: contentWidth,
      height: headerHeight,
      color: headerBg,
      borderColor: accentColor,
      borderWidth: 2,
    });
    columns.forEach((col) => {
      page.drawText(col.title, {
        x: x + colPadding,
        y: y - 18,
        size: 12,
        font: titleFont,
        color: accentColor,
      });
      x += col.width;
    });
  }

  drawTableHeader(page, y);
  y -= headerHeight;

  // Calculate max rows per page
  const reservedBottom = 60; // 40 for total, 20 for footer

  // Helper to draw total and footer
  function drawTotalAndFooter(page: import('pdf-lib').PDFPage, totalSum: number) {
    const totalY = margin + 40;
    page.drawText('Total Revenue:', {
      x: margin + contentWidth - 200,
      y: totalY,
      size: 14,
      font: titleFont,
      color: accentColor,
    });
    page.drawText(`$${totalSum.toFixed(2)}`, {
      x: margin + contentWidth - 80,
      y: totalY,
      size: 14,
      font: titleFont,
      color: accentColor,
    });
    page.drawText(`Generated on ${new Date().toLocaleString()}`, {
      x: margin,
      y: totalY - 20,
      size: 8,
      font: bodyFont,
      color: textColor,
    });
  }

  let totalSum = 0;
  orders.forEach((order, idx) => {
    x = margin;
    // Products string
    const productLines = order.orderItems.map(item => {
      let name = item.product.name;
      if (name.length > 28) name = name.slice(0, 25) + '...';
      return `${name} (x${item.quantity})`;
    });
    const productLineCount = productLines.length;
    // Calculate row height based on product lines, add extra space between lines
    const thisRowHeight = Math.max(rowHeight, productLineCount * 16);

    // Check if there is enough space for the row + reservedBottom
    if (y - thisRowHeight < margin + reservedBottom) {
      // Page break (do NOT draw total/footer here)
      page = pdfDoc.addPage([595, 842]);
      // Redraw background
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: bgColor,
      });
      // Redraw logo, title, date
      if (logoImage) {
        page.drawImage(logoImage, {
          x: margin,
          y: pageHeight - margin - 40,
          width: 80,
          height: 40,
        });
      }
      page.drawText('Orders Report', {
        x: margin + 90,
        y: pageHeight - margin - 10,
        size: 24,
        font: titleFont,
        color: accentColor,
      });
      page.drawText(
        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        {
          x: margin + 90,
          y: pageHeight - margin - 35,
          size: 12,
          font: bodyFont,
          color: textColor,
        }
      );
      y = pageHeight - margin - 60;
      drawTableHeader(page, y);
      y -= headerHeight;
    }
    // Alternate row color
    if (idx % 2 === 0) {
      page.drawRectangle({
        x,
        y: y - thisRowHeight,
        width: contentWidth,
        height: thisRowHeight,
        color: rowAlt,
      });
    }
    // Order ID
    let orderId = order.id;
    if (orderId.length > 18) orderId = orderId.slice(0, 15) + '...';
    page.drawText(orderId, {
      x: x + colPadding,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
      maxWidth: columns[0].width - colPadding * 2,
    });
    x += columns[0].width;

    // Client
    let clientName = order.client.name;
    if (clientName.length > 18) clientName = clientName.slice(0, 15) + '...';
    page.drawText(clientName, {
      x: x + colPadding,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
      maxWidth: columns[1].width - colPadding * 2,
    });
    x += columns[1].width;

    // Products (one per line, extra space)
    let productY = y - 15;
    for (const line of productLines) {
      page.drawText(line, {
        x: x + colPadding,
        y: productY,
        size: 10,
        font: bodyFont,
        color: textColor,
        maxWidth: columns[2].width - colPadding * 2,
      });
      productY -= 16;
    }
    x += columns[2].width;

    // Total (right-aligned in column, with smaller padding)
    const totalText = `$${order.price.toFixed(2)}`;
    const totalTextWidth = bodyFont.widthOfTextAtSize(totalText, 10);
    const totalColPadding = 8;
    // x is at the start of the Total column
    const totalX = x + columns[3].width - totalColPadding - totalTextWidth;
    page.drawText(totalText, {
      x: totalX,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
    });

    y -= thisRowHeight;
    totalSum += order.price;
  });

  // After the loop, always draw the total/footer on the last page
  drawTotalAndFooter(page, totalSum);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString('base64');
}
