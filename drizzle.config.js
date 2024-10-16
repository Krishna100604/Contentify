/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Contentify_owner:cVIqyUZisd81@ep-green-firefly-a1dvrbl3.ap-southeast-1.aws.neon.tech/Contentify?sslmode=require',

    }
  };
  