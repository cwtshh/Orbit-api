import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, `../uploads/profile_photos/${req.body.user_id}`);
        
        // Criar diretório se não existir (incluindo diretórios pais)
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        console.log('Arquivo recebido:', file.originalname);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log('Salvando arquivo:', file.originalname);
        const filePath = path.join(__dirname, `../uploads/profile_photos/${req.body.user_id}/${file.originalname}`);

        // Verificar se o arquivo já existe e deletar, se necessário
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        cb(null, `${file.originalname}`);
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
const upload_perfil = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de 5 MB
    }
});

export { upload_perfil };
