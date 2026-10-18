import sharp from "sharp";
import fs from "fs";
const SRC = process.argv[2], OUT = process.argv[3];
const jobs = { Concrete034: "concrete", Asphalt031: "asphalt", PaintedPlaster017: "plaster", CorrugatedSteel005: "zinc", Metal063: "rustmetal" };
for (const [id, name] of Object.entries(jobs)) {
  const f = (m) => `${SRC}/${id}/${id}_1K-JPG_${m}.jpg`;
  await sharp(f("Color")).resize(1024, 1024).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}_color.jpg`);
  await sharp(f("NormalGL")).resize(512, 512).jpeg({ quality: 85, mozjpeg: true }).toFile(`${OUT}/${name}_normal.jpg`);
  await sharp(f("Roughness")).resize(512, 512).greyscale().jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}_rough.jpg`);
}
for (const f of fs.readdirSync(OUT)) console.log(f, fs.statSync(`${OUT}/${f}`).size);
