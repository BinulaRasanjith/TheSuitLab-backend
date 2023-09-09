import HireCostume from "../models/HireCostumesModel.js";

export const getHireCostumes = async (req, res) => {
    try {
        const { costumeType, status } = req.query;
        let hireCostumes;
        if (costumeType || available) {
            hireCostumes = await HireCostume.findAll({
                where: {
                    costumeType,
                    status,
                },
            });
        } else {
            hireCostumes = await HireCostume.findAll();
        }

        res.status(200).json(hireCostumes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getHireCostumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const hireCostume = await HireCostume.findOne({ where: { hireCostumeId: id } });
        if (hireCostume) {
            res.status(200).json(hireCostume);
        } else {
            res.status(404).json({ message: "Hire costume not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};