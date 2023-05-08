const axios = require('axios');
const csv = require('csvtojson');
const Joi = require('joi');
const config = require('../../config'); // carga la configuración adecuada según el entorno

const schemaLines = Joi.object({
    text: Joi.string().required().min(1),
    number: Joi.number(),
    hex: Joi.string().required().min(1)
})

const options = {
    headers: {
        'Authorization': 'Bearer ' + config.filesApi.token
    }
};

this.fileDataExtractor = async (csvStr) => {
    try {
        const json = await csv().fromString(csvStr);

        return json.map(file => (
            {
                text: file.text,
                number: parseInt(file.number),
                hex: file.hex
            }));
    } catch (err) {
        console.error(error);
        return null;
    }
}

module.exports.GetFilesData = async (req, res) => {
    try {

        const urlApiGetAllFiles = config.filesApi.url + config.filesApi.getAllFiles;
        const response = await axios.get(urlApiGetAllFiles, options);
        const files = response.data.files;
        const filesData = await Promise.all(files.map(async (fileName) => {
            try {
                const url = config.filesApi.url + config.filesApi.getFileData + fileName;

                const fileContent = await axios.get(url, options);
                const fileData = await this.fileDataExtractor(fileContent.data);
                return {
                    file: fileName,
                    lines: fileData.filter(item => !schemaLines.validate(item).error)
                };
            } catch (error) {
                console.error(error.message);
                return null;
            }
        }));
        res.send(filesData.filter(item => item !== null));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener datos de los archivos' });
    }
}