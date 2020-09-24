import Jimp from "jimp";

async function readImgFile(filepath: string) {
	try {
		const img = await Jimp.read(filepath);
		const width = img.bitmap.width;
		const height = img.bitmap.height;
		let map: string = "";

		for (let y = 0; y < width; y++) {
			let row = "";
			for (let x = 0; x < height; x++) {
				const color = makeRGBHex(img.getPixelColor(x, y));

				switch (color.toLowerCase()) {
					case "0x000000":
						row += "#";
						break;
					case "0xffffff":
						row += ".";
						break;
					case "0x00ff00":
						row += "e";
						break;
					case "0x00ffff":
						row += "@";
						break;
					case "0xffc33d":
						row += "*";
						break;
					default:
						throw new Error("I don't know what the Hell this color means.");
				}
			}
			map += `${row}\n`;
		}
		console.log(map);

		return map;
	} catch (e) {
		console.error(e);
	}
}

// convert number to RGB format, e.g., 0x00ea09
function makeRGBHex(color: number): string {
	let hex = color.toString(16);
	while (hex.length < 8) {
		hex = `0${hex}`; // 8 because it includes alpha
	}

	return `0x${hex}`.slice(0, 8); // remove alpha but still 8 because 0x added
}

readImgFile("./img/maps.png");
