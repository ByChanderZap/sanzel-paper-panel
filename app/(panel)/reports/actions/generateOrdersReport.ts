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

  // Table header
  const columns = [
    { title: 'Order ID', width: 100 },
    { title: 'Client', width: 120 },
    { title: 'Products', width: 220 },
    { title: 'Total', width: 80 },
  ];
  const headerHeight = 28;
  let x = margin;

  // Header background
  page.drawRectangle({
    x,
    y: y - headerHeight,
    width: contentWidth,
    height: headerHeight,
    color: headerBg,
    borderColor: accentColor,
    borderWidth: 2,
  });

  // Header text
  columns.forEach((col) => {
    page.drawText(col.title, {
      x,
      y: y - 18,
      size: 12,
      font: titleFont,
      color: accentColor,
    });
    x += col.width;
  });

  y -= headerHeight;

  // Table rows
  const rowHeight = 22;
  let totalSum = 0;
  orders.forEach((order, idx) => {
    x = margin;
    // Alternate row color
    if (idx % 2 === 0) {
      page.drawRectangle({
        x,
        y: y - rowHeight,
        width: contentWidth,
        height: rowHeight,
        color: rowAlt,
      });
    }
    // Order ID
    page.drawText(order.id, {
      x,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
      maxWidth: columns[0].width - 8,
    });
    x += columns[0].width;

    // Client
    page.drawText(order.client.name, {
      x,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
      maxWidth: columns[1].width - 8,
    });
    x += columns[1].width;

    // Products
    const productsStr = order.orderItems
      .map((item) => `${item.product.name} (x${item.quantity})`)
      .join(', ');
    page.drawText(productsStr, {
      x,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
      maxWidth: columns[2].width - 8,
    });
    x += columns[2].width;

    // Total
    page.drawText(`$${order.price.toFixed(2)}`, {
      x,
      y: y - 15,
      size: 10,
      font: bodyFont,
      color: textColor,
    });

    y -= rowHeight;
    totalSum += order.price;

    // Add new page if needed
    if (y < margin + 60) {
      page = pdfDoc.addPage([595, 842]);
      // Redraw background
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: bgColor,
      });
      y = pageHeight - margin;
    }
  });

  // Total sum at the bottom
  y -= 20;
  page.drawText('Total Revenue:', {
    x: margin + contentWidth - 200,
    y: y,
    size: 14,
    font: titleFont,
    color: accentColor,
  });
  page.drawText(`$${totalSum.toFixed(2)}`, {
    x: margin + contentWidth - 80,
    y: y,
    size: 14,
    font: titleFont,
    color: accentColor,
  });

  // Footer
  page.drawText(`Generated on ${new Date().toLocaleString()}`, {
    x: margin,
    y: 30,
    size: 8,
    font: bodyFont,
    color: textColor,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString('base64');
}
