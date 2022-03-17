const onChangeFileHandler = file =>{
    var reader = new FileReader()
    reader.readAsDataURL(file)
    return reader.onload = function(){
        return reader.result
    }
}

module.exports = onChangeFileHandler