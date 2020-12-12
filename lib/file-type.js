// https://en.wikipedia.org/wiki/List_of_file_signatures
// https://github.com/sindresorhus/file-type/blob/master/core.js

function fromBuffer(buff) {
  const arr = Array.from(buff);
  function check(testArr, options = {}) {
    let offset = 0;
    if ("offset" in options)
      offset = options.offset;
    for (let i in testArr)
      if (testArr[i] != arr[+i + offset] || testArr[i] == '?')
        return false;
    return true;
  }
  function checkString(str) {
    return check(Array.from(Buffer.from(str)));
  }
  if (check([0x42, 0x4D])) {
    return {
      ext: 'bmp',
      mime: 'image/bmp'
    };
  }

  if (check([0x0B, 0x77])) {
    return {
      ext: 'ac3',
      mime: 'audio/vnd.dolby.dd-raw'
    };
  }

  if (check([0x78, 0x01])) {
    return {
      ext: 'dmg',
      mime: 'application/x-apple-diskimage'
    };
  }

  if (check([0x4D, 0x5A])) {
    return {
      ext: 'exe',
      mime: 'application/x-msdownload'
    };
  }

  if (check([0x1F, 0xA0]) || check([0x1F, 0x9D])) {
    return {
      ext: 'Z',
      mime: 'application/x-compress'
    };
  }

  if (check([0xFF, 0xD8, 0xFF])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg'
    };
  }

  if (check([0x49, 0x49, 0xBC])) {
    return {
      ext: 'jxr',
      mime: 'image/vnd.ms-photo'
    };
  }

  if (check([0x1F, 0x8B, 0x8])) {
    return {
      ext: 'gz',
      mime: 'application/gzip'
    };
  }

  if (check([0x42, 0x5A, 0x68])) {
    return {
      ext: 'bz2',
      mime: 'application/x-bzip2'
    };
  }

  if (checkString('ID3')) {
    return {
      ext: 'mp3',
      mime: 'audio/mpeg'
    };
  }
  if (checkString('MP+')) {
    return {
      ext: 'mpc',
      mime: 'audio/x-musepack'
    };
  }

  if ((arr[0] == 0x43 || arr[0] == 0x46) && check([0x57, 0x53], { offset: 1 })) {
    return {
      ext: 'swf',
      mime: 'application/x-shockwave-flash'
    };
  }

  if (check([0x47, 0x49, 0x46])) {
    return {
      ext: 'gif',
      mime: 'image/gif'
    };
  }

  if (checkString('FLIF')) {
    return {
      ext: 'flif',
      mime: 'image/flif'
    };
  }

  if (checkString('8BPS')) {
    return {
      ext: 'psd',
      mime: 'image/vnd.adobe.photoshop'
    };
  }

  if (checkString('WEBP', { offset: 8 })) {
    return {
      ext: 'webp',
      mime: 'image/webp'
    };
  }

  if (checkString('MPCK')) {
    return {
      ext: 'mpc',
      mime: 'audio/x-musepack'
    };
  }

  if (checkString('FORM')) {
    return {
      ext: 'aif',
      mime: 'audio/aiff'
    };
  }

  if (checkString('icns')) {
    return {
      ext: 'icns',
      mime: 'image/icns'
    };
  }

  if (check([0x50, 0x4B, 0x3, 0x4])) {
    return {
      ext: 'zip',
      mime: 'application/zip'
    };
  }

  if (checkString('OggS')) {
    return {
      ext: 'ogx',
      mime: 'application/ogg'
    };
  }

  if (check([0x50, 0x4B]) && (arr[2] == 0x3 || arr[2] == 0x5 || arr[2] == 0x7) && (arr[3] == 0x4 || arr[3] == 0x6 || arr[3] == 0x8)) {
    return {
      ext: 'zip',
      mime: 'application/zip'
    };
  }

  if (
    checkString('ftyp', { offset: 4 }) &&
    (arr[8] & 0x60) != 0x00
  ) {
    const brandMajor = Buffer.from(arr).toString('binary', 8, 12).replace('\0', ' ').trim();
    switch (brandMajor) {
      case 'avif':
        return { ext: 'avif', mime: 'image/avif' };
      case 'mif1':
        return { ext: 'heic', mime: 'image/heif' };
      case 'msf1':
        return { ext: 'heic', mime: 'image/heif-sequence' };
      case 'heic':
      case 'heix':
        return { ext: 'heic', mime: 'image/heic' };
      case 'hevc':
      case 'hevx':
        return { ext: 'heic', mime: 'image/heic-sequence' };
      case 'qt':
        return { ext: 'mov', mime: 'video/quicktime' };
      case 'M4V':
      case 'M4VH':
      case 'M4VP':
        return { ext: 'm4v', mime: 'video/x-m4v' };
      case 'M4P':
        return { ext: 'm4p', mime: 'video/mp4' };
      case 'M4B':
        return { ext: 'm4b', mime: 'audio/mp4' };
      case 'M4A':
        return { ext: 'm4a', mime: 'audio/x-m4a' };
      case 'F4V':
        return { ext: 'f4v', mime: 'video/mp4' };
      case 'F4P':
        return { ext: 'f4p', mime: 'video/mp4' };
      case 'F4A':
        return { ext: 'f4a', mime: 'audio/mp4' };
      case 'F4B':
        return { ext: 'f4b', mime: 'audio/mp4' };
      case 'crx':
        return { ext: 'cr3', mime: 'image/x-canon-cr3' };
      default:
        if (brandMajor.startsWith('3g')) {
          if (brandMajor.startsWith('3g2')) {
            return { ext: '3g2', mime: 'video/3gpp2' };
          }

          return { ext: '3gp', mime: 'video/3gpp' };
        }

        return { ext: 'mp4', mime: 'video/mp4' };
    }
  }

  if (checkString('MThd')) {
    return {
      ext: 'mid',
      mime: 'audio/midi'
    };
  }

  if (
    checkString('wOFF') &&
    (
      check([0x00, 0x01, 0x00, 0x00], { offset: 4 }) ||
      checkString('OTTO', { offset: 4 })
    )
  ) {
    return {
      ext: 'woff',
      mime: 'font/woff'
    };
  }

  if (
    checkString('wOF2') &&
    (
      check([0x00, 0x01, 0x00, 0x00], { offset: 4 }) ||
      checkString('OTTO', { offset: 4 })
    )
  ) {
    return {
      ext: 'woff2',
      mime: 'font/woff2'
    };
  }

  if (check([0xD4, 0xC3, 0xB2, 0xA1]) || check([0xA1, 0xB2, 0xC3, 0xD4])) {
    return {
      ext: 'pcap',
      mime: 'application/vnd.tcpdump.pcap'
    };
  }

  if (checkString('DSD ')) {
    return {
      ext: 'dsf',
      mime: 'audio/x-dsf'
    };
  }

  if (checkString('LZIP')) {
    return {
      ext: 'lz',
      mime: 'application/x-lzip'
    };
  }

  if (checkString('fLaC')) {
    return {
      ext: 'flac',
      mime: 'audio/x-flac'
    };
  }

  if (check([0x42, 0x50, 0x47, 0xFB])) {
    return {
      ext: 'bpg',
      mime: 'image/bpg'
    };
  }

  if (checkString('wvpk')) {
    return {
      ext: 'wv',
      mime: 'audio/wavpack'
    };
  }

  if (checkString('%PDF')) {
    return {
      ext: 'pdf',
      mime: 'application/pdf'
    };
  }

  if (check([0x00, 0x61, 0x73, 0x6D])) {
    return {
      ext: 'wasm',
      mime: 'application/wasm'
    };
  }

  if (check([0x49, 0x49, 0x2A, 0x0])) {
    if (checkString('CR', { offset: 8 })) {
      return {
        ext: 'cr2',
        mime: 'image/x-canon-cr2'
      };
    }

    if (check([0x1C, 0x00, 0xFE, 0x00], { offset: 8 }) || check([0x1F, 0x00, 0x0B, 0x00], { offset: 8 })) {
      return {
        ext: 'nef',
        mime: 'image/x-nikon-nef'
      };
    }

    if (
      check([0x08, 0x00, 0x00, 0x00], { offset: 4 }) &&
      (check([0x2D, 0x00, 0xFE, 0x00], { offset: 8 }) ||
        check([0x27, 0x00, 0xFE, 0x00], { offset: 8 }))
    ) {
      return {
        ext: 'dng',
        mime: 'image/x-adobe-dng'
      };
    }

    return {
      ext: 'tif',
      mime: 'image/tiff'
    };
  }

  if (check([0x4D, 0x4D, 0x0, 0x2A])) {
    return {
      ext: 'tif',
      mime: 'image/tiff'
    };
  }

  if (checkString('MAC ')) {
    return {
      ext: 'ape',
      mime: 'audio/ape'
    };
  }

  if (check([0x1A, 0x45, 0xDF, 0xA3])) {
    return {
      ext: 'webm',
      mime: 'video/webm'
    };
  }

  if (check([0x52, 0x49, 0x46, 0x46])) {
    if (check([0x41, 0x56, 0x49], { offset: 8 })) {
      return {
        ext: 'avi',
        mime: 'video/vnd.avi'
      };
    }

    if (check([0x57, 0x41, 0x56, 0x45], { offset: 8 })) {
      return {
        ext: 'wav',
        mime: 'audio/vnd.wave'
      };
    }

    if (check([0x51, 0x4C, 0x43, 0x4D], { offset: 8 })) {
      return {
        ext: 'qcp',
        mime: 'audio/qcelp'
      };
    }
  }

  if (checkString('SQLi')) {
    return {
      ext: 'sqlite',
      mime: 'application/x-sqlite3'
    };
  }

  if (check([0x4E, 0x45, 0x53, 0x1A])) {
    return {
      ext: 'nes',
      mime: 'application/x-nintendo-nes-rom'
    };
  }

  if (checkString('Cr24')) {
    return {
      ext: 'crx',
      mime: 'application/x-google-chrome-extension'
    };
  }

  if (
    checkString('MSCF') ||
    checkString('ISc(')
  ) {
    return {
      ext: 'cab',
      mime: 'application/vnd.ms-cab-compressed'
    };
  }

  if (check([0xED, 0xAB, 0xEE, 0xDB])) {
    return {
      ext: 'rpm',
      mime: 'application/x-rpm'
    };
  }

  if (check([0xC5, 0xD0, 0xD3, 0xC6])) {
    return {
      ext: 'eps',
      mime: 'application/eps'
    };
  }


  if (check([0x4F, 0x54, 0x54, 0x4F, 0x00])) {
    return {
      ext: 'otf',
      mime: 'font/otf'
    };
  }

  if (checkString('#!AMR')) {
    return {
      ext: 'amr',
      mime: 'audio/amr'
    };
  }

  if (checkString('{\\rtf')) {
    return {
      ext: 'rtf',
      mime: 'application/rtf'
    };
  }

  if (check([0x46, 0x4C, 0x56, 0x01])) {
    return {
      ext: 'flv',
      mime: 'video/x-flv'
    };
  }

  if (checkString('IMPM')) {
    return {
      ext: 'it',
      mime: 'audio/x-it'
    };
  }

  if (
    checkString('-lh0-', { offset: 2 }) ||
    checkString('-lh1-', { offset: 2 }) ||
    checkString('-lh2-', { offset: 2 }) ||
    checkString('-lh3-', { offset: 2 }) ||
    checkString('-lh4-', { offset: 2 }) ||
    checkString('-lh5-', { offset: 2 }) ||
    checkString('-lh6-', { offset: 2 }) ||
    checkString('-lh7-', { offset: 2 }) ||
    checkString('-lzs-', { offset: 2 }) ||
    checkString('-lz4-', { offset: 2 }) ||
    checkString('-lz5-', { offset: 2 }) ||
    checkString('-lhd-', { offset: 2 })
  ) {
    return {
      ext: 'lzh',
      mime: 'application/x-lzh-compressed'
    };
  }



  if (check([0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00])) {
    return {
      ext: 'xz',
      mime: 'application/x-xz'
    };
  }

  if (checkString('<?xml ')) {
    return {
      ext: 'xml',
      mime: 'application/xml'
    };
  }

  if (checkString('BEGIN:')) {
    return {
      ext: 'ics',
      mime: 'text/calendar'
    };
  }

  if (check([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C])) {
    return {
      ext: '7z',
      mime: 'application/x-7z-compressed'
    };
  }

  if (
    check([0x52, 0x61, 0x72, 0x21, 0x1A, 0x7]) &&
    (arr[6] === 0x0 || arr[6] === 0x1)
  ) {
    return {
      ext: 'rar',
      mime: 'application/x-rar-compressed'
    };
  }


  if (checkString('BLENDER')) {
    return {
      ext: 'blend',
      mime: 'application/x-blender'
    };
  }

  if (checkString('!<arch>')) {
    return {
      ext: 'ar',
      mime: 'application/x-unix-archive'
    };
  }

  if (check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
    return {
      ext: 'png',
      mime: 'image/png'
    };
  }
  if (check([0x41, 0x52, 0x52, 0x4F, 0x57, 0x31, 0x00, 0x00])) {
    return {
      ext: 'arrow',
      mime: 'application/x-apache-arrow'
    };
  }

  if (check([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00])) {
    return {
      ext: 'glb',
      mime: 'model/gltf-binary'
    };
  }
  if (
    check([0x66, 0x72, 0x65, 0x65], { offset: 4 }) ||
    check([0x6D, 0x64, 0x61, 0x74], { offset: 4 }) ||
    check([0x6D, 0x6F, 0x6F, 0x76], { offset: 4 }) ||
    check([0x77, 0x69, 0x64, 0x65], { offset: 4 })
  ) {
    return {
      ext: 'mov',
      mime: 'video/quicktime'
    };
  }


  if (check([0x49, 0x49, 0x52, 0x4F, 0x08, 0x00, 0x00, 0x00, 0x18])) {
    return {
      ext: 'orf',
      mime: 'image/x-olympus-orf'
    };
  }
  if (check([0x49, 0x49, 0x55, 0x00, 0x18, 0x00, 0x00, 0x00, 0x88, 0xE7, 0x74, 0xD8])) {
    return {
      ext: 'rw2',
      mime: 'image/x-panasonic-rw2'
    };
  }


  if (check([0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A])) {
    return {
      ext: 'ktx',
      mime: 'image/ktx'
    };
  }

  if ((check([0x7E, 0x10, 0x04]) || check([0x7E, 0x18, 0x04])) && check([0x30, 0x4D, 0x49, 0x45], { offset: 4 })) {
    return {
      ext: 'mie',
      mime: 'application/x-mie'
    };
  }

  if (check([0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], { offset: 2 })) {
    return {
      ext: 'shp',
      mime: 'application/x-esri-shape'
    };
  }

  if (
    check([0x0, 0x0, 0x1, 0xBA]) ||
    check([0x0, 0x0, 0x1, 0xB3])
  ) {
    return {
      ext: 'mpg',
      mime: 'video/mpeg'
    };
  }

  if (check([0x00, 0x01, 0x00, 0x00, 0x00])) {
    return {
      ext: 'ttf',
      mime: 'font/ttf'
    };
  }

  if (check([0x00, 0x00, 0x01, 0x00])) {
    return {
      ext: 'ico',
      mime: 'image/x-icon'
    };
  }

  if (check([0x00, 0x00, 0x02, 0x00])) {
    return {
      ext: 'cur',
      mime: 'image/x-icon'
    };
  }

  if (check([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
    return {
      ext: 'cfb',
      mime: 'application/x-cfb'
    };
  }

  return undefined;
}

function fromFile(file) {
  return fromBuffer(require('fs').readFileSync(file));
}

module.exports = {
  fromBuffer: fromBuffer,
  fromFile: fromFile
}