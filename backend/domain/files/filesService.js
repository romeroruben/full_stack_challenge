const axios = require('axios');
const config = require('../../config'); // carga la configuración adecuada según el entorno

module.exports.GetFilesData = async (req, res) => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + config.filesApi.token
            }
        };

        const response = await axios.get(config.filesApi.url, options);
        const fileData = response.data;
        res.send(fileData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener el archivo' });
    }
}