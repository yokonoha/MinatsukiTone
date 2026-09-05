/////////////////////////////////////
////    YOKOHA FLAC Inspector   ////
//(c)Y.Yokoha All Rights Reserved.//
////////////////////////////////////
async function ykhfi(file) {
    const buffer = await file.arrayBuffer();
    const data = new DataView(buffer);
    if (data.byteLength < 4) {
        console.log("[YKH_FI]ERR: This file is too small./ <4byte");
        return { tags: { na: "1" } };
    }
    const signatureofflac = String.fromCharCode(data.getUint8(0), data.getUint8(1), data.getUint8(2), data.getUint8(3));
    if (signatureofflac !== "fLaC") {
        console.log("[YKH_FI]ERR: Unable to find the signature of flac files. / 4 byte signature not found.(fLaC)");
        return { tags: { na: "1" } };
    }


    let cpos = 4;
    let tags = {};


    while (cpos + 4 <= data.byteLength) {


        const header = data.getUint8(cpos);

        const isLSTorNOT = (header & 0x80) !== 0;

        const typenum = header & 0x7f;


        const metadatacontainerlength = (data.getUint8(cpos + 1) << 16) | (data.getUint8(cpos + 2) << 8) | data.getUint8(cpos + 3);

        cpos += 4;

        if (cpos + metadatacontainerlength > data.byteLength) {
            console.log("[YKH_FI]ERR: Your file may be corrupted./Interrupted because the reported size of the metadata length is not correct.");
            return { tags: { na: "1" } };
        }


        if (typenum === 4) {
            const metadatablock = new DataView(buffer, cpos, metadatacontainerlength);
            tags = analyzeVORBISCOMMENT(metadatablock);
            break;
        }

        cpos += metadatacontainerlength;

        if (isLSTorNOT) {
            console.log("[YKH_FI]Metadata are missing./ No Entry (VORBIS COMMENT [TYP NUM4])");
            return { tags: { na: "1" } };
            break;
        }
    }
    return { tags };
}

function analyzeVORBISCOMMENT(data) {
    let cpos2 = 0;

    function LEread() {
        if (cpos2 + 4 > data.byteLength) {
            console.log("[YKH_FI]ERR: Your file may be corrupted./Interrupted because the reported size of the VORBIS_COMMENT metadata length is not correct. V1");
            return { tags: { na: "1" } };
        }
        const v = data.getUint32(cpos2, true);
        cpos2 += 4;
        return v;
    }
    function decode2str(len) {
        if (cpos2 + len > data.byteLength) {
            console.log("[YKH_FI]ERR: Your file may be corrupted./Interrupted because the reported size of the VORBIS_COMMENT metadata length is not correct. V2");
            return { tags: { na: "1" } };
        }
        const targetbytes = new Uint8Array(data.buffer, data.byteOffset + cpos2, len);
        cpos2 += len;
        return new TextDecoder("utf-8").decode(targetbytes);
    }



    const vendorcntlen = LEread();
    decode2str(vendorcntlen);
    const cmtcount = LEread();
    const tags = {};
    for (let index = 0; index < cmtcount; index++) {
        const len = LEread();
        const txtdata = decode2str(len);
        const sepa = txtdata.indexOf("=");
        if (sepa === -1) {
            continue;
        }
        const k1 = txtdata.substring(0, sepa).toUpperCase();
        const v1 = txtdata.substring(sepa + 1);
        if (!tags[k1]) {
            tags[k1] = [];
        }
        tags[k1].push(v1);
    }
    return tags;
}

async function getfMetadata(file) {
    const { tags } = await ykhfi(file);
    return tags;
}