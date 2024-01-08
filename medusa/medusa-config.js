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

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

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
		resolve: `medusa-file-supabase`,
		options: {
			project_ref: process.env.SUPABASE_PROJECT_REF,
			service_key: process.env.SUPABASE_SERVICE_KEY,
			bucket_name: process.env.SUPABASE_IMAGE_BUCKET_NAME,
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
						redisUrl: REDIS_URL,
					},
				},
				cacheService: {
					resolve: '@medusajs/cache-redis',
					options: {
						redisUrl: REDIS_URL,
					},
				},
		  }
		: {
				eventBus: {
					resolve: '@medusajs/event-bus-local',
				},
		  };

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
	jwtSecret: process.env.JWT_SECRET,
	cookieSecret: process.env.COOKIE_SECRET,
	store_cors: process.env.STORE_CORS,
	database_url: process.env.SUPABASE_DATABASE_URL,
	admin_cors: process.env.ADMIN_CORS,
	// Uncomment the following lines to enable REDIS
	redis_url: REDIS_URL,
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
