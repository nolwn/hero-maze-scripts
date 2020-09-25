var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jimp from "jimp";
import fs from "fs";
const mapsOut = "./data/out";
function loadFiles(dirpath) {
    const fileName = `maps-${new Date().valueOf()}.json`;
    fs.readdir(dirpath, (_err, data) => __awaiter(this, void 0, void 0, function* () {
        const maps = [];
        for (const file of data) {
            const map = yield readImgFile([...dirpath.split("/"), file].join("/"));
            maps.push(map);
        }
        fs.writeFile(`${mapsOut}/${fileName}`, JSON.stringify(maps), {}, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Done");
            }
        });
    }));
}
function readImgFile(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const img = yield Jimp.read(filepath);
            const width = img.bitmap.width;
            const height = img.bitmap.height;
            let map = "";
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
            return map;
        }
        catch (e) {
            console.error(e);
        }
    });
}
// convert number to RGB format, e.g., 0x00ea09
function makeRGBHex(color) {
    let hex = color.toString(16);
    while (hex.length < 8) {
        hex = `0${hex}`; // 8 because it includes alpha
    }
    return `0x${hex}`.slice(0, 8); // remove alpha but still 8 because 0x added
}
loadFiles("./img/");
