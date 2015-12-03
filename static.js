var http = require('http');
var fs = require('fs');
module.exports = function(request, response) {
    var r_url = request.url;
    var ext = r_url.substr(r_url.lastIndexOf('.')+1);
    var file_name = r_url.substr(r_url.lastIndexOf('/'));
    var content_type;
    var filepath;
    var unicode = 'utf8'

    // Checking to see what the extension is
    // Assigns specific content related to extension
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
        content_type = 'image/' + ext;
        filepath = 'images' + file_name;
        unicode = null;
    } else if (ext == 'js') {
        content = 'text/javascript';
        filepath = 'js' + file_name;
    } else if (ext == 'css') {
        content_type = 'text/' + ext;
        filepath = 'stylesheets' + file_name;
    } else if (ext == 'html') {
        content_type = 'text/' + ext;
        filepath = 'views' + file_name;
    } else {
        response.end('File not found!!!');
    }

    
    fs.readFile(filepath, unicode, function(errors, contents) {
        if(errors) {
            response.end('File not found!!! Please reset server');
        } else {
            response.writeHead(200, {'Content-type': content_type});
            response.write(contents);
            response.end();
        }
    });

}