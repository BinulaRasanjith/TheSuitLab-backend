import { HireCostume, ItemModel } from "../models/models.js";

export const getHireCostumes = async (req, res) => {
  try {
    const { costumeType } = req.query;
    let hireCostumes;
    let hireCostumesJson;
    if (costumeType) {
      hireCostumes = await HireCostume.findAll({
        where: {
          costumeType,
        },
      });

      hireCostumesJson = await Promise.all(
        hireCostumes.map(async (hireCostume) => {
          const item = await ItemModel.findOne({
            where: {
              itemId: hireCostume.itemId,
            },
          });
          const ret = {
            itemId: hireCostume.itemId,
            itemName: hireCostume.name,
            image: hireCostume.images,
            color: hireCostume.color,
            price: item.price,
            status: hireCostume.rentStatus,
          };
          return ret;
        })
      );
    } else {
      hireCostumes = await HireCostume.findAll();
    }

    res.status(200).json(hireCostumesJson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHireCostumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const hireCostume = await HireCostume.findOne({
      where: { itemId: id },
    });

    const itemModel = await ItemModel.findOne({
      where: { itemId: id },
    });

    if (hireCostume) {
      res.status(200).json({ ...hireCostume.toJSON(), ...itemModel.toJSON() });
    } else {
      res.status(404).json({ message: "Hire costume not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
