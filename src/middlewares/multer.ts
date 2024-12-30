import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Pasta onde os arquivos serão salvos
        console.log('Arquivo recebido:', file.originalname);
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        console.log('Salvando arquivo:', file.originalname);
        // Definindo o nome do arquivo com timestamp para evitar sobreposição
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Função para filtrar os tipos de arquivos aceitos
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Verificando se o arquivo é uma imagem JPEG ou PNG
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        console.log('Arquivo aceito:', file.originalname);
        cb(null, true);
    } else {
        console.log('Arquivo rejeitado, não é uma imagem válida:', file.originalname);
        cb(null, false);
    }
};

// Definindo os limites de tamanho do arquivo (5 MB)
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de 5 MB
    }
});

export { upload };
