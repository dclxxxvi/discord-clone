const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push({
			'utf-8-validate': 'commonjs utf-8-validate',
			bufferutil: 'commonjs bufferutil'
		});
		return config;
	},
	images: {
		domains: [
			"utfs.io"
		]
	}
};

module.exports = withBundleAnalyzer(nextConfig);
