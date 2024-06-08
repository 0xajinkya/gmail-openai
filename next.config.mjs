import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => {
    //     config.resolve.fallback = {
    //       fs: false,
    //       child_process: false,
    //       net: false,
    //       tls: false,
    //       // http2: false
    //     };
    
    //     return config;
    //   },
};

const withPWA = withPWAInit({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	disable: false,
	workboxOptions: {
		disableDevLogs: true
	}
  });
  
  export default withPWA(nextConfig);
