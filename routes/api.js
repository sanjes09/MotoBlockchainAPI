const router = require("express").Router();
const { web3, instance } = require("../utils/web3");

//ROUTES
router.post("/agregar-caracteristica", async (req,res) => {
	try {
		const {id, caracteristica, valor} = req.body;
		const [admin] = await web3.eth.getAccounts();

		// SHA-256
		const hash = web3.utils.soliditySha3(valor);

		const tx = await instance.methods.agregarPropiedad(id, caracteristica, hash).send({ from: admin });
		console.log("Confirmacion:",tx.transactionHash,"\nGas Usado:",tx.gasUsed);

		res.status(200).json({
			success: true,
			data: {
				transactionHash: tx.transactionHash,
				gasUsed: tx.gasUsed
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
});

router.post("/get-caracteristica", async (req,res) => {
	try {
		const {id, caracteristica} = req.body;

		const hash = await instance.methods.leerCaracteristica(id, caracteristica).call();
		console.log("Moto Id", id, "Hash", caracteristica, hash);
		
		res.status(200).json({
			success: true,
			data: {
				caracteristica: hash,
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
});

router.post("/get-informacion", async (req,res) => {
	try {
		const {id} = req.body;

		const {
			userId,
			year,
			speed,
			model,
			brand,
		} = await instance.methods.infoMoto(id).call();
		console.log("User Id", userId);
		console.log("Year", year);
		console.log("Speed", speed);
		console.log("Brand", brand);
		console.log("Model", model);
		
		res.status(200).json({
			success: true,
			data: {
				userId,
				year,
				speed,
				model,
				brand
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
});

router.post("/nueva-moto", async (req,res) => {
	try {
		const {propietario, year, speed, brand, model} = req.body;

		const [admin] = await web3.eth.getAccounts();

		const tx = await instance.methods.agregarMoto(propietario, year, speed, brand, model).send({ from: admin, gas: 2e6 });

		const motoId = Number(tx.events.NuevaMoto.returnValues.id);
		console.log("ID Nueva Moto:", motoId);
		console.log("Confirmacion:", tx.transactionHash, "\nGas Usado:", tx.gasUsed);

		res.status(200).json({
			success: true,
			data: {
				motoId,
				transactionHash: tx.transactionHash,
				gasUsed: tx.gasUsed
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
});

module.exports = router;