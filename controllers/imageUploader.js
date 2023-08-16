

export const imageUploader = async (req, res) => {
    const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path
    }));
    res.json(uploadedFiles);
};

