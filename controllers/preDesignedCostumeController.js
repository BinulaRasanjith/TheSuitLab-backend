import {
  HireCostume,
  ItemModel,
  Review,
  PreDesignCostume,
  Costume
} from "../models/models.js";

export const getPreDesignedCostumes = async (req, res) => {
  try {
    const { costumeType } = req.query;
    let preDesignCostumes;
    let PreDesignCostumesJson;
    if (costumeType) {
      preDesignCostumes = await PreDesignCostume.findAll({
        where: {
          costumeType,
        },
      });

      PreDesignCostumesJson = await Promise.all(
        preDesignCostumes.map(async (costume) => {
          const item = await ItemModel.findOne({
            where: {
              itemId: costume.itemId,
            },
          });

          const reviews = await Review.findAll({
            where: {
              itemId: costume.itemId,
            },
          });

          const rating =
            reviews && reviews.length > 0
              ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
              : 0;

          const ret = {
            itemId: costume.itemId,
            itemName: costume.name,
            image: costume.images,
            color: costume.color,
            price: item.price,
            status: costume.rentStatus,
            rating,
          };
          return ret;
        })
      );
    } else {
      preDesignCostumes = await PreDesignCostume.findAll();
    }

    res.status(200).json(PreDesignCostumesJson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPreDesignedCostumeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const costume = await PreDesignCostume.findOne({
      where: { itemId: id },
    });
    console.log(costume);

    const itemModel = await ItemModel.findOne({
      where: { itemId: id },
    });

    const review = await Review.findOne({
      where: {
        itemId: id,
      },
    });

    if (costume) {
      res.status(200).json({
        ...costume.toJSON(),
        ...itemModel.toJSON(),
        rating: review ? review.rating : 0,
      });
    } else {
      res.status(404).json({ message: "Hire costume not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
