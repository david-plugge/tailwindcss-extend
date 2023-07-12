const handler = (api) => {
	api.addBase({":root":{"--bg":"255 255 255","--fg":"51 51 51"},"@media (prefers-color-schema: dark)":{":root":{"--bg":"51 51 51","--fg":"255 255 255"}}});
		api.addComponents({".btn":{"@apply mx-2 rounded-lg bg-blue-500 px-4 py-2 text-white":true}});
};

const config = {"theme":{"extend":{"textColor":{"main":"rgb(var(--fg) / <alpha-value>)"},"backgroundColor":{"main":"rgb(var(--bg) / <alpha-value>)"}}}};

module.exports = {
	handler,
	config,
};