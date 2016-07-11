import fs from 'fs';
import path from 'path';
import util from 'util';

export default class {
    copy(src, dest) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    }
    mkdir(dir) {
        try {
            fs.mkdirSync(dir, "0755");
        } catch (e) {
            if (e.code != "EEXIST") {
                throw e;
            }
        }
    }
    findFile(dir, regex) {
        let tmp = [];
        fs.readdir(dir, function(err, arr) {
            arr.map(function(value) {
                if (value.match(regex)) {
                    tmp.push(value);
                }
            });
        });
        return tmp;
    }
    copyDir(src, dest) {
        this.mkdir(dest);
        let files = fs.readdirSync(src);
        for (let i = 0; i < files.length; i++) {
            let current = fs.lstatSync(path.join(src, files[i]));
            if (current.isDirectory()) {
                this.copyDir(path.join(src, files[i]), path.join(dest, files[i]));
            } else if (current.isSymbolicLink()) {
                let symlink = fs.readlinkSync(path.join(src, files[i]));
                fs.symlinkSync(symlink, path.join(dest, files[i]));
            } else {
                this.copy(path.join(src, files[i]), path.join(dest, files[i]));
            }
        }
    }
    removeDir(dirPath, removeSelf) {
        let files = [];
        if (removeSelf === undefined)
            removeSelf = true;
        try {
            files = fs.readdirSync(dirPath);
        } catch (e) {
            return;
        }
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    this.removeDir(filePath);
            }
        }
        if (removeSelf) {
            fs.rmdirSync(dirPath);
        }
    }
};
