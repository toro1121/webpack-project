var util = require('util'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    copy: function(src, dest) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    },
    mkdir: function(dir) {
        try {
            fs.mkdirSync(dir, 0755);
        } catch (e) {
            if (e.code != "EEXIST") {
                throw e;
            }
        }
    },
    findFile: function(dir, regex) {
        var tmp = [];
        fs.readdir(dir, function(err, arr) {
            arr.map(function(value) {
                if (value.match(regex)) {
                    tmp.push(value);
                }
            });
        });
        return tmp;
    },
    copyDir: function(src, dest) {
        this.mkdir(dest);
        var files = fs.readdirSync(src);
        for (var i = 0; i < files.length; i++) {
            var current = fs.lstatSync(path.join(src, files[i]));
            if (current.isDirectory()) {
                this.copyDir(path.join(src, files[i]), path.join(dest, files[i]));
            } else if (current.isSymbolicLink()) {
                var symlink = fs.readlinkSync(path.join(src, files[i]));
                fs.symlinkSync(symlink, path.join(dest, files[i]));
            } else {
                this.copy(path.join(src, files[i]), path.join(dest, files[i]));
            }
        }
    },
    removeDir: function(dirPath, removeSelf) {
        var files = [];
        if (removeSelf === undefined)
            removeSelf = true;
        try {
            files = fs.readdirSync(dirPath);
        } catch (e) {
            return;
        }
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
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
