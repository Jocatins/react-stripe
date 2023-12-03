// sk_test_51OJEhfIKjgdya2n5csiR61IU15FEX1bnoIdXAtYVJvgudIUXZUF6sNR40Ys5qKYp6Cp7CWfL4zkdmPjX5VUSXFy400BiyxLWgX
// coffee : price_1OJF8oIKjgdya2n57nbRdzSB
// sun glasses : price_1OJFAkIKjgdya2n5y0gbblag
// camera: price_1OJFBdIKjgdya2n5Y3JxhlZU

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51OJEhfIKjgdya2n5csiR61IU15FEX1bnoIdXAtYVJvgudIUXZUF6sNR40Ys5qKYp6Cp7CWfL4zkdmPjX5VUSXFy400BiyxLWgX"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
	console.log(req.body);
	const items = req.body.items;
	let lineItems = [];
	items.forEach((item) => {
		lineItems.push({
			price: item.id,
			quantity: item.quantity,
		});
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: "payment",
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/cancel",
	});

	// Sending an object to the frontend.
	// This block code allows us to show the user the session that stripe created for them
	res.send(
		JSON.stringify({
			url: session.url,
		})
	);
});

app.listen(4000, () => console.log(`Listening on port 4000`));
