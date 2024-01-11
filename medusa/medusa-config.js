const dotenv = require('dotenv');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {}

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
	{
		resolve: '@medusajs/admin',
		/** @type {import('@medusajs/admin').PluginOptions} */
		options: {
			autoRebuild: true,
			develop: {
				logLevel: 'verbose',
				stats: 'debug',
				open: false,
			},
		},
	},
	{
		resolve: `medusa-file-cloudinary`,
		options: {
			cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		},
	},

	{
		resolve: 'medusa-plugin-variant-images',
		options: {
			enableUI: true,
		},
	},
];

const modules =
	process.env.NODE_ENV === 'production'
		? {
				eventBus: {
					resolve: '@medusajs/event-bus-redis',
					options: {
						redisUrl: process.env.REDIS_URL,
					},
				},
				cacheService: {
					resolve: '@medusajs/cache-redis',
					options: {
						redisUrl: process.env.REDIS_URL,
					},
				},
				stockLocationService: {
					resolve: '@medusajs/stock-location',
				},
				inventoryService: {
					resolve: '@medusajs/inventory',
				},
		  }
		: {
				eventBus: {
					resolve: '@medusajs/event-bus-local',
				},
				stockLocationService: {
					resolve: '@medusajs/stock-location',
				},
				inventoryService: {
					resolve: '@medusajs/inventory',
				},
		  };

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
	jwtSecret: process.env.JWT_SECRET,
	cookieSecret: process.env.COOKIE_SECRET,
	store_cors: process.env.STORE_CORS,
	database_url: process.env.RAILWAY_DATABASE_URL,
	admin_cors: process.env.ADMIN_CORS,
	// Uncomment the following lines to enable REDIS
	redis_url: process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : undefined,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
	projectConfig,
	plugins,
	modules,
	featureFlags: {
		product_categories: true,
	},
};
