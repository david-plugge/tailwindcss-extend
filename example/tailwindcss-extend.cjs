module.exports = (api) => {
	api.addComponents({
		'.btn': { '@apply mx-2 rounded-lg bg-blue-500 px-4 py-2 text-white': true },
		'.error': { color: 'theme(colors.red.500)' },
	});
};
