import PDFKIT from 'pdfkit';
import fs from 'fs';
import { resolve } from 'path';
import request from 'request';
import * as yup from 'yup';

class PDFController {
    async store(req, res) {
        const schema = yup.object().shape({
            title: yup.string().required(),
            name: yup.string().required(),
            text: yup.string(),
        });

        /*
            Validando algumas informações,
            fica ao seu criterio adicionar ou não.
        */

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'missing info body.' });
        }

        const { title, text = '', url = '', name } = req.body;


        const CreatePDF = new PDFKIT();

        /* Formatando o Titulo do PDF */

        CreatePDF.
            fontSize('25').
            fillColor('#a626a6')
            .text(title, {
                align: 'center',
                width: 500
            });

        CreatePDF.
        fontSize('18')
        .fillColor('#444')
        .text(text,{
            width: 450
        });

        CreatePDF.pipe(fs.createWriteStream(
            resolve(
                __dirname,
                '..', '..', '..',
                'PDFS', name))); // Nome do Arquivo

        try {

            CreatePDF.end();

            return res.json({ ok: 'Pdf gerado com Sucesso !!' });

        } catch (err) {
            return res.status(400).json({ err: err });
        }
    }
}

export default new PDFController();