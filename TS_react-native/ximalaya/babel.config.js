module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugin: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@/assets': './src/assets',
					'@/components': './src/components',
					'@/config': './src/config',
					'@/models': './src/models',
					'@/navigator': './src/navigator',
					'@/pages': './src/pages',
					'@/utils': './src/utils'
				}
			}
		]
	]
};
