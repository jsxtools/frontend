module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				corejs: 3,
				loose: true,
				modules: false,
				targets: {
					ie: 11,
					node: 8
				},
				useBuiltIns: 'entry'
			}
		],
		[
			'@babel/preset-typescript'
		]
	],
	env: {
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						corejs: 3,
						loose: true,
						targets: {
							node: 'current'
						},
						useBuiltIns: 'entry'
					}
				],
				[
					'@babel/preset-typescript'
				]
			]
		}
	}
};
