import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const pageWidth = 822;
const pageHeight = 567;

const colors = {
  navy: hex("061027"),
  navy2: hex("0a1733"),
  ink: hex("121826"),
  gold: hex("c9aa5d"),
  gold2: hex("e1c778"),
  white: hex("fbfbfb"),
  soft: hex("f4efe3"),
  line: hex("7d6a3e"),
  muted: hex("a9b1c1"),
};

const outputPath = path.join(
  rootDir,
  "public",
  "images",
  "skilled",
  "australia",
  "australia-skilled-migration-brochure.pdf",
);

const sourcesChecked = [
  "Department of Home Affairs: Skilled Independent visa (subclass 189)",
  "Department of Home Affairs: Skilled Nominated visa (subclass 190)",
  "Department of Home Affairs: Skilled Work Regional (Provisional) visa (subclass 491)",
  "Department of Home Affairs: Employer Nomination Scheme visa (subclass 186)",
  "Department of Home Affairs: Regional Sponsored Migration Scheme (subclass 187)",
  "Department of Home Affairs: National Innovation visa (subclass 858)",
];

function hex(value) {
  const normalized = value.replace("#", "");
  const number = Number.parseInt(normalized, 16);
  return rgb(
    ((number >> 16) & 255) / 255,
    ((number >> 8) & 255) / 255,
    (number & 255) / 255,
  );
}

function publicPath(urlPath) {
  const cleanPath = urlPath.replace(/^\//, "").replace(/^public\//, "");
  return path.join(rootDir, "public", cleanPath.replace(/^images\//, "images/"));
}

function contentPath(relativePath) {
  return path.join(rootDir, relativePath);
}

async function readMdx(relativePath) {
  const raw = await fs.readFile(contentPath(relativePath), "utf8");
  return matter(raw).data;
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u2265/g, ">=")
    .replace(/\u2264/g, "<=")
    .replace(/\u00d7/g, "x")
    .replace(/\u2022/g, "-")
    .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toLines(text, font, size, maxWidth, maxLines = Infinity) {
  const paragraphs = cleanText(text).split(/\n+/).filter(Boolean);
  const lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
        continue;
      }

      if (current) {
        lines.push(current);
        current = word;
      } else {
        lines.push(word);
      }

      if (lines.length >= maxLines) {
        return withEllipsis(lines, font, size, maxWidth);
      }
    }

    if (current) {
      lines.push(current);
    }

    if (lines.length >= maxLines) {
      return withEllipsis(lines, font, size, maxWidth);
    }
  }

  return lines;
}

function withEllipsis(lines, font, size, maxWidth) {
  const limited = [...lines];
  let last = limited[limited.length - 1] ?? "";
  while (last.length > 0 && font.widthOfTextAtSize(`${last}...`, size) > maxWidth) {
    last = last.slice(0, -1);
  }
  limited[limited.length - 1] = `${last.trimEnd()}...`;
  return limited;
}

function drawText(page, text, options) {
  page.drawText(cleanText(text), options);
}

function drawWrapped(page, text, options) {
  const {
    x,
    y,
    maxWidth,
    size,
    font,
    lineHeight = size * 1.35,
    color = colors.white,
    maxLines = Infinity,
  } = options;
  const lines = toLines(text, font, size, maxWidth, maxLines);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
      characterSpacing: options.characterSpacing ?? 0,
    });
  });
  return y - lines.length * lineHeight;
}

function drawLabel(page, text, fonts, x, y, color = colors.gold) {
  page.drawLine({
    start: { x, y: y + 4 },
    end: { x: x + 28, y: y + 4 },
    color,
    thickness: 1,
  });
  page.drawText(cleanText(text).toUpperCase(), {
    x: x + 42,
    y,
    size: 8.8,
    font: fonts.bold,
    color,
    characterSpacing: 2.4,
  });
}

function drawRule(page, x, y, width, opacity = 0.35) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 0.7,
    color: colors.line,
    opacity,
  });
}

function drawChip(page, label, fonts, x, y, width, style = "dark") {
  const fill = style === "gold" ? colors.gold : colors.navy2;
  const textColor = style === "gold" ? colors.navy : colors.white;
  page.drawRectangle({
    x,
    y,
    width,
    height: 24,
    color: fill,
    borderColor: style === "gold" ? colors.gold : colors.gold,
    borderWidth: 0.7,
    opacity: style === "gold" ? 1 : 0.78,
  });
  const size = 8.2;
  const labelText = cleanText(label);
  page.drawText(labelText, {
    x: x + (width - fonts.bold.widthOfTextAtSize(labelText, size)) / 2,
    y: y + 8,
    size,
    font: fonts.bold,
    color: textColor,
  });
}

function drawBulletList(page, items, fonts, x, y, maxWidth, options = {}) {
  let cursorY = y;
  const size = options.size ?? 9.8;
  const lineHeight = options.lineHeight ?? size * 1.42;
  const color = options.color ?? colors.white;
  const maxItems = options.maxItems ?? items.length;

  for (const item of items.slice(0, maxItems)) {
    page.drawCircle({ x: x + 3.4, y: cursorY + 3.5, size: 2.2, color: colors.gold });
    const nextY = drawWrapped(page, item, {
      x: x + 13,
      y: cursorY,
      maxWidth,
      size,
      font: fonts.regular,
      lineHeight,
      color,
      maxLines: options.maxLinesPerItem ?? 2,
    });
    cursorY = nextY - 4;
  }
  return cursorY;
}

async function embedCoverImage(pdf, urlPath, width, height, position = "center") {
  const bytes = await sharp(publicPath(urlPath))
    .resize(Math.round(width * 2), Math.round(height * 2), { fit: "cover", position })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  return pdf.embedJpg(bytes);
}

function drawLogo(page, logo, x, y, width) {
  const height = logo.height * (width / logo.width);
  page.drawImage(logo, { x, y, width, height });
}

function drawPhoto(page, image, x, y, width, height, border = true) {
  page.drawImage(image, { x, y, width, height });
  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderColor: colors.gold,
    borderWidth: border ? 0.6 : 0,
    opacity: border ? 0.55 : 0,
  });
}

function drawStat(page, value, label, fonts, x, y, width) {
  drawText(page, value, {
    x,
    y,
    size: 22,
    font: fonts.bold,
    color: colors.gold,
  });
  page.drawText(cleanText(label).toUpperCase(), {
    x,
    y: y - 18,
    size: 7.5,
    font: fonts.bold,
    color: colors.muted,
    characterSpacing: 1.4,
  });
  page.drawLine({
    start: { x: x + width - 10, y: y + 18 },
    end: { x: x + width - 10, y: y - 24 },
    thickness: 0.5,
    color: colors.gold,
    opacity: 0.28,
  });
}

function drawPageHeader(page, title, fonts, logo) {
  drawLogo(page, logo, 48, pageHeight - 70, 72);
  drawLabel(page, "Australia skilled migration", fonts, 166, pageHeight - 45);
  drawText(page, title, {
    x: 166,
    y: pageHeight - 78,
    size: 22,
    font: fonts.serif,
    color: colors.white,
  });
  drawRule(page, 48, pageHeight - 94, pageWidth - 96, 0.4);
}

function drawContactStrip(page, fonts) {
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 104, color: colors.navy });
  page.drawRectangle({ x: 0, y: 102, width: pageWidth, height: 1.2, color: colors.gold });

  drawText(page, "XIPHIAS Immigration", {
    x: 48,
    y: 72,
    size: 18,
    font: fonts.serif,
    color: colors.white,
  });
  drawText(page, "Bengaluru HQ", {
    x: 48,
    y: 50,
    size: 8.5,
    font: fonts.bold,
    color: colors.gold,
    characterSpacing: 1.5,
  });
  drawWrapped(
    page,
    "1st Floor, JK Nirmala Arcade, Plot no. 780, 80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    {
      x: 48,
      y: 34,
      maxWidth: 330,
      size: 8.4,
      font: fonts.regular,
      lineHeight: 10.6,
      color: colors.white,
      maxLines: 3,
    },
  );

  drawText(page, "Contact", {
    x: 436,
    y: 72,
    size: 8.5,
    font: fonts.bold,
    color: colors.gold,
    characterSpacing: 1.5,
  });
  drawText(page, "+91 9021335577", {
    x: 436,
    y: 52,
    size: 10.2,
    font: fonts.bold,
    color: colors.white,
  });
  drawText(page, "immigration@xiphias.in", {
    x: 436,
    y: 34,
    size: 10.2,
    font: fonts.regular,
    color: colors.white,
  });
  drawText(page, "www.xiphiasimmigration.com", {
    x: 436,
    y: 16,
    size: 10.2,
    font: fonts.regular,
    color: colors.white,
  });

  drawText(page, "Dubai | Bengaluru | Gurugram | London | Waterloo", {
    x: 616,
    y: 52,
    size: 8.4,
    font: fonts.bold,
    color: colors.gold2,
  });
  drawWrapped(
    page,
    "General information only. Requirements, fees, invitation rounds, and processing priorities can change. Confirm eligibility before filing.",
    {
      x: 616,
      y: 34,
      maxWidth: 156,
      size: 7.4,
      font: fonts.regular,
      lineHeight: 9,
      color: colors.muted,
      maxLines: 4,
    },
  );
}

function drawPathwayCard(page, item, fonts, image, x, y, width, height) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: colors.white,
    opacity: 0.98,
  });
  drawPhoto(page, image, x, y + height - 52, width, 52, false);
  page.drawRectangle({
    x,
    y: y + height - 52,
    width,
    height: 52,
    color: colors.navy,
    opacity: 0.52,
  });
  drawText(page, item.kicker, {
    x: x + 14,
    y: y + height - 30,
    size: 8,
    font: fonts.bold,
    color: colors.gold2,
    characterSpacing: 1.3,
  });
  drawWrapped(page, item.title, {
    x: x + 14,
    y: y + height - 68,
    maxWidth: width - 28,
    size: 12.2,
    font: fonts.bold,
    lineHeight: 14,
    color: colors.ink,
    maxLines: 2,
  });
  drawWrapped(page, item.copy, {
    x: x + 14,
    y: y + height - 104,
    maxWidth: width - 28,
    size: 8.8,
    font: fonts.regular,
    lineHeight: 11.8,
    color: colors.ink,
    maxLines: 4,
  });
  page.drawRectangle({ x, y, width: 4, height, color: item.accent ?? colors.gold });
}

function drawProcessStep(page, number, title, copy, fonts, x, y) {
  page.drawCircle({ x, y: y + 3, size: 12.5, color: colors.gold });
  drawText(page, String(number), {
    x: x - (number >= 10 ? 5 : 3),
    y: y - 1,
    size: 10,
    font: fonts.bold,
    color: colors.navy,
  });
  drawText(page, title, {
    x: x + 28,
    y: y + 6,
    size: 10.8,
    font: fonts.bold,
    color: colors.white,
  });
  drawWrapped(page, copy, {
    x: x + 28,
    y: y - 9,
    maxWidth: 276,
    size: 8.3,
    font: fonts.regular,
    lineHeight: 10.3,
    color: colors.muted,
    maxLines: 2,
  });
}

async function main() {
  const pdf = await PDFDocument.create();
  pdf.setTitle("Australia Skilled Migration Brochure");
  pdf.setAuthor("XIPHIAS Immigration");
  pdf.setSubject("Australia skilled migration pathways brochure");

  const fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
    serif: await pdf.embedFont(StandardFonts.TimesRoman),
    serifItalic: await pdf.embedFont(StandardFonts.TimesRomanItalic),
    serifBold: await pdf.embedFont(StandardFonts.TimesRomanBold),
  };

  const logo = await pdf.embedPng(
    await fs.readFile(path.join(rootDir, "public", "images", "logo", "xiphias-immigration-white.png")),
  );

  const country = await readMdx("content/skilled/australia/_country.mdx");
  const hero = await embedCoverImage(
    pdf,
    "/images/skilled/australia/skilled-australia-xiphias-immigration.webp",
    pageWidth,
    pageHeight,
    "center",
  );
  const overviewPhoto = await embedCoverImage(
    pdf,
    "/images/skilled/australia/australia-189-independent-visa.webp",
    324,
    348,
    "center",
  );

  const pathwayImages = await Promise.all([
    embedCoverImage(pdf, "/images/skilled/australia/australia-189-independent-visa.webp", 226, 52, "center"),
    embedCoverImage(pdf, "/images/skilled/australia/australia-190-state-visa.webp", 226, 52, "center"),
    embedCoverImage(pdf, "/images/skilled/australia/australia-491-skilled-visa.webp", 226, 52, "center"),
    embedCoverImage(pdf, "/images/skilled/australia/australia-186-employer-visa.webp", 226, 52, "center"),
    embedCoverImage(pdf, "/images/skilled/australia/australia-187-regional-visa.webp", 226, 52, "center"),
    embedCoverImage(pdf, "/images/skilled/australia/australia-858-talent-visa.png", 226, 52, "center"),
  ]);

  const pathways = [
    {
      kicker: "Subclass 189",
      title: "Skilled Independent PR",
      copy: "Points-tested permanent residence for invited skilled applicants without employer, state, or territory sponsorship.",
    },
    {
      kicker: "Subclass 190",
      title: "Skilled Nominated PR",
      copy: "Permanent residence through state or territory nomination for profiles aligned with local skills demand.",
    },
    {
      kicker: "Subclass 491",
      title: "Skilled Work Regional",
      copy: "Regional provisional pathway for nominated or family-sponsored skilled workers, with a PR route through Subclass 191.",
    },
    {
      kicker: "Subclass 186",
      title: "Employer Nomination Scheme",
      copy: "Employer-sponsored permanent residence for skilled professionals nominated for approved full-time roles.",
    },
    {
      kicker: "Subclass 187",
      title: "Regional Sponsored - Transitional",
      copy: "Closed to most new applicants; transitional RSMS cases remain relevant for eligible 457/482 workers.",
    },
    {
      kicker: "Subclass 858",
      title: "National Innovation Visa",
      copy: "Invitation-led permanent visa for exceptional talent, researchers, entrepreneurs, investors, athletes, and creatives.",
    },
  ];

  // Page 1
  {
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawImage(hero, { x: 0, y: 0, width: pageWidth, height: pageHeight });
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.navy, opacity: 0.64 });
    page.drawRectangle({ x: 0, y: 0, width: 452, height: pageHeight, color: colors.navy, opacity: 0.47 });
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 170, color: colors.navy, opacity: 0.45 });
    drawLogo(page, logo, 48, 482, 88);

    drawLabel(page, "Australia skilled migration", fonts, 64, 388);
    drawText(page, "Australia", {
      x: 64,
      y: 326,
      size: 52,
      font: fonts.serif,
      color: colors.white,
    });
    drawText(page, "Skilled Migration", {
      x: 64,
      y: 280,
      size: 42,
      font: fonts.serifItalic,
      color: colors.gold,
    });
    drawWrapped(
      page,
      country.summary ??
        "A practical route for qualified professionals pursuing permanent residence through points-tested, nominated, employer-sponsored, regional, or innovation pathways.",
      {
        x: 66,
        y: 240,
        maxWidth: 440,
        size: 12.4,
        font: fonts.regular,
        lineHeight: 17,
        color: colors.white,
        maxLines: 4,
      },
    );
    drawChip(page, "Book a Private Consultation", fonts, 66, 168, 190, "gold");
    drawChip(page, "Check Eligibility", fonts, 270, 168, 150);
    drawChip(page, "SkillSelect", fonts, 66, 126, 94);
    drawChip(page, "Skills Assessment", fonts, 171, 126, 128);
    drawChip(page, "State Nomination", fonts, 310, 126, 128);
    drawChip(page, "Employer Pathways", fonts, 449, 126, 132);
    drawRule(page, 64, 96, 510, 0.35);
    drawStat(page, "65+", "points threshold", fonts, 66, 56, 120);
    drawStat(page, "189/190", "PR routes", fonts, 194, 56, 120);
    drawStat(page, "491", "regional option", fonts, 322, 56, 120);
    drawStat(page, "858", "innovation visa", fonts, 450, 56, 120);
    drawText(page, "Prepared for skilled professionals planning Australia PR", {
      x: 612,
      y: 42,
      size: 8,
      font: fonts.bold,
      color: colors.gold2,
      characterSpacing: 1,
    });
  }

  // Page 2
  {
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.navy });
    drawPageHeader(page, "Why Australia", fonts, logo);
    drawPhoto(page, overviewPhoto, 48, 118, 324, 348);
    page.drawRectangle({ x: 48, y: 118, width: 324, height: 130, color: colors.navy, opacity: 0.66 });
    drawText(page, "Points-based pathways", {
      x: 72,
      y: 204,
      size: 23,
      font: fonts.serif,
      color: colors.white,
    });
    drawWrapped(page, "A structured route for skilled professionals, families, and globally mobile talent.", {
      x: 72,
      y: 176,
      maxWidth: 252,
      size: 10.4,
      font: fonts.regular,
      lineHeight: 14,
      color: colors.white,
      maxLines: 3,
    });

    drawText(page, "Overview", {
      x: 420,
      y: 424,
      size: 28,
      font: fonts.serif,
      color: colors.white,
    });
    drawWrapped(page, country.overview, {
      x: 420,
      y: 388,
      maxWidth: 330,
      size: 10.3,
      font: fonts.regular,
      lineHeight: 14.5,
      color: colors.muted,
      maxLines: 9,
    });
    drawText(page, "Key advantages", {
      x: 420,
      y: 238,
      size: 15.5,
      font: fonts.bold,
      color: colors.gold,
    });
    drawBulletList(page, country.keyPoints ?? [], fonts, 420, 212, 322, {
      size: 9.2,
      lineHeight: 12.8,
      color: colors.white,
      maxItems: 5,
      maxLinesPerItem: 1,
    });

    page.drawRectangle({ x: 48, y: 42, width: 726, height: 48, color: colors.white, opacity: 0.08 });
    [
      ["Capital", "Canberra"],
      ["Language", "English"],
      ["Currency", "AUD"],
      ["System", "SkillSelect"],
    ].forEach(([label, value], index) => {
      const x = 72 + index * 176;
      drawText(page, label, {
        x,
        y: 67,
        size: 7.5,
        font: fonts.bold,
        color: colors.gold,
        characterSpacing: 1.4,
      });
      drawText(page, value, {
        x,
        y: 50,
        size: 12,
        font: fonts.bold,
        color: colors.white,
      });
    });
  }

  // Page 3
  {
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.soft });
    page.drawRectangle({ x: 0, y: pageHeight - 108, width: pageWidth, height: 108, color: colors.navy });
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 92, color: colors.navy });
    drawLogo(page, logo, 48, pageHeight - 70, 72);
    drawLabel(page, "Pathway map", fonts, 166, pageHeight - 45, colors.gold);
    drawText(page, "Australia Skilled Visa Pathways", {
      x: 166,
      y: pageHeight - 78,
      size: 22,
      font: fonts.serif,
      color: colors.white,
    });
    drawRule(page, 48, pageHeight - 94, pageWidth - 96, 0.35);

    const positions = [
      [48, 344],
      [298, 344],
      [548, 344],
      [48, 152],
      [298, 152],
      [548, 152],
    ];
    pathways.forEach((item, index) => {
      drawPathwayCard(page, item, fonts, pathwayImages[index], positions[index][0], positions[index][1], 226, 154);
    });

    page.drawRectangle({ x: 48, y: 44, width: 726, height: 64, color: colors.navy, opacity: 0.95 });
    drawText(page, "Advisory note", {
      x: 70,
      y: 78,
      size: 10,
      font: fonts.bold,
      color: colors.gold,
      characterSpacing: 1.2,
    });
    drawWrapped(
      page,
      "Visa criteria, occupation lists, fees, invitation rounds, and stream availability change frequently. XIPHIAS maps the right route after checking your profile, evidence, and current policy position.",
      {
        x: 176,
        y: 82,
        maxWidth: 554,
        size: 9.3,
        font: fonts.regular,
        lineHeight: 12.2,
        color: colors.white,
        maxLines: 3,
      },
    );
  }

  // Page 4
  {
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colors.navy2 });
    drawPageHeader(page, "Process & Contact", fonts, logo);

    drawText(page, "How the process works", {
      x: 48,
      y: 430,
      size: 27,
      font: fonts.serif,
      color: colors.white,
    });
    const steps = [
      ["Profile review", "Assess age, occupation, points, work history, language, family, and route fit."],
      ["Evidence plan", "Map skills assessment, English tests, employment proof, and civil documents."],
      ["EOI or nomination", "Prepare SkillSelect, state nomination, employer sponsorship, or NIV invitation strategy."],
      ["Visa lodgement", "Submit the application with complete documentation, declarations, and fee guidance."],
      ["Decision support", "Track health, character, biometrics, further requests, and post-grant planning."],
    ];
    steps.forEach(([title, copy], index) => {
      drawProcessStep(page, index + 1, title, copy, fonts, 62, 382 - index * 54);
    });

    page.drawRectangle({ x: 420, y: 168, width: 354, height: 278, color: colors.white, opacity: 0.08 });
    drawText(page, "Why XIPHIAS", {
      x: 448,
      y: 410,
      size: 24,
      font: fonts.serif,
      color: colors.white,
    });
    drawWrapped(page, country.whyChooseXiphias, {
      x: 448,
      y: 374,
      maxWidth: 284,
      size: 9.7,
      font: fonts.regular,
      lineHeight: 13.4,
      color: colors.muted,
      maxLines: 7,
    });
    drawText(page, "Checklist focus", {
      x: 448,
      y: 264,
      size: 11,
      font: fonts.bold,
      color: colors.gold,
      characterSpacing: 1.2,
    });
    drawBulletList(
      page,
      [
        "Skills assessment and occupation alignment",
        "English test and points strategy",
        "EOI, nomination, employer, or innovation route",
        "Family, health, character, and settlement documents",
      ],
      fonts,
      448,
      238,
      276,
      {
        size: 8.9,
        lineHeight: 11.8,
        color: colors.white,
        maxLinesPerItem: 1,
      },
    );

    drawWrapped(page, `Sources checked: ${sourcesChecked.join("; ")}.`, {
      x: 48,
      y: 128,
      maxWidth: 704,
      size: 6.8,
      font: fonts.regular,
      lineHeight: 8.4,
      color: colors.muted,
      maxLines: 3,
    });
    drawContactStrip(page, fonts);
  }

  await fs.writeFile(outputPath, await pdf.save());
  console.log(`Generated ${path.relative(rootDir, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
