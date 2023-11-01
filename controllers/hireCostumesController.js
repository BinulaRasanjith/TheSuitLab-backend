import { HireCostume, ItemModel, } from "../models/models.js";

export const getHireCostumes2 = async (req, res) => {

	try {
		const { costumeType, rentStatus } = req.params;

		if (costumeType && rentStatus) {

			const costumeset = await ItemModel.findAll({
				where: {
					itemType: "HireCostume",
				},
				include: [
					{
						model: HireCostume,
						required: true,
						where: {
							costumeType: costumeType,
							rentStatus: rentStatus,
						},
					},
				]
			});

			res.status(200).json(costumeset);
		} else if (costumeType) {

			const costumeset = await ItemModel.findAll({
				where: {
					itemType: "HireCostume",
				},
				include: [
					{
						model: HireCostume,
						required: true,
						where: {
							costumeType: costumeType,
						},
					},
				]
			});

			res.status(200).json(costumeset);
		} else if (rentStatus) {

			const costumeset = await ItemModel.findAll({
				where: {
					itemType: "HireCostume",
				},
				include: [
					{
						model: HireCostume,
						required: true,
						where: {
							rentStatus: rentStatus,
						},
					},
				]
			});

			res.status(200).json(costumeset);
		} else {

			const costumeset = await ItemModel.findAll({
				where: {
					itemType: "HireCostume",
				},
				include: [
					{
						model: HireCostume,
						required: true,
					},
				]
			});

			res.status(200).json(costumeset);
		}


	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

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

// TO SHOW THE DETAILS OF A SPECIFIC HIRE COSTUME FOR CUSTOMER & OPERATION ASSISTANT
export const getHireCostumeById = async (req, res) => {
	try {
		const { id } = req.params;

		const hireCostume = await ItemModel.findOne({
			where: { itemId: id },
			include: HireCostume,
		});

		if (hireCostume) {
			res.status(200).json({ hireCostume });
		} else {
			res.status(404).json({ message: "Hire costume not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const addHireCostume = async (req, res) => {
	try {
		const {
			costumeName,
			costumeType,
			size,
			color,
			fabric,
			price,
			buttons,
			buttonColor,

			lapel,
			pockets,
			pocketColor,
			sleeveButton,

			vent,
			backPocket,
		} = req.body;

		const imageFiles = req.files.map((file) => file.originalname);

		const returnObj = await HireCostume.create({
			name: costumeName,
			costumeType: costumeType,
			size: size,
			color: color,
			fabric: fabric,
			price: price,
			lapel: lapel,
			pockets: pockets,
			pocketColor: pocketColor,
			sleeveButton: sleeveButton,
			buttons: buttons,
			buttonColor: buttonColor,
			vent: vent,
			backPocket: backPocket,

			images: imageFiles,
		});

		res.status(201).json(returnObj);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateHireCostume = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedFields = req.body;
		const hireCostume = await HireCostume.findOne({
			where: { itemId: id },
		});

		// const itemModel = await ItemModel.findOne({
		//     where: { itemId: id },
		// });

		// if (hireCostume && itemModel) {
		//     res.status(200).json({ ...hireCostume.toJSON(), ...itemModel.toJSON() });
		// } else {
		//     res.status(404).json({ message: "Hire costume not found" });
		// }

		if (!(hireCostume)) {
			res.status(404).json({ message: "Costume not found!" });
		}

		// TRY TO UPDATE THE COSTUME
		if (await HireCostume.update(updatedFields)) {
			res.status(200).json({ message: "Costume details updated successfully!" });
		} else {
			res.status(404).json({ message: "Update failed!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error!" });
	}
};

export const removeHireCostume = async (req, res) => {
	try {
		const { id } = req.params;

		const hireCostume = await HireCostume.findOne({
			where: { itemId: id },
		});
		if (!hireCostume) {
			res.status(404).json({ message: "Costume not found!" });
		} else {
			const deletedRows = await HireCostume.destroy({
				where: { itemId: id, },
			});
			if (deletedRows) {
				res.status(200).json({ message: "Costume data deleted!" });
			} else {
				res.status(404).json({ message: "Deletion unsuccessful!" });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Internal server error! Code:${error}` });
	}
};